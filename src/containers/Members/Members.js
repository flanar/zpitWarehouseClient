import React, {Component} from 'react'
import axios from '../../axios'

import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import AddMemberModal from '../../components/Modal/modal'
import Form from '../../components/Form/Form'

import classes from './Members.module.css'

class Members extends Component {
    state = {
        groups: [],
        members: [],
        display: 0,
        addMemberModalShow: false
    }

    getGroups = async () => {
        const response = await axios.get('getGroups')
        this.setState({
            groups: response.data.groups
        })
    }

    getMembers = async () => {
        const response = await axios.get('getMembers')
        this.setState({
            members: response.data.members
        })
    }

    createMember = async (member) => {
        const response = await axios.post('members', member)
        if(response.status === 200) {
            this.getMembers()
            this.setState({
                addMemberModalShow: false
            })
        }
    }

    componentDidMount() {
       this.getGroups()
       this.getMembers()
    }

    allButtonClickHandler = () => {
        this.setState({
            display: 0
        })
    }

    groupButtonClickHandler = (groupId) => {
        this.setState({
            display: groupId
        })
    }

    toggleAddMemberModal = () => {
        this.setState((prevState) => {
            return {
                addMemberModalShow: !prevState.addMemberModalShow
            }
        })
    }

    filter = (member) => {
        if(this.state.display)
            return this.state.display === member.group_id ? true : false
        else
            return true
    }

    submitAddMemberHandler = (member) => {
        this.createMember(member)
    }


    render() {
        const nav  = [
            <Button variant="secondary" type="button" className={ [classes.navItem] } active={ this.state.display === 0 ? true : false } onClick={ this.allButtonClickHandler } key={ 0 }>
                All
            </Button>,
            ...this.state.groups.map(group => {
                return (
                    <Button variant="secondary" type="button" className={ classes.navItem } active={ this.state.display === group.group_id ? true : false } onClick={ () => this.groupButtonClickHandler(group.group_id) } key={ group.group_id }>
                        { group.group_name }
                    </Button>
                )
            })
        ]

        const members = this.state.members.filter(this.filter).map((member, index) => {
            return (
                <tr key={ member.member_id }>
                    <td>{ index + 1 }</td>
                    <td>{ member.member_name }</td>
                    <td>{ member.member_surname }</td>
                    <td>{ member.member_email }</td>
                </tr>
            )
        })

        const fields = [
            {
                type: "text",
                label: "Name",
                name: "name",
                validation: ['required', 'minLength:4']
            },
            {
                type: "text",
                label: "Surname",
                name: "surname",
                validation: ['required', 'maxLength:16']
            },
            {
                type: "email",
                label: "Email Address",
                name: "email",
                validation: ['isEmail']
            },
            {
                type: "select",
                label: "Group",
                name: "group",
                validation: ['required'],
                options: this.state.groups.map((group) => {
                    return {
                        value: group.group_id,
                        text: group.group_name
                    }
                })
            }
        ]

        return (
            <div className="container">
                <div className={ classes.nav }>
                    { nav }
                </div>
                <div className={ classes.tableContainer }>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            { members }
                        </tbody>
                    </Table>
                </div>
                <div className={ classes.utilities }>
                    <Button variant="secondary" type="button" className="text-right" onClick={ this.toggleAddMemberModal }>Add new</Button>
                </div>
                <AddMemberModal
                    show={ this.state.addMemberModalShow }
                    onHide={ this.toggleAddMemberModal }
                    modaltitle="Add New Member"
                >
                    <Form
                        submitHandler={ this.submitAddMemberHandler }
                        fields={ fields }
                        btnText="Add"
                    />
                </AddMemberModal>
            </div>
        )
    }
}

export default Members