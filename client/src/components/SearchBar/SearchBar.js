import { useHistory } from "react-router";

const SearchBar = () => {
    const history = useHistory();

    const onSearchSubmitHandler = (e) => {
        e.preventDefault();
        
        const searchText = e.target.searchText.value;

        if(searchText.length > 0){
            history.push(`/search/${searchText}`)
        }
    }

    return (
        <form className="input-group" onSubmit={onSearchSubmitHandler}>
            <div className="input-group-prepend">
                <button className="btn btn-dark input-group-text"><i className="fa fa-search"></i></button>
            </div>
            <div>
                <input type="text" className="form-control" name="searchText" placeholder="Search..." />
            </div>
        </form>
    );
}

export default SearchBar;