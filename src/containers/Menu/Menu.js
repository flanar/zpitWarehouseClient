import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { logout } from '../../redux'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

class Menu extends Component {
    logout = (e) => {
        e.preventDefault()
        this.props.logout()
        this.props.history.push('/')
    }

    render() {
        const authenticatedUserLinks = (
            <Nav className="ml-auto">
                <Nav.Link eventKey="1" as={Link} to="/members">Members</Nav.Link>
                <Nav.Link eventKey="2" as={Link} to="/warehouse">Warehouse</Nav.Link>
                <Nav.Link eventKey="3" as={Link} to="/" onClick={this.logout}>Logout</Nav.Link>
            </Nav>
        )

        const unauthenticatedUserLinks = (
            <Nav className="ml-auto">
                <Nav.Link eventKey="1" as={Link} to="/login">Login</Nav.Link>
            </Nav>
        )

        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">Magazyn</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {this.props.isAuthorized ? authenticatedUserLinks : unauthenticatedUserLinks}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthorized: state.auth.isAuthorized
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu))