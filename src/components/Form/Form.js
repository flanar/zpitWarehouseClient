import React, { Component } from 'react'

import classes from './Form.module.css'
import BootstrapForm from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Select from '../Select/Select'

class Form extends Component {

    state = this.props.fields.reduce((object, item) => {
        return {
            ...object,
            [item['name']]: ''
        }
    }, {error: null})

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    selectChangeHandler = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        const { error, ...data} = this.state
        this.props.submitHandler(data)
    }

    render() {
        const fields = this.props.fields.map( field => {
            switch (field.type) {
                case 'text':
                case 'email':
                case 'password': 
                    return (
                        <BootstrapForm.Group key={ field.name }>
                            <div className={ classes.txtb }>
                                <BootstrapForm.Control className={ [classes.formControl, this.state[field.name] !== "" ? classes.focus : null].join(' ') }
                                    type={ field.type }
                                    name={ field.name }
                                    value={ this.state[field.name] }
                                    onChange={ this.changeHandler }
                                />
                                <span data-placeholder={ field.label }></span>
                            </div>
                        </BootstrapForm.Group>
                    )
                case 'select':
                    return (
                        <BootstrapForm.Group key={ field.name }>
                            <BootstrapForm.Label>{ field.label }</BootstrapForm.Label>
                            <Select
                                field={ field }
                                onChange={ this.selectChangeHandler }
                            />
                        </BootstrapForm.Group>
                    )
                default: return null
            }
        })

        const title = this.props.title ? <h2 className={ classes.title }>{ this.props.title }</h2> : null

        return (
            <div>
                { title }
                <BootstrapForm noValidate onSubmit={ this.submitHandler }>
                    { fields }
                    <Button type="submit" className="btn-block">{ this.props.btnText }</Button>
                </BootstrapForm>
            </div>
        )
    }
}

export default Form