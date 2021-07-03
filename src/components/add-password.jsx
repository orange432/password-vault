import React, { useState } from 'react'

const AddPassword = () => {
  const [label, setLabel] = useState('');
  const [password,setPassword] = useState('');
  const createPassword = () => {
    const query = `
    mutation{
      
    }
    `;
  }
  return (
    <div className="add-password">
      <div className="add-password__top">
        <h2>Add Password</h2>
        <button className="btn-sec" onClick={createPassword}>Add</button>
      </div>
    </div>
  )
}

export default AddPassword
