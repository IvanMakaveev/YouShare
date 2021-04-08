import { useContext, useEffect, useState } from "react";

import * as homeService from '../../services/homeService';
import Post from '../Post';
import Paging from '../Paging';
import UserContext from "../Contexts/UserContext";
import ProfileMedia from '../ProfileMedia';

const Search = ({
    history
}) => {
    const [userToken] = useContext(UserContext);
    const [page, setPage] = useState(1);
    const [browseData, setBrowseData] = useState({});

    useEffect(() => {

    }, [])


    return (
        <div className="row mx-0">
            <div className="offset-md-1 col-md-10 row mt-3">
                <section className="col-md-3 align-self-start">
                    <h2>Profiles:</h2>
                    
                </section>
                <section className="offset-md-1 col-md-6">
                    <h2>Posts:</h2>
                    
                </section>
            </div>
        </div>
    );
}

export default Search;