const toRGB = (r, g, b) => `rgb(${r}, ${g}, ${b})`
const rgbToHex = x => '#' + x.match(/\d+/g).map(z => ((+z < 16) ? '0' : '') + (+z).toString(16)).join('')

export {
  toRGB,
  rgbToHex
}
