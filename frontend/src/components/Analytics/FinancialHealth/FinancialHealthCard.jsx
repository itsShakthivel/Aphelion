import React from "react";

import Card from "../../ui/Card";

import HealthScoreRing from "./HealthScoreRing";

import HealthBreakdown from "./HealthBreakdown";

import HealthInsights from "./HealthInsights";

const FinancialHealthCard = ({ data }) => {
    console.log("Financial Health:", data);
    return null;
};
//     if (!data)
//         return null;

//     return (

//         <Card>

//             <h2 className="text-2xl font-semibold mb-8">

//                 Financial Health

//             </h2>

//             <div className="grid lg:grid-cols-2 gap-10">

//                 <HealthScoreRing

//                     score={data.total}

//                     level={data.level}

//                     status={data.status}

//                 />

//                 <HealthBreakdown

//                     breakdown={data.breakdown}

//                 />

//             </div>

//             <div className="mt-10">

//                 <HealthInsights

//                     data={data}

//                 />

//             </div>

//         </Card>

//     );

// };


// console.log("FinancialHealth data:", data);

// console.log("total:", data.total);
// console.log("level:", data.level);
// console.log("status:", data.status);
// console.log("breakdown:", data.breakdown);
// console.log("metrics:", data.metrics);

 export default FinancialHealthCard;