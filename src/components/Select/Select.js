import React, { Component } from 'react'

import classes from './Select.module.css'

class Select extends Component {
    state = {
        selectedItemText: this.props.field.defaultValue ? this.props.field.options.filter(option => option.value === this.props.field.defaultValue)[0].text : 'Select Item',
        show: false
    }

    toggleShow = () => {
        this.setState( prevState => {
            return {
                show: !prevState.show
            }
        })
    }

    optionClickHandler = (option) => {
        this.setState({
            selectedItemText: option.text,
        })
        this.props.onChange(this.props.field.name, option.value)
        this.toggleShow()
    }

    render() {
        return (
            <div className={ classes.selectBox }>
                <div className={ [classes.optionsContainer, this.state.show ? classes.active : null].join(' ') }>
                    { this.props.field.options.map(option => {
                        return (
                            <div className={ classes.option } key={ option.value } onClick={ () => this.optionClickHandler(option) }>
                                <input type="radio" className={ classes.radio } id={ option.value } value={ option.value } name={ this.props.field.name } />
                                <label htmlFor={ option.value }>{ option.text }</label>
                            </div>
                        )
                    }) }
                </div>
                <div className={ classes.selected } onClick={ this.toggleShow }>
                    { this.state.selectedItemText }
                </div>
            </div>
        )
    }
}

export default Select