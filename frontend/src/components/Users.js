import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import CreateUser from './CreateUser';

const USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      booksCount
    }
  }
`;

class Users extends Component {
    updateUsers = (cache, { data: { createUser } }) => {
        console.log("cache", cache)
        console.log("create", createUser)

        const { users } = cache.readQuery({ query: USERS_QUERY });
        console.log("user", users)
        console.log("cache", cache)
        console.log("concat", users.concat([createUser.user]))
        cache.writeQuery({
            query: USERS_QUERY,
            data: { users: users.concat([createUser.user]) },
        });
    }
    
    render() {
      return (
        <Query query={USERS_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching..</div>
            if (error) return <div>Error!</div>
            return (
              <div className="flex flex-wrap mb-4">
                {data.users.map((user) => {
                  return <div key={user.id} className="m-4 w-1/4 rounded overflow-hidden shadow-lg" onClick={this.props.selectUser.bind(this, user)}>
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">{user.name}</div>
                      <p className="text-grey-darker text-base">{user.email}</p>
                      <p className="text-grey-darker text-base">{user.booksCount} books</p>
                    </div>
                  </div>
                })}
                <div className="m-4 w-1/4 rounded overflow-hidden shadow-lg">
                    <CreateUser onCreateUser={this.updateUsers} />
                </div>
              </div>
            )
          }}
        </Query>
      )
    }
  }
  export default Users;