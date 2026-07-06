function DashboardCards() {

    const cards = [
        {
            title: "Net Worth",
            value: "₹14,50,000"
        },
        {
            title: "Monthly Income",
            value: "₹80,000"
        },
        {
            title: "Monthly Expenses",
            value: "₹40,000"
        },
        {
            title: "Savings Rate",
            value: "50%"
        }
    ];

    return (
        <div className="cards">

            {cards.map((card) => (
                <div className="card">

                    <h3>{card.title}</h3>

                    <h2>{card.value}</h2>

                </div>
            ))}

        </div>
    );
}

export default DashboardCards;