/* 
   I-STATUS
   Stepper
    */


export function stepper(
    options = {}
) {

    const {

        steps = [],

        current = 0,

        orientation = "horizontal",

        size = "md"

    } = options;


    /* 
       Validate steps
        */

    if (
        !Array.isArray(steps) ||
        steps.length === 0
    ) {

        console.warn(
            "i-Status: Stepper requires at least one step."
        );

        return null;

    }


    /* 
       Normalize current step
        */

    const currentIndex =
        Math.max(
            0,
            Math.min(
                Number(current) || 0,
                steps.length - 1
            )
        );


    /* 
      orientation
        */

    const normalizedOrientation =
        orientation === "vertical"
            ? "vertical"
            : "horizontal";


    /* 
    root
        */

    const element =
        document.createElement(
            "div"
        );


    element.className =
        [
            "ist-stepper",
            `ist-stepper--${normalizedOrientation}`,
            `ist-stepper--${size}`
        ].join(" ");


    element.setAttribute(
        "role",
        "list"
    );


    /* 
       Steps
        */

    steps.forEach(
        (step, index) => {

            const status =
                getStepStatus(
                    index,
                    currentIndex
                );

            const stepData =
                parseStepData(
                    step,
                    index,
                    status
                );


            const stepElement =
                createStep(
                    stepData,
                    index,
                    status
                );


            element.appendChild(
                stepElement
            );

        }
    );


    return element;

}

function getStepStatus(
    index,
    currentIndex
) {

    if (
        index < currentIndex
    ) {

        return "completed";

    }


    if (
        index === currentIndex
    ) {

        return "current";

    }


    return "pending";

}

function parseStepData(
    step,
    index,
    status
) {

    const stepNumberLabel =
        `STEP ${index + 1}`;

    if (
        typeof step === "string"
    ) {

        return {
            stepLabel: stepNumberLabel,
            title: step,
            description: capitalize(status)
        };

    }

    return {
        stepLabel: step?.stepLabel || stepNumberLabel,
        title: step?.label || step?.title || "",
        description: step?.description || capitalize(status)
    };

}


function capitalize(
    str
) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}



function createStep(
    stepData,
    index,
    status
) {

    const item =
        document.createElement(
            "div"
        );


    item.className =
        [
            "ist-stepper__item",
            `ist-stepper__item--${status}`
        ].join(" ");


    item.setAttribute(
        "role",
        "listitem"
    );


    /* 
       Step indicator
        */

    const indicator =
        document.createElement(
            "div"
        );


    indicator.className =
        "ist-stepper__indicator";


    indicator.setAttribute(
        "aria-hidden",
        "true"
    );


    /* 
Indicators
    */
    if (
        status === "completed"
    ) {

        indicator.textContent =
            "✓";

    } else if (
        status === "pending"
    ) {

        indicator.textContent =
            String(index + 1);

    } else {

        indicator.textContent =
            "";

    }


    /* 
       Labels
        */

    const labelContainer =
        document.createElement(
            "div"
        );

    labelContainer.className =
        "ist-stepper__labels";


    /* Subtitle (e.g. STEP 1) */
    const stepLabelElement =
        document.createElement(
            "div"
        );

    stepLabelElement.className =
        "ist-stepper__step-label";

    stepLabelElement.textContent =
        stepData.stepLabel;


     const titleElement =
        document.createElement(
            "div"
        );

    titleElement.className =
        "ist-stepper__label";

    titleElement.textContent =
        stepData.title;

    const descElement =
        document.createElement(
            "div"
        );

    descElement.className =
        "ist-stepper__description";

    descElement.textContent =
        stepData.description;


    labelContainer.appendChild(
        stepLabelElement
    );

    labelContainer.appendChild(
        titleElement
    );

    labelContainer.appendChild(
        descElement
    );


    /* 
       Current step
        */

    if (
        status === "current"
    ) {

        item.setAttribute(
            "aria-current",
            "step"
        );

    }


    /* 
       Content
        */

    const content =
        document.createElement(
            "div"
        );


    content.className =
        "ist-stepper__content";


    content.appendChild(
        indicator
    );

    content.appendChild(
        labelContainer
    );


    /* 
       Connector
        */

    const connector =
        document.createElement(
            "div"
        );


    connector.className =
        [
            "ist-stepper__connector",
            `ist-stepper__connector--${status}`
        ].join(" ");


       item.appendChild(
        content
    );

    item.appendChild(
        connector
    );


    return item;

}