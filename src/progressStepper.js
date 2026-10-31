/* 
   I-STATUS
   Progress Stepper Component
    */

export function ProgressStepper(
    options = {}
) {
    const {
        steps = [],
        current = 0,
        size = "md"
    } = options;

    if (
        !Array.isArray(steps) ||
        steps.length === 0
    ) {
        console.warn(
            "i-Status: Progress bar stepper requires at least one step."
        );
        return null;
    }

    const currentIndex =
        Math.max(
            0,
            Math.min(
                Number(current) || 0,
                steps.length - 1
            )
        );

    const container =
        document.createElement("div");

    container.className = [
        "ist-progress-stepper",
        `ist-progress-stepper--${size}`
    ].join(" ");

    container.setAttribute(
        "role",
        "list"
    );

    steps.forEach((step, index) => {
        const status =
            getStepStatus(index, currentIndex);

        const stepElement =
            createProgressBarStep(step, index, status);

        container.appendChild(stepElement);
    });

    return container;
}

function getStepStatus(
    index,
    currentIndex
) {
    if (index < currentIndex) {
        return "completed";
    }
    if (index === currentIndex) {
        return "current";
    }
    return "pending";
}


function createProgressBarStep(
    step,
    index,
    status
) {
    const item =
        document.createElement("div");

    item.className = [
        "ist-progress-stepper__item",
        `ist-progress-stepper__item--${status}`
    ].join(" ");

    item.setAttribute(
        "role",
        "listitem"
    );

    if (status === "current") {
        item.setAttribute("aria-current", "step");
    }

    const progressBar =
        document.createElement("div");

    progressBar.className =
        "ist-progress-stepper__bar";


    const contentRow =
        document.createElement("div");

    contentRow.className =
        "ist-progress-stepper__content";


    const indicator =
        document.createElement("div");

    indicator.className =
        "ist-progress-stepper__indicator";

    if (status === "completed") {
        indicator.textContent = "✓";
    } else {
        indicator.textContent = String(index + 1);
    }


   const label =
        document.createElement("div");

    label.className =
        "ist-progress-stepper__label";

    label.textContent =
        typeof step === "string"
            ? step
            : (step?.label || step?.title || `Step ${index + 1}`);


    contentRow.appendChild(indicator);
    contentRow.appendChild(label);

    item.appendChild(progressBar);
    item.appendChild(contentRow);

    return item;
}