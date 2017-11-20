import _ from 'lodash';
import apiRequest from './apiRequest';

class ApiAgent {
    constructor(base) {
        this.base = base;
    }

    request(path, params) {
        const { base } = this;
        return apiRequest(
            _.defaults({
                credentials: 'same-origin',
                base,
                path,
            }, params),
        );
    }

    get(path, options) {
        return this.request(path, _.defaults(
            options,
            {
                method: 'GET',
            },
        ));
    }

    post(path, data, options) {
        return this.request(path, _.defaults(
            {
                method: 'POST',
                body: data,
            },
            options,
        ));
    }

    put(path, data, options) {
        return this.request(path, _.defaults(
            options,
            {
                method: 'PUT',
                body: data,
            },
        ));
    }

    patch(path, data, options) {
        return this.request(path, _.defaults(
            options,
            {
                method: 'PATCH',
                body: data,
            },
        ));
    }

    delete(path, options) {
        return this.request(path, _.defaults(
            options,
            {
                method: 'DELETE',
            },
        ));
    }
}

export {
    ApiAgent,
};

export default ApiAgent;
