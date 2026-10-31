/* 
   I-STATUS
   Progress Card Component
    */

export function progressCard(options = {}) {

    const {
        total = 4,
        completed = 3,
        label = "Progress",
        status = "success",
        size = "md"
    } = options;

    const validTotal = Math.max(1, total);
    const validCompleted = Math.max(0, Math.min(completed, validTotal));
    
    const percentage = Math.round((validCompleted / validTotal) * 100);

    const cardElement = document.createElement("div");
    cardElement.className = [
        "ist-progress-card",
        `ist-progress-card--${status}`,
        `ist-progress-card--${size}`
    ].join(" ");

    const headerElement = document.createElement("div");
    headerElement.className = "ist-progress-card__header";

    const percentageSpan = document.createElement("span");
    percentageSpan.className = "ist-progress-card__percentage";
    percentageSpan.textContent = `${percentage}%`;
    headerElement.appendChild(percentageSpan);

    const labelSpan = document.createElement("span");
    labelSpan.className = "ist-progress-card__label";
    labelSpan.textContent = label;
    headerElement.appendChild(labelSpan);

    cardElement.appendChild(headerElement);

    const segmentsWrapper = document.createElement("div");
    segmentsWrapper.className = "ist-progress-card__segments";

    for (let i = 0; i < validTotal; i++) {
        const segment = document.createElement("div");
        const isCompleted = i < validCompleted;
        
        segment.className = [
            "ist-progress-card__segment",
            isCompleted ? "ist-progress-card__segment--completed" : "ist-progress-card__segment--pending"
        ].join(" ");

        segmentsWrapper.appendChild(segment);
    }

    cardElement.appendChild(segmentsWrapper);

    return cardElement;

}