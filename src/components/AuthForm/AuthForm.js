import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { isEmptyObject, capitalize, isEmail, containLowerUpperNumber } from '../../utilities'

import classes from './AuthForm.module.css'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from '../Alert/Alert'

class AuthForm extends Component {

    state = this.props.fields.reduce((object, item) => {
        return {
            ...object,
            [item['name']]: ''
        }
    }, {errors: {}})

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    validateForm = () => {
        const allErrors = {}
        const { errors, ...fields} = this.state
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
                    if(rule === 'password')
                        if(fields[field] !== '' && !containLowerUpperNumber(fields[field])) allErrors[`${field}${rule}`] = `${capitalize(field)} must contain min one lower char, one upper char and one number`
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
        const { errors, ...data } = this.state

        if(this.validateForm())
            this.props.submitHandler(data)
    }

    closeAlertHandler = (key) => {
        const errors = { ...this.state.errors }
        delete errors[key]
        this.setState({ errors: errors })
    }

    render() {
        const fields = this.props.fields.map( field => {
            return (
                <Form.Group key={ field.name }>
                    <div className={ classes.txtb }>
                        <Form.Control className={ [classes.formControl, this.state[field.name] !== "" ? classes.focus : null].join(' ') }
                            type={ field.type }
                            name={ field.name }
                            value={ this.state[field.name] }
                            onChange={ this.changeHandler }
                        />
                        <span data-placeholder={ field.label + (!field.noStars && field.validation && field.validation.includes('required') ? '*' : '') }></span>
                    </div>
                </Form.Group>
            )
        })

        const errors = !isEmptyObject(this.state.errors) && Object.keys(this.state.errors).map((key) => {
            return (
                <Alert key={ key } closeAlert={ () => this.closeAlertHandler(key) }>
                    { this.state.errors[key] }
                </Alert>
            )
        })

        return (
            <Card className={ classes.authCard }>
                <Card.Body>
                    <Card.Title className={ classes.cardTitle }>{ this.props.title }</Card.Title>
                    { errors }
                    <Form noValidate onSubmit={ this.submitHandler }>
                        { fields }
                        <Button type="submit" className="btn-block">{ this.props.btnText }</Button>
                        <Card.Text className={ classes.cardText }>
                            { this.props.text } { this.props.link ? <Link to={ this.props.link }>{ this.props.linkText }</Link> : null }
                        </Card.Text>
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}

export default AuthForm