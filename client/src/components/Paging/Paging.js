import { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';

const Paging = ({
    setPage,
    page,
    pageNumber,
    pagesCount,
    hasPreviousPage,
    hasNextPage
}) => {
    const [pagingButtons, setPagingButtons] = useState([]);

    useEffect(() => {
        const buttons = [];
        for (let i = page - 3; i < page; i++) {
            if (i > 0) {
                buttons.push(<Pagination.Item key={i} value={i} onClick={onPageChangeHandler}>{i}</Pagination.Item>);
            }
        }
        buttons.push(<Pagination.Item key={page} active>{page}</Pagination.Item>);

        for (let i = page + 1; i < page + 4; i++) {
            if (i <= pagesCount) {
                buttons.push(<Pagination.Item key={i} value={i} onClick={onPageChangeHandler}>{i}</Pagination.Item>);
            }
        }
        setPagingButtons(buttons);
    }, [pageNumber])

    const onPageChangeHandler = (e) => {
        setPage(Number(e.target.getAttribute("value")))
    }

    return (
        <Pagination className="d-flex justify-content-center mt-5">
            { pagingButtons}
        </Pagination>
    );
}

export default Paging;