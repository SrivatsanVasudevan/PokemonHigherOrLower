import React, {useState, useEffect} from 'react';
import Game from '../game/game';
import './menu.scss';

const Menu = () => {
    const [stat, setStat] = useState('');
    const goToGame = (event) => {
        setStat(event.target.value);
    }
    return (
        <>
        { !stat?
        <div>
            <h1> Pokemon - Higher or Lower </h1>
            <p> Select which mode you want to play! </p>
            <button className = "buttons" value = "HP" onClick = {event => goToGame(event)}> HP </button>
            <button className = "buttons" value = "Attack"  onClick = {event => goToGame(event)}> Attack </button>
            <button className = "buttons" value = "Defense"  onClick = {event => goToGame(event)}> Defense </button>
            <button className = "buttons" value = "Special Attack"  onClick = {event => goToGame(event)}> Special Attack </button>
            <button className = "buttons" value = "Special Defense"  onClick = {event => goToGame(event)}> Special Defense </button>
            <button className = "buttons" value = "Speed"  onClick = {event => goToGame(event)}> Speed </button>
        </div>
           : <div></div> }
            {stat?<Game stat = {stat}/>:null}
        </>
    )
}

export default Menu;