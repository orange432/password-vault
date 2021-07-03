import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Index from './pages/index'
import About from './pages/about'
import SignIn from './pages/signin'
import Dashboard from './pages/dashboard'

import './main.scss'
import Navbar from './components/navbar'

const Test = () => {
  return (
    
      <BrowserRouter>
      <Navbar/>
      <div className="content">
        <Switch>
          <Route exact path="/"><Index/></Route>
          <Route path="/about"><About/></Route>
          <Route path="/sign-in"><SignIn/></Route>
          <Route path="/dashboard"><Dashboard/></Route>
        </Switch>
      </div>
      </BrowserRouter>
    
  )
}

ReactDOM.render(<Test/>,document.getElementById("root"));
