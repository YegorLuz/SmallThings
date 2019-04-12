import axios from 'axios';

class HttpError extends Error {
    constructor(args) {
        const { message = 'Unknown HttpError', code, status, statusText, canceled, error } = args;

        super(message);
        this.status = status;
        this.code = code;
        this.statusText = statusText;
        this.canceled = canceled;
        this.error = error;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, HttpError);
        } else {
            this.stack = new Error().stack;
        }
    }
}

export const noCacheHeaders = {
    'Cache-Control': 'no-cache,no-store,must-revalidate,max-age=-1,private',
    Expires: '-1',
    Pragma: 'no-cache',
};

export const createHttpError = (error = {}) => {
    const canceled = axios.isCancel(error);
    const response = error.response || {};
    const data = response.data || {};
    const errorMessage = data.error || {};
    const message = errorMessage.message || response.statusText || (canceled ? 'canceled' : '');

    return new HttpError({
        message,
        error: errorMessage,
        code: errorMessage.code,
        status: response.status,
        statusText: response.statusText,
        canceled,
    });
};
