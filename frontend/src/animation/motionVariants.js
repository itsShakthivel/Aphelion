export const fadeInUp = {

    hidden: {

        opacity: 0,
        y: 15,

    },

    visible: {

        opacity: 1,
        y: 0,

        transition: {

            duration: 0.35,

            ease: "easeOut",

        },

    },

};

export const fadeIn = {

    hidden: {

        opacity: 0,

    },

    visible: {

        opacity: 1,

        transition: {

            duration: 0.3,

        },

    },

};

export const scaleIn = {

    hidden: {

        opacity: 0,

        scale: 0.96,

    },

    visible: {

        opacity: 1,

        scale: 1,

        transition: {

            duration: 0.3,

        },

    },

};

export const CARD_ANIMATIONS = {

    fade: fadeIn,

    fadeUp: fadeInUp,

    scale: scaleIn,

    none: null,

};