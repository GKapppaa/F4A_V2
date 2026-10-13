import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Logo from './components/atoms/Logo.jsx'
import SearchBar from './components/molecules/SearchBar.jsx'
import Header from './components/organisms/Header.jsx'
function App() {

  function busquedaTest(searchText){
    console.log(searchText);
  }
  return ( 
    <>
      <Header/>
    </>

  )
}


export default App
