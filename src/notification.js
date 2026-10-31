/* 
   I-STATUS
   Notification
    */

export function notification(
    options = {}
) {

    const {

        status = "info",

        title = "",

        message = "",

        size = "md",

        colorSource = "default",

        colors = {}

    } = options;


    /* 
       Validate status
        */

    const validStatuses = [
        "success",
        "warning",
        "error",
        "info"
    ];


    const normalizedStatus =
        validStatuses.includes(status)
            ? status
            : "info";


    /* 
       Validate color source
        */

    const validSources = [
        "default",
        "theme",
        "custom"
    ];


    const normalizedSource =
        validSources.includes(colorSource)
            ? colorSource
            : "default";


    /* 
       Custom validation
        */

    if (
        normalizedSource === "custom"
    ) {

        if (
            !colors.icon ||
            !colors.accent
        ) {

            console.warn(
                "i-Status: Custom color source requires both colors.icon and colors.accent."
            );

            return createNotification(
                normalizedStatus,
                title,
                message,
                "default",
                size
            );

        }

    }


    /* 
       Create notification
        */

    const element =
        createNotification(
            normalizedStatus,
            title,
            message,
            normalizedSource,
            size
        );


    /* 
       Apply custom colors
        */

    if (
        normalizedSource === "custom"
    ) {

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


/* 
   Create Notification
    */

function createNotification(
    status,
    title,
    message,
    colorSource,
    size = "md"
) {

    const notification =
        document.createElement(
            "div"
        );


    notification.className =
        [
            "ist-notification",
            `ist-notification--${status}`,
            `ist-notification--source-${colorSource}`,
            `ist-notification--${size}`
        ].join(" ");


    /* 
       Icon
        */

    const icon =
        document.createElement(
            "div"
        );


    icon.className =
        "ist-notification__icon";


    icon.setAttribute(
        "aria-hidden",
        "true"
    );


    icon.textContent =
        getStatusIcon(status);


    /* 
       Content
        */

    const content =
        document.createElement(
            "div"
        );


    content.className =
        "ist-notification__content";


    /* 
       Title
        */

    if (title) {

        const titleElement =
            document.createElement(
                "div"
            );


        titleElement.className =
            "ist-notification__title";


        titleElement.textContent =
            title;


        content.appendChild(
            titleElement
        );

    }


    /* 
       Message
        */

    if (message) {

        const messageElement =
            document.createElement(
                "div"
            );


        messageElement.className =
            "ist-notification__message";


        messageElement.textContent =
            message;


        content.appendChild(
            messageElement
        );

    }


    /* 
       Assemble
        */

    notification.appendChild(
        icon
    );

    notification.appendChild(
        content
    );


    return notification;

}


/* 
   Status Icons
    */

function getStatusIcon(
    status
) {

    const icons = {

        success: "✓",

        warning: "!",

        error: "X",

        info: "i"

    };


    return icons[status];

}