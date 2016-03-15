# widget.clock.js
Clock widget. Supports different time formats. Has own controller.

# Dependency
[ggpc/system.date.js](https://github.com/ggpc/system.date.js) - date utility. Using for date formatting

# Methods

clock(parameters);

## Clock object Methods and Properties
### Properties
- updateIntervalPeriod: 1, // in seconds
- format: '%D, %H:%i:%s',  
- active: false,
- lang: 'en' // en by default. Support all languages from system.date.js library

### Methods
- start()
- stop()

>Use [ggpc/system.date.js](https://github.com/ggpc/system.date.js) syntax to change date format

# Usage

```javascript
var myc = new clock('body');
```

## Parameters
There're available several types of parameter

>- 1. {container: HTMLElement, activate: false}
- 2. document.getElementById('my-w')
- 3. '#my-w'
- 4. 'body>div'

If You skip parameter, then append container property manually to your target.

```javascript
var myc = new clock();
document.body.appendChild(myc.container);
```

# Example
```javascript
var c1 = new clock(document.body);
// same as
var c2 = new clock({target: document.body});
// same as 
var c3 = new clock('body');
// same as
var c4 = new clock();
document.body.appendChild(c4.container);
```

# Live Demo
[live demo](http://gzone.org.ua/files/library/js/widget/Clock/widget.clock.html)
