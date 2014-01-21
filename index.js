/**
 * Module dependencies.
 */

var Calendar = require('calendar')
  , Popover = require('popover')
  , event = require('event')
  , events = require('events')

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

  event.bind(document, 'click', this.hide.bind(this));

  return this;
}

Datepicker.prototype.show = function() {
  if (this.popover) return;
  this.cal.once('change', this.onchange.bind(this));
  this.popover = new Popover(this.cal.el);
  this.popover.classname = 'datepicker-popover popover';
  this.popover.show(this.el);

  event.bind(this.popover.el[0], 'click', function(e) { e.stopPropagation(); return false; });
}

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

/**
 * Handle date changes.
 */

Datepicker.prototype.onchange = function(date){
  this.el.value = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

  this.hide();
};

Datepicker.prototype.textchange = function(e){
  var parts = this.el.value.split("/");
  if(parts.length < 3)
    return this.value(null);

  var date = new Date(parts[2], parts[1] - 1, parts[0]);

  this.value(date);
};

Datepicker.prototype.value = function(date) {
  if(!date) {
    if(!this.el.value.match(/\d{1,2}\/\d{1,2}\/\d{4}/))
      return null;

    var parts = this.el.value.split("/");

    return new Date(parts[2], parts[1] - 1, parts[0]);
  }

  this.cal.select(date);
  this.el.value = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

  return true;
}

