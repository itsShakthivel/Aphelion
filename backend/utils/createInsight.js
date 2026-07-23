const createInsight = ({
    priority,
    category,
    title,
    description,
    recommendation,
    impact,
    score,
}) => {

    return {

        id: crypto.randomUUID(),

        priority,

        category,

        title,

        description,

        recommendation,

        impact,

        score,

        createdAt: new Date(),

    };

};

export default createInsight;