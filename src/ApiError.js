import _ from 'lodash';

class ApiError extends Error {
    constructor(message, response) {
        super(message);
        _.map(response, (val, key) => {
            this[key] = val;
        });
    }
}

export {
    ApiError,
};

export default ApiError;
