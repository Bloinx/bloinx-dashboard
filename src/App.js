import logo from './logo.svg';
import './App.css';
import Users from './components/users';
import Rounds from './components/rounds';
import { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import db from './firebase/firebaseconfig.js'
import { data } from 'autoprefixer';


function App() {
  let [users, setUsers] = useState([]);
  let [rounds, setRounds] = useState([]);


  useEffect(async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {

      setUsers(oldArray => [...oldArray, doc.data()]);


    });

    const queryRoundSnapshot = await getDocs(collection(db, "round"));
    queryRoundSnapshot.forEach((doc) => {

      setRounds(oldArray => [...oldArray, doc.data()]);
      console.log(doc.data());
    });



  }, []);
  return (
    <div className="App">
    <h1 className="text-3xl font-bold underline">
      Bloinx Dashboard
    </h1>
    <Users users={users}></Users>
    <Rounds rounds={rounds}></Rounds>

    </div>
  );
}

export default App;
