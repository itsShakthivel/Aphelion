import {
    FaArrowTrendUp,
    FaArrowTrendDown,
    FaWallet,
    FaPiggyBank,
} from "react-icons/fa6";

const TransactionSummaryCards = ({ transactions = [] }) => {

    let income = 0;
    let expense = 0;

    let investment = 0;
    let loanPayments = 0;
    let loanDisbursements = 0;
    let insuranceExpenses = 0;

    transactions.forEach((transaction) => {

        const amount =
            Number(transaction.amount) || 0;

        switch (transaction.type) {

            case "income":
                income += amount;
                break;

            case "expense":
                expense += amount;
                break;

            case "investment":
                investment += amount;
                break;

            case "loan":

                if (
                    transaction.loanTransactionType ===
                    "disbursement"
                ) {

                    loanDisbursements += amount;

                } else if (
                    [
                        "emi",
                        "principal",
                        "interest",
                    ].includes(
                        transaction.loanTransactionType
                    )
                ) {

                    loanPayments += amount;

                }

                break;

            case "insurance":

                if (
                    [
                        "premium",
                        "policy_expense",
                    ].includes(
                        transaction.insuranceTransactionType
                    )
                ) {

                    insuranceExpenses += amount;

                }

                break;

            default:
                break;

        }

    });


    // =====================================================
    // AVAILABLE SAVINGS
    //
    // Actual money remaining after all recorded cash outflows.
    // =====================================================

    const savings =
        income
        + loanDisbursements
        - expense
        - investment
        - loanPayments
        - insuranceExpenses;


    // Balance currently follows the same cash position.
    const balance =
        savings;


    const cards = [

        {
            title: "Income",
            value: income,
            icon: <FaArrowTrendUp />,
            color: "text-green-500",
            bg: "bg-green-50",
        },

        {
            title: "Expense",
            value: expense,
            icon: <FaArrowTrendDown />,
            color: "text-red-500",
            bg: "bg-red-50",
        },

        {
            title: "Savings",
            value: savings,
            icon: <FaPiggyBank />,
            color: "text-blue-500",
            bg: "bg-blue-50",
        },

        {
            title: "Balance",
            value: balance,
            icon: <FaWallet />,
            color: "text-purple-500",
            bg: "bg-purple-50",
        },

    ];


    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {cards.map((card) => (

                <div
                    key={card.title}
                    className="bg-white rounded-xl shadow-md p-6"
                >

                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-gray-500 text-sm">
                                {card.title}
                            </p>

                            <h2 className="text-3xl font-bold mt-2">
                                ₹ {card.value.toLocaleString()}
                            </h2>

                        </div>

                        <div
                            className={`text-3xl p-3 rounded-full ${card.bg} ${card.color}`}
                        >

                            {card.icon}

                        </div>

                    </div>

                </div>

            ))}

        </div>

    );

};

export default TransactionSummaryCards;