import React, { Component } from 'react'

import { isEmptyObject, capitalize, isEmail } from '../../utilities'

import classes from './Form.module.css'
import BootstrapForm from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Select from '../Select/Select'
import Alert from '../Alert/Alert'

class Form extends Component {

    state = this.props.fields.reduce((object, item) => {
        return {
            ...object,
            [item['name']]: item['defaultValue'] ? item['defaultValue'] : ''
        }
    }, {
        errors: {},
        processSubmit: false
    })

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

    validateForm = () => {
        const allErrors = {}
        const { processSubmit, errors, ...fields} = this.state
        for (let field in fields)  {
            if(this.props.fields.filter(f => f.name === field)[0].validation)
                this.props.fields.filter(f => f.name === field)[0].validation.forEach(rule => {
                    if(rule === 'required')
                        if(fields[field] === '') allErrors[`${field}${rule}`] = `${capitalize(field)} is required`
                    if(rule === 'isEmail')
                        if(fields[field] !== '' && !isEmail(fields[field])) allErrors[`${field}${rule}`] = `${capitalize(field)} is not valid`
                    if(rule.startsWith('minLength:'))
                        if(fields[field].length < rule.split(':')[1]) allErrors[`${field}${rule.split(':')[0]}`] = `${capitalize(field)} required min ${rule.split(':')[1]} characters`
                    if(rule.startsWith('maxLength:'))
                        if(fields[field].length > rule.split(':')[1]) allErrors[`${field}${rule.split(':')[0]}`] = `${capitalize(field)} must be max ${rule.split(':')[1]} characters`
                    if(rule.startsWith('minValue:'))
                        if(fields[field] < rule.split(':')[1]) allErrors[`${field}${rule.split(':')[0]}`] = `${capitalize(field)} must be greater then ${rule.split(':')[1]}`
                    if(rule.startsWith('maxValue:'))
                        if(fields[field] > rule.split(':')[1]) allErrors[`${field}${rule.split(':')[0]}`] = `${capitalize(field)} must be lower then ${rule.split(':')[1]}`
                })
        }

        if(isEmptyObject(allErrors))
            return true
        else {
            this.setState({ errors: allErrors })
            return false
        }
    }

    submitHandler = (e) => {
        e.preventDefault()
        const { processSubmit, errors, ...data } = this.state

        if(this.validateForm()) {
            this.setState({ processSubmit: true })
            this.props.submitHandler(data)
        }
    }

    closeAlertHandler = (key) => {
        const errors = { ...this.state.errors }
        delete errors[key]
        this.setState({ errors: errors })
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
                                <span data-placeholder={ field.label + (!field.noStars && field.validation && field.validation.includes('required') ? '*' : '') }></span>
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

        const title = this.props.title && <h2 className={ classes.title }>{ this.props.title }</h2>

        const errors = !isEmptyObject(this.state.errors) && Object.keys(this.state.errors).map((key) => {
            return (
                <Alert key={ key } closeAlert={ () => this.closeAlertHandler(key) }>
                    { this.state.errors[key] }
                </Alert>
            )
        })

        return (
            <div>
                { title }
                { errors }
                <BootstrapForm noValidate onSubmit={ this.submitHandler }>
                    { fields }
                    <Button disabled={ this.state.processSubmit ? "disabled" : null }type="submit" className="btn-block">{ this.props.btnText }</Button>
                </BootstrapForm>
            </div>
        )
    }
}

export default Form