import * as errorService from './errorService';

const url = process.env.REACT_APP_API_URL + 'home/';

export const getBrowseData = (pageNumber, token) => {
    return fetch(url + pageNumber, {
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
        .then(res => {
            if (res.ok == true) {
                return res.json();
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

export const searchData = (pageNumber, searchText, token) => {
    return fetch(url + `${pageNumber}/${searchText}`, {
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
        .then(res => {
            if (res.ok == true) {
                return res.json();
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