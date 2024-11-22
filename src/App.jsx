import axios from 'axios'
import React, {useEffect, useState, createContext, useContext} from 'react'
import {Outlet} from 'react-router-dom'


export const apiData = createContext()

export function useApi(){
  return useContext(apiData)
}

const App = () => {
  const [data, setData] = useState([])

  const API = "https://jsonplaceholder.typicode.com/photos"
  const fetchApi = async ()=>{
    try{
      const res = await axios.get(API)
      setData(res.data)
      
    }
    catch(error){
      console.log("error", error)
    }
  }

  useEffect(()=>{
    fetchApi()

  },[])
  console.log("data", data)
  return (
    <apiData.Provider value={data}>

      <Outlet/>
    </apiData.Provider>
  )
}

export default App
