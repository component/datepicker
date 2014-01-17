# datepicker

  Example date picker ui component built on component/calendar.
  
  Not yet feature-rich, just a blog post example.

![screen shot 2013-06-17 at 13 31 47](https://f.cloud.github.com/assets/574696/661644/4593118a-d739-11e2-9bdf-4b91b99b8a38.png)


## Installation

    $ component install component/datepicker

## Example

```javascript

    var datepicker = datepicker( document.getElementById("datepick"), {
        value: new Date(), // initialize it to now
        format: '%B %d, %Y' // format it like: August 28, 2013
    });
    
    // listen for a change event and print out the values we get
    datepicker.on( 'change', function( event ) {
        console.log( 'old value:' + event.previous );
        console.log( 'new value:' + event.value );
        console.log( 'date object: ' + event.date );
    });

    // show our datepicker by hand (by default, it will show when the element it's bound to is clicked)
    datepicker.show();
    
    // or we can hide it by hand
    datepicker.hide();
```

## License

  MIT
