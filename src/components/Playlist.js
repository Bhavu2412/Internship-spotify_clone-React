import React, { useEffect } from 'react';

export default function Playlist(){
    useEffect(()=>{
        fetchPlaylist();
    },[])
    const fetchPlaylist=async ()=>{
        const url = 'https://spotify-web2.p.rapidapi.com/playlist/?id=37i9dQZF1DX4Wsb4d7NKfP';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'd18a983f2amsh2847b38ed350bdbp1fc752jsn4f8e7373aa10',
                'X-RapidAPI-Host': 'spotify-web2.p.rapidapi.com'
            }
        };
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result.tracks.items);
        } catch (error) {
            console.error(error);
        }
    }

}