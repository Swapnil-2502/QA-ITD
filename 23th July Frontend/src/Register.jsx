import React, { useState } from 'react'
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister = async () => {
        try{
            const res = await axios.post("http://localhost:3001/register",{
                name,
                email,
                password
            })

            console.log('Token:',res.data)

        }
        catch(err){
            console.log(err)
            alert('Registration failed');
        }
    }

  return (
    <>
        <h1>Register</h1>
        <div>
            <label>
                Name:
                <input type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>
                Email
                <input type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>
                Password
                <input type="text" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <button onClick={handleRegister}>Register</button>
        </div>
    </>
  )


}

export default Register