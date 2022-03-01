import logo from './logo.svg';
import './App.css';
import Users from './components/users';
import Rounds from './components/rounds';
import { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import db from './firebase/firebaseconfig.js'
import { data } from 'autoprefixer';
import Web3 from "web3";
import ABI from './abis/SavingGroups.json';
import { newKitFromWeb3 } from "@celo/contractkit";

const web3 = new Web3("https://forno.celo.org")
const kit = newKitFromWeb3(web3);




function App() {
  let [users, setUsers] = useState([]);
  let [rounds, setRounds] = useState([]);
  let [showModal, setShowModal] = useState(false);

  // const Web3 = require("web3");
  // const ContractKit = require("@celo/contractkit");
  

  // const kit = ContractKit.newKitFromWeb3(web3);
  // const web3 = new Web3("https://alfajores-forno.celo-testnet.org");

  useEffect( () => {

    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
  
        setUsers(oldArray => [...oldArray, doc.data()]);
  
  
      });
  
      const queryRoundSnapshot = await getDocs(collection(db, "round"));
      queryRoundSnapshot.forEach((doc) => {
  
        setRounds(oldArray => [...oldArray, doc.data()]);
        console.log(doc.data());
            const address = doc.data().contract;
            // let contract = new kit.connection.web3.eth.Contract(ABI, address) 
            const contract = new web3.eth.Contract(ABI, address);
            async function getContractPublicVariable() {
                const stage = await contract.methods.stage.call().call();
                console.log("stage:" + stage)
            }
            getContractPublicVariable();
      });
    }

    getData();



    // const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
    // let provider = window.ethereum;

  }, []);
  return (
    <div className="App">
    <h1 className="text-3xl font-bold underline">
      Bloinx Dashboard
    </h1>
    <div className="flex justify-center">
      <div className="mb-3 xl:w-96">
        <div className="input-group  flex flex-row items-stretch w-full mb-4">
          <input type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search by contract" aria-label="Search" aria-describedby="button-addon2"/>
          <button onClick={()=> setShowModal(true)} className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="Search by contract" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <Rounds rounds={rounds}></Rounds>
    <Users users={users}></Users>
    {
      showModal ? (
        // <div className="fixed z-10 overflow-y-auto top-0 w-full left-0" id="modal">
        // <button type="button" className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2" onClick={()=> setShowModal(true)}><i className="fas fa-times"></i> Cancel</button>
        //   <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        //     <div className="fixed inset-0 transition-opacity">
        //       <div className="absolute inset-0 bg-gray-900 opacity-75" />
        //     </div>
        //     <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        //     <div className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        //       <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        //         <label>Name</label>
        //         <input type="text" className="w-full bg-gray-100 p-2 mt-2 mb-3" />
        //         <label>Url</label>
        //         <input type="text" className="w-full bg-gray-100 p-2 mt-2 mb-3" />
        //       </div>
        //     </div>
        //   </div>
          
        //  </div>


<div className="fixed z-10 overflow-y-auto top-0 w-full left-0 " id="modal">
  <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div className="fixed inset-0 transition-opacity">
      <div className="absolute inset-0 bg-gray-900 opacity-75" />
    </div>
    <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
    <div className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <label>Stage</label>
        <input type="text"  className="w-full bg-gray-100 p-2 mt-2 mb-3" />
        <label>Url</label>
        <input type="text" className="w-full bg-gray-100 p-2 mt-2 mb-3" />
      </div>
      <div className="bg-gray-200 px-4 py-3 text-right">
        <button type="button" className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2" onClick={()=> setShowModal(false)}><i className="fas fa-times"></i> Volver</button>
      </div>
    </div>
  </div>
</div>
        

      ): (
        <>
        </>
      )
    }

    </div>
  );
}

export default App;
