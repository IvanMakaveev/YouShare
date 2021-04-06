const url = 'https://localhost:44319/profiles/';

export const getCurrentProfileData = (token) => {
    return fetch(url, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(res => {
            if (res.ok == true) {
                return res.json();
            }
            else {
                return undefined;
            }
        })
        .catch(res => console.log(res));
}

export const getProfileData = (id, token) => {
    return fetch(url + id, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(res => {
            if (res.ok == true) {
                return res.json();
            }
            else {
                return undefined;
            }
        })
        .catch(res => console.log(res));
}

export const followProfile = (id, token) => {
    return fetch(url + 'follow/' + id, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(res => {
            if (res.ok == true) {
                return "success";
            }
            else if (res.status == 401) {
                return "unauthorized";
            }
            else {
                return undefined;
            }
        })
        .catch(res => console.log(res));
}

export const editProfile = (id, formData, token) => {
    return fetch(url + id, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token,
        },
        body: formData
    })
        .then(res => {
            if (res.ok == true) {
                return "success";
            }
            else if (res.status == 401) {
                return "unauthorized";
            }
            else {
                return res.json();
            }
        })
        .catch(res => console.log(res));
}