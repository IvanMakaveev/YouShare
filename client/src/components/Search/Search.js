import { useContext, useEffect, useState } from "react";

import * as homeService from '../../services/homeService';
import Post from '../Post';
import Paging from '../Paging';
import UserContext from "../Contexts/UserContext";
import ProfileMedia from '../ProfileMedia';

const Search = ({
    history,
    match
}) => {
    const [userToken] = useContext(UserContext);
    const [page, setPage] = useState(1);
    const [searchData, setSearchData] = useState({});

    useEffect(() => {
        homeService.searchData(page, match.params.searchText, userToken)
            .then(res => {
                if (typeof (res) == 'object') {
                    setSearchData(res);
                    console.log(res)
                }
                else if (res == 'unauthorized') {
                    history.push('/login')
                }
                else {
                    history.push('/error');
                }
            })
    }, [page, match.params.searchText])

    const onPostDeleteHandler = (postId) => {
        setSearchData(prev => ({ ...prev, items: prev.items - 1, posts: prev.posts.filter(x => x.id != postId) }))
    }

    return (
        <div>
            <div className="row mx-0">
                <div className="offset-md-1 col-md-10 row mt-3">
                    <section className="col-md-3 align-self-start">
                        <h2>Profiles:</h2>
                        {searchData.profiles && searchData.profiles.length != 0
                            ? searchData.profiles.map(x =>
                                <ProfileMedia key={x.id} profile={x} />
                            )
                            : <h3>No profiles found</h3>
                        }
                    </section>
                    <section className="offset-md-1 col-md-6">
                        <h2>Posts:</h2>
                        {
                            searchData.posts && searchData.posts.length != 0
                                ? searchData.posts.map(x =>
                                    <Post key={x.id} postObject={x} onDeleteHandler={onPostDeleteHandler}/>
                                )
                                : <h3>No posts found</h3>
                        }
                    </section>
                </div>
            </div>
            <Paging
                setPage={setPage}
                page={page}
                elements={searchData.items}
                pageNumber={searchData.pageNumber}
                pagesCount={searchData.pagesCount}
            />
        </div>
    );
}

export default Search;