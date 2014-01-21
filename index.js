/**
 * Module dependencies.
 */

var Calendar = require('calendar')
  , Popover = require('popover')
  , event = require('event')
  , events = require('events')
  , keyname = require('keyname')


/**
 * Expose `Datepicker`.
 */

module.exports = Datepicker;

/**
 * Initialize a new date picker with the given input `el`.
 *
 * @param {Element} el
 * @api public
 */

function Datepicker(el) {
  if (!(this instanceof Datepicker)) return new Datepicker(el);
  this.el = el;
  this.cal = new Calendar;
  this.cal.addClass('datepicker-calendar');

  this.events = events(this.el, this);
  this.events.bind('click', 'onclick');
  this.events.bind('change', 'onchange');
  this.events.bind('keydown', 'onkeydown');

  event.bind(document, 'click', this.hide.bind(this));

  return this;
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
  this.el.value = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  this.el.focus();

  this.hide();

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

  this.cal.on('change', this.value.bind(this));

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



