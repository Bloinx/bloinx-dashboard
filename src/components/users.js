import React from 'react'

function users(props) {
    const {users} = props;
  return (
    <div>
        <h2 className="text-xl font-bold underline">Users</h2>
        <div  className=" bg-gray-100 flex flex-wrap gap-12 justify-center ">
        {
        users !== [] ?
          users?.map((user) =>
          (
            <div key={user.uid} className="rounded-lg shadow-lg bg-white p-6 w-76 group hover:shadow-2xl">
                        
                    
            <p className="text-lg text-gray-800 font-semibold">UserId: {user.uid } </p>

            
        
            <p className="text-gray-600 font-light mt-5"> Email: {user.email } </p>
            <p className="text-gray-600 font-light mt-5"> Name: {user.displayName } </p>

            

        </div>
          )) : (
            <>
            </>
          )
      }
       </div>
    </div>
  )
}

export default users