import React,{ useState } from 'react'

const Password = (props) => {
  const [revealed,setRevealed] = useState(false);
  return (
    <div className="password">
      <div className="password__label">{props.label}</div>
      <div className="password__pass">
        <input disabled={true} type={(revealed)?'text':'password'} value={props.password}/>
        <button className="btn-sec" onClick={()=>setRevealed(!revealed)}>{(revealed)?'Hide':'Reveal'}</button>
      </div>
    </div>
  )
}

export default Password
