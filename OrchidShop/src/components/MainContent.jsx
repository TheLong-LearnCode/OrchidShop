import React, { useEffect, useState } from 'react'
import Content from './Content'

export default function MainContent() {
  const [orchids, setOrchids] = useState([])

  const fetchAPI = ()=>{
    fetch( `https://67178885b910c6a6e028bc88.mockapi.io/orchids`)
    .then(resp => resp.json())
    .then(data => setOrchids(data))
    .catch(err=> console.error(err))
   } 
   useEffect(() => {
    fetchAPI()
   }, [])

   console.log(orchids)
  return (
    <Content orchidData={orchids} />
  )
}

