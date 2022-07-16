import React from 'react';
import { useEffect, useState } from 'react';
import reactDOM from 'react-dom';
import axios from 'axios'

const fetchData = (pageNumber) =>{
  // GET request for remote image in node.js
  return axios({
    method: 'get',
    url: `https://randomuser.me/api?page=${pageNumber}`,// j'ai besoin de le passer en param
  })
  .then(({data})=> {
    // console.log(data)
    return data;
  })
;}
const getName=(userIndivInfo)=>{
  const {name:{last, first}}=userIndivInfo// tu me récupères quand cette fonction est appelée le name et last, first
  return `${last} ${first}`
}

export default function App(){
  const [counter, setCounter] = useState(0)
  const [randomUserDataJSON, setRandomUserDataJSON] = useState('re')
  const [userName, setUserName] = useState([])
  const [pageNumber, setPageNumber] = useState(1)

  const fetchNextUser=()=>{ fetchData(pageNumber)
    .then(randomData =>{
      //setRandomUserDataJSON(JSON.stringify(randomData))
      const addUserInfos=[
        ...userName, 
        ...randomData.results
      ]
      // setUserName(randomData.results);// Au moment ou je fais le set, je remplace la valeur userInfos.
      setUserName(addUserInfos)
      setPageNumber(randomData.results.page+1);

    })
  }
  // useEffect(() =>{
  //   fetchData()
  //   .then(randomData =>{
  //     setRandomUserDataJSON(JSON.stringify(randomData))
  //     setUserName(randomData.results);// Au moment ou je fais le set, je remplace la valeur userInfos.
  //     setPageNumber(pageNumber+1);
  //   })
  // },[])
  return (
   <div>
    {counter}
    <button onClick={()=>setCounter(counter+1)}>
      Increase counter
    </button>
    <button onClick={()=>{(fetchNextUser())}}>
      Fetch
    </button>
    <pre>
      {randomUserDataJSON}
    </pre>
    <p>

{
  userName.map((userInfo) => (// je boucle ici dans tous les objets de userinfos et 
  <>
    <p>
      {getName(userInfo)}
    </p>
    <img src={userInfo.picture.thumbnail} alt="" />

    <p>
      {pageNumber}
    </p>
    </>
  ))
  }
</p>
   </div>
  )
}

reactDOM.render(<App />, document.getElementById('root'))