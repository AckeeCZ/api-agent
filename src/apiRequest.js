import _ from 'lodash';
import urlAssembler from 'url-assembler';

import { ApiError } from './ApiError';

function extractResponseData(response) {
    return _.pick(response, [
        'status',
        'statusText',
        'url',
        'headers',
        'ok',
    ]);
}

function handleStatusCodeError(response) {
    if (!response.ok) {
        throw new ApiError(response.statusText || 'Request error', response);
    }
    return response;
}

function handleJson(response) {
    let resBody = response.body;
    try {
        resBody = JSON.parse(resBody);
    } catch (e) {
        // Failed to parse json
    }
    return {
        ...response,
        body: resBody,
    };
}

export default function(params = {}) {
    const reqOptions = params;
    const base = _.get(reqOptions, 'base', null);
    const path = _.get(reqOptions, 'path', null);
    const uriParams = _.get(reqOptions, 'uriParams', {});
    const qs = _.get(reqOptions, 'qs', {});

    const json = _.get(reqOptions, 'json', true);
    const blob = _.get(reqOptions, 'blob', false);
    const body = _.get(reqOptions, 'body', {});

    const uri = urlAssembler(base)
        .segment(path)
        .param(uriParams)
        .query(qs);

    _.merge(reqOptions, {
        headers: {
            Accept: 'application/json',
        },
        mode: 'cors',
    });

    if (json) {
        _.set(reqOptions, 'headers.Content-Type', 'application/json');
    }

    if (!json && !_.get(reqOptions.headers, 'Content-Type')) {
        _.unset(reqOptions.headers, 'Content-Type');
    }

    if (json) {
        if (_.isEmpty(body)) {
            // unset body if it's not a valid json,
            // it's neccesary especially for IE browsers which empty object literal convert
            // to [Object object] string instead of serializing it
            reqOptions.body = undefined;
        } else {
            reqOptions.body = JSON.stringify(body);
        }
    } else {
        reqOptions.body = body;
    }

    return fetch(uri.toString(), reqOptions)
        .then(
            response => Promise.all([
                extractResponseData(response),
                blob ? response.blob() : response.text(),
            ]),
        )
        .then(
            promised => ({
                ...promised[0],
                body: promised[1],
            }),
        )
        .then(blob ? _.identity : handleJson)
        .then(handleStatusCodeError)
        .then((x) => {
            if (reqOptions.resolveWithFullResponse) {
                return x;
            }
            return x.body;
        });
}
