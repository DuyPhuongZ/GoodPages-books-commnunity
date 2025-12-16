import winston, { format } from "winston";


const logger = winston.createLogger({
    level: "info",
    format: format.combine(
        format.timestamp({ format: "HH:mm:ss" }),
        format.errors({ stack: true }),
        format.printf(({ timestamp, level, message, stack, service, ...userMeta }) => {
            const metaString = userMeta && Object.keys(userMeta).length > 0 ? `${JSON.stringify(userMeta)}` : "";
            return `${timestamp} [${level}] >>> ${stack || message} ${metaString}`
        })
    ),
    defaultMeta: {
        service: "user-service"
    },
    transports: [
        new winston.transports.Console()
    ]
});

export default logger;