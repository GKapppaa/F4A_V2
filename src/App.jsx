import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Logo from './components/atoms/Logo.jsx'
import SearchBar from './components/molecules/SearchBar.jsx'

function App() {

  function busquedaTest(searchText){
    console.log(searchText);
  }
  return ( 
    <>
    <Logo/>
    <SearchBar onSearch={busquedaTest}/>
    </>

  )
}


export default App
