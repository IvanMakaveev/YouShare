const SearchBar = () => {
    return (
        <div className="input-group">
            <div className="input-group-prepend">
                <button className="btn btn-dark input-group-text"><i className="fa fa-search"></i></button>
            </div>
            <div>
                <input type="text" className="form-control" name="searchText" placeholder="Search..." />
            </div>
        </div>
    );
}

export default SearchBar;