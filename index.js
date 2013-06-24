
/**
 * Module dependencies.
 */

var Calendar = require('calendar')
  , Popover = require('popover')
  , event = require('event')
  , strftime = require('strftime')

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

function Datepicker(el, format) {
  if (!(this instanceof Datepicker)) return new Datepicker(el, format);
  this.el = el;
  if (!format)
    format = '%Y/%m/%d';
  this.format = format;
  this.cal = new Calendar;
  this.cal.el.addClass('datepicker-calendar');
  event.bind(el, 'click', this.onclick.bind(this));
}

/**
 * Handle input clicks.
 */

Datepicker.prototype.onclick = function(e){
  if (this.popover) return;
  this.cal.once('change', this.onchange.bind(this));
  this.popover = new Popover(this.cal.el);
  this.popover.classname = 'datepicker-popover popover';
  this.popover.show(this.el);
};

/**
 * Handle date changes.
 */

Datepicker.prototype.onchange = function(date){
  this.el.value = strftime(this.format, date);

  this.popover.remove();
  this.popover = null;
};

