export const ApiConfig = {
    api_uri: 'http://localhost:8181'
};

export const DefaultRequestOptions = Object.freeze({
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
});

export class UnauthorisedError extends Error {
    constructor(message, redirectUri) {
        super(message);
        this.redirectUri = redirectUri;
    }
}

const makeUrl = resourcePath => `${ApiConfig['api_uri']}/${resourcePath}`;

export default function useFetch() {
    function get(url) {
        return fetch(makeUrl(url), {
            ...DefaultRequestOptions,
            method: 'GET'
        }).then(handleResponse);
    }

    function post(url, body) {
        return fetch(makeUrl(url), {
            ...DefaultRequestOptions,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }).then(handleResponse);
    }

    function patch(url, body) {
        return fetch(makeUrl(url), {
            ...DefaultRequestOptions,
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }).then(handleResponse);
    }

    return {
        get,
        post,
        patch
    };
}

// helpers

function handleResponse(response) {
    return response.text().then(text => {
        let data;

        try {
            data = text && JSON.parse(text);
        } catch (ex) {
            // wasn't JSON, a simple string was returned
            data = text;
        }

        if (!response.ok) {
            console.error(
                `An error ocurred during the request and returned status ${response.statusText}`,
                data
            );

            const error =
                {
                    401: new UnauthorisedError(
                        data?.detailed_error_message ?? 'Unauthorised',
                        data?.redirect_uri ?? '/'
                    )
                }[response.status] ??
                new Error('An error ocurred, please try again');

            return Promise.reject(error);
        }

        return data;
    });
}
