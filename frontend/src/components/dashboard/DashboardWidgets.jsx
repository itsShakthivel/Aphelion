function DashboardWidgets() {
  const widgets = [
    {
      title: "Monthly Budget",
      value: "₹50,000",
      subtitle: "80% utilized",
    },
    {
      title: "Emergency Fund",
      value: "₹3,50,000",
      subtitle: "7 months coverage",
    },
    {
      title: "FIRE Progress",
      value: "12%",
      subtitle: "Goal: ₹10 Cr",
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-1
        lg:grid-cols-3
        gap-6
        mt-6
      "
    >
      {widgets.map((widget) => (
        <div
          key={widget.title}
          className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-6
          "
        >
          <p className="text-slate-400">
            {widget.title}
          </p>

          <h2
            className="
              text-3xl
              font-bold
              text-white
              mt-3
            "
          >
            {widget.value}
          </h2>

          <p className="text-emerald-400 mt-2">
            {widget.subtitle}
          </p>
        </div>
      ))}
    </div>
  );
}

export default DashboardWidgets;