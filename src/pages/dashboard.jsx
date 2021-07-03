import React,{useState, useEffect} from 'react'
import Password from '../../api/models/password';

const Dashboard = () => {
  const [passwords,setPasswords] = useState([]);
  useEffect(()=>{
    loadPasswords();
  },[])

  const loadPasswords = () => {
    const query = `
      query{
        getPasswords(session: "${localStorage.getItem('session')}"){
          success
          passwords{
            id
            label
            password
          }
        }
      }
    `;
    fetch('/api',{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({query})
    })
    .then(response=>response.json())
    .then(({data})=>{

    })
  }

  const addPassword = () => {

  }

  return (
    <div className="container">
      <h1 className="text-center">Passwords</h1>
      {passwords.map((password,k)=>(
        <Password key={k} password={password.password} label={password.label}/>
      ))}
    </div>
  )
}

export default Dashboard
