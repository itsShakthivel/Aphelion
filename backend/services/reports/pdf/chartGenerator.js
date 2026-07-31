import { ChartJSNodeCanvas } from "chartjs-node-canvas";

const width = 900;

const height = 500;

const chartCanvas = new ChartJSNodeCanvas({

    width,

    height,

    backgroundColour: "white",

});

export const generateBarChart = async (

    labels,

    values,

    title

) => {

    const configuration = {

        type: "bar",

        data: {

            labels,

            datasets: [

                {

                    label: title,

                    data: values,

                },

            ],

        },

    };

    return await chartCanvas.renderToBuffer(

        configuration

    );

};

export const generatePieChart = async (

    labels,

    values,

    title

) => {

    const configuration = {

        type: "pie",

        data: {

            labels,

            datasets: [

                {

                    label: title,

                    data: values,

                },

            ],

        },

    };

    return await chartCanvas.renderToBuffer(

        configuration

    );

};

export const generateLineChart = async (

    labels,

    values,

    title

) => {

    const configuration = {

        type: "line",

        data: {

            labels,

            datasets: [

                {

                    label: title,

                    data: values,

                },

            ],

        },

    };

    return await chartCanvas.renderToBuffer(

        configuration

    );

};