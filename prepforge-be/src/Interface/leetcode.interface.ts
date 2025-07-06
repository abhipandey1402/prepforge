export interface RawSubmission {
    id: number;
    question_id: number;
    frontend_id: string;
    title: string;
    title_slug: string;
    url: string;
    lang: string;
    lang_name: string;
    status: string;
    status_display: string;
    is_pending: boolean;
    runtime: string;
    memory: string;
    code: string;
    compare_result: string;
    time: string;
    timestamp: number;
    has_notes: boolean;
    flag_type: string;
}
