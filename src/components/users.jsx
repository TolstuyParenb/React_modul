import React, {useState} from 'react'

import api from '../api'

const Users=()=>{
   const [users, setUsers]=useState(api.users.fetchAll())

   const handleDelete = (userId)=>{
   setUsers(users.filter((user)=> user._id !== userId))   
   }
  
   const renderPhrase = (numbers)=>{
    const peoples = ["человек", "человека", "человек"]
   let currentPeople = users.length
      let cases = [2, 0, 1, 1, 1, 2]; 
      return peoples[ 
        currentPeople % 100 > 4 && currentPeople % 100 < 20 
          ? 2 
          : cases[currentPeople % 10 < 5 ? currentPeople % 10 : 5] 
      ]; 
    } 
    
    const formatCount = ()=>{
      return users.length !== 0?`${users.length} ${renderPhrase()} тусанет с тобой сегодня`:'Никто с тобой не тусанет'
  }
       
     if (users.length===0){
     return <h1 className='badge bg-danger fs-1'>Никто с тобой не тусанет</h1> 
     }
    
   return (
      <>
       <h1 className='badge bg-primary fs-1'>{formatCount()}</h1>
     
      <table className='table'>
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качество</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>  
          </tr>
          </thead>
          <tbody>
         { users.map((user)=>{
       return( 
        <tr key={users._id} >
        <td>{user.name}</td>
        <td>{user.qualities.map((qualitie)=>{ 
        const handleBadgeClasses=()=>{
          return `badge ms-2 bg-${qualitie.color}`
        } 
        return <span className={handleBadgeClasses()}>{qualitie.name} </span>     
       })}</td>
       <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate}</td>
        <td><button className='btn btn-danger m-2'onClick={()=>handleDelete(user._id)}>Delete</button></td>
      </tr>  
      )})  }
       </tbody>
   </table>
   </>
   )
}
export default Users

