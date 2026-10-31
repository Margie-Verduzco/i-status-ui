/* 
   I-STATUS
   Badge Component
 */

export function badge(options = {}) {

    const {
        status = "success",
        text = "Connected",
        indicator = true,
        size = "md"
    } = options;

    const badgeElement = document.createElement("div");
    
    badgeElement.className = [
        "ist-badge",
        `ist-badge--${status}`,
        `ist-badge--${size}`
    ].join(" ");

    if (indicator) {
        const dotWrapper = document.createElement("span");
        dotWrapper.className = "ist-badge__dot-wrapper";

        const ring = document.createElement("span");
        ring.className = "ist-badge__ring";
        dotWrapper.appendChild(ring);

        const dot = document.createElement("span");
        dot.className = "ist-badge__dot";
        dotWrapper.appendChild(dot);

        badgeElement.appendChild(dotWrapper);
    }

    const textSpan = document.createElement("span");
    textSpan.className = "ist-badge__text";
    textSpan.textContent = text;
    badgeElement.appendChild(textSpan);

    return badgeElement;

}