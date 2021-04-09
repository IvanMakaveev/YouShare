import * as errorService from './errorService';

const url = process.env.REACT_APP_API_URL + 'profiles/';

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
        .catch(res => {
            errorService.logError(res);
        });
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
        .catch(res => {
            errorService.logError(res);
        });
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
        .catch(res => {
            errorService.logError(res);
        });
}

export const editProfile = (id, formData, token) => {
    return fetch(url + id, {
        method: "PUT",
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
        .catch(res => {
            errorService.logError(res);
        });
}

export const isOwner = (id, token) => {
    return fetch(url + 'isOwner/' + id, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(res => res.json())
        .catch(res => {
            errorService.logError(res);
        });
}

export const deleteProfile = (id, token) => {
    return fetch(url + id, {
        method: "DELETE",
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(res => {
            if(res.ok == true){
                return 'success';
            }
            else {
                return 'error';
            }
        })
        .catch(res => {
            errorService.logError(res);
        });
}