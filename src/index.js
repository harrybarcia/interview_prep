import React from 'react'
import reactDOM from 'react-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'

function getData(pageNumber=1) {
  
  return axios
  .get(`https://randomuser.me/api?page=${pageNumber}`)
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
  const [randomData, setrandomData]=useState('re');// me fournit toutes les infos d'un user
  const [userInfos, setUserInfos]=useState([]);//au premier tour de boucle contient les infos d'un user, au 2ème, 
  //append les infos de l'autre user
  const [nextPageNumber, setNextPageNumber]=useState(1)
  
const fetchNextUser=()=>{
  getData(nextPageNumber).then(randomData => { // getData me retourne une promesse, que je vais stocker dans la constante random data. Ici getData().then(randomData() est équivalent à const randomData=await getData.
    //setrandomData(JSON.stringify(randomData || 'No user data'))// et avec random data tu me setrandomData avec cette nouvelle valeur stockée.
    console.log(userInfos)
    const newUserInfos=[
      ...userInfos,
      ...randomData.results
    ]
    setUserInfos(newUserInfos)// je mets à jour mon user infos avec la combinaison des resultats et des userinfos
    setNextPageNumber(randomData.info.page+1)
  })

}
  useEffect(()=>{
    fetchNextUser();
  },[]);

  useEffect(() => {
    document.title = `You clicked ${counter} times`;
  });
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
      <button onClick={()=>{(fetchNextUser())}}> 
        Fetch Next user
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