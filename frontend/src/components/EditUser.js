import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const EDIT_USER = gql`
  mutation EditUser($id: ID!, $name: String, $email: String) {
    updateUser(input: {id: $id, name: $name, email: $email }) {
      user {
        id
        name
        email
      }
      errors
    }
  }
`;

class EditUser extends Component {
    state = {
      name: '',
      email: ''
    }
    onSubmit = (e, editUser) => {
        e.preventDefault();
        console.log("edituser", editUser)
        editUser({ variables: {...this.state, id: this.props.user.id} });
        this.setState({ name: '', email: '' });
        this.props.setIsEditingUser(false)
        this.props.setUser(null)
    }

    render() {
      return (
        <Mutation
            mutation={EDIT_USER} >
            {editUserMutation => (
                <form className="px-8 pt-6 pb-8 mb-4" onSubmit={e => this.onSubmit(e, editUserMutation)}>
                <h4 className="mb-3">Edit user</h4>
                <div className="mb-4">
                    <input
                    className="border rounded w-full py-2 px-3"
                    type="text"
                    value={this.state.name}
                    placeholder={this.props.user.name}
                    onChange={e => this.setState({ name: e.target.value })} />
                </div>
                <div className="mb-6">
                    <input
                    className="border rounded w-full py-2 px-3"
                    type="email"
                    value={this.state.email}
                    placeholder={this.props.user.email}
                    onChange={e => this.setState({ email: e.target.value })} />
                </div>
                <button
                  style={{backgroundColor: 'lightblue'}}
                    className="py-2 px-4 rounded"
                    type="submit">
                    Edit
                </button>
                <button
                  style={{backgroundColor: 'red', marginLeft: '10px'}}
                    onClick={() => this.props.setIsEditingUser(false)}
                    className="py-2 px-4 rounded"
                    type="submit">
                    Cancel
                </button>
                </form>
            )}
        </Mutation>
      );
    }
  }
  export default EditUser;