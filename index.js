/**
 * Module dependencies.
 */

var Calendar = require('calendar')
  , Popover = require('popover')
  , event = require('event')
  , strftime = require('strftime')
  , extend = require('extend')
  , Emitter = require('emitter')

/**
 * Defaults
 */

var defaults = {
    format: '%Y/%m/%d',
    bindClick: true
};

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

function Datepicker(el, opts) {
  if (!(this instanceof Datepicker)) return new Datepicker(el, opts);
  Emitter( this );
  this.el = el;
  this.options = extend( {}, defaults, opts );
  this.cal = new Calendar;
  this.cal.el.classList.add('datepicker-calendar');
  if (this.options.bindClick) {
    event.bind(el, 'click', this.onclick.bind(this));
  }
  if (this.options.value) {
    this.onchange(this.options.value);
  }
  return this;
}

/**
 * Show the datepicker.
 */
Datepicker.prototype.show = function(){
  if (this.popover) return;
  this.cal.once('change', this.onchange.bind(this));
  this.popover = new Popover(this.cal.el);
  this.popover.classname = 'datepicker-popover popover';
  this.popover.show(this.el);
}

/**
 * Hide the datepicker.
 */
Datepicker.prototype.hide = function(){
  this.cal.off('change', this.onchange.bind(this));
  if (this.popover) {
    this.popover.remove();
    this.popover = null;
  }
}

/**
 * Handle input clicks.
 */

Datepicker.prototype.onclick = function(e){
  if (this.popover) {
    this.hide();
    return;
  }
  this.show();
};

/**
 * Handle date changes.
 */

Datepicker.prototype.onchange = function(date){
  var previous = this.el.value;
  this.el.value = strftime(this.options.format, date);
  this.cal.select( date );
  this.hide();
  this.emit( 'change', {
    previous: previous,
    value: this.el.value,
    date: date
  });
};

