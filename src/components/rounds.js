import React from 'react'

function rounds(props) {

    const {rounds} = props;
    let a = 0;
    const getId = () => {
      return a++;

    }

  return (
        <div>
            <h2 className="text-xl font-bold underline">Rounds</h2>
            <div  className=" bg-gray-100 flex flex-wrap gap-12 justify-center ">
            {
            
            rounds !== [] ?
            rounds?.map((round) =>
            (
                // <p key={round.contract}>{round.contract}</p>

                    
 
                    <div key={0+ getId()} className="rounded-lg shadow-lg bg-white p-6 w-76 group hover:shadow-2xl">
                        
                    
                        <p className="text-lg text-gray-800 font-semibold">Contract: {round.contract } </p>

                        
                    
                        <p className="text-gray-600 font-light mt-5"> Created by: {round.createByUser } </p>
                        <p className="text-gray-600 font-light mt-5"> Wallet: {round.createByWallet } </p>

                        
                     <p className="text-gray-600 font-light mt-5"> Stage </p>
                        <div className="flex flex-row mt-3 gap-2 place-items-end"> 
                        <p className="text-6xl font-bold"> 1 </p>
                        <p className="text-2xl font-light items-bottom pb-1"> (En curso) </p>
                        </div>
                        
                    
                        <div className="flex flex-col gap-2 mt-5">
                        <p className="text-gray-600 font-light mt-5"> Integrantes: </p>             
                    
                        {round.positions?.map((user)=>(
                                <div key={0+getId()} className="grid grid-cols-12">
                                <div className="col-span-2">
                                    <p>Turn: {user.position}</p>
                                </div>
                                <div className="col-span-10">
                                <p className="text-gray-500"> ID: {user.userId} </p>
                                </div>
                                <div className="col-span-10">
                                <p className="text-gray-500"> Name: {user.name} </p>
                                </div>
                            </div>
                        ))}


                    

                        
                        </div>

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

export default rounds