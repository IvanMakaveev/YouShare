const url = 'https://localhost:44319/users/';

export const getRegisteredCountries = () => {
    return fetch(url + 'countries')
        .then(res => res.json())
        .catch(res => console.log(res));
}

export const registerUser = (newUser) => {
    return fetch(url + 'register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .catch(res => console.log(res));
}

export const loginUser = (userData) => {
    return fetch(url + 'login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(res => res.json())
        .catch(res => console.log(res));
}