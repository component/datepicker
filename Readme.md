# datepicker

A date picker UI component built on component/calendar. Forked from component/datepicker.

![screen shot 2013-06-17 at 13 31 47](https://f.cloud.github.com/assets/574696/661644/4593118a-d739-11e2-9bdf-4b91b99b8a38.png)

## Install

```
$ component install redbadger/datepicker
```

## Example

``` javascript
var Datepicker = require('datepicker');

var picker = Datepicker(document.getElementById('date'))

picker.value(new Date());
picker.value() // => currently selected date as a Date instance

```

## License

  MIT
