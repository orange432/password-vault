import React,{ useState } from 'react'

/* The form for users to login and register */
const SignUp = () => {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [verifyPassword,setVerifyPassword] = useState('');
  const [message,setMessage] = useState('');
  const [selected,setSelected] = useState(0);
  
  const signIn = () => {
    if(!password || !username){
      return 
    }
    const query = `
    query{
      userLogin(username:"${username}",password:"${password}"){
        success
        session
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
      const {userLogin} = data;
      if(userLogin.success){
        localStorage.setItem('session',userLogin.session);
        window.location.href = "/dashboard"
      }else{
        setMessage(userLogin.message);
        setTimeout(()=>setMessage(''),4000);
      }
    })
  }

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
      const { userRegister } = data;
      if(userRegister.success){
        setMessage(userRegister.message);
        setSelected(0);
        setTimeout(()=>{
          setMessage('');
        },4000);
      }else{
        setMessage(userRegister.message);
        setTimeout(()=>setMessage(''),4000);
      }
    })
  }
  
  if(selected){
    // Registration Form
  return (
    <div className="sign-up">
      <div className="sign-up__tabs">
        <div className="sign-up__tab" onClick={()=>setSelected(0)}>Login</div>
        <div className="sign-up__tab selected">Register</div>
      </div>
      <h1 className="sign-up__title">Sign Up</h1>
      <p className="text-center">{message}</p>
      <div className="sign-up__container">
        <label>Username</label>
        <input type="text" onChange={e=>setUsername(e.target.value)}/>
        <label>Password</label>
        <input type="password" onChange={e=>setPassword(e.target.value)}/>
        <label>Verify Password</label>
        <input type="password" onChange={e=>setVerifyPassword(e.target.value)}/>
        <button className="btn-prim" type="button" onClick={signUp}>Sign Up</button>
      </div>
    </div>
  )
  }else{
    // Login Form
    return (
      <div className="sign-up">
      <div className="sign-up__tabs">
        <div className="sign-up__tab selected">Login</div>
        <div className="sign-up__tab" onClick={()=>setSelected(1)}>Register</div>
      </div>
      <h1 className="sign-up__title">Sign In</h1>
      <p className="text-center">{message}</p>
      <div className="sign-up__container">
        <label>Username</label>
        <input type="text" onChange={e=>setUsername(e.target.value)}/>
        <label>Password</label>
        <input type="password" onChange={e=>setPassword(e.target.value)}/>
        <button className="btn-prim" type="button" onClick={signIn}>Sign In</button>
      </div>
    </div>
    )
  }
}

export default SignUp
