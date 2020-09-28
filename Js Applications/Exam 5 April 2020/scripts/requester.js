const baseUrl = "https://api.backendless.com";
const apiId = "1D18E45F-67EC-FBA7-FF01-577EBEDE6500";
const restApiKey = "C04FA60C-9A5C-4D80-AFD3-C821697433BB";


function createHeader(httpMethod, data, authToken) {
    const header = {
        method: httpMethod,
        headers: {
            "Content-Type": "application/json"
        }
    };

    if (authToken !== null) {
        header.headers["user-token"] = authToken;
    }

    if (httpMethod === "PUT" || httpMethod === "POST") {
        header.body = JSON.stringify(data);
    }

    return header;
}

function errorHandler(e) {
    if (!e.ok) {
        throw new Error(e.statusText);
    }

    return e;
}

function deserializeData(x) {
    if (x.status === 204) {
        return x;
    }
    return x.json();
}

function fetchData(folderName, endpoint, headers) {
    const url = `${baseUrl}/${apiId}/${restApiKey}/${folderName}/${endpoint}`;

    return fetch(url, headers).then(errorHandler).then(deserializeData);
}

export function getData(folderName, endpoint, authToken) {
    const header = createHeader("GET", {}, authToken);

    return fetchData(folderName, endpoint, header);
}

export function postData(folderName, endpoint, data, authToken) {
    const header = createHeader("POST", data, authToken);

    return fetchData(folderName, endpoint, header);
}

export function putData(folderName, endpoint, data, authToken) {
    const header = createHeader("PUT", data, authToken);

    return fetchData(folderName, endpoint, header);
}

export function deleteData(folderName, endpoint, authToken) {
    const header = createHeader("DELETE", {}, authToken);
    const url = `${baseUrl}/${apiId}/${restApiKey}/${folderName}/${endpoint}`;

    return fetch(url, header).then(errorHandler);
}

export function logOutUser(folderName, endpoint, authToken) {
    const header = createHeader("GET", {} , authToken);
    const url = `${baseUrl}/${apiId}/${restApiKey}/${folderName}/${endpoint}`;

    return fetch(url, header).then(errorHandler);
}
