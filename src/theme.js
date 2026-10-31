/*
 
  I-STATUS
Theme System
 
 */

import defaultTheme
    from "../themes/default.js";

import midnightTheme
    from "../themes/midnight.js";

import sunriseTheme
    from "../themes/sunrise.js";

import sunsetTheme
    from "../themes/sunset.js";

import vintageTheme
    from "../themes/vintage.js";


const themes = {

    default: defaultTheme,

    midnight: midnightTheme,

    sunrise: sunriseTheme,

    sunset: sunsetTheme,

    vintage: vintageTheme

};


/* 
   Active Theme
    */

let activeTheme =
    defaultTheme;


/* 
   Convert Token Name
    */

function toCssName(
    prefix,
    name
) {

    const normalizedName =
        name
            .replace(
                /([A-Z])/g,
                "-$1"
            )
            .toLowerCase();

    if (prefix) {

        return (
            `--ist-${prefix}-${normalizedName}`
        );

    }

    return (
        `--ist-${normalizedName}`
    );

}


/* 
   Apply Theme
    */

function applyTheme(
    themeObject
) {

    if (!themeObject) {
        return;
    }


    const root =
        document.documentElement;


    /* 
       Colors
        */

    if (themeObject.colors) {

        Object.entries(
            themeObject.colors
        ).forEach(
            ([name, value]) => {

                const cssName =
                    toCssName(
                        "color",
                        name
                    );

                root.style.setProperty(
                    cssName,
                    value
                );

            }
        );

    }


    /* 
       Typography
        */

    if (themeObject.typography) {

        Object.entries(
            themeObject.typography
        ).forEach(
            ([name, value]) => {

                const cssName =
                    toCssName(
                        "",
                        name
                    );

                root.style.setProperty(
                    cssName,
                    value
                );

            }
        );

    }


    /* 
       Shadows
        */

    if (themeObject.shadows) {

        Object.entries(
            themeObject.shadows
        ).forEach(
            ([name, value]) => {

                const cssName =
                    toCssName(
                        "shadow",
                        name
                    );

                root.style.setProperty(
                    cssName,
                    value
                );

            }
        );

    }


    /* 
       Active Theme
        */

    activeTheme =
        themeObject;

}


/* 
   Initialize Default Theme
    */

applyTheme(
    themes.default
);


/* 
   Theme
    */

export function theme(
    name
) {

    const selectedTheme =
        themes[name];


    if (!selectedTheme) {

        console.warn(
            `i-Status: Theme "${name}" was not found.`
        );

        return;

    }


    applyTheme(
        selectedTheme
    );

}


/* 
   Register Theme
    */

export function registerTheme(
    name,
    themeObject
) {

    if (
        !name ||
        !themeObject
    ) {

        return;
    }


    themes[name] =
        themeObject;

}


/* 
   Get Theme
    */

export function getTheme(
    name
) {

    return themes[name];

}


/* 
   Get Themes
    */

export function getThemes() {

    return Object.keys(
        themes
    );

}


/* 
   Get Active Theme
    */

export function getActiveTheme() {

    return activeTheme;

}