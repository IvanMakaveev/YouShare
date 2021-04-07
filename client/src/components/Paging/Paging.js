import { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';


const Paging = ({
    setPage,
    page,
    pagesCount,
    hasPreviousPage,
    hasNextPage
}) => {
    const [pagingButtons, setPagingButtons] = useState([]);

    useEffect(() => {
        const buttons = [];

        for (let i = page - 3; i < page + 4; i++) {
            if (i == page) {
                buttons.push(<Pagination.Item key={page} value={page} active>{page}</Pagination.Item>);
            }
            else if (i > 0 && i < pagesCount) {
                buttons.push(<Pagination.Item key={i} value={i} onClick={onPageChangeHandler}>{i}</Pagination.Item>);
            }
        }

        setPagingButtons(buttons);
    }, [page])

    const onPageChangeHandler = (e) => {
        setPage(e.target.getAttribute("value"))
    }

    return (
        <Pagination className="d-flex justify-content-center mt-5">
            <Pagination.Prev value={page-1} disabled={!hasPreviousPage} onClick={onPageChangeHandler}/>

            { pagingButtons}

            <Pagination.Last value={page+1} disabled={!hasNextPage} onClick={onPageChangeHandler}/>
        </Pagination>
    );
}

export default Paging;