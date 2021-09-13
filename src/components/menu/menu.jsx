import React, {useState,useEffect} from 'react';
import Game from '../game/game';
import './menu.scss';

const Menu = ({points}) => {
    const [stat, setStat] = useState('');
    const [highScore,setHighScore] = useState(0);
    
    useEffect(()=>{
        setHighScore(Math.max(points, JSON.parse(window.localStorage.getItem('highScore'))));
    },[points]);
    
    useEffect(()=>{
       
       window.localStorage.setItem('highScore',highScore);
    },[highScore]);

    const goToGame = (event) => {
        setStat(event.target.value);
    }
    return (
        <>
        { !stat?
        <div>
            {console.log(highScore)}
            <h1> Pokemon - Higher or Lower </h1>
            <p style = {{fontSize:20}}> Select which mode you want to play! </p>
            <button className = "buttons" value = "HP" onClick = {event => goToGame(event)}> HP </button>
            <button className = "buttons" value = "Attack"  onClick = {event => goToGame(event)}> Attack </button>
            <button className = "buttons" value = "Defense"  onClick = {event => goToGame(event)}> Defense </button>
            <button className = "buttons" value = "Special Attack"  onClick = {event => goToGame(event)}> Special Attack </button>
            <button className = "buttons" value = "Special Defense"  onClick = {event => goToGame(event)}> Special Defense </button>
            <button className = "buttons" value = "Speed"  onClick = {event => goToGame(event)}> Speed </button>
            <div className = "highScore"> High Score: {highScore} </div>
        </div>
        
           : <div></div> 
           }
           
            {stat?<Game stat = {stat}/>:null}
        </>
    )
}

export default Menu;