const url = 'https://localhost:44319/profiles/';

export const getProfileData = (id) => {
    return fetch(url + id, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
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

export const followProfile = (id) => {
    return fetch(url + 'follow/' + id, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
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

export const editProfile = (id, formData) => {
    return fetch(url + id, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
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