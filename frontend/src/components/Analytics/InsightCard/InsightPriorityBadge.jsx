const PRIORITY_STYLES = {
    critical: {
        label: "Critical",
        className:
            "bg-red-500/15 text-red-400 border border-red-500/30",
    },

    high: {
        label: "High",
        className:
            "bg-orange-500/15 text-orange-400 border border-orange-500/30",
    },

    medium: {
        label: "Medium",
        className:
            "bg-blue-500/15 text-blue-400 border border-blue-500/30",
    },

    low: {
        label: "Low",
        className:
            "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    },

    info: {
        label: "Info",
        className:
            "bg-zinc-700/40 text-zinc-300 border border-zinc-600",
    },
};

const InsightPriorityBadge = ({ priority }) => {

    const config =
        PRIORITY_STYLES[priority] ||
        PRIORITY_STYLES.info;

    return (

        <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
        >
            {config.label}
        </span>

    );

};

export default InsightPriorityBadge;