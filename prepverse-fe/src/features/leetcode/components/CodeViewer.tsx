import { Check, Copy } from "lucide-react";
import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, duotoneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
    code: string;
    language?: string;
    theme?: "dark" | "light";
    height?: string;
};

const CodeViewer: React.FC<Props> = ({
    code,
    language = "",
    theme = "dark",
    height = "auto",
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative border rounded-lg overflow-hidden shadow-sm">
            <button
                onClick={handleCopy}
                className="absolute top-0 right-0 bg-slate-800 hover:bg-slate-900 text-sm px-2 py-1 rounded flex items-center gap-1 z-10"
            >
                {copied ? <Check className="text-green-600" size={12} /> : <Copy size={12} />} <span className="text-sm"> {copied ? "Copied" : "Copy"} </span>
            </button>

            <div style={{ maxHeight: height, overflowY: "auto" }}>
                <SyntaxHighlighter
                    language={language}
                    style={theme === "dark" ? oneDark : duotoneLight}
                    wrapLongLines
                    customStyle={{
                        padding: "1rem",
                        fontSize: "0.875rem",
                        backgroundColor: theme === "dark" ? "#282c34" : "#f5f5f5",
                    }}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default CodeViewer;
