const ChallengeStatusBadge = ({ status }: { status: string }) => {
    const statusStyles: Record<string, string> = {
        Active: "bg-blue-100 text-blue-800",
        Completed: "bg-green-100 text-green-800",
        Failed: "bg-red-100 text-red-800"
    };

    return (
        <span className={`text-xs px-2 py-1 rounded-full ${statusStyles[status] || ""}`}>{status}</span>
    );
};

export default ChallengeStatusBadge