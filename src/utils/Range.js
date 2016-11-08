export default class Range {

  _value = 0;
  _minimum = 0;
  _maximum = 100;
  _stepSize = 1;
  _snapInterval = 1;

  constructor(props) {
    Object.assign(this, props)
  }

  nearestValidValue(value, interval) {
    if (isNaN(value))
      value = 0;

    if (interval == 0)
      return Math.max(this._minimum, Math.min(this._maximum, value));

    var maxValue = this._maximum - this._minimum;
    var scale = 1;
    var offset = this._minimum; // the offset from 0.

    // If interval isn't an integer, there's a possibility that the floating point
    // approximation of value or value/interval will be slightly larger or smaller
    // than the real value.  This can lead to errors in calculations like
    // floor(value/interval)*interval, which one might expect to just equal value,
    // when value is an exact multiple of interval.  Not so if value=0.58 and
    // interval=0.01, in that case the calculation yields 0.57!  To avoid problems,
    // we scale by the implicit precision of the interval and then round.  For
    // example if interval=0.01, then we scale by 100.

    if (interval != Math.round(interval)) {
      // calculate scale and compute new scaled values.
      const parts = (new String(1 + interval)).split(".");
      scale = Math.pow(10, parts[1].length);
      maxValue *= scale;
      offset *= scale;
      interval = Math.round(interval * scale);
      value = Math.round((value * scale) - offset);
    }
    else {
      value -= offset;
    }

    var lower = Math.max(0, Math.floor(value / interval) * interval);
    var upper = Math.min(maxValue, Math.floor((value + interval) / interval) * interval);
    var validValue = ((value - lower) >= ((upper - lower) / 2)) ? upper : lower;

    return (validValue + offset) / scale;
  }

  setValue(value) {
    if (!isNaN(this._maximum) && !isNaN(this._minimum) && (this._maximum > this._minimum))
      return Math.min(this._maximum, Math.max(this._minimum, value));
    else
      return value;
  }

  nearestValidSize(size) {
    var interval = this._snapInterval;
    if (interval == 0)
      return size;

    var validSize = Math.round(size / interval) * interval
    return (Math.abs(validSize) < interval) ? interval : validSize;
  }


  get snapInterval() {
    return this._snapInterval;
  }

  set snapInterval(value) {
    this._snapInterval = value;
  }

  get stepSize() {
    return this._stepSize;
  }

  set stepSize(value) {
    this._stepSize = value;
  }

  get maximum() {
    return this._maximum;
  }

  set maximum(value) {
    this._maximum = value;
  }

  get minimum() {
    return this._minimum;
  }

  set minimum(value) {
    this._minimum = value;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }
}
