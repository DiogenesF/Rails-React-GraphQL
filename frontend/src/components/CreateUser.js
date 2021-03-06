import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(input: { name: $name, email: $email }) {
      user {
        id
        name
        email
        booksCount
      }
      errors
    }
  }
`;

class CreateUser extends Component {
    state = {
      name: '',
      email: ''
    }
    onSubmit = (e, createUser) => {
        e.preventDefault();
        console.log("createuser", createUser)
        createUser({ variables: this.state });
        this.setState({ name: '', email: '' });
        this.props.setIsCreatingUser(false)
    }

    render() {
      return (
        <Mutation
            mutation={CREATE_USER}
            update={this.props.onCreateUser}>
            {createUserMutation => (
                <form className="px-8 pt-6 pb-8 mb-4" onSubmit={e => this.onSubmit(e, createUserMutation)}>
                <h4 className="mb-3">Create new user</h4>
                <div className="mb-4">
                    <input
                    className="border rounded w-full py-2 px-3"
                    type="text"
                    value={this.state.name}
                    placeholder="Name"
                    onChange={e => this.setState({ name: e.target.value })} />
                </div>
                <div className="mb-6">
                    <input
                    className="border rounded w-full py-2 px-3"
                    type="email"
                    value={this.state.email}
                    placeholder="Email"
                    onChange={e => this.setState({ email: e.target.value })} />
                </div>
                <button
                  style={{backgroundColor: 'lightblue'}}
                    className="py-2 px-4 rounded"
                    type="submit">
                    Create
                </button>
                <button
                    onClick={() => this.props.setIsCreatingUser(false)}
                    style={{backgroundColor: 'red', marginLeft: '20px'}}
                    className="py-2 px-4 rounded"
                    type="submit">
                    Delete
                </button>
                </form>
            )}
        </Mutation>
      );
    }
  }
  export default CreateUser;