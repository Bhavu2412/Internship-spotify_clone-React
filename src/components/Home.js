import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import Cards from './Card';

import './Home.css'
export default function Home({music , final  , search , choice}){
  const [favourites, setFavourites] = useState([]);
  const [playlists , setPlaylists] = useState([{name : '' , items : []}]);
  const [playname , setPlay] = useState('');
  const playlistStored = JSON.stringify(playlists);
  let playlistfind = playlists.find(fav => fav.name === playname);
  
  useEffect(()=>{
    localStorage.setItem('playlists', JSON.stringify(playlists));
    const getStored = localStorage.getItem('playlists');
  },[playlists])

  useEffect(()=>{
    const StoredPlaylist = localStorage.getItem('playlists')
    if(StoredPlaylist){
      setPlaylists(JSON.parse(StoredPlaylist));
      console.log(playlists);
    }
  },[])

  function handleOnClick(item) {
            
    const isFavourite = favourites.find((fav) => fav.data.uri === item.data.uri);
    if (isFavourite ) {
      
      setFavourites((prevFavourites) =>
        prevFavourites.filter((fav) => fav.data.uri !== item.data.uri)
      );
    } else {
      
      setFavourites((prevFavourites) => [...prevFavourites, item]);
    }
  }
  

  function handleAddPlaylist(item) {
    const playlistName = window.prompt('Enter the playlist name :');
    const existingPlaylist = playlists.find((playlist) => playlist.name === playlistName);
    if (existingPlaylist) {
      setPlaylists((prevPlaylists) => {
        const updatedPlaylists = prevPlaylists.map((playlist) => {
          if (playlist.name === playlistName) {
            return {
              ...playlist,
              items: [...playlist.items, item],
            };
          }
          return playlist;
        });
        return updatedPlaylists;
      });
    } else {
      
      const newPlaylist = {
        name: playlistName,
        items: [item],
      };
      setPlaylists((prevPlaylists) => [...prevPlaylists, newPlaylist]);
    }
    
  }

  function handleRemoveFromPlaylist(playlistName, item) {
    setPlaylists((prevPlaylists) => {
      const updatedPlaylists = prevPlaylists.map((playlist) => {
        if (playlist.name === playlistName) {
          return {
            ...playlist,
            items: playlist.items.filter((playlistItem) => playlistItem.data.uri !== item.data.uri),
          };
        }
        return playlist;
      });
      return updatedPlaylists;
    });
  }

  function handleNewPlaylist(e) {
    const nameInp = e.target.elements.name.value;
    const FindPlaylist = playlists.find(play=>play.name === nameInp);
    if(FindPlaylist){
      e.preventDefault();
      console.log('playlist allready exists')
    }
    else{
      e.preventDefault();
      setPlaylists([...playlists , {name : nameInp, items :[]}]);
      e.target.elements.name.value = '';
    }
  }
  
  

    return(
       < div className='container'> 
       <h2>Search Items<hr width="1275vw"/></h2>
        <div className='item-container'>
          <div className='item-container-inside'>
              {  
                music.map((item)=>{
                  const uri = item.data.uri;
                  const trackId = uri.split(':')[2];
                  
                  const trackUrl = `https://open.spotify.com/${choice.slice(0,-1)}/${trackId}`;
                  
                  return (
                  
                    <div className='content'>   
                    <Cards item={item} trackUrl={trackUrl} trackId={trackId} play={false}  handlePlaylist={handleAddPlaylist} handleOnClick={handleOnClick}/>
                    </div>
                    
                    );
                  })
              }
          </div>
        </div>
        <h2>Favourites <hr width="1275vw"/></h2>
        <div className='item-container '>
          <div className='item-container-inside'>
              {
                  favourites.map((item)=>{
                  const uri = item.data.uri;
                  const trackId = uri.split(':')[2];
                  const trackUrl = `https://open.spotify.com/${choice.slice(0,-1)}/${trackId}`;
                  
                  return (
                    <div className='content'>   
                    <Cards item={item} trackUrl={trackUrl} trackId={trackId} handleOnClick={handleOnClick} handlePlaylist={handleAddPlaylist}/>
                    </div>
                    );
                  })
                }
          </div>
        </div>
        <h2>Playlists<hr width="1275vw"/></h2>
        <form onSubmit={handleNewPlaylist}>
            <div className="add-playlist-container">
              <input
                type="text"
                placeholder="Enter playlist name"
                name="name"
              />
              <button type="submit" >Create Playlist</button>
            </div>
        </form>

        
          <Dropdown >
            <Dropdown.Toggle variant="dark"  id="dropdown-basic" >
            {playname}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              
            {
                playlists.map(playlist=>{
                  function handleDropClick(e){
                    setPlay(`${playlist.name}`);

                  }
                  return (
                    <>
                    <Dropdown.Item onClick={handleDropClick}>{playlist.name}</Dropdown.Item>
                    </>
                  )
                })
              }

            </Dropdown.Menu>
          </Dropdown>
          
          <div className='item-container '>
                      <div className='item-container-inside'>
          {
                  playlistfind.items.map((item)=>{
                    const uri = item.data.uri;
                  const trackId = uri.split(':')[2];
                  
                  const trackUrl = `https://open.spotify.com/${choice.slice(0,-1)}/${trackId}`;
                  function handleRemoveFromCurrentPlaylist(){
                    handleRemoveFromPlaylist(playlistfind.name,item);
                  }
                  return (
                    <div className='content'>
                      <Cards
                        item={item}
                        trackUrl={trackUrl}
                        trackId={trackId}
                        play={true}
                        handlePlaylist={handleRemoveFromCurrentPlaylist}
                        handleOnClick={handleOnClick}
                      />
                      </div>
                  )
                }) 
          } 
            </div>

            </div>
          
      
    </div>
    )
}