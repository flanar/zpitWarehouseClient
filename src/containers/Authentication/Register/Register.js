import React, {Component} from 'react'

import { register } from '../AuthenticationFunctions'

import AuthForm from '../../../components/AuthForm/AuthForm'

class Register extends Component {
    submitHandler = (newUser) => {
        register(newUser).then(res => {
            if(res)
                this.props.history.push('/login')
        })
    }

    render() {
        const fields = [
            {
                type: "text",
                placeholder: "Enter Name",
                name: "name"
            },
            {
                type: "text",
                placeholder: "Enter Surname",
                name: "surname"
            },
            {
                type: "email",
                placeholder: "Email Address",
                name: "email"
            },
            {
                type: "password",
                placeholder: "Password",
                name: "password"
            }
        ]

        return (
            <div className="container">
                 <AuthForm
                    title="SIGN UP"
                    submitHandler={ this.submitHandler }
                    fields={ fields }
                    btnText="Sign Up"
                    text="Already have an account?"
                    link="/login"
                    linkText="SIGN IN"
               />
            </div>
        )
    }
}

export default Register