import React, { useEffect } from 'react'
import Login from './components/Login'
import Spotify from './components/Spotify'
import { useStateProvider } from './utils/StateProvider';
import { reducerCases } from './utils/Constants';

export default function App() {
  const url = process.env.NODE_ENV === "development" ? 'http:/localhost:3000' : process.env.REACT_APP_VERCEL_URL;
  console.log(url)
  const [{ token }, dispatch] = useStateProvider()
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split('=')[1];
      dispatch({ type: reducerCases.SET_TOKEN, token });
    }
  }, [token, dispatch]);
  return (<div>{token ? <Spotify /> : <Login />} </div>
  );
}




