# Ackee Api Agent

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
Key-value object containing any data you want to send to server.

### `IOptions: Object`

Object optionally containing following properties.

* **`uriParams: Object`**
Ke-value object containing request uri params.

* **`qs: Object`**
Ke-value object containing request query string params.

* **`json: boolean`**
Determine when optionally provided `IData` is in JSON format. Default is `true`

* **`headers: Object`**
Request HTTP headers.

* **`resolveWithFullResponse: boolean`**
Determine if request should resolve with full response or just a response body. Default is `false`.

### `IParams: Object`

All the `IOptions` contains and following properties.

* **`method: string`**
 Http method name.

* **`body: IData`**
Optional.

### `IResponse|IResponseBody`

Type of response is determined by `resolveWithFullResponse` request property. It's either
just response data in JSON format, or full response containing following properties.

* **`status: number`**

* **`statusText: string`**

* **`url: string`**

* **`headers: Object`**
Key-value object containing response headers.

* **`ok: boolean`**
