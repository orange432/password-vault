import { response } from 'express';
import React,{ useState } from 'react'

const SignUp = () => {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [verifyPassword,setVerifyPassword] = useState('');
  const [message,setMessage] = useState('');

  const signUp = () => {
    if(verifyPassword!==password){
      setMessage('Passwords do not match!');
      setTimeout(()=>setMessage(''),4000);
      return;
    }
    const query = `
    mutation{
      userRegister(username:"${username}",password:"${password}"){
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
      body: JSON.stringify({query})
    })
    .then(response=>response.json())
    .then(({data})=>{
      if(data.success){
        setMessage(data.message);
        setTimeout(()=>{
          window.location.href="/login";
        },1000);
      }else{
        setMessage(data.message);
        setTimeout(()=>setMessage(''),4000);
      }
    })
  }

  return (
    <div className="sign-up">
      <h1 className="sign-up__title">Sign Up</h1>
      <p className="">{message}</p>
      <div className="sign-up__container">
        <label>Username</label>
        <input type="text" onChange={e=>setUsername(e.target.value)}/>
        <label>Password</label>
        <input type="password" onChange={e=>setPassword(e.target.value)}/>
        <label>Verify Password</label>
        <input type="password" onChange={e=>setVerifyPassword(e.target.value)}/>
        <button type="button" onClick={()=>signUp()}>Sign Up</button>
      </div>
    </div>
  )
}

export default SignUp
