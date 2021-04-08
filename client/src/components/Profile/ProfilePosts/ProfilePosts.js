import { useContext, useEffect, useState } from 'react';

import * as postService from '../../../services/postService';
import Paging from '../../Paging'
import Post from '../../Post';
import UserContext from '../../Contexts/UserContext';

const ProfilePosts = ({
    match,
}) => {
    const [page, setPage] = useState(1);
    const [postsData, setPosts] = useState({});
    const [userToken] = useContext(UserContext);
    const profileId = match.params.profileId;

    useEffect(() => {
        postService.getPosts(profileId, page, userToken)
            .then(res => {
                if (res) {
                    setPosts(res)
                }
            })
    }, [page, profileId])

    const onPostDeleteHandler = (postId) => {
        setPosts(prev => ({ ...prev, items: prev.items - 1, posts: prev.posts.filter(x => x.id != postId) }))
    }

    return (
        <div className="offset-md-2 col-md-8">
            {postsData.posts && postsData.posts.length != 0
                ? postsData.posts.map(x =>
                    <Post key={x.id} postObject={x} onDeleteHandler={onPostDeleteHandler} />
                )
                : <h3>No Posts to show!</h3>
            }
            <Paging
                setPage={setPage}
                page={page}
                elements={postsData.items}
                pageNumber={postsData.pageNumber}
                pagesCount={postsData.pagesCount}
            />
        </div>
    );
}

export default ProfilePosts;