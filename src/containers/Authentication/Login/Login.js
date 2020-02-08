import React, {Component} from 'react'
import { connect } from 'react-redux'

import { login } from '../../../redux'

import AuthForm from '../../../components/AuthForm/AuthForm'

class Login extends Component {
    submitHandler = (user) => {
        this.props.login(user)
        this.props.history.push('/')
    }

    render() {
        const fields = [
            {
                type: "email",
                label: "Email Address",
                name: "email"
            },
            {
                type: "password",
                label: "Password",
                name: "password"
            }
        ]

        return (
            <div className="container">
                <AuthForm
                    title="SIGN IN"
                    submitHandler={ this.submitHandler }
                    fields={ fields }
                    btnText="Sign In"
                    text="Don't have an account?"
                    link="/register"
                    linkText="SIGN UP"
               />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: user => dispatch(login(user))
    }
}

export default connect(null, mapDispatchToProps)(Login)