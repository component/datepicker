# datepicker

A date picker UI component built on component/calendar. Forked from component/datepicker.

![screen shot 2013-06-17 at 13 31 47](https://f.cloud.github.com/assets/574696/661644/4593118a-d739-11e2-9bdf-4b91b99b8a38.png)

## Install

```
$ component install redbadger/datepicker
```

## Features

*  Takes and returns a value of type `Date`
*  Hide on click outside
*  Manual date change support
*  Keyboard interaction
*  Fully configurable date format with custom divider symbols

## Example

``` javascript
var Datepicker = require('datepicker');

var picker = Datepicker(document.getElementById('date'), "DD/MM/YYYY")

picker.value(new Date());
picker.value() // => currently selected date as a Date instance

```

## Custom date format

You can specify the format of the date you expect it to produce. Format is a string, which can be something like this:

*  "DD/MM/YYYY"
*  "YYYY-MM-DD"
*  "mm.dd.yy"

Order of month, day and year will be recognized by the component, divider symbol will also be honored. You can ask for 2 digit year or 4 with "YY" or "YYYY" respectably.

## API

### .value(value)

Get or set current value. `value` argument is optional.

### .show()

Show the date picker popover.

### .hide()

Hide the date picker popover.

## License

  MIT
