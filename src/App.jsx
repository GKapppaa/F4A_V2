import { useState } from 'react'
import './App.css'
import Header from './components/organisms/Header.jsx'
import Footer from './components/organisms/Footer.jsx'
function App() {

  function busquedaTest(searchText){
    console.log(searchText);
  }
  return ( 
    <>
      <Header/>
      <Footer/>
      
    </>

  )
}


export default App
