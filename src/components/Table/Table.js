import React, { useState } from 'react'

import classes from './Table.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import Pagination from '../Pagination/Pagination'

const Table = ({ startPage = 5 }) => {
    const propsHeaders = [
        {
            name: '#',
            filterable: true,
            searchable: false
        },
        {
            name: 'Name',
            filterable: true,
            searchable: true
        },
        {
            name: 'Surname',
            filterable: true,
            searchable: true
        },
        {
            name: 'Email',
            filterable: true,
            searchable: true
        }
    ]
    
    const propsData = [
        {
            name: 'Piotr',
            surname: 'Suchorab',
            email: 'piotr@suchorab.pl'
        },
        {
            name: 'Adam',
            surname: 'Basara',
            email: 'adam@basara.pl'
        },
        {
            name: 'Piotr',
            surname: 'Suchorab',
            email: 'piotr@suchorab.pl'
        },
        {
            name: 'Adam',
            surname: 'Basara',
            email: 'adam@basara.pl'
        }
    ]

    const numberOfPages = 10

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
    const [sort, setSort] = useState('')

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
            setFirstPage(countFirstPage(page))
            setLastPage(countLastPage(page))
        }
    }

    const sortHandler = header => {
        if( sort.split(';')[0] === 'up' && sort.split(';')[1] === header )
            setSort(`down;${header}`)
        else if( sort.split(';')[0] === 'down' && sort.split(';')[1] === header )
            setSort('')
        else
            setSort(`up;${header}`)
    }

    const arrow = sort.split(';')[0] === 'up' ? <FontAwesomeIcon className={ classes.arrow } icon={ faArrowUp } /> : <FontAwesomeIcon className={ classes.arrow } icon={ faArrowDown } />

    const headers = propsHeaders.map(header => <th key={ header.name } className={ [classes.th, header.filterable ? classes.pointer : null].join(' ') } onClick={ header.filterable ? () => sortHandler(header.name) : null }>{ header.name }{ header.name === sort.split(';')[1] ? arrow : null }</th>)

    const filters = propsHeaders.map(header => <th key={header.name} className={ [classes.th, classes.filters].join(' ') }>{ header.searchable && <input type="text" />}</th>)

    const data = propsData.map((item, index) => (
        <tr key={ index } className={ classes.tr }>
            <td className={ classes.td }>{ index + 1 }</td>
            { Object.keys(item).map(td => <td key={ item[td] } className={ classes.td }>{ item[td] }</td>) }
            <td className={ [classes.td, classes.actions].join(' ') }><FontAwesomeIcon icon={ faTrash } /></td>
        </tr>
    ))

    return (
        <div className={ classes.container }>
            <div className={ classes.tableContainer }>
                <table className={ classes.table }>
                    <thead className={ classes.thead }>
                        <tr className={ classes.tr }>{ headers }</tr>
                        <tr className={ classes.tr }>{ filters }</tr>
                    </thead>
                    <tbody className={ classes.tbody }>
                        { data }
                    </tbody>
                </table>
            </div>
            <Pagination numberOfPages={numberOfPages} currentPage={currentPage} firstPage={firstPage} lastPage={lastPage} countNextPage={countNextPage} />
        </div>
    )
}

export default Table