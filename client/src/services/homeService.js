const url = 'https://localhost:44319/home/';

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
        .catch(res => console.log(res));
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
        .catch(res => console.log(res));
}