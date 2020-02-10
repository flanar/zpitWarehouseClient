import React, { Component } from 'react'

import classes from './Alert.module.css'

class Alert extends Component {
    state = {
        show: false,
        accept: this.props.accept ? true : false
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ show: true })
        }, 1)
    }

    closeAlert = () => {
        this.setState({ show: false })
        setTimeout(() => {
            this.props.closeAlert()
        }, 500)
    }

    accept = () => {
        this.setState({ show: false })
        setTimeout(() => {
            this.props.accept()
        }, 500)
    }

    render() {
        return (
            <div className={ [classes.alert, this.state.show ? classes.show : null].join(' ') }>
                <div>
                    { this.props.children }
                </div>
                <div className={ classes.buttonsContainer }>
                    { this.state.accept ? (<div className={ classes.acceptanceButton } onClick={ this.accept }>OK</div>) : null }
                    { this.state.accept ? (<div className={ classes.acceptanceButton } onClick={ this.closeAlert }>Cancel</div>) : null }
                    { !this.state.accept ? (<div className={ classes.exitButton } onClick={ this.closeAlert }>
                        ×
                    </div>) : null }
                </div>
            </div>
        )
    }
}

export default Alert