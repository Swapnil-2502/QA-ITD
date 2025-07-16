import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const[user, setUser] = useState([])
  const [error, setError] = useState(null)
  const [userId, setUserId] = useState('')
  const [showName, setshowName] = useState('')
  const [checkName, setCheckName] = useState(false)

  const handleChange = (e) => {
    setUserId(e.target.value)
  }

  const handleRadioChange = (e) =>{
    setshowName(e.target.value)
  } 

  const handleCheckbox = (e) => {
    setCheckName(e.target.checked)
  }

  useEffect(()=>{
    fetch(`https://dummyjson.com/users/${userId}`)
      .then((response)=>{
        if(!response.ok) throw new Error("Failed to fetch Data")

          return response.json()
      })
      .then((data)=>{
        console.log(data)
        setUser(data)
      })
      .catch((err)=>{
        setError(err.message)
      })
  },[userId])


  if(error) return <p>Error: {error}</p>

  return(
    <div id="project">
      <h1>From App</h1>
      <input type="number" onChange={handleChange}  /><br></br>

      <div>
        <label>
          <input type="radio" name="showName" value="yes" onChange={handleRadioChange} />
          Yes
        </label>
        <label>
          <input type="radio" name="showName" value="no" onChange={handleRadioChange} />
          No
        </label>
      </div>

      <div>
        <label>
          <input type="checkbox" checked={checkName} value="yes" onChange={handleCheckbox}/>
          Show Name
        </label>
      </div>

      {user && showName === "yes" && checkName && <h3>{user.firstName}</h3>}
      
    </div>
    
  )
}

export default App;

// This app fetches the details of a user based on the ID entered in the input box.
// After fetching, the user's first name is displayed only if:
// - The "Yes" radio button is selected
// - The "Show Name" checkbox is checked