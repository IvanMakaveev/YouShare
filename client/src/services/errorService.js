const url = process.env.REACT_APP_API_URL + 'errors/';

export const logError = (error) => {
    const errorObj = {
        errorText: error.toString()
    }

    return fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(errorObj)
    })
}