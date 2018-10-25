![ackee|ApiAgent](https://img.ack.ee/ackee/image/github/js)

# [ApiAgent](https://reactjs.org/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/AckeeCZ/api-agent/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/ackee-api-agent.svg?style=flat)](https://www.npmjs.com/package/ackee-api-agent) [![CI Status](http://img.shields.io/travis/AckeeCZ/api-agent.svg?style=flat)](https://travis-ci.org/AckeeCZ/api-agent) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

## Quick start

```js
import ApiAgent from 'ackee-api-agent';

const api = new ApiAgent('http://my-custom-api.ack.ee/api/v2');
const driversFilter = {
    filter: {
        offset: 3,
        limit: 10,
    },
}
const params = {
    resolveWithFullResponse: true,
};


// get data
api.get('/metadata')
    .then(metadata => console.log(metadata));

// set data
api.post('/drivers', driversFilter, params);
    .then(drivers => console.log(drivers))

api.post('/groups', { name: 'new group', description: 'New testing group' })
    .catch(err => console.log('Group was not created'));
```

## Api

### `ApiAgent`

Class that has following instance methods.

* **`constructor(basePath: string)`**

* **`request(path: string, params: IParams): Promise<IResponse|IResponseBody>`**

* **`get(path: string, params: IParams): Promise<IResponse|IResponseBody>`**

* **`post(path: string, data: IData, options: IOptions): Promise<IResponse|IResponseBody>`**

* **`put(path: string, data: IData, options: IOptions): Promise<IResponse|IResponseBody>`**

* **`patch(path: string, data: IData, options: IOptions): Promise<IResponse|IResponseBody>`**

* **`delete(path: string, options: IOptions): Promise<IResponse|IResponseBody>`**

### `IData: Object`
Key-value object containing any data you want to send to server in request body.

### `IOptions: Object`

Object optionally containing following properties.

* **`uriParams: Object`**
Key-value object containing request uri params. Params that are found in url are replaced,
rest is appended as a query parameters.

    ```js
    const config = {
        api: {
            base: 'http://api-domain',
            user: '/users/:user',
        }
    }
    const authApi = new AuthApiAgent(config.api.base);
    const uriParams = {
        user: 13,
        include: 'address',
    };

    authApi.get(config.api.user, { uriParams });
    // requested url is 'http://api-domain/users/13?include=address
    ```

* **`qs: Object`**
Ke-value object containing request query string params. Add query params to url

    ```js
    const config = {
        api: {
            base: 'http://api-domain',
            users: '/users',
        }
    }
    const authApi = new AuthApiAgent(config.api.base);
    const qs = {
        page: 3,
        offset: 20,
    };

    authApi.get(config.api.users, { qs });
    // requested url is 'http://api-domain/users?page=3&offset=20
    ```

* **`json: boolean`**
Determine when optionally provided `IData` is in JSON format and should be serialized to string.
Alos set request header `ContentType=application/json`. Default is `true`.

* **`headers: Object`**
Request HTTP headers.

* **`resolveWithFullResponse: boolean`**
Determine if request should resolve with full response or just a response body. Default is `false`.

* **`blob: boolean`**
Determine if response should be treated as a binary data. Default is `false`.

    ```js
    const authApi = new AuthApiAgent(config.api.base);

    authApi
        .get('/download/pdf', { blob: true })
        .then(pdf => {
            // pdf === Blob(205990) {size: 205990, type: "application/octet-stream"}

            const uri = URL.createObjectURL(pdf);
            // uri === 'blob:http://my-app-url/fb0b4600-8377-4357-a240-8346e94a0384'
        });
    ```

### `IParams: Object`

All the `IOptions` contains and following properties.

* **`method: string`**
 Http method name.

* **`body: IData`**
Optional.

### `IResponse|IResponseBody`

Type of response is determined by `resolveWithFullResponse` request property. It's either
just response data in JSON format, or full response containing following properties.

    ```js
    const authApi = new AuthApiAgent(config.api.base);

    authApi.get('/users')
        .then(users => {
            console.log(JSON.stringify(users));
            // [{"id":1,"name":"Me"},{"id":2,"name":"You"},{"id":3,"name":"He"}]
        });

    authApi.get('/users', { resolveWithFullResponse: true })
        .then(response => {
            console.log(JSON.stringify(response.body));
            // [{"id":1,"name":"Me"},{"id":2,"name":"You"},{"id":3,"name":"He"}]

            response.status === 200 // true
            result.headers.get('x-total-count') === '3' // true
        });
    ```

* **`body: IResponseBody`**

* **`status: number`**

* **`statusText: string`**

* **`url: string`**

* **`headers: Object`**
Key-value object containing response headers.

* **`ok: boolean`**
