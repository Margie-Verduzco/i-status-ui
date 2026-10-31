/* 
   I-STATUS
   Radial Progress Card Component
    */

export function radialProgressCard(options = {}) {

    const {
        total = 36,
        completed = 14,
        label = "Progress",
        status = "success",
        size = "md"
    } = options;

    const validTotal = Math.max(1, total);
    const validCompleted = Math.max(0, Math.min(completed, validTotal));
    const percentage = Math.round((validCompleted / validTotal) * 100);

    const cardElement = document.createElement("div");
    cardElement.className = [
        "ist-radial-card",
        `ist-radial-card--${status}`,
        `ist-radial-card--${size}`
    ].join(" ");

    const chartWrapper = document.createElement("div");
    chartWrapper.className = "ist-radial-card__chart-wrapper";

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 120 120");
    svg.setAttribute("class", "ist-radial-card__svg");

    const cx = 60;
    const cy = 60;
    const outerRadius = 48;
    const innerRadius = 40;

    // Segments
    for (let i = 0; i < validTotal; i++) {
        const angle = (i * 360) / validTotal - 90;
        const rad = (angle * Math.PI) / 180;

        const x1 = cx + innerRadius * Math.cos(rad);
        const y1 = cy + innerRadius * Math.sin(rad);
        const x2 = cx + outerRadius * Math.cos(rad);
        const y2 = cy + outerRadius * Math.sin(rad);

        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);

        // Cascade effect
        line.style.setProperty("--index", i);

        const isCompleted = i < validCompleted;
        line.setAttribute(
            "class",
            [
                "ist-radial-card__segment",
                isCompleted ? "ist-radial-card__segment--completed" : "ist-radial-card__segment--pending"
            ].join(" ")
        );

        svg.appendChild(line);
    }

    chartWrapper.appendChild(svg);

    // Central content
    const contentElement = document.createElement("div");
    contentElement.className = "ist-radial-card__content";

    const percentageSpan = document.createElement("span");
    percentageSpan.className = "ist-radial-card__percentage";
    percentageSpan.textContent = `${percentage}%`;

    const labelSpan = document.createElement("span");
    labelSpan.className = "ist-radial-card__label";
    labelSpan.textContent = label;

    contentElement.appendChild(percentageSpan);
    contentElement.appendChild(labelSpan);

    chartWrapper.appendChild(contentElement);
    cardElement.appendChild(chartWrapper);

    return cardElement;

}