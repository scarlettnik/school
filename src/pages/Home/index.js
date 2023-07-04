import React, { useEffect, useState } from 'react'
const Home = () => {
  const [token, setToken] = useState();
  
  const [artists, setArtists] = useState({});
  const [profile, setProfile] = useState({});
  const [tracks, setTracks] = useState({});
  const [playlists, setPlaylists] = useState({});

  const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
  const TRACKS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks?time_range=long_term";
  const ARTISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/artists?time_range=long_term";
  const PROFILE_ENDPOINT = "https://api.spotify.com/v1/me";

  const getParamsFromHash = (hash) => {
    const content = hash.substr(1);
    const split = content.split('&');
    let params = {};
    let values = [];
    split.forEach((param) =>{ 
      values = param.split('='); 
      params[values[0]] = values[1];
    })
    return params
  }

  
  const getData = async (endpoint, setFunction) => {
    try {
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setFunction(data);
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {}, [token])
  useEffect(() => {
    if(window.location.hash){
      const hash = window.location.hash;
      const tokens = getParamsFromHash(hash);
      localStorage.setItem('token', tokens.access_token);
      setToken(tokens.access_token);
      window.history.pushState({}. null, '/home')
    }
    getData(PLAYLISTS_ENDPOINT, setPlaylists);
    getData(TRACKS_ENDPOINT, setTracks);
    getData(ARTISTS_ENDPOINT, setArtists);
    getData(PROFILE_ENDPOINT, setProfile);
  }, [])
    

    return (
      <div>
        {
         profile.display_name && profile.images &&
         <div><img src={profile.images[0].url}/>
         <div className="name"> <h1>{profile.display_name}</h1> </div>
         </div>
        }
      </div>
    )
  
}

export default Home