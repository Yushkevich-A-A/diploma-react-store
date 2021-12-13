// api create order 

export const createOrder = async (request) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/order`, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            "Content-Type": "application/json",
        }
    })
    if (response.status < 200 || response.status >= 300) {
    throw new Error(response.statusText)
    }

    return response;
}

// fetch to server

export const fetchToServer = async (request, aborting) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}${request}`, {
        signal: aborting.signal,
    });
    if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
    }
    const data = await response.json();

    return data;
}