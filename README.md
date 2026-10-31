
# **i-Status**

i-Status is an open-source JavaScript UI library with reusable components for status, progress, tracking, and notifications. It helps make process states easy to understand at a glance and simplifies development.

## **Usage**

You can use i-Status in two ways.

### **Option 1: Using npm**

Install i-Status:

```bash
npm install i-status-ui
```

Import the library and its styles:

```javascript
import * as iStatus from "i-status-ui";
import "i-status-ui/styles.css";
```

Create a notification:

```javascript
iStatus.theme("midnight");

iStatus.notification({
    status: "warning",
    title: "Shipment delayed",
    message: "The delivery is awaiting carrier confirmation.",
    colorSource: "theme",
    size: "sm"
});
```

### **Option 2: Using HTML**

You can also use i-Status directly in an HTML page without importing it through a JavaScript module.

Add the stylesheet and browser bundle:

```html
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/i-status-ui@0.1.0/styles/i-Status.css"
>

<script src="https://cdn.jsdelivr.net/npm/i-status-ui@0.1.0/dist/i-status.min.js"></script>
```

Then use the library through the global `iStatus` object:

```html
<div id="app"></div>

<script>
    iStatus.theme("midnight");

    const element = iStatus.notification({
        status: "warning",
        title: "Shipment delayed",
        message: "The delivery is awaiting carrier confirmation.",
        colorSource: "theme",
        size: "sm"
    });

    document.getElementById("app").appendChild(element);
</script>
```

## **License**

i-Status is an open-source library released under the Apache License 2.0.
