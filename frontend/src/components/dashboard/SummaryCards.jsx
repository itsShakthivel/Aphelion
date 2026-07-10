import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  FaWallet,
  FaArrowUp,
  FaArrowDown,
  FaCoins,
} from "react-icons/fa";

function SummaryCards({ data }) {
  if (!data || !data.summary) return null;

  const { summary } = data;

  const cards = [
    {
      title: "Net Worth",
      value: summary.netWorth,
      prefix: "₹",
      suffix: "",
      change: "+0%",
      color: "text-emerald-400",
      icon: <FaWallet />,
    },
    {
      title: "Income",
      value: summary.income,
      prefix: "₹",
      suffix: "",
      change: "+0%",
      color: "text-blue-400",
      icon: <FaArrowUp />,
    },
    {
      title: "Expenses",
      value: summary.expenses,
      prefix: "₹",
      suffix: "",
      change: "+0%",
      color: "text-rose-400",
      icon: <FaArrowDown />,
    },
    {
      title: "Savings Rate",
      value: summary.savingsRate.toFixed(1),
      prefix: "",
      suffix: "%",
      change: "+0%",
      color: "text-yellow-400",
      icon: <FaCoins />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-6 mb-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          whileHover={{ y: -8, scale: 1.03 }}
          initial={{opacity: 0, y: 25,}}
          animate={{opacity: 1, y: 0,}}
          transition={{ duration: 0.4, delay: index * 0.1}}
          className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-lg"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-400 text-sm">{card.title}</p>

              <h2 className={`text-3xl font-bold mt-3 ${card.color}`}>
                {card.prefix}
                <CountUp
                    end={Number(card.value)}
                    duration={2}
                    separator=","
                />
                {card.suffix}
              </h2>
            </div>

            <div
              className={`h-12 w-12 rounded-xl bg-slate-800 flex items-center justify-center text-xl ${card.color}`}
            >
              {card.icon}
            </div>
          </div>

          <div className="mt-5">
            <span className="text-emerald-400 text-sm font-medium">
              {card.change}
            </span>

            <span className="text-slate-500 text-sm ml-2">
              Live Data
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default SummaryCards;