export const generateFIRETimeline = ({

    currentAge,

    currentWealth,

    monthlyInvestment,

    expectedReturn,

    inflation,

    fireCorpus,

}) => {

    const timeline = [];

    const realReturn =
        ((1 + expectedReturn / 100) /
            (1 + inflation / 100) - 1);

    let wealth = currentWealth;

    let age = currentAge;

    let year = new Date().getFullYear();

    while (

        wealth < fireCorpus &&

        age <= 100

    ) {

        wealth =

            wealth * (1 + realReturn) +

            monthlyInvestment * 12;

        timeline.push({

            year,

            age,

            wealth: Number(wealth.toFixed(2)),

            progress: Number(

                ((wealth / fireCorpus) * 100).toFixed(2)

            ),

            target: fireCorpus,

            remaining: Math.max(fireCorpus - wealth, 0),

            achieved: wealth >= fireCorpus,

        });

        age++;

        year++;

    }

    timeline.push({

        year,

        age,

        wealth: Number(wealth.toFixed(2)),

        progress: 100,

        target: fireCorpus,

        remaining: 0,

        achieved: true,

    });

    return timeline;

};