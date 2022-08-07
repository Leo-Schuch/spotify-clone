import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import Body from "./Body";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Spotify() {

const [{ token }, dispatch]= useStateProvider();
const bodyRef = useRef();
const [navBackGround, setNavBackGround] = useState(false)
const [headerBackGround, setHeaderBackGround] = useState(false)
const bodyScrolled = () => {
    bodyRef.current.scrollTop >=30
     ?setNavBackGround(true)
     :setNavBackGround(false);
    bodyRef.current.scrollTop >=268
     ?setHeaderBackGround(true)
     :setHeaderBackGround(false);
}

useEffect(()=> {
    const getUserInfo = async () => {
        const { data } = await axios.get('https://api.spotify.com/v1/me/',  {
            headers:{
                Authorization:"Bearer "+token,
                "Content-Type":"application/json",
            },
        });
       const userInfo = {
        userId: data.id,
        userName: data.display_name,
      };
      
    dispatch({type:reducerCases.SET_USER, userInfo });
};
    getUserInfo()
}, [dispatch, token]);
return (
        <Container>
            <div className="spotify__body">
                <Sidebar />
                <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
                    <Navbar navBackGround={navBackGround} />
                    <div className="body__contents">
                        <Body headerBackGround={headerBackGround} />
                    </div>
                </div>
            </div>
            <div className="spotify__footer">
                <Footer />
            </div>
        </Container>
    );
}

const Container = styled.div`
 max-width: 100vw;
 max-height: 100vh;
 overflow: hidden;
 display: grid;
 grid-template-rows: 85vh 15vh;
  .spotify__body{
        display: grid;
        grid-template-columns: 15vw 85vw;
        height: 100%;
        width: 100%;
        background: linear-gradient(transparent, rgba(0,0,0,1));
        background-color: rgb(32, 87, 100);
        .body{
            height: 100%;
            width: 100%;
            overflow: auto;
            &::-webkit-scrollbar{
                width: 0.7rem;
                &-thumb {
                    background-color: rgba(255,255,255, 0.6);
                }
            }
        }

}
`;

