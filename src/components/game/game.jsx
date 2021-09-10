import React, {useState,useEffect} from 'react';
import axios from 'axios';
import CountUp from 'react-countup';
import Menu from '../menu/menu';
import './game.scss';

const Game = ({stat}) => {
    const urlAllPokemon = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';
    const urlPokemon = 'https://pokeapi.co/api/v2/pokemon/';
    const [pokemon, setPokemon] = useState([]);
    const [firstPokemon, setFirstPokemon] = useState('');
    const [secondPokemon, setSecondPokemon] = useState('');
    const [pokeStatsOne, setPokeStatsOne] = useState([]);
    const [pokeStatsTwo, setPokeStatsTwo] = useState([]);
    const [points,setPoints] = useState(0);
    const [finalPoints, setFinalPoints] = useState(0);
    const [displayStat, setDisplayStat] = useState(false);
    const [animatedStat, setAnimatedStat] = useState(0);
    const [resetGame, setResetGame] = useState(false);
    const [pokemonImageOne, setPokemonImageOne] = useState('');
    const [pokemonImageTwo, setPokemonImageTwo] = useState('');

    const startGame = () => {
        
        const initialPokemon = getTwoRandomPokemon();
        setAnimatedStat(0);
        axios.get(urlPokemon.concat(`${initialPokemon[0]}`))
        .then(response =>  {
            setFirstPokemon(response.data.name);
            setPokeStatsOne(response.data.stats.map((poke,index)=>{
                return poke.base_stat;
            }))
            setPokemonImageOne(response.data.sprites.front_default);
        })
        axios.get(urlPokemon.concat(`${initialPokemon[1]}`))
        .then(response => {
            setSecondPokemon(response.data.name);
            setPokeStatsTwo(response.data.stats.map((poke,index)=>{
                return poke.base_stat;
            }));
            setPokemonImageTwo(response.data.sprites.front_default);
            
        })
        setFinalPoints(0);
        
    }

    const getStat = (stat,pokemon) => {
        
        if(stat === 'HP'){
            return pokemon[0];
        }
        else if(stat === 'Attack'){
            return pokemon[1];
        }
        else if(stat === 'Defense'){
            return pokemon[2];
        }
        else if(stat === 'Special Attack'){
            return pokemon[3];
        }
        else if(stat === 'Special Defense'){
            return pokemon[4];
        }
        else{
            return pokemon[5];
        }
        

    }
    const nextRound = () => {
        
        console.log('correct answer!')
        setTimeout(() => {
            setPoints(points+1);
            axios.get(urlPokemon.concat(secondPokemon))
        .then(response => {
            setFirstPokemon(response.data.name);
            setPokeStatsOne(response.data.stats.map((poke,index)=>{
                return poke.base_stat;
            }))
            setPokemonImageOne(response.data.sprites.front_default);
        })

        
        
        axios.get(urlPokemon.concat(`${getARandomPokemon()}`))
        .then(response => {
            setSecondPokemon(response.data.name);
            setPokeStatsTwo(response.data.stats.map((poke,index)=>{
                return poke.base_stat;
            }))
            setPokemonImageTwo(response.data.sprites.front_default);
        })
        setAnimatedStat(0);
        }, 2000)
        
    }
    

    const getTwoRandomPokemon = () => {
        let randomOne = Math.floor(Math.random()*pokemon.length);
        let randomTwo = Math.floor(Math.random()*pokemon.length);
        
        return [pokemon[randomOne],pokemon[randomTwo]];
    }
    const getARandomPokemon = () => {
        let random = Math.floor(Math.random()*pokemon.length);

        return pokemon[random];
    }

    const menuScreen = () => {
        setResetGame(true);
    }

    const checkHigher = () => {
        let checkRange = false;
        let statOne = getStat(stat,pokeStatsOne);
        let statTwo = getStat(stat, pokeStatsTwo);
        console.log(statOne, statTwo);
        console.log(statTwo >= statOne);
        if(statTwo >= statOne){
            checkRange = true;
        }
        else{
            checkRange = false;
        }
        console.log(statOne, statTwo);
        console.log('hey')
        console.log(checkRange);
        setAnimatedStat(statTwo);
        if(checkRange){
            setDisplayStat(true);
            
            
            nextRound();
        }
        else{
            setTimeout(() => {
            setFinalPoints(points);
            setFirstPokemon('');
            setSecondPokemon('');
            
            setPoints(0);
            },2000);
            
        }
    }
    const checkLower = () => {
        let checkRange = false;
        let statOne = getStat(stat,pokeStatsOne);
        let statTwo = getStat(stat,pokeStatsTwo);
        if(statTwo <= statOne){
            checkRange = true;
        }
        else{
            checkRange = false;
        }
        console.log(statOne, statTwo);
        console.log('low hey')
        setAnimatedStat(statTwo);
        if(checkRange){
            setDisplayStat(true);
            
            nextRound();
        }
        else{
            setTimeout(()=>{
                setFinalPoints(points);
                setFirstPokemon('');
                setSecondPokemon('');
                
                setPoints(0);
            },2000);
            
        }
        
    }
    useEffect(() => {
        axios.get(urlAllPokemon)
        .then(response => setPokemon(response.data.results.map((pokemon)=>{
            return pokemon.name;
        })))

        

    },[])
    
    return (
        
        <>{!resetGame?
            <div>
                <h1> Pokemon - Higher or Lower </h1>
                <h3> {stat} </h3>
                
                { !secondPokemon ? <button className = "buttons" onClick = {startGame} > Start Game! </button> : null}
                {!secondPokemon ? <button className = "buttons" onClick = {menuScreen}> Reset Game </button> : null}
                {<div className = "flex-container" >
                { !firstPokemon ? null :<div> {firstPokemon} </div>}
                { !secondPokemon ? null : <div> {secondPokemon}</div>}
                </div>}{<div className = "flex-container">
                {! firstPokemon ? null : <div><img src = {pokemonImageOne} alt = ''/></div>}
                {!secondPokemon ? null : <div><img src = {pokemonImageTwo} alt = '' /></div>}
                </div>}
                {
                    <div className = "flex-container">
                        {!firstPokemon ? null : <div> {stat}: {getStat(stat,pokeStatsOne)} </div>}
                        {!secondPokemon ? null : <div> {stat}: {animatedStat === 0 ? null : <CountUp end = {animatedStat} duration = {0.5} />}</div>}
                    </div>
                }
                { !firstPokemon ? null :<button className = "buttons" onClick = {checkHigher}> Higher </button>}
                { !firstPokemon ? null :<button className = "buttons" onClick = {checkLower}> Lower </button>}
                {finalPoints!== 0 ? <div> Your score is: {finalPoints}</div> : <div> Points: {points} </div>}
            </div>
        :<Menu />}
        </>
    )
}

export default Game;