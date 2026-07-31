import API from "./axios";

export const getTimeline = (params = {}) =>

    API.get(

        "/timeline",

        {

            params,

        }

    );