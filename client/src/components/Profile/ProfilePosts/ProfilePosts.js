import { useContext, useEffect, useState } from 'react';

import * as postService from '../../../services/postService';
import Paging from '../../Paging'
import Post from '../../Post';
import UserContext from '../../Contexts/UserContext';

const ProfilePosts = ({
    match,
    history
}) => {
    const [page, setPage] = useState(1);
    const [postsData, setPosts] = useState({});
    const [userToken] = useContext(UserContext);
    const profileId = match.params.profileId;

    useEffect(() => {
        postService.getPosts(profileId, page, userToken)
            .then(res => {
                if (res) {
                    console.log(res)
                    setPosts(res)
                }
            })
    }, [page])

    return (
        <div className="offset-md-2 col-md-8">
            {postsData.posts?.map(x => 
                <Post key={x.id} postObject={x}/>
            )}
            <Paging
                setPage={setPage}
                page={page}
                pagesCount={postsData.pagesCount}
                hasPreviousPage={postsData.hasPreviousPage}
                hasNextPage={postsData.hasNextPage}
            />
        </div>
    );
}

export default ProfilePosts;