import React from 'react';
import classNames from "classnames";
import '../css/Paginator.css';

export class Paginator extends React.Component{
    constructor(props){
        super(props);
        const {pageCount}= this.props;

        this.range=[];

        for (let i=1; i <=pageCount; i++){
            this.range.push(i);
        }
    }

    render() {
        const {currentPage, setPage, prevPage, nextPage} = this.props;
        return(
            <nav className="pagination_nav">
                <ul className="pagination">
                    <li className="page-item">
                        <button className="page-link btn_nav" onClick={prevPage}>
                            Poprzednia
                        </button>
                    </li>

                    {
                        this.range.map(page => {
                            const onClick = () =>{
                                setPage(page);
                            };
                            return(
                                <li key={page} className={classNames('page-item', {active: currentPage === page})}>
                                    <button className="page-link page_btn_active" onClick={onClick}>
                                        {page}
                                    </button>
                                </li>
                            );
                        })
                    }

                    <li className="page-item">
                        <button className="page-link btn_nav" onClick={nextPage}>
                            Następna
                        </button>
                    </li>
                </ul>
            </nav>
        )
    }
}