
# **i-Status**

i-Status is an open-source JavaScript UI library with reusable components for status, progress, tracking, and notifications. It helps make process states easy to understand at a glance and simplifies development.

## **Usage**

You can use i-Status in two ways.

### **Option 1: Using npm (ESM)**

Install i-Status:

```bash
npm i i-status-ui
```

Import the library and its styles in your JavaScript / TypeScript module:

```javascript
import * as iStatus from "i-status-ui";
import "i-status-ui/styles.css";
import "i-status-ui/tokens.css";

iStatus.theme("midnight");

const element = iStatus.notification({
    status: "success",
    title: "Notification title.",
    message: "Notification message goes here.",
    colorSource: "theme",
    size: "md"
});

document.getElementById("app").appendChild(element);
```

### **Option 2: Using HTML (CDN)**

You can also use i-Status directly in an HTML page without importing it through a JavaScript module.

Include the styles and browser bundle via CDN:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/i-status-ui@0.1.2/styles/i-Status.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/i-status-ui@0.1.2/styles/tokens.css">
<script src="https://cdn.jsdelivr.net/npm/i-status-ui@0.1.2/dist/i-status.min.js"></script>
```

Then use the library through the global `iStatus` object:

```html
<script>
    iStatus.theme("midnight");

    const element = iStatus.notification({
        status: "success",
        title: "Notification title.",
        message: "Notification message goes here.",
        colorSource: "theme",
        size: "md"
    });

    document.getElementById("app").appendChild(element);
</script>
```

## **License**

i-Status is an open-source library released under the Apache License 2.0.
