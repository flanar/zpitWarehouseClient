import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import classes from './AuthForm.module.css'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class AuthForm extends Component {

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

    submitHandler = (e) => {
        e.preventDefault()
        const { error, ...data} = this.state
        this.props.submitHandler(data)
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
                        <span data-placeholder={ field.label }></span>
                    </div>
                </Form.Group>
            )
        })
        return (
            <Card className={ classes.authCard }>
                <Card.Body>
                    <Card.Title className={ classes.cardTitle }>{ this.props.title }</Card.Title>
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