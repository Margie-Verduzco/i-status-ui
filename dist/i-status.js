var iStatus = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/index.js
  var index_exports = {};
  __export(index_exports, {
    ProgressStepper: () => ProgressStepper,
    badge: () => badge,
    getTheme: () => getTheme,
    getThemes: () => getThemes,
    notification: () => notification,
    progressCard: () => progressCard,
    radialProgressCard: () => radialProgressCard,
    registerTheme: () => registerTheme,
    stepper: () => stepper,
    theme: () => theme
  });

  // src/notification.js
  function notification(options = {}) {
    const {
      status = "info",
      title = "",
      message = "",
      colorSource = "default",
      colors = {}
    } = options;
    const validStatuses = [
      "success",
      "warning",
      "error",
      "info"
    ];
    const normalizedStatus = validStatuses.includes(status) ? status : "info";
    const validSources = [
      "default",
      "theme",
      "custom"
    ];
    const normalizedSource = validSources.includes(colorSource) ? colorSource : "default";
    if (normalizedSource === "custom") {
      if (!colors.icon || !colors.accent) {
        console.warn(
          "i-Status: Custom color source requires both colors.icon and colors.accent."
        );
        return createNotification(
          normalizedStatus,
          title,
          message,
          "default"
        );
      }
    }
    const element = createNotification(
      normalizedStatus,
      title,
      message,
      normalizedSource
    );
    if (normalizedSource === "custom") {
      element.style.setProperty(
        "--ist-custom-icon",
        colors.icon
      );
      element.style.setProperty(
        "--ist-custom-accent",
        colors.accent
      );
    }
    return element;
  }
  function createNotification(status, title, message, colorSource) {
    const notification2 = document.createElement(
      "div"
    );
    notification2.className = [
      "ist-notification",
      `ist-notification--${status}`,
      `ist-notification--source-${colorSource}`
    ].join(" ");
    const icon = document.createElement(
      "div"
    );
    icon.className = "ist-notification__icon";
    icon.setAttribute(
      "aria-hidden",
      "true"
    );
    icon.textContent = getStatusIcon(status);
    const content = document.createElement(
      "div"
    );
    content.className = "ist-notification__content";
    if (title) {
      const titleElement = document.createElement(
        "div"
      );
      titleElement.className = "ist-notification__title";
      titleElement.textContent = title;
      content.appendChild(
        titleElement
      );
    }
    if (message) {
      const messageElement = document.createElement(
        "div"
      );
      messageElement.className = "ist-notification__message";
      messageElement.textContent = message;
      content.appendChild(
        messageElement
      );
    }
    notification2.appendChild(
      icon
    );
    notification2.appendChild(
      content
    );
    return notification2;
  }
  function getStatusIcon(status) {
    const icons = {
      success: "\u2713",
      warning: "!",
      error: "X",
      info: "i"
    };
    return icons[status];
  }

  // src/stepper.js
  function stepper(options = {}) {
    const {
      steps = [],
      current = 0,
      orientation = "horizontal"
    } = options;
    if (!Array.isArray(steps) || steps.length === 0) {
      console.warn(
        "i-Status: Stepper requires at least one step."
      );
      return null;
    }
    const currentIndex = Math.max(
      0,
      Math.min(
        Number(current) || 0,
        steps.length - 1
      )
    );
    const normalizedOrientation = orientation === "vertical" ? "vertical" : "horizontal";
    const element = document.createElement(
      "div"
    );
    element.className = [
      "ist-stepper",
      `ist-stepper--${normalizedOrientation}`
    ].join(" ");
    element.setAttribute(
      "role",
      "list"
    );
    steps.forEach(
      (step, index) => {
        const status = getStepStatus(
          index,
          currentIndex
        );
        const stepData = parseStepData(
          step,
          index,
          status
        );
        const stepElement = createStep(
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
  function getStepStatus(index, currentIndex) {
    if (index < currentIndex) {
      return "completed";
    }
    if (index === currentIndex) {
      return "current";
    }
    return "pending";
  }
  function parseStepData(step, index, status) {
    const stepNumberLabel = `STEP ${index + 1}`;
    if (typeof step === "string") {
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
  function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function createStep(stepData, index, status) {
    const item = document.createElement(
      "div"
    );
    item.className = [
      "ist-stepper__item",
      `ist-stepper__item--${status}`
    ].join(" ");
    item.setAttribute(
      "role",
      "listitem"
    );
    const indicator = document.createElement(
      "div"
    );
    indicator.className = "ist-stepper__indicator";
    indicator.setAttribute(
      "aria-hidden",
      "true"
    );
    if (status === "completed") {
      indicator.textContent = "\u2713";
    } else if (status === "pending") {
      indicator.textContent = String(index + 1);
    } else {
      indicator.textContent = "";
    }
    const labelContainer = document.createElement(
      "div"
    );
    labelContainer.className = "ist-stepper__labels";
    const stepLabelElement = document.createElement(
      "div"
    );
    stepLabelElement.className = "ist-stepper__step-label";
    stepLabelElement.textContent = stepData.stepLabel;
    const titleElement = document.createElement(
      "div"
    );
    titleElement.className = "ist-stepper__label";
    titleElement.textContent = stepData.title;
    const descElement = document.createElement(
      "div"
    );
    descElement.className = "ist-stepper__description";
    descElement.textContent = stepData.description;
    labelContainer.appendChild(
      stepLabelElement
    );
    labelContainer.appendChild(
      titleElement
    );
    labelContainer.appendChild(
      descElement
    );
    if (status === "current") {
      item.setAttribute(
        "aria-current",
        "step"
      );
    }
    const content = document.createElement(
      "div"
    );
    content.className = "ist-stepper__content";
    content.appendChild(
      indicator
    );
    content.appendChild(
      labelContainer
    );
    const connector = document.createElement(
      "div"
    );
    connector.className = [
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

  // src/progressStepper.js
  function ProgressStepper(options = {}) {
    const {
      steps = [],
      current = 0
    } = options;
    if (!Array.isArray(steps) || steps.length === 0) {
      console.warn(
        "i-Status: Progress bar stepper requires at least one step."
      );
      return null;
    }
    const currentIndex = Math.max(
      0,
      Math.min(
        Number(current) || 0,
        steps.length - 1
      )
    );
    const container = document.createElement("div");
    container.className = "ist-progress-stepper";
    container.setAttribute(
      "role",
      "list"
    );
    steps.forEach((step, index) => {
      const status = getStepStatus2(index, currentIndex);
      const stepElement = createProgressBarStep(step, index, status);
      container.appendChild(stepElement);
    });
    return container;
  }
  function getStepStatus2(index, currentIndex) {
    if (index < currentIndex) {
      return "completed";
    }
    if (index === currentIndex) {
      return "current";
    }
    return "pending";
  }
  function createProgressBarStep(step, index, status) {
    const item = document.createElement("div");
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
    const progressBar = document.createElement("div");
    progressBar.className = "ist-progress-stepper__bar";
    const contentRow = document.createElement("div");
    contentRow.className = "ist-progress-stepper__content";
    const indicator = document.createElement("div");
    indicator.className = "ist-progress-stepper__indicator";
    if (status === "completed") {
      indicator.textContent = "\u2713";
    } else {
      indicator.textContent = String(index + 1);
    }
    const label = document.createElement("div");
    label.className = "ist-progress-stepper__label";
    label.textContent = typeof step === "string" ? step : step?.label || step?.title || `Step ${index + 1}`;
    contentRow.appendChild(indicator);
    contentRow.appendChild(label);
    item.appendChild(progressBar);
    item.appendChild(contentRow);
    return item;
  }

  // src/badge.js
  function badge(options = {}) {
    const {
      status = "success",
      text = "Connected",
      indicator = true
    } = options;
    const badgeElement = document.createElement("div");
    badgeElement.className = [
      "ist-badge",
      `ist-badge--${status}`
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

  // src/progressCard.js
  function progressCard(options = {}) {
    const {
      total = 4,
      completed = 3,
      label = "Progress",
      status = "success"
    } = options;
    const validTotal = Math.max(1, total);
    const validCompleted = Math.max(0, Math.min(completed, validTotal));
    const percentage = Math.round(validCompleted / validTotal * 100);
    const cardElement = document.createElement("div");
    cardElement.className = [
      "ist-progress-card",
      `ist-progress-card--${status}`
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

  // src/radialProgressCard.js
  function radialProgressCard(options = {}) {
    const {
      total = 36,
      completed = 14,
      label = "Progress",
      status = "success"
    } = options;
    const validTotal = Math.max(1, total);
    const validCompleted = Math.max(0, Math.min(completed, validTotal));
    const percentage = Math.round(validCompleted / validTotal * 100);
    const cardElement = document.createElement("div");
    cardElement.className = [
      "ist-radial-card",
      `ist-radial-card--${status}`
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
    for (let i = 0; i < validTotal; i++) {
      const angle = i * 360 / validTotal - 90;
      const rad = angle * Math.PI / 180;
      const x1 = cx + innerRadius * Math.cos(rad);
      const y1 = cy + innerRadius * Math.sin(rad);
      const x2 = cx + outerRadius * Math.cos(rad);
      const y2 = cy + outerRadius * Math.sin(rad);
      const line = document.createElementNS(svgNS, "line");
      line.setAttribute("x1", x1);
      line.setAttribute("y1", y1);
      line.setAttribute("x2", x2);
      line.setAttribute("y2", y2);
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

  // themes/default.js
  var defaultTheme = {
    name: "default",
    /* Colors */
    colors: {
      /* Base */
      text: "#ffffff",
      textMuted: "#b3b3b3",
      background: "#111111",
      /* Semantic */
      success: "#35D07F",
      warning: "#F5C542",
      error: "#FF5C5C",
      info: "#5CA8FF",
      /* Semantic borders */
      successBorder: "#BFEED3",
      warningBorder: "#F2DEA0",
      errorBorder: "#F5C4C4",
      infoBorder: "#C6DDF8",
      /* Semantic surfaces */
      successSurface: "#F0FBF5",
      warningSurface: "#FFF9E8",
      errorSurface: "#FFF2F2",
      infoSurface: "#F1F7FF",
      /* Strong surfaces */
      successSurfaceStrong: "#DDF7E9",
      warningSurfaceStrong: "#FFF1C7",
      errorSurfaceStrong: "#FFE0E0",
      infoSurfaceStrong: "#DCEEFF",
      /* Stepper */
      stepCompleted: "#f8f9fa",
      stepCompletedSurface: "#111111",
      stepCurrent: "#111111",
      stepCurrentSurface: "#111111",
      stepUpcoming: "#f8f9fa",
      stepUpcomingSurface: "#bdbbb0",
      stepConnector: "#bdbbb0",
      stepCompletedHover: "#edede9",
      stepUpcomingHover: "#edede9",
      /*  Progress Stepper  */
      progressCompleted: "#f8f9fa",
      progressCompletedSurface: "#111111",
      progressCurrent: "#111111",
      progressCurrentSurface: "#111111",
      progressUpcoming: "#bdbbb0",
      progressConnector: "#bdbbb0",
      /*  Badge  */
      badgeText: "#ffffff",
      badgeSuccessColor: "#35D07F",
      badgeSuccessBg: "#111111",
      badgeSuccessBorder: "#376B45",
      badgeWarningColor: "#F5C542",
      badgeWarningBg: "#111111",
      badgeWarningBorder: "#765F00",
      badgeErrorColor: "#FF5C5C",
      badgeErrorBg: "#111111",
      badgeErrorBorder: "#79351F",
      badgeInfoColor: "#5CA8FF",
      badgeInfoBg: "#111111",
      badgeInfoBorder: "#023E8A",
      /*  Progress Card  */
      progressCardText: "#ffffff",
      progressCardSuccessColor: "#35D07F",
      progressCardSuccessBorder: "#376B45",
      progressCardWarningColor: "#F5C542",
      progressCardWarningBorder: "#765F00",
      progressCardErrorColor: "#FF5C5C",
      progressCardErrorBorder: "#79351F",
      progressCardInfoColor: "#5CA8FF",
      progressCardInfoBorder: "#023E8A",
      progressCardPendingTrack: "#2A2A2A",
      progressCardBg: "#161616",
      /*  Radial Progress Card  */
      radialCardText: "#ffffff",
      radialCardSuccessColor: "#35D07F",
      radialCardSuccessBorder: "transparent",
      radialCardWarningColor: "#F5C542",
      radialCardWarningBorder: "transparent",
      radialCardErrorColor: "#FF5C5C",
      radialCardErrorBorder: "transparent",
      radialCardInfoColor: "#5CA8FF",
      radialCardInfoBorder: "transparent",
      radialCardTrack: "#2A2A2A",
      radialCardBg: "#161616"
    },
    /* Typography */
    typography: {
      fontPrimary: "Manrope, sans-serif",
      fontReadable: "Atkinson Hyperlegible, sans-serif"
    },
    /* Shadows */
    shadows: {
      sm: "0 2px 8px rgba(0, 0, 0, 0.06)"
    }
  };
  var default_default = defaultTheme;

  // themes/midnight.js
  var midnightTheme = {
    name: "midnight",
    /* Colors */
    colors: {
      /* Base */
      text: "#F5F7FA",
      textMuted: "#A9B4C2",
      background: "#000814",
      /* Semantic */
      success: "#7AE582",
      warning: "#FFC300",
      error: "#D81159",
      info: "#A2D6F9",
      /* Semantic borders */
      successBorder: "#376B45",
      warningBorder: "#765F00",
      errorBorder: "#79351F",
      infoBorder: "#023e8a",
      /* Semantic surfaces */
      successSurface: "#071B12",
      warningSurface: "#1C1700",
      errorSurface: "#1D0D07",
      infoSurface: "#1C0710",
      /* Strong surfaces */
      successSurfaceStrong: "#102F1B",
      warningSurfaceStrong: "#302600",
      errorSurfaceStrong: "#32160C",
      infoSurfaceStrong: "#310D1D",
      /* surfaces */
      surface: "#001D3D",
      surfaceElevated: "#003566",
      /* Stepper */
      stepCompleted: "#f8f9fa",
      stepCompletedSurface: "#000814",
      stepCurrent: "#000814",
      stepCurrentSurface: "#000814",
      stepUpcoming: "#f8f9fa",
      stepUpcomingSurface: "#9a8c98",
      stepConnector: "#9a8c98",
      stepCompletedHover: "#edede9",
      stepUpcomingHover: "#edede9",
      /*  Progress Stepper  */
      progressCompleted: "#f8f9fa",
      progressCompletedSurface: "#000814",
      progressCurrent: "#000814",
      progressCurrentSurface: "#000814",
      progressUpcoming: "#9a8c98",
      progressConnector: "#9a8c98",
      /*  Badge  */
      badgeText: "#F5F7FA",
      badgeSuccessColor: "#7AE582",
      badgeSuccessBg: "#000814",
      badgeSuccessBorder: "#376B45",
      badgeWarningColor: "#FFC300",
      badgeWarningBg: "#000814",
      badgeWarningBorder: "#765F00",
      badgeErrorColor: "#D81159",
      badgeErrorBg: "#000814",
      badgeErrorBorder: "#79351F",
      badgeInfoColor: "#A2D6F9",
      badgeInfoBg: "#000814",
      badgeInfoBorder: "#023E8A",
      /*  Progress Card  */
      progressCardText: "#F5F7FA",
      progressCardSuccessColor: "#7AE582",
      progressCardSuccessBorder: "#376B45",
      progressCardWarningColor: "#FFC300",
      progressCardWarningBorder: "#765F00",
      progressCardErrorColor: "#D81159",
      progressCardErrorBorder: "#79351F",
      progressCardInfoColor: "#A2D6F9",
      progressCardInfoBorder: "#023E8A",
      progressCardPendingTrack: "#1C2536",
      progressCardBg: "#161616",
      /*  Radial Progress Card  */
      radialCardText: "#F5F7FA",
      radialCardSuccessColor: "#7AE582",
      radialCardSuccessBorder: "transparent",
      radialCardWarningColor: "#FFC300",
      radialCardWarningBorder: "transparent",
      radialCardErrorColor: "#D81159",
      radialCardErrorBorder: "transparent",
      radialCardInfoColor: "#A2D6F9",
      radialCardInfoBorder: "transparent",
      radialCardTrack: "#1C2536",
      radialCardBg: "#161616"
    },
    /* Typography */
    typography: {
      fontPrimary: "Manrope, sans-serif",
      fontReadable: "Atkinson Hyperlegible, sans-serif"
    },
    /* Shadows */
    shadows: {
      sm: "0 2px 8px rgba(0, 0, 0, 0.35)"
    }
  };
  var midnight_default = midnightTheme;

  // themes/sunrise.js
  var sunriseTheme = {
    name: "sunrise",
    colors: {
      /* Base */
      text: "#3D3833",
      textMuted: "#7D756D",
      background: "#FFFCF7",
      /* Status */
      success: "#5F8D72",
      warning: "#D39A32",
      error: "#C96B55",
      info: "#5D8190",
      /* Borders */
      successBorder: "#C7DCCF",
      warningBorder: "#EBD9AD",
      errorBorder: "#E8C4BB",
      infoBorder: "#C8D9DE",
      /* Surfaces */
      successSurface: "#F3F8F4",
      warningSurface: "#FFFAEF",
      errorSurface: "#FFF5F2",
      infoSurface: "#F3F8FA",
      /* Strong Surfaces */
      successSurfaceStrong: "#E3EFE7",
      warningSurfaceStrong: "#F8EDCE",
      errorSurfaceStrong: "#F5DDD7",
      infoSurfaceStrong: "#DFECEF",
      /* Stepper */
      stepCompleted: "#f8f9fa",
      stepCompletedSurface: "#9e2a2b",
      stepCurrent: "#9e2a2b",
      stepCurrentSurface: "#9e2a2b",
      stepUpcoming: "#f8f9fa",
      stepUpcomingSurface: "#bcabae",
      stepConnector: "#bcabae",
      stepCompletedHover: "#edede9",
      stepUpcomingHover: "#edede9",
      /*  Progress Stepper  */
      progressCompleted: "#f8f9fa",
      progressCompletedSurface: "#9e2a2b",
      progressCurrent: "#9e2a2b",
      progressCurrentSurface: "#9e2a2b",
      progressUpcoming: "#bcabae",
      progressConnector: "#bcabae",
      /*  Badge  */
      badgeText: "#3D3833",
      badgeSuccessColor: "#5F8D72",
      badgeSuccessBg: "#FFFCF7",
      badgeSuccessBorder: "#C7DCCF",
      badgeWarningColor: "#D39A32",
      badgeWarningBg: "#FFFCF7",
      badgeWarningBorder: "#EBD9AD",
      badgeErrorColor: "#C96B55",
      badgeErrorBg: "#FFFCF7",
      badgeErrorBorder: "#E8C4BB",
      badgeInfoColor: "#5D8190",
      badgeInfoBg: "#FFFCF7",
      badgeInfoBorder: "#C8D9DE",
      /*  Progress Card  */
      progressCardText: "#3D3833",
      progressCardSuccessColor: "#5F8D72",
      progressCardSuccessBorder: "#C7DCCF",
      progressCardWarningColor: "#D39A32",
      progressCardWarningBorder: "#EBD9AD",
      progressCardErrorColor: "#C96B55",
      progressCardErrorBorder: "#E8C4BB",
      progressCardInfoColor: "#5D8190",
      progressCardInfoBorder: "#C8D9DE",
      progressCardPendingTrack: "#EFEAE1",
      progressCardBg: "#FFFCF7",
      /*  Radial Progress Card  */
      radialCardText: "#3D3833",
      radialCardSuccessColor: "#5F8D72",
      radialCardSuccessBorder: "transparent",
      radialCardWarningColor: "#D39A32",
      radialCardWarningBorder: "transparent",
      radialCardErrorColor: "#C96B55",
      radialCardErrorBorder: "transparent",
      radialCardInfoColor: "#5D8190",
      radialCardInfoBorder: "transparent",
      radialCardTrack: "#EFEAE1",
      radialCardBg: "#FFFCF7"
    },
    /* Typography */
    typography: {
      fontPrimary: "Manrope, sans-serif",
      fontReadable: "Atkinson Hyperlegible, sans-serif"
    },
    /* Shadows */
    shadows: {
      sm: "0 2px 8px rgba(90, 70, 50, 0.08)"
    }
  };
  var sunrise_default = sunriseTheme;

  // themes/sunset.js
  var sunsetTheme = {
    name: "sunset",
    /*  Colors */
    colors: {
      /* Base */
      text: "#F3EEE8",
      textMuted: "#B8AEA5",
      background: "#111827",
      /* Semantic Colors */
      success: "#22C55E",
      warning: "#FF6B2B",
      error: "#F87171",
      info: "#99F6E4",
      /* Borders */
      successBorder: "#166534",
      warningBorder: "#9A3412",
      errorBorder: "#991B1B",
      infoBorder: "#0F766E",
      /* Surfaces */
      successSurface: "#142B20",
      warningSurface: "#2B1D17",
      errorSurface: "#2B191B",
      infoSurface: "#142629",
      /* Strong Surfaces */
      successSurfaceStrong: "#1A402A",
      warningSurfaceStrong: "#422419",
      errorSurfaceStrong: "#451F23",
      infoSurfaceStrong: "#1B3538",
      /* Stepper */
      stepCompleted: "#f8f9fa",
      stepCompletedSurface: "#111827",
      stepCurrent: "#111827",
      stepCurrentSurface: "#111827",
      stepUpcoming: "#f8f9fa",
      stepUpcomingSurface: "#f4a261",
      stepConnector: "#f4a261",
      stepCompletedHover: "#edede9",
      stepUpcomingHover: "#edede9",
      /* Progress Stepper */
      progressCompleted: "#f8f9fa",
      progressCompletedSurface: "#111827",
      progressCurrent: "#111827",
      progressCurrentSurface: "#111827",
      progressUpcoming: "#f4a261",
      progressConnector: "#f4a261",
      /*  Badge  */
      badgeText: "#F5F7FA",
      badgeSuccessColor: "#22C55E",
      badgeSuccessBg: "#111827",
      badgeSuccessBorder: "#166534",
      badgeWarningColor: "#FF6B2B",
      badgeWarningBg: "#111827",
      badgeWarningBorder: "#9A3412",
      badgeErrorColor: "#F87171",
      badgeErrorBg: "#111827",
      badgeErrorBorder: "#991B1B",
      badgeInfoColor: "#99F6E4",
      badgeInfoBg: "#111827",
      badgeInfoBorder: "#0F766E",
      /*  Progress Card  */
      progressCardText: "#F5F7FA",
      progressCardSuccessColor: "#22C55E",
      progressCardSuccessBorder: "#166534",
      progressCardWarningColor: "#FF6B2B",
      progressCardWarningBorder: "#9A3412",
      progressCardErrorColor: "#F87171",
      progressCardErrorBorder: "#991B1B",
      progressCardInfoColor: "#99F6E4",
      progressCardInfoBorder: "#0F766E",
      progressCardPendingTrack: "#1F2937",
      progressCardBg: "#111827",
      /*  Radial Progress Card  */
      radialCardText: "#F5F7FA",
      radialCardSuccessColor: "#22C55E",
      radialCardSuccessBorder: "transparent",
      radialCardWarningColor: "#FF6B2B",
      radialCardWarningBorder: "transparent",
      radialCardErrorColor: "#F87171",
      radialCardErrorBorder: "transparent",
      radialCardInfoColor: "#99F6E4",
      radialCardInfoBorder: "transparent",
      radialCardTrack: "#1F2937",
      radialCardBg: "#111827"
    },
    /* Typography */
    typography: {
      fontPrimary: "Manrope, sans-serif",
      fontReadable: "Atkinson Hyperlegible, sans-serif"
    },
    /*  Shadows */
    shadows: {
      sm: "0 2px 8px rgba(0, 0, 0, 0.30)"
    }
  };
  var sunset_default = sunsetTheme;

  // themes/vintage.js
  var vintageTheme = {
    name: "vintage",
    /* Colors */
    colors: {
      /* Base */
      text: "#3F3025",
      textMuted: "#705C4A",
      background: "#FFF7E8",
      /* Semantic Colors */
      success: "#3F7475",
      warning: "#C7922E",
      error: "#B95743",
      info: "#8064A2",
      /* Borders */
      successBorder: "#A8C8C5",
      warningBorder: "#E3C990",
      errorBorder: "#DDB1A7",
      infoBorder: "#C8B9D8",
      /* Surfaces */
      successSurface: "#ECF5F4",
      warningSurface: "#FFF6E1",
      errorSurface: "#FBEDEA",
      infoSurface: "#F4EFF8",
      /* Strong Surfaces */
      successSurfaceStrong: "#D6E8E6",
      warningSurfaceStrong: "#F3E0B4",
      errorSurfaceStrong: "#EFCFC7",
      infoSurfaceStrong: "#E5DCEF",
      /*  Stepper Tradicional  */
      stepCompleted: "#f8f9fa",
      stepCompletedSurface: "#4f000b",
      stepCurrent: "#4f000b",
      stepCurrentSurface: "#4f000b",
      stepUpcoming: "#bc8a5f",
      stepUpcomingSurface: "#bc8a5f",
      stepConnector: "#bc8a5f",
      stepCompletedHover: "#edede9",
      stepUpcomingHover: "#edede9",
      /* Progress Stepper */
      progressCompleted: "#f8f9fa",
      progressCompletedSurface: "#4f000b",
      progressCurrent: "#4f000b",
      progressCurrentSurface: "#4f000b",
      progressUpcoming: "#bc8a5f",
      progressConnector: "#bc8a5f",
      /*  Badge  */
      badgeText: "#3F3025",
      badgeSuccessColor: "#3F7475",
      badgeSuccessBg: "#FFF7E8",
      badgeSuccessBorder: "#A8C8C5",
      badgeWarningColor: "#C7922E",
      badgeWarningBg: "#FFF7E8",
      badgeWarningBorder: "#E3C990",
      badgeErrorColor: "#B95743",
      badgeErrorBg: "#FFF7E8",
      badgeErrorBorder: "#DDB1A7",
      badgeInfoColor: "#8064A2",
      badgeInfoBg: "#FFF7E8",
      badgeInfoBorder: "#C8B9D8",
      /* Progress Card  */
      progressCardText: "#3F3025",
      progressCardSuccessColor: "#3F7475",
      progressCardSuccessBorder: "#A8C8C5",
      progressCardWarningColor: "#C7922E",
      progressCardWarningBorder: "#E3C990",
      progressCardErrorColor: "#B95743",
      progressCardErrorBorder: "#DDB1A7",
      progressCardInfoColor: "#8064A2",
      progressCardInfoBorder: "#C8B9D8",
      progressCardPendingTrack: "#EFE2CD",
      progressCardBg: "#FFF7E8",
      /*  Radial Progress Card  */
      radialCardText: "#3F3025",
      radialCardSuccessColor: "#3F7475",
      radialCardSuccessBorder: "transparent",
      radialCardWarningColor: "#C7922E",
      radialCardWarningBorder: "transparent",
      radialCardErrorColor: "#B95743",
      radialCardErrorBorder: "transparent",
      radialCardInfoColor: "#8064A2",
      radialCardInfoBorder: "transparent",
      radialCardTrack: "#EFE2CD",
      radialCardBg: "#FFF7E8"
    },
    /* Typography */
    typography: {
      fontPrimary: "Manrope, sans-serif",
      fontReadable: "Atkinson Hyperlegible, sans-serif"
    },
    /* Shadows */
    shadows: {
      sm: "0 2px 8px rgba(73, 55, 42, 0.12)"
    }
  };
  var vintage_default = vintageTheme;

  // src/theme.js
  var themes = {
    default: default_default,
    midnight: midnight_default,
    sunrise: sunrise_default,
    sunset: sunset_default,
    vintage: vintage_default
  };
  var activeTheme = default_default;
  function toCssName(prefix, name) {
    const normalizedName = name.replace(
      /([A-Z])/g,
      "-$1"
    ).toLowerCase();
    if (prefix) {
      return `--ist-${prefix}-${normalizedName}`;
    }
    return `--ist-${normalizedName}`;
  }
  function applyTheme(themeObject) {
    if (!themeObject) {
      return;
    }
    const root = document.documentElement;
    if (themeObject.colors) {
      Object.entries(
        themeObject.colors
      ).forEach(
        ([name, value]) => {
          const cssName = toCssName(
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
    if (themeObject.typography) {
      Object.entries(
        themeObject.typography
      ).forEach(
        ([name, value]) => {
          const cssName = toCssName(
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
    if (themeObject.shadows) {
      Object.entries(
        themeObject.shadows
      ).forEach(
        ([name, value]) => {
          const cssName = toCssName(
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
    activeTheme = themeObject;
  }
  applyTheme(
    themes.default
  );
  function theme(name) {
    const selectedTheme = themes[name];
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
  function registerTheme(name, themeObject) {
    if (!name || !themeObject) {
      return;
    }
    themes[name] = themeObject;
  }
  function getTheme(name) {
    return themes[name];
  }
  function getThemes() {
    return Object.keys(
      themes
    );
  }
  return __toCommonJS(index_exports);
})();
