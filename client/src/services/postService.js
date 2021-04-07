const url = 'https://localhost:44319/posts/';

export const createPost = (formData, token) => {
    return fetch(url, {
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

export const getPosts = (id, page, token) => {
    return fetch(url + `${id}?pageNumber=${page}`, {
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
        .then(res => res.json())
        .catch(res => console.log(res));
}

export const likePost = (postId, token) => {
    return fetch(url + 'likePost/' + postId, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
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