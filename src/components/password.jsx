import React,{ useState } from 'react'

const Password = (props) => {
  const [hidden,setHidden] = useState(true);
  return (
    <div className="password">
      <div className="password__label"></div>
      <div className="password__pass">
        <input type={(hidden)?'password':'text'} value={props.password}/>
      </div>
      <div className="password__button">
        <button type="button" className="btn-prim" onClick={()=>setHidden(!hidden)}>{(hidden)?'Reveal':'Hide'}</button>
      </div>
    </div>
  )
}

export default Password
