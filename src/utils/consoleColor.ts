export const Color = {
  Reset: "\x1b[0m",
  Dim: "\x1b[2m",
  Bright: "\x1b[1m",
  Underscore: "\x1b[4m",
  Blink: "\x1b[5m",
  Reverse: "\x1b[7m",
  Hidden: "\x1b[8m",

  FgBlack: "\x1b[30m",
  RED: "\x1b[31m",
  GREEN: "\x1b[32m",
  YELLOW: "\x1b[33m",
  BLUE: "\x1b[34m",
  MAGENTA: "\x1b[35m",
  CYAN: "\x1b[36m",
  WHITE: "\x1b[37m",
  GRAY: "\x1b[90m",

  BgBlack: "\x1b[40m",
  BgRed: "\x1b[41m",
  BgGreen: "\x1b[42m",
  BgYellow: "\x1b[43m",
  BgBlue: "\x1b[44m",
  BgMagenta: "\x1b[45m",
  BgCyan: "\x1b[46m",
  BgWhite: "\x1b[47m",
  BgGray: "\x1b[100m",
};

export const log = (
  message: string | undefined,
  color: string = Color.WHITE
) => {
  console.log(`${color}${message}${Color.Reset}`);
};

export const debug = (
  message: string | undefined,
  color: string = Color.WHITE
) => {
  console.debug(`${color}${message}${Color.Reset}`);
};

export const jlog = (message: object | undefined) => {
  try {
    console.log(JSON.stringify(message, null, 2));
  } catch (e) {
    console.log(message);
  }
};

export const logYellow = (message: string) => {
  log(message, Color.YELLOW);
};

export const warn = (message: string) => {
  console.warn(`${Color.YELLOW}${message}${Color.Reset}`);
};

export const error = (message: string) => {
  console.error(`${Color.RED}${message}${Color.Reset}`);
};

export const success = (message: string) => {
  log(message, Color.GREEN);
};

export const whisper = (message: string) => {
  log(message, Color.Dim);
};
