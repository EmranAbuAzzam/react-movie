import React, { useState } from 'react'
import axios from 'axios'

import Search from './components/Search'
import Results from './components/Results'
import Popup from './components/Popup'
import Header from './components/header'
import Footer from './components/footer'

function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });
  
  const apiurl = "http://www.omdbapi.com/?apikey=dfe6d885";
  const kk = () =>{
    axios.get('http://www.omdbapi.com/?apikey=dfe6d885').then(res=>{
      console.log(res)
    })
  }

  const search = (e) => {

      axios(apiurl + "&s=" + state.s).then(({ data }) => {
        let results = data.Search;
        setState(prevState => {
          return { ...prevState, results: results }
        })
      });
    
  }
  
  const handleInput = (e) => {
    let s = e.target.value;

    setState(prevState => {
      return { ...prevState, s: s }
    });
  }

  const openPopup = id => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;

      console.log(result);

      setState(prevState => {
        return { ...prevState, selected: result }
      });
    });
  }

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} }
    });
  }

  return (
    <div className="App">
   <Header/>
      <main>
        <Search handleInput={handleInput} search={search} />
        <button type='submit' className='button' onClick={search}>submit</button>
      
        <Results results={state.results} openPopup={openPopup} />
        {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
        
      </main>
      
    </div>
    
  );
}

export default App
