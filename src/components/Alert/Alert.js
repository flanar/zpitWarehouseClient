import React, { Component } from 'react'

import classes from './Alert.module.css'

class Alert extends Component {
    state = {
        show: false
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

    render() {
        return (
            <div className={ [classes.alert, this.state.show ? classes.show : null].join(' ') }>
                <div>
                    { this.props.children }
                </div>
               <div className={ classes.exitButton } onClick={ this.closeAlert }>
                    ×
               </div>
            </div>
        )
    }
}

export default Alert