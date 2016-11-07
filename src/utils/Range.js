export default
class Range {

  private _value: 0,
  private _minimum: 0,
  private _maximum: 100,
  private _stepSize: 0.5,
  private _snapInterval: 1.0

  static defaultProps = {
    value: 0,
    minimum: 0,
    maximum: 100,
    stepSize: 0.5,
    snapInterval: 1.0
  }

  constructor(props) {
    super(props);
    this.state = {
      value: props._value,
      minimum: props._minimum,
      maximum: props._maximum,
      stepSize: props._stepSize,
      snapInterval: props._snapInterval
    }
  }

  nearestValidValue(value, interval) {
    if (isNaN(value))
      value = 0;

    if (interval == 0)
      return Math.max(this.props._minimum, Math.min(this.props._maximum, value));

    var maxValue:Number = this.props._maximum - this.props._minimum;
    var scale:Number = 1;
    var offset:Number = this.props._minimum; // the offset from 0.

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
      const parts:Array = (new String(1 + interval)).split(".");
      scale = Math.pow(10, parts[1].length);
      maxValue *= scale;
      offset *= scale;
      interval = Math.round(interval * scale);
      value = Math.round((value * scale) - offset);
    }
    else {
      value -= offset;
    }

    var lower:Number = Math.max(0, Math.floor(value / interval) * interval);
    var upper:Number = Math.min(maxValue, Math.floor((value + interval) / interval) * interval);
    var validValue:Number = ((value - lower) >= ((upper - lower) / 2)) ? upper : lower;

    return (validValue + offset) / scale;
  }

  setValue(value) {
    if (!isNaN(this.props._maximum) && !isNaN(this.props._minimum) && (this.props._maximum > this.props._minimum))
      return Math.min(this.props._maximum, Math.max(this.props._minimum, value));
    else
      return value;
  }

  nearestValidSize(size) {
    var interval:Number = this.props._snapInterval;
    if (interval == 0)
      return size;

    var validSize:Number = Math.round(size / interval) * interval
    return (Math.abs(validSize) < interval) ? interval : validSize;
  }

  public get value():public

  set value(value):void {
    _value = value;
  }

  public get minimum():public

  set minimum(value):void {
    _minimum = value;
  }

  public get maximum():public

  set maximum(value):void {
    _maximum = value;
  }

  public get stepSize():public

  set stepSize(value):void {
    _stepSize = value;
  }

  public get snapInterval():public

  set snapInterval(value):void {
    _snapInterval = value;
  }
}
