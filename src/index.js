import React from 'react'
import reactDOM from 'react-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'

function getData() {
  
  return axios
  .get('https://randomuser.me/api')
  .then  (({data})=>{
    console.log(data)
    return (data)
  })
};

function getName(userInfo){
  const {name:{first, last}}=userInfo // j'ai accès aux infos contenues dans setUserInfos
  
  return `${first} ${last}`
}

export default function App(){
  const [counter, setcounter]=useState(0)
  const [randomData, setrandomData]=useState('re');
  const [userInfos, setUserInfos]=useState([])

  useEffect(()=>{
    getData().then(randomData => { // getData me retourne une promesse, que je vais stocker dans la constante random data. Ici getData().then(randomData() est équivalent à const randomData=await getData.
      setrandomData(JSON.stringify(randomData || 'No user data'))// et avec random data tu me setrandomData avec cette nouvelle valeur stockée.
      setUserInfos(randomData.results)
    })
  },[]);


  return (
    <div>
      <p>
        {counter}
      </p>

      <button onClick={()=>{setcounter(counter+1)}}>
        Increase counter
      </button>
      <button > 
        Fetch data
      </button>

      <p>

      <pre>
        {randomData}
      </pre>
      </p>
      <p>

      {
        userInfos.map((userInfo) => (
        <>
          <p>
            {getName(userInfo)}
          </p>
          <img src={userInfo.picture.thumbnail} alt="" />
          </>
        ))
        }
      </p>
    </div>
  )
}
// si je veux faire apparaître dans le click
// onClick={()=>{getData().then(randomData => {setrandomData(randomData)});}}
//          ()=>{getData().then(randomData => {setrandomData(randomData)})

reactDOM.render(<App />, document.getElementById('root'))