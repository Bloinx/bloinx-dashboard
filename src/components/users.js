import React from 'react'

function users(props) {
    const {users} = props;
  return (
    <div>
        <h2 className="text-xl font-bold underline">Users</h2>
        {
        users !== [] ?
          users?.map((user) =>
          (
            <p key={user.uid}>{user.email}</p>
          )) : (
            <>
            </>
          )
      }
    </div>
  )
}

export default users