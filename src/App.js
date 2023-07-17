

import React, { useState } from 'react'
import NavBar from './components/NavBar.js'
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import Signup from './components/Signup.js';
import  Home  from './components/Home.js';
import Login from './components/Login.js';
import Favourites from './components/Favourites.js';
import Playlist from './components/Playlist.js';
export default function App(){
  const [music,setMusic] = useState([]);
    const [search,setSearch] = useState('');
    const [final,setFinal] = useState('');
    const [choice,setChoice] = useState('albums');
    const [favourites,setFavourites] = useState([]);
    const favouritesStored = JSON.stringify(favourites);
    localStorage.setItem('favourites',favouritesStored);
    
  return(
    <>
      <NavBar setMusic={setMusic} setSearch={setSearch} setChoice={setChoice}  favourites={favourites} setFinal={setFinal} search={search} final={final} choice={choice} />
    <Router>
      <Routes>
        <Route path="/" exact element={<Home favourites={favourites}  search={search} final={final} choice={choice} music={music} setFavourites={setFavourites}/>}></Route>
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/favourites" exact element={<Favourites  favourites={favourites} choice={choice}/>} />
        <Route path="/playlists" exact element={<Playlist />} />
      </Routes>
    </Router>
    </>
  )
}