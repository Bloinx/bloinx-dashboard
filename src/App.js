import logo from "./logo.svg";
import "./App.css";
import Users from "./components/users";
import Rounds from "./components/rounds";
import DetailRound from "./components/detailRound";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "./firebase/firebaseconfig.js";
import { data } from "autoprefixer";
import Web3 from "web3";
import ABI from "./abis/SavingGroups.json";
import { newKitFromWeb3 } from "@celo/contractkit";

const web3 = new Web3("https://forno.celo.org");
// const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
const kit = newKitFromWeb3(web3);

function App() {
  let [users, setUsers] = useState([]);
  let [rounds, setRounds] = useState([]);
  let [showInfo, setShowInfo] = useState(false);
  let [showEmailInfo, setShowEmailInfo] = useState(false);
  let [contractSearch, setContractSearch] = useState("");
  let [emailSearch, setEmailSearch] = useState("");
  let [emailSearchResult, setEmailSearchResult] = useState([]);
  let [userIdSearch, setUserIdSearch] = useState('');
  let [userRounds, setUserRounds] = useState([]);
  let [showUserRoundInfo,setShowUserRoundInfo] = useState(false);
  let [searchResult, setSearchResult] = useState([]);
  const [usersRound, setUsersRound] = useState([]);

  let [stageValue, setStageValue] = useState(-1);

  let [contractValues, setContractValues] = useState({});

  // useEffect( () => {

  //   const getData = async () => {
  //     const querySnapshot = await getDocs(collection(db, "users"));
  //     querySnapshot.forEach((doc) => {

  //       setUsers(oldArray => [...oldArray, doc.data()]);

  //     });

  //     const queryRoundSnapshot = await getDocs(collection(db, "round"));
  //     queryRoundSnapshot.forEach((doc) => {

  //       setRounds(oldArray => [...oldArray, doc.data()]);

  //     });
  //   }

  //   getData();

  // }, []);


  const getContractInfo = async (address) => {
    if(searchResult!== []){
      setSearchResult([]);
      setUsersRound([]);
    }
    const contract = new web3.eth.Contract(ABI, address);

    try {
      const stage = await contract.methods.stage.call().call();
      setStageValue(stage);
      console.log(stage);
      const totalCash = await contract.methods.totalCashIn.call().call();
      
      const cashEth = web3.utils.fromWei(totalCash, 'ether');
      const startTime = await contract.methods.startTime.call().call();
      var start = new Date(startTime*1000);
      const saveAmount = await contract.methods.saveAmount.call().call();
      const saveAmountEth = web3.utils.fromWei(saveAmount, 'ether');
      const turn = await contract.methods.turn.call().call();
      const payTime = await contract.methods.payTime.call().call();
      var pay = new Date(payTime*1000);
  
      const contractVal = {
        stage: stage,
        totalCashIn: cashEth,
        startTime: start.toLocaleString(),
        saveAmount: saveAmountEth,
        turn: turn,
        payTime: pay.toLocaleString()
      };

      setContractValues((values) => ({
        ...values,
        ...contractVal,
      }));

      try{

        const q = query(
          collection(db, "round"),
          where("contract", "==", address)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          setSearchResult((oldArray) => [...oldArray, doc.data()]);
          setUsersRound( doc.data().positions);

        });
  
        
  
      }catch(e){
        console.log(e);
      }finally{
        setShowInfo(true);
        setShowEmailInfo(false);
      }


    } 
    catch (e) {
      console.log(e);
    }



    

  };


  const getUserRounds = (userId) => {

    const getRounds = async () =>{
      const queryRoundSnapshot = await getDocs(collection(db, "round"));
      queryRoundSnapshot.forEach((doc) => {

        setRounds(oldArray => [...oldArray, doc.data()]);

      });
    }
    getRounds().then(
      rounds.map((round, index)=>{
        for( let i=0; i<round.positions.length; i++){
          if(round.positions[i].userId == userId){
            setUserRounds((oldArray) => [...oldArray, round]);
            console.log('hola' + userId)
          }
        }
      })
    );
  }

  const getUserInfo = async (email) =>{
    if(emailSearchResult!== []){
      setEmailSearchResult([]);
      setUserRounds([]); 
    }



    try{

      const q = query(
        collection(db, "users"),
        where("email", "==", email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        setEmailSearchResult((oldArray) => [...oldArray, doc.data()]);
        setUserIdSearch(doc.data().uid);
        console.log(doc.data())
      });
      

    }catch(e){
      console.log(e);
    }finally{
      getUserRounds(userIdSearch);
      setShowInfo(false);
      setShowEmailInfo(true);
    }


  }

  const getUserRoundInfo = (address) =>{
    getContractInfo(address);
    setShowUserRoundInfo(true);
  }

  const [availableCashIn, setAvailableCashIn] = useState(0);
  const [availableSavings, setAvailableSavings] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);
  const [unassignedPayments, setUnassignedPayments] = useState(0);
  const [laterPayments, setLatePayments] = useState(0);
  const [owedTotalCashIn, setOwedTotalCashIn] = useState(0);
  const [isActive, setIsActive] = useState(Boolean);
  
  
  
  const [currentUserTurn, setCurrentUserTurn] = useState(-1);
  let [showInfoUserContract, setShowInfoUserContract] = useState(false);

  const getUserInfoByTurn  = async (turn, address) =>{
    setCurrentUserTurn(turn);
    setShowInfoUserContract(true);

    const contract = new web3.eth.Contract(ABI, address);
    try{
      const cashIn = await contract.methods.getUserAvailableCashIn(turn).call();
      const avaiSavings = await contract.methods.getUserAvailableSavings(turn).call();
      const amouPaid = await contract.methods.getUserAmountPaid(turn).call();
      const unassignPayments = await contract.methods.getUserUnassignedPayments(turn).call();
      const latePay = await contract.methods.getUserLatePayments(turn).call();
      const owedTotal = await contract.methods.getUserOwedTotalCashIn(turn).call();
      const isAct = await contract.methods.getUserIsActive(turn).call();
      

      setAvailableCashIn(cashIn);
      setAvailableSavings(avaiSavings);
      setAmountPaid(amouPaid);
      setUnassignedPayments(unassignPayments);
      setLatePayments(latePay);
      setOwedTotalCashIn(owedTotal);
      setIsActive(isAct);

    
    }catch(e){
      console.log(e)
    }

  }
  

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Bloinx Dashboard</h1>
      <div className="flex justify-center">
        <div className="mb-3 xl:w-96">
          <div className="input-group  flex flex-row items-stretch w-full mb-4">
            <input
              value={contractSearch}
              onChange={(e) => setContractSearch(e.target.value)}
              type="search"
              className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Search by contract"
              aria-label="Search"
              aria-describedby="button-addon2"
            />
            <button
              onClick={() => getContractInfo(contractSearch)}
              className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
              type="button"
              id="button-addon2"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="Search by contract"
                className="w-4"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="mb-3 xl:w-96">
          <div className="input-group  flex flex-row items-stretch w-full mb-4">
            <input
              value={emailSearch}
              onChange={(e) => setEmailSearch(e.target.value)}
              type="search"
              className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Search by email"
              aria-label="Search"
              aria-describedby="button-addon2"
            />
            <button
              onClick={() => getUserInfo(emailSearch)}
              className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
              type="button"
              id="button-addon2"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="Search by email"
                className="w-4"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* <Rounds rounds={rounds}></Rounds>
    <Users users={users}></Users> */}
      {showInfo ? (
      <>
            {

      <>

      <h1 className="text-xl font-bold underline">En esta ronda:</h1>


      {
                        usersRound?.map((user, index) => {
                          return (
                            <div
                              key={index}
                              className=" flex flex-col bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
                            >
                              <label className="w-1/2 text-left" >Name</label>
                              <input
                                type="text"
                                readOnly={true}
                                value={user?.name}
                                className="w-1/2 bg-gray-100 p-2 mt-2 mb-3"
                              />
                              <label className="w-1/2 text-left">WalletAddress</label>
                              <input
                                type="text"
                                readOnly={true}
                                value={user?.walletAddress}
                                className="w-1/2 bg-gray-100 p-2 mt-2 mb-3"
                              />
        
                              <label className="w-1/2 text-left">Turn</label>
                              <input
                                type="text"
                                readOnly={true}
                                value={user?.position}
                                className="w-1/2 bg-gray-100 p-2 mt-2 mb-3"
                              />
                             
                              <label className="w-1/2 text-left">Motivation</label>
                              <input
                                type="text"
                                readOnly={true}
                                value={user?.motivation}
                                className="w-1/2 bg-gray-100 p-2 mt-2 mb-3"
                              />
                             <button className=" w-1/5 btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                             type="button"
                              onClick={()=>getUserInfoByTurn(user?.position, searchResult[0]?.contract)}>Ver +</button>
                            </div>
                
                          );
                        })
      }
      </>

      }
      {
       <>

        <h1 className="text-xl font-bold underline">Detalles de la ronda:</h1>


        {
          searchResult.map((result, index)=>{
            return(
              <DetailRound key={index} result={result} contractValues={contractValues}></DetailRound>
            )
          })
        }

       </> 
        

      }


      </>
      
        ) : (
        <>
        </>
      )}

      {
        showEmailInfo ? (
          <>
          {
            emailSearchResult?.map((result, index)=>{
              return(
                <h1 key={index} className="text-xl font-bold underline">{result.uid}</h1>
              )
            })
          }

          <h1 className="text-xl font-bold underline">Rondas</h1>
          {
            userRounds?.map((round, index)=>{
              return(
                <div key={index}>
                  <p>Contrato: {round.contract}</p>
                  <button
                    onClick={() => getUserRoundInfo(round.contract)}
                    className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                    type="button"
                    id="button-addon2"
                  >
                    ver +
                  </button>

                </div>
              )
            })
          }
            {showUserRoundInfo ? (
                    <>
                    
                    {

                                searchResult?.map((result, index)=>{
                                  return(
                                    <DetailRound key={index} result={result} contractValues={contractValues}></DetailRound>
                                  )
                                })
                    }
                    </>
                  ) : (
                    <></>
                  )
                  }
          </>
        ) : (
          <>

          </>
        )
      }

    {showInfoUserContract ? (
        <div
          className="fixed z-10  top-0 w-full left-0 "
          id="modal"
        >
          <div className="flex items-center justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-900 opacity-75" />
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
              &#8203;
            </span>
            <div
              className="min-height-120vh inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
 
      
                  <div
                   
                    className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
                  >
                  <div className="flex items-center justify-center">
                    <label  className="w-full">Current User Turn:</label>
                      <input
                        readOnly={true}
                        type="text"
                        value={currentUserTurn}
                        className="w-full bg-gray-100 p-2 mt-2 mb-3"
                      />
                  </div>
                  <div className="flex items-center justify-center">
                    <label className="w-full">available Cash In</label>
                      <input
                        readOnly={true}
                        type="text"
                        value={availableCashIn}
                        className="w-full bg-gray-100 p-2 mt-2 mb-3"
                      />
                  </div>
                  <div className="flex items-center justify-center">
                    <label className="w-full">getUserAvailableSavings</label>
                      <input
                        readOnly={true}
                        type="text"
                        value={availableSavings}
                        className="w-full bg-gray-100 p-2 mt-2 mb-3"
                      />
                  </div>
                  <div className="flex items-center justify-center">
                    <label className="w-full">Amount Paid</label>
                      <input
                        readOnly={true}
                        type="text"
                        value={amountPaid}
                        className="w-full bg-gray-100 p-2 mt-2 mb-3"
                      />
                  </div>
                  <div className="flex items-center justify-center">
                    <label className="w-full">Unassigned Payments</label>
                      <input
                        readOnly={true}
                        type="text"
                        value={unassignedPayments}
                        className="w-full bg-gray-100 p-2 mt-2 mb-3"
                      />
                  </div>
                  <div className="flex items-center justify-center">
                    <label className="w-full">Later Payments</label>
                      <input
                        readOnly={true}
                        type="text"
                        value={laterPayments}
                        className="w-full bg-gray-100 p-2 mt-2 mb-3"
                      />
                  </div>
                  <div className="flex items-center justify-center">
                    <label className="w-full">Owed Total CashIn</label>
                      <input
                        readOnly={true}
                        type="text"
                        value={owedTotalCashIn}
                        className="w-full bg-gray-100 p-2 mt-2 mb-3"
                      />
                  </div>

                  <div className="flex items-center justify-center">
                    <label className="w-full">Is Active</label>
                      <input
                        readOnly={true}
                        type="text"
                        value={isActive}
                        className="w-full bg-gray-100 p-2 mt-2 mb-3"
                      />
                  </div>
                   
                  
                  </div>
            
            

              <div className="bg-gray-200 px-4 py-3 text-right">
                <button
                  type="button"
                  className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                  onClick={() => setShowInfoUserContract(false)}
                >
                  <i className="fas fa-times"></i> Volver
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
