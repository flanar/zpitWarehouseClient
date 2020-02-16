import React from 'react'

import classes from './Table.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Pagination from '../Pagination/Pagination'

const Table = props => {
    const propsHeaders = ['#', 'Name', 'Surname', 'Email', '']
    
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

    const headers = propsHeaders.map(header => <th key={ header } className={ classes.th }>{ header }</th>)

    const filters = propsHeaders.map(header => <th key={header} className={ [classes.th, classes.filters].join(' ') }>{ header !== '' && <input type="text" />}</th>)

    const data = propsData.map((item, index) => (
        <tr key={ index } className={ classes.tr }>
            <td className={ classes.td }>{ index + 1 }</td>
            { Object.keys(item).map(td => <td key={ item[td] } className={ classes.td }>{ item[td] }</td>) }
            <td className={ [classes.td, classes.actions].join(' ') }><FontAwesomeIcon icon={ faTrash } /></td>
        </tr>
    ))

    return (
        <div className={ classes.container }>
            <table className={ classes.table }>
                <thead className={ classes.thead }>
                    <tr className={ classes.tr }>{ headers }</tr>
                    <tr className={ classes.tr }>{ filters }</tr>
                </thead>
                <tbody className={ classes.tbody }>
                    { data }
                </tbody>
            </table>
            <Pagination numberOfPages={10} itemsPerPage={3} startPage={5} />
        </div>
    )
}

export default Table