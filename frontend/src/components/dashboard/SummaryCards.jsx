import { motion } from "framer-motion";


import {
  FaWallet,
  FaArrowUp,
  FaArrowDown,
  FaCoins,
} from "react-icons/fa";

function SummaryCards() {
  const cards = [
    {
      title: "Net Worth",
      value: 1450000,
      prefix: "₹",
      suffix: "",
      change: "+12.4%",
      color: "text-emerald-400",
      icon: <FaWallet />,
    },
    {
      title: "Income",
      value: 80000,
      prefix: "₹",
      suffix: "",
      change: "+8.1%",
      color: "text-blue-400",
      icon: <FaArrowUp />,
    },
    {
      title: "Expenses",
      value: 40000,
      prefix: "₹",
      suffix: "",
      change: "-3.5%",
      color: "text-rose-400",
      icon: <FaArrowDown />,
    },
    {
      title: "Savings Rate",
      value: 50,
      prefix: "",
      suffix: "%",
      change: "+5.2%",
      color: "text-yellow-400",
      icon: <FaCoins />,
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-6
        mb-6
      "
    >
      {cards.map((card) => (
        <motion.div
          key={card.title}
          whileHover={{
            y: -8,
            scale: 1.03,
          }}
          transition={{
            duration: 0.2,
          }}
          className="
            bg-slate-900
            rounded-2xl
            p-6
            border
            border-slate-800
            cursor-pointer
            shadow-lg
          "
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-400 text-sm">
                {card.title}
              </p>

              <h2
                className={`
                    text-3xl
                    font-bold
                    mt-3
                    ${card.color}
                `}>
                    {card.prefix}
                    {card.value.toLocaleString()}
                    {card.suffix}
              </h2>
            </div>

            <div
                className={`
                h-12
                w-12
                rounded-xl
                bg-slate-800
                flex
                items-center
                justify-center
                text-xl
                ${card.color}
              `}
            >
              {card.icon}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-5">
            <span
              className={
                card.change.startsWith("-")
                  ? "text-rose-400 text-sm font-medium"
                  : "text-emerald-400 text-sm font-medium"
              }
            >
              {card.change}
            </span>

            <span className="text-slate-500 text-sm ml-2">
              vs last month
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default SummaryCards;