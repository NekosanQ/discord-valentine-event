import log4js from 'log4js';
import { getWorkdirPath } from './wirkdir';

// loggerを初期化する
log4js.configure({
    appenders: {
        file: {
            type: 'file',
            filename: getWorkdirPath('bot.log')
        },
        console: {
        type: 'console',
        },
    },
    categories: {
        default: {
            appenders: ['file', 'console'],
            level: 'info'
        },
    },
});

/** Logger for log output */
export const logger = log4js.getLogger('app');