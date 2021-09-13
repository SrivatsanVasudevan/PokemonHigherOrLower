import React, {useState,useEffect} from 'react';
import axios from 'axios';
import CountUp from 'react-countup';
import Menu from '../menu/menu';
import './game.scss';
import styled,{keyframes} from 'styled-components';
import {fadeOutLeftBig, fadeOut} from 'react-animations';
import {Checkmark} from 'react-checkmark';


const Slide = styled.div`animation: 4.6s ${keyframes `${fadeOutLeftBig}`} `;
const NameSlide = styled.div`animation: 5.5s ${keyframes `${fadeOutLeftBig}`} `;
const FadeOut = styled.div`animation: 1s ${keyframes `${fadeOut}`}`;
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
    const [checkMarkAnimation, setCheckMarkAnimation] = useState(false);

    const capitalize = (string) => {
        return string.toUpperCase();
    }
    
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
            setCheckMarkAnimation(true);
            
        },500)
        setTimeout(()=> {
            setCheckMarkAnimation(false);
            setDisplayStat(true);
        },2500)

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
        setCheckMarkAnimation(false);
        setDisplayStat(false);
        }, 3500)
        
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
        console.log('hi',checkRange);
        setAnimatedStat(statTwo);
        if(checkRange){
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
        //console.log(statOne, statTwo);
        console.log('hi',checkRange);
        setAnimatedStat(statTwo);
        if(checkRange){
            
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
                {!secondPokemon ? <button className = "buttons" onClick = {menuScreen}> Main Menu </button> : null}
                
                {<div className = "flex-container">
                {! firstPokemon ? null : displayStat ? <Slide> <div ><img className = "pokemonImages" src = {pokemonImageOne} alt = ''/></div> </Slide> : <div ><img className = "pokemonImages" src = {pokemonImageOne} alt = ''/></div>}
                {checkMarkAnimation ?<div><Checkmark /></div>: <div></div>}
                {!secondPokemon ? null : displayStat ? <Slide> <div ><img className = "pokemonImages" src = {pokemonImageTwo} alt = '' /></div> </Slide> : <div ><img className = "pokemonImages" src = {pokemonImageTwo} alt = '' /></div>}
                </div>}
                {<div className = "flex-container" >
                { !firstPokemon ? null : displayStat ? <div style = {{fontSize:30, fontWeight: 'bold'}}><NameSlide> {capitalize(firstPokemon)} </NameSlide></div> : <div style = {{fontSize:30, fontWeight: 'bold'}}> {capitalize(firstPokemon)}  </div>}
                { !secondPokemon ? null : displayStat ? <div style = {{fontSize:30, fontWeight: 'bold' }}><NameSlide> {capitalize(secondPokemon)} </NameSlide></div> : <div style = {{fontSize:30, fontWeight: 'bold'}}> {capitalize(secondPokemon)} </div>}
                </div>}

                {
                    <div className = "flex-container">
                        {!firstPokemon ? null : !displayStat?  <div style = {{fontSize:20}}> {capitalize(stat)}: {getStat(stat,pokeStatsOne)} </div> : <NameSlide><div style = {{fontSize:20}}> {capitalize(stat)}: {getStat(stat,pokeStatsOne)} </div></NameSlide>}
                        {!secondPokemon ? null : !displayStat? <div style = {{fontSize:20}}> {capitalize(stat)}: {animatedStat === 0 ? null : <CountUp end = {animatedStat} duration = {0.5} />}</div> : <NameSlide><div style = {{fontSize:20}}> {capitalize(stat)}: {animatedStat === 0 ? null : <CountUp end = {animatedStat}  />}</div></NameSlide>}
                    </div>
                }
                {!firstPokemon ? null : !displayStat? <div style = {{fontSize:20}}> Does {capitalize(secondPokemon)} have higher or lower {capitalize(stat)} than {capitalize(firstPokemon)}? </div> : <FadeOut><div style = {{fontSize:20}}> Does {capitalize(secondPokemon)} have higher or lower {capitalize(stat)} than {capitalize(firstPokemon)}? </div></FadeOut>}
                { !firstPokemon ? null :<button style = {{fontWeight: 'bold',color: 'blue', fontSize:30}} className = "buttons" onClick = {checkHigher}> Higher </button>}
                { !firstPokemon ? null :<button style = {{fontWeight: 'bold',color:'Crimson', fontSize:30}} className = "buttons" onClick = {checkLower}> Lower </button>}
                {finalPoints!== 0 ? <div className = "points"> Points: {finalPoints}</div> : <div className = "points"> Points: {points} </div>}
            </div>
        :<Menu points = {finalPoints}/>}
        </>
    )
}

export default Game;