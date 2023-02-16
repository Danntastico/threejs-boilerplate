
export function handleColorChange(color, converSRGBToLinear = false) {

  return function (value) {

    if (typeof value === 'string') {

      value = value.replace('#', '0x');

    }

    color.setHex(value);

    if (converSRGBToLinear === true) color.convertSRGBToLinear();

  };

}
