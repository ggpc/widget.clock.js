# widget.clock.js
Clock widget. Supports different time formats. Has own controller.

# Dependency
[ggpc/system.date.js](https://github.com/ggpc/system.date.js) - date utility. Using for date formatting

# Methods

clock(parameters);

# Usage

```javascript
var myc = new clock('body');
```

## Parameters
There're available several type of parameter

>- 1. {container: HTMLElement, activate: false}
- 2. document.getElementById('my-w')
- 3. '#my-w'
- 4. 'body>div'

If You skip parameter, then append container property manually to your target.

```javascript
var myc = new clock();
document.body.appendChild(myc.container);
```
