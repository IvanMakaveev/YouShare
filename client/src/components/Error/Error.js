const Error = () => {
    return (
        <div className="vh-100" style={{ backgroundImage: "url(error.jpg)" }}>
            <h1>Content Not Found</h1>
            <h2>If you are seeing this page, the server is either offline or the data you've been searching for is missing</h2>
        </div>
    )
};

export default Error;