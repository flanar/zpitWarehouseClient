import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import { checkAuth } from './redux'

import Menu from './containers/Menu/Menu'
import Login from './containers/Authentication/Login/Login'
import Register from './containers/Authentication/Register/Register'
import Landing from './containers/Landing/Landing'
import Members from './containers/Members/Members'
import Warehouse from './containers/Warehouse/Warehouse'

class App extends Component {
    componentDidMount() {
        this.props.checkAuth()
    }

    render() {
        const authenticatedUserRoutes = (
            <Switch>
                <Route exact path="/members" component={Members} />
                <Route exact path="/warehouse" component={Warehouse} />
                <Route component={Landing}/>
            </Switch>
        )

        const unauthenticatedUserRoutes = (
            <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/" component={Login} />
                <Route exact path="/login" component={Login} />
                <Route component={Login}/>
            </Switch>
        )

        return (
            <>
                <Router>
                    <Menu />
                    {this.props.isAuthenticated ? authenticatedUserRoutes : unauthenticatedUserRoutes}
                </Router>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        checkAuth: () => dispatch(checkAuth())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)