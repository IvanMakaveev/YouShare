import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";

import * as homeService from '../../services/homeService';
import Post from '../Post';
import Paging from '../Paging';
import UserContext from "../Contexts/UserContext";
import ProfileMedia from '../ProfileMedia';

const Home = ({
    history
}) => {
    const [userToken] = useContext(UserContext);
    const [page, setPage] = useState(1);
    const [browseData, setBrowseData] = useState({});

    useEffect(() => {
        homeService.getBrowseData(page, userToken)
            .then(res => {
                if (typeof (res) == 'object') {
                    setBrowseData(res);
                    console.log(res)
                }
                else if (res == 'unauthorized') {
                    history.push('/login')
                }
                else {
                    history.push('/error');
                }
            })
    }, [page])

    if (userToken == null) {
        return (<Redirect to="/" />)
    }
    return (
        <div className="row mx-0">
            <div className="offset-md-1 col-md-10 row mt-3">
                <section className="col-md-3 align-self-start">
                    <h2>Followed Profiles:</h2>
                    {browseData.profiles && browseData.profiles.length != 0
                        ? browseData.profiles.map(x =>
                            <ProfileMedia key={x.id} profile={x} />
                        )
                        : <h3>It looks like you haven't followed anyone.</h3>
                    }
                </section>
                <section className="offset-md-1 col-md-6">
                    <h2>Recent Posts:</h2>
                    {
                        browseData.posts && browseData.posts.length != 0
                            ? browseData.posts.map(x =>
                                <Post key={x.id} postObject={x} />
                            )
                            : <h3>Follow more people to see the newest posts</h3>
                    }
                    <Paging
                        setPage={setPage}
                        page={page}
                        elements={browseData.items}
                        pageNumber={browseData.pageNumber}
                        pagesCount={browseData.pagesCount}
                    />
                </section>
            </div>
        </div>
    );
}

export default Home;