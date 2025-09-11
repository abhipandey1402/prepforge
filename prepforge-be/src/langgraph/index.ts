import { StateGraph, START, END } from "@langchain/langgraph";
import { BaseMessage, HumanMessage } from "@langchain/core/messages";
import { createMentorAgent } from "../agents/mentor-agent.js";
import { createSubmissionTools } from "../tools/submissionTools.js";
import { Annotation, MessagesAnnotation } from "@langchain/langgraph";
import { TopicInsight } from "../models/TopicInsight.js";

export enum AGENTS {
    MENTOR = "mentor",
}

export interface AppState {
    messages: BaseMessage[];
    next: AGENTS[] | typeof END[];
    context: Record<string, any>;
}

const StateAnnotation = Annotation.Root({
    ...MessagesAnnotation.spec,
    next: Annotation<AGENTS[] | typeof END[]>({
        reducer: (_, y) => y ?? [],
        default: () => [AGENTS.MENTOR],
    }),
    context: Annotation({
        reducer: (x: Record<string, any>, y?: Record<string, any>) => ({ ...x, ...(y ?? {}) }),
        default: () => ({}),
    }),
});

export function createMentorGraph(userJWT: string) {
    const mentorAgent = createMentorAgent(createSubmissionTools(userJWT));

    return new StateGraph(StateAnnotation)
        .addNode(AGENTS.MENTOR, mentorAgent)
        .addEdge(START, AGENTS.MENTOR)
        .addEdge(AGENTS.MENTOR, END)
        .compile();
}

export async function runMentorGraph(
    topic: string,
    limit: number,
    userJWT: string,
    userId: string
) {
    const compiledGraph = createMentorGraph(userJWT);

    const final = await compiledGraph.invoke({
        messages: [
            new HumanMessage(`Analyze submissions for topic "${topic}" limit ${limit}.`),
        ],
        next: [AGENTS.MENTOR],
    });

    // ✅ direct: final.messages
    const messages = final.messages;
    const lastMessage = messages[messages.length - 1];
    const jsonContent = lastMessage?.content;

    if (!jsonContent) return null;


    if (typeof jsonContent === "string") {
        try {
            const content = jsonContent.replace(/```json|```/g, "").trim();
            const finalData = JSON.parse(content);
            // ✅ Upsert into DB
            await TopicInsight.findOneAndUpdate(
                { userId, topic },
                { insights: finalData, updatedAt: new Date() },
                { upsert: true, new: true }
            );
        } catch (err) {
            console.error("❌ Failed to parse AI output as JSON:", err);
            // fallback: keep it as string
        }
    }

    return jsonContent;
}