import React, {Component} from 'react'
import axios from '../../axios'

import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Modal from '../../components/Modal/modal'
import Form from '../../components/Form/Form'
import Alert from '../../components/Alert/Alert'

import classes from './Members.module.css'

class Members extends Component {
    state = {
        groups: [],
        members: [],
        display: 0,
        addMemberModalShow: false,
        editMemberModalShow: false,
        editMemberId: null,
        deleteMemberAlertShow: false
    }

    getGroups = async () => {
        const response = await axios.get('groups')
            this.setState({
                groups: response.data
            })
    }

    getMembers = async () => {
        const response = await axios.get('members')
        this.setState({
            members: response.data
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

    editMember = async (memberId, member) => {
        const response = await axios.put(`members/${memberId}`, member)
        if(response.status === 200) {
            this.getMembers()
            this.setState({
                editMemberModalShow: false
            })
        }
    }

    deleteMember = async () => {
        const response = await axios.delete(`members/${this.state.editMemberId}`)
        if(response.status === 200) {
            this.getMembers()
            this.setState({
                deleteMemberAlertShow: false,
            })
            this.toggleEditMemberModal()
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

    toggleEditMemberModal = (memberId) => {
        this.setState((prevState) => {
            return {
                editMemberModalShow: !prevState.editMemberModalShow,
                editMemberId: memberId ? memberId : null
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

    submitEditMemberHandler = (member) => {
        this.editMember(this.state.editMemberId, member)
    }

    toggleDeleteMemberAlert = () => {
        this.setState((prevState) => {
            return {
                deleteMemberAlertShow: !prevState.deleteMemberAlertShow
            }
        })
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
                <tr key={ member.member_id } onClick={ () => this.toggleEditMemberModal(member.member_id) }>
                    <td>{ index + 1 }</td>
                    <td>{ member.member_name }</td>
                    <td>{ member.member_surname }</td>
                    <td>{ member.member_email }</td>
                </tr>
            )
        })

        const addMemberFields = [
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

        const editMemberFields = [
            {
                type: "text",
                label: "Name",
                name: "name",
                defaultValue: this.state.editMemberId ? this.state.members.filter(member => member.member_id === this.state.editMemberId)[0].member_name : null,
                validation: ['required', 'minLength:4']
            },
            {
                type: "text",
                label: "Surname",
                name: "surname",
                defaultValue: this.state.editMemberId ? this.state.members.filter(member => member.member_id === this.state.editMemberId)[0].member_surname : null,
                validation: ['required', 'maxLength:16']
            },
            {
                type: "email",
                label: "Email Address",
                name: "email",
                defaultValue: this.state.editMemberId ? this.state.members.filter(member => member.member_id === this.state.editMemberId)[0].member_email : null,
                validation: ['isEmail']
            },
            {
                type: "select",
                label: "Group",
                name: "group",
                defaultValue: this.state.editMemberId ? this.state.members.filter(member => member.member_id === this.state.editMemberId)[0].group_id : null,
                validation: ['required'],
                options: this.state.groups.map((group) => {
                    return {
                        value: group.group_id,
                        text: group.group_name
                    }
                })
            }
        ]

        const deleteMemberAlert = this.state.deleteMemberAlertShow &&
            <Alert accept={ this.deleteMember } closeAlert={ this.toggleDeleteMemberAlert }>
                Are you sure to delete this member?
            </Alert>

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
                <Modal
                    show={ this.state.addMemberModalShow }
                    onHide={ this.toggleAddMemberModal }
                    modaltitle="Add New Member"
                >
                    <Form
                        submitHandler={ this.submitAddMemberHandler }
                        fields={ addMemberFields }
                        btnText="Add"
                    />
                </Modal>
                <Modal
                    show={ this.state.editMemberModalShow }
                    onHide={ this.toggleEditMemberModal }
                    modaltitle="Member Panel"
                >
                    <Form
                        submitHandler={ this.submitEditMemberHandler }
                        fields={ editMemberFields }
                        btnText="Edit"
                        title="Edit Member"
                    />
                    <div className={ classes.editUtilities }>
                        <h2 className={ classes.title }>Delete Member</h2>
                        { deleteMemberAlert }
                        <Button variant="primary" type="button" disabled={ this.state.deleteMemberAlertShow ? 'disabled' : null } onClick={ this.toggleDeleteMemberAlert }>Delete</Button>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Members