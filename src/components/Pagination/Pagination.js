import React from 'react'

import classes from './Pagination.module.css'

const Pagination = ({ currentPage, firstPage, lastPage, countNextPage, numberOfPages }) => {

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