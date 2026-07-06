function DashboardStats() {

    const stats = [
        {
            title: "Monthly Transactions",
            value: "124"
        },
        {
            title: "Investment Growth",
            value: "+18%"
        },
        {
            title: "Expense Categories",
            value: "14"
        },
        {
            title: "Financial Goals",
            value: "5"
        }
    ];

    return (
        <div
            className="
                grid
                grid-cols-4
                gap-6
                mt-6
            "
        >

            {stats.map((stat) => (

                <div
                    key={stat.title}
                    className="
                        bg-slate-900
                        p-5
                        rounded-2xl
                        border
                        border-slate-800
                    "
                >

                    <p className="text-slate-400">
                        {stat.title}
                    </p>

                    <h2
                        className="
                            text-white
                            text-2xl
                            font-bold
                            mt-2
                        "
                    >
                        {stat.value}
                    </h2>

                </div>

            ))}

        </div>
    );
}

export default DashboardStats;