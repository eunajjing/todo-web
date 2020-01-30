enum Color {
  gray = '58, 58, 58',
  red = '253, 46, 105',
  white = '255, 255, 255, 1',
}

export default {
  fontSize: {},
  colors: {
    white: `rgba(${Color.white})`,
    black: `rgba(${Color.gray}, 1)`,
    gray100: `rgba(${Color.gray}, 0.1)`,
    red100: `rgba(${Color.red}, 0.1)`,
    red1000: `rgba(${Color.red}, 1)`,
  },
}
