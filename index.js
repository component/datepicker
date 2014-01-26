/**
 * Module dependencies.
 */

var Calendar = require('calendar')
  , Popover = require('popover')
  , event = require('event')
  , events = require('events')
  , keyname = require('keyname')
  , Emitter = require('emitter');


/**
 * Expose `Datepicker`.
 */

module.exports = Datepicker;

/**
 * Initialize a new date picker with the given input `el`.
 *
 * @param {Element} el
 * @format String "DD/MM/YYYY", "YYYY/MM/DD", "MM/DD/YYYY"
 * @api public
 */

function Datepicker(el, format) {
  if (!(this instanceof Datepicker)) return new Datepicker(el, format);
  this.el = el;
  this.cal = new Calendar;
  this.cal.addClass('datepicker-calendar');

  this.events = events(this.el, this);
  this.events.bind('click', 'onclick');
  this.events.bind('change', 'onchange');
  this.events.bind('keydown', 'onkeydown');

  this.cal.on('change', this.value.bind(this));

  if (typeof(format) === 'undefined') {
    this.format = "DD/MM/YYYY";
  } else {
    this.format = format;
  }

  this.initDateFormat(this.format);

  event.bind(document, 'click', this.hide.bind(this));

  return this;
}

/**
 * Mixin emitter.
 */

Emitter(Datepicker.prototype);

/**
 * Parsing the format string
 */

Datepicker.prototype.initDateFormat = function(format) {
  var reDay = /DD/i
  , reMonth = /MM/i
  , reYear = /Y/gi
  , reDivider = /[^a-zA-Z0-9]/
  , dayPos = 0
  , monthPos = 0
  , yearPos = 0
  , yearCount = 0
  , divider = ""
  , dateArray = [];

  this.dayPos = format.search(reDay);
  this.monthPos = format.search(reMonth);
  this.yearPos = format.search(reYear);
  this.yearCount = format.match(reYear).length;
  this.divider = format.match(reDivider)[0];
}

Datepicker.prototype.processDate = function(date) {
  var dateArray = []
  , year
  , finalString = ""
  , divider = this.divider;

  if (this.yearCount == 2) {
    year = String(date.getFullYear()).slice(2, 4);
  } else {
    year = date.getFullYear();
  }

  dateArray = [
    { value: date.getDate(), position: this.dayPos },
    { value: (date.getMonth() + 1), position: this.monthPos },
    { value: year, position: this.yearPos }
  ];

  dateArray.sort(function(a, b) {
    if (a.position < b.position)
      return -1;
    if (a.position > b.position)
      return 1;
    return 0;
  });

  dateArray.forEach(function(entry){
    finalString += entry.value + divider;
  });

  // Slicing away the last applied divider
  return finalString.slice(0, -1);
}

/**
 * Get/set value.
 *
 * @param {Date} date (optional)
 * @api public
 */

Datepicker.prototype.value = function(date) {
  if(!date) {
    if(!this.el.value.match(/\d{1,2}\/\d{1,2}\/\d{4}/))
      return null;

    var parts = this.el.value.split("/");

    return new Date(parts[2], parts[1] - 1, parts[0]);
  }

  this.cal.select(date);
  this.el.value = this.processDate(date);

  this.el.focus();

  this.hide();
  this.emit('change', date);

  return true;
}

/**
 * Show popover
 *
 * @api public
 */

Datepicker.prototype.show = function() {
  var ev = new Event('click');
  document.dispatchEvent(ev);

  if (this.popover) return;

  this.popover = new Popover(this.cal.el);
  this.popover.classname = 'datepicker-popover popover';
  this.popover.show(this.el);

  event.bind(this.popover.el[0], 'click', function(e) { e.stopPropagation(); return false; });
}

/**
 * Hide popover
 *
 * @api public
 */

Datepicker.prototype.hide = function() {
  if (!this.popover) return;

  this.popover.remove();
  this.popover = null;
}

/**
 * Handle input clicks.
 */

Datepicker.prototype.onclick = function(e){
  e.stopPropagation();

  this.show();
  return false;
};

Datepicker.prototype.onkeydown = function(e){
  switch (keyname(e.which)) {
    case 'enter':
      e.preventDefault();
      this.onchange(e);

      break;
    case 'esc':
      this.hide();

      break;
    default:
      console.log(keyname(e.which));
  }
};

/**
 * Handle date changes.
 */

Datepicker.prototype.onchange = function(e){
  var parts = this.el.value.split("/");
  if(parts.length < 3)
    return this.value(null);

  var date = new Date(parts[2], parts[1] - 1, parts[0]);

  this.value(date);
};



