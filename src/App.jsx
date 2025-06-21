import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Chat from './page/Chat'
import NameComponent from './component/NameComponent'
import { useSelector } from 'react-redux'

function App() {
  const {profilePicture}=useSelector((state)=>state.user)
  return (
    <div>
      {profilePicture==null?<NameComponent/>:<></>}      
      <Chat/>
    </div>
  )
}

export default App
