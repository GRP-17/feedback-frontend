import moment from 'moment'

/**
 * Calculate and return the text hex color based on a given hex background color
 * see https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
 * @param {string} bgColor background color
 * @param {string} lightColor default: '#ffffff'
 * @param {string} darkColor default: '#000000'
 */
export function calcTextColor(
  bgColor,
  lightColor = '#ffffff',
  darkColor = '#000000'
) {
  var color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor
  var r = parseInt(color.substring(0, 2), 16) // hexToR
  var g = parseInt(color.substring(2, 4), 16) // hexToG
  var b = parseInt(color.substring(4, 6), 16) // hexToB
  return r * 0.299 + g * 0.587 + b * 0.114 > 149 ? darkColor : lightColor
}

/**
 * Get a random hex color
 */
export function getRandomColor() {
  return '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
}

/**
 * Returns the date in format "YYYY/MM/DD HH:mm"
 * @param {string|date|integer} d date
 */
export function formatDate(d) {
  return moment(d).format('YYYY/MM/DD HH:mm')
}
