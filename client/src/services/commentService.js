const url = 'https://localhost:44319/comments/';

export const likeComment = (commentId, token) => {
    return fetch(url + 'likeComment/' + commentId, {
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

export const createComment = (postId, commentText, token) => {
    const commentObj = {
        postId,
        text: commentText
    }

    return fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentObj)
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