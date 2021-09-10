import React, {useState,useEffect} from 'react';
import axios from 'axios';
import CountUp from 'react-countup';
import Menu from '../menu/menu';

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

    const startGame = () => {
        
        const initialPokemon = getTwoRandomPokemon();
        setAnimatedStat(0);
        axios.get(urlPokemon.concat(`${initialPokemon[0]}`))
        .then(response =>  {
            setFirstPokemon(response.data.name);
            setPokeStatsOne(response.data.stats.map((poke,index)=>{
                return poke.base_stat;
            }))
        })
        axios.get(urlPokemon.concat(`${initialPokemon[1]}`))
        .then(response => {
            setSecondPokemon(response.data.name);
            setPokeStatsTwo(response.data.stats.map((poke,index)=>{
                return poke.base_stat;
            }));
            
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
        })

        
        
        axios.get(urlPokemon.concat(`${getARandomPokemon()}`))
        .then(response => {
            setSecondPokemon(response.data.name);
            setPokeStatsTwo(response.data.stats.map((poke,index)=>{
                return poke.base_stat;
            }))
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
                <h1> {stat} </h1>
                
                { !secondPokemon ? <button onClick = {startGame} > Start Game! </button> : null}
                {!secondPokemon ? <button onClick = {menuScreen}> Reset Game </button> : null}
                { !firstPokemon ? null :<p> {firstPokemon} {stat}: {getStat(stat,pokeStatsOne)} </p>}
                { !secondPokemon ? null : <p> {secondPokemon} {animatedStat !== 0 ?<CountUp end = {animatedStat} duration = {0.5} /> : null}   </p>}
                { !firstPokemon ? null :<button onClick = {checkHigher}> Higher </button>}
                { !firstPokemon ? null :<button onClick = {checkLower}> Lower </button>}
                {finalPoints!== 0 ? <div> Your score is: {finalPoints}</div> : <div> Points: {points} </div>}
            </div>
        :<Menu />}
        </>
    )
}

export default Game;