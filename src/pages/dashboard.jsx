import React,{useState, useEffect} from 'react'
import Password from '../components/password';
import AddPassword from '../components/add-password';

const Dashboard = () => {
  const [passwords,setPasswords] = useState([]);
  useEffect(()=>{
    loadPasswords();
  },[])

  const logout = () => {
    localStorage.removeItem('session');
    const query = `
      mutation{
        userLogout(session: "${localStorage.getItem('session')}"){
          success
          message
        }
      }
    `;
    fetch('/api',{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:  JSON.stringify({query})
    })
    .then(response=>response.json())
    .then(({data})=>{
      window.location.href = "/";
    })
  }

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
      if(data.getPasswords.success){
        setPasswords(data.getPasswords.passwords)
      }else{
        window.location.href = "/sign-in"
      }
    })
  }


  return (
    <div className="container">
      <h1 className="text-center">Passwords</h1>
      <AddPassword/>
      {passwords.map((password,k)=>(
        <Password key={k} password={password.password} label={password.label}/>
      ))}
      <div className="text-center">
        <button style={{fontSize: 28}} className="btn-prim" onClick={logout}>Logout</button>
      </div>
    </div>
  )
}

export default Dashboard
