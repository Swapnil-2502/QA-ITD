import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const[users, setUsers] = useState([])
  const [error, setError] = useState(null)

  useEffect(()=>{
    fetch("https://dummyjson.com/users")
      .then((response)=>{
        if(!response.ok) throw new Error("Failed to fetch Data")

          return response.json()
      })
      .then((data)=>{
        console.log(data)
        setUsers(data.users)
      })
      .catch((err)=>{
        setError(err.message)
      })
  },[])
  if(error) return <p>Error: {error}</p>
  return(
    <>
      <h1>From App</h1>

      <ul>
        {users.map((user)=>(
          <li key={user.id}>{user.firstName} {user.lastName}</li>
        ))}
      </ul>
    </>
    
  )
}

export default App;
