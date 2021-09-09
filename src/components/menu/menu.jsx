import React, {useState, useEffect} from 'react';
import Game from '../game/game';

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
            <button value = "HP" onClick = {event => goToGame(event)}> HP </button>
            <button value = "Attack"  onClick = {event => goToGame(event)}> Attack </button>
            <button value = "Defense"  onClick = {event => goToGame(event)}> Defense </button>
            <button value = "Special Attack"  onClick = {event => goToGame(event)}> Special Attack </button>
            <button value = "Special Defense"  onClick = {event => goToGame(event)}> Special Defense </button>
            <button value = "Speed"  onClick = {event => goToGame(event)}> Speed </button>
        </div>
           : <div></div> }
            {stat?<Game stat = {stat}/>:null}
        </>
    )
}

export default Menu;