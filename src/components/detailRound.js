import React from 'react'

function detailRound({result, contractValues}) {
  return (

              <div
                key={result.contract}
                className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
              >
                <label>Contract</label>
                <input
                  type="text"
                  readOnly={true}
                  value={result.contract}
                  className="w-full bg-gray-100 p-2 mt-2 mb-3"
                />
                <label>Stage</label>
                <input
                  readOnly={true}
                  type="text"
                  value={contractValues.stage}
                  className="w-full bg-gray-100 p-2 mt-2 mb-3"
                />
                <label>Total Cash In</label>
                <input
                  readOnly={true}
                  type="text"
                  value={contractValues.totalCashIn}
                  className="w-full bg-gray-100 p-2 mt-2 mb-3"
                />
                <label>Start Time</label>
                <input
                  readOnly={true}
                  type="text"
                  value={contractValues.startTime}
                  className="w-full bg-gray-100 p-2 mt-2 mb-3"
                />
                <label>Save Amount</label>
                <input
                  readOnly={true}
                  type="text"
                  value={contractValues.saveAmount}
                  className="w-full bg-gray-100 p-2 mt-2 mb-3"
                />
                <label>Turn</label>
                <input
                  readOnly={true}
                  type="text"
                  value={contractValues.turn}
                  className="w-full bg-gray-100 p-2 mt-2 mb-3"
                />
                <label>Pay Time</label>
                <input
                  readOnly={true}
                  type="text"
                  value={contractValues.payTime}
                  className="w-full bg-gray-100 p-2 mt-2 mb-3"
                />
              </div>
  
  )
}

export default detailRound