import React, { useState } from 'react'

import classes from './Pagination.module.css'

const Pagination = ({ numberOfPages, itemsPerPage, startPage }) => {

    const countFirstPage = page => {
        if(numberOfPages <= 5 || page <= 2)
            return 1
        else if(page >= numberOfPages - 2)
            return numberOfPages - 4
        else
            return page - 2
    }

    const countLastPage = page => {
        if(numberOfPages <= 5 || page >= numberOfPages - 2)
            return numberOfPages
        else if(page <= 2)
            return 5
        else
            return page + 2
    }

    const [currentPage, setCurrentPage] = useState(startPage)
    const [firstPage, setFirstPage] = useState(countFirstPage(startPage))
    const [lastPage, setLastPage] = useState(countLastPage(startPage))

    const countNextPage = page => {
        if(page === '<' && currentPage !== 1) {
            setCurrentPage(prevState => prevState - 1)
            setFirstPage(countFirstPage(currentPage - 1))
            setLastPage(countLastPage(currentPage - 1))
        } else if(page === '>' && currentPage !== numberOfPages) {
            setCurrentPage(prevState => prevState + 1)
            setFirstPage(countFirstPage(currentPage + 1))
            setLastPage(countLastPage(currentPage + 1))
        } else if(page !== '<' && page !== '>') {
            setCurrentPage(page)
            setFirstPage(countFirstPage(currentPage))
            setLastPage(countLastPage(currentPage))
        }
    }

    const pageItem = (innerText, key=null, disabled=false) => (
        <button
            key={ key ? key : innerText }
            type="button"
            disabled={ disabled ? 'disabled' : null }
            className={ [classes.pageItem, currentPage === innerText ? classes.active : null].join(' ') }
            onClick={ () => countNextPage(innerText) }
        >{ innerText }</button>)

    const pages = []
    for (let index = firstPage; index <= lastPage; index++) {
        pages.push(pageItem(index))
    }

    return (
        <div className= { classes.paginationContainer }>
            { currentPage === 1 ? pageItem('<', null, true) : pageItem('<') }
            { currentPage > 3 && numberOfPages > 5 ? pageItem('...', '...1', true) : null}
            { pages }
            { currentPage < numberOfPages - 2 && numberOfPages > 5 ? pageItem('...', '...2', true) : null}
            { currentPage === numberOfPages ? pageItem('>', null, true) : pageItem('>') }

        </div>
    )
}

export default Pagination