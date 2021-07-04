import React, { useState } from 'react'

const AddPassword = () => {
  const [label, setLabel] = useState('');
  const [password,setPassword] = useState('');
  const [revealed,setRevealed] = useState(false);
  const [message,setMessage] = useState('');
  const createPassword = () => {
    if(label===''){
      setMessage('Please enter a label');
      setTimeout(()=>setMessage(''),4000)
    }
    if(password===''){
      setMessage('Please enter a password');
      setTimeout(()=>setMessage(''),4000)
    }
    const query = `
    mutation{
      addPassword(session: "${localStorage.getItem('session')}",label: "${label}", password: "${password}"){
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
      if(data.addPassword.success){
        window.location.href = "/dashboard";
      }else{
        setMessage(data.addPassword.message);
        setTimeout(()=>setMessage(''),4000)
      }
    })
  }
  
  return (
    <div className="add-password">
      <div className="add-password__top">
        <h2>Add Password</h2>
        <button className="btn-sec" onClick={createPassword}>Save</button>
      </div>
      <div className="add-password__inputs">
        <label>Label</label>
        <input type="text" onChange={e=>setLabel(e.target.value)} />
        <label>Password</label>
        <div className="add-password__input">
          <input type={`${(revealed)?'text':'password'}`} onChange={e=>setPassword(e.target.value)} />
          <button className="btn-sec" onClick={()=>setRevealed(!revealed)}>{(revealed)?'Hide':'Reveal'}</button>
        </div>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default AddPassword
