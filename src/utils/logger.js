import winston from "winston";
import "winston-mongodb";
import config from "../../config.js";

let logger;

const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2, 
    info: 3, 
    http: 4, 
    debug: 5, 
  },
  colors: {
    fatal: "red",
    error: "magenta",
    warning: "yellow",
    info: "green",
    http: "cyan", 
    debug: "blue",
  },
};

if (config.NODE_ENV === "dev") {
  logger = winston.createLogger({
    level: "debug",
    levels: customLevels.levels,
    transports: [new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: "MM-DD-YYYY HH:mm:ss" }),
        winston.format.colorize({
          all: true,
          colors: customLevels.colors,
        }),
        winston.format.printf((info) => `${info.level} | ${[info.timestamp]} | ${info.message}`)
      )
  })],
  });
}

if (config.NODE_ENV === "prod") {
  logger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
      new winston.transports.Console({
        level: "debug",
        format: winston.format.combine(
          winston.format.timestamp({ format: "MM-DD-YYYY HH:mm:ss" }),
          winston.format.colorize({
            all: true,
            colors: customLevels.colors,
          }),
          winston.format.printf((info) => `${info.level} | ${[info.timestamp]} | ${info.message}`)
        )
    }),
      new winston.transports.File({ filename: "./errors.log", level: "error" }),
    ],
  });
}

export { logger };

/*const logConfiguration = {  
  transports: [
    winston.add(
      new winston.transports.MongoDB({
        options: { useUnifiedTopology: true },
        db: config.MONGO_URL,
        collection: "logs",
        tryReconnect: true,
        level: "error",
      })
    ),
    new winston.transports.Console({
      level: "silly",
      format: winston.format.combine(
        winston.format.timestamp({ format: "MM-DD-YYYY HH:mm:ss" }),
        winston.format.colorize(),
        winston.format.printf((info) => `${info.level} | ${[info.timestamp]} | ${info.message}`)
      )
  }),

    new winston.transports.File({
      filename: "./logs.log",
      level: "info",
    }),
  ],
};

export const logger = winston.createLogger(logConfiguration);*/

