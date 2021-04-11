import React, {useState} from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import CreateUser from './CreateUser';
import EditUser from './EditUser'

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

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) { 
    deleteUser(input: {id: $id}) {
      userId
      message
    }
  }
`

const Users = ({selectUser}) => {
    const [isCreatingUser, setIsCreatingUser] = useState(false)
    const [isEditingUser, setIsEditingUser] = useState(false)
    const [user, setUser] = useState()

    const updateUsers = (cache, { data: { createUser } }) => {
        const { users } = cache.readQuery({ query: USERS_QUERY });
        cache.writeQuery({
            query: USERS_QUERY,
            data: { users: users.concat([createUser.user]) },
        });
    }

    const removeUser = (cache, { data: {deleteUser: {userId}} }) => {
      const { users } = cache.readQuery({ query: USERS_QUERY });
      cache.writeQuery({
          query: USERS_QUERY,
          data: { users: users.filter((user) => user.id !== userId) },
      });
  }

    const handleUserEdit = (user) => {
      setIsCreatingUser(false)
      setIsEditingUser(true)
      setUser(user)
    }
    
    const handleUserDelete = (deleteUser, id) => {
      deleteUser({variables: {id}})
    }

    return (
      <Query query={USERS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching..</div>
          if (error) return <div>Error!</div>
          return (
            <>
             {isCreatingUser ? 
              <div style={{backgroundColor:'gray', margin: 'auto',width: '30%'}} className="rounded overflow-hidden shadow-lg">
                <CreateUser setIsCreatingUser={setIsCreatingUser} onCreateUser={updateUsers} />
              </div>
              :(<>
                {isEditingUser ? (
                  <EditUser user={user} setUser={setUser} setIsEditingUser={setIsEditingUser} />
                )
                :  
                <div style={{textAlign:'center'}}>
                  <button onClick={() => setIsCreatingUser(true)} style={{marginTop: '10px', padding:'15px', backgroundColor:"green",width: 'auto'}}>Create new user</button> 
                </div>
              }
                </>)
             }
              <div className="flex flex-wrap mb-4">
                {data.users.map((user) => {
                  return <div style={{backgroundColor:'lightgray', display:'flex', justifyContent:"space-between"}} key={user.id} className="m-4 w-1/4 rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                      <div onClick={() => selectUser(user)} style={{cursor:'pointer', textDecoration:'underline'}} className="font-bold text-xl mb-2">{user.name}</div>
                      <p className="text-grey-darker text-base">{user.email}</p>
                      <p className="text-grey-darker text-base">{user.booksCount} books</p>
                    </div>
                    <div style={{alignSelf:'center', marginRight: '30px'}}>
                      <button onClick={() => handleUserEdit(user)} style={{backgroundColor: 'yellow', marginBottom: '20px'}}>Edit</button><hr></hr>
                      <Mutation
                        mutation={DELETE_USER}
                        update={removeUser}>
                        {deleteUserMutation => (
                          <button onClick={() => handleUserDelete(deleteUserMutation, user.id)} style={{backgroundColor: 'red'}} >Delete</button>
                        )}
                    </Mutation>
                    </div>
                  </div>
                })}
              </div>
            </>
          )
        }}
      </Query>
    )
  }
  export default Users;