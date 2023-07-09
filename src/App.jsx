import van from './assets/van.svg';
import React, { useReducer } from "react";
import './App.scss';

export default function App() {

    const actionType =
    {
        START_ENGINE: 'startEngine',
        STOP_ENGINE: 'stopEngine',
        GEAR_UP: 'gearUp',
        GEAR_DOWN: 'gearDown',
        ACCELERATE: 'accelerate',
        BREAK: 'break' 
    }

    const Gear = 
    {
        NEUTRAL: 0,
        GEAR_1: 1,
        GEAR_2: 2,
        GEAR_3: 3,
        GEAR_4: 4   
    }

    const initialState = {
        engineOn: false,
        currentGear: Gear.NEUTRAL,
        currentSpeed: 0
    }

    const reducer = (state, action) => {
        switch(action.type) {
            case actionType.START_ENGINE:
                return { ...state, engineOn: true };

            case actionType.STOP_ENGINE:
                return { ...state, engineOn: false, currentGear: Gear.NEUTRAL };

            case actionType.GEAR_UP:
                if( state.engineOn && state.currentGear < Gear.GEAR_4) {
                    return { ...state, currentGear: state.currentGear + 1 }
                }
                return state;

            case actionType.GEAR_DOWN:
                if( state.engineOn && state.currentGear > Gear.NEUTRAL) {
                    return { ...state, currentGear: state.currentGear - 1 }
                }
                return state;
            
            case actionType.ACCELERATE:
                if( state.engineOn && state.currentGear !== Gear.NEUTRAL) {
                    const acceleration = state.currentGear * 10;
                    return { ...state, currentSpeed: state.currentSpeed + acceleration }
                }
                return state;
            
            case actionType.BREAK:
                if( state.engineOn && state.currentSpeed > 0) {
                    const deceleration = state.currentGear * 10;
                    return { ...state, currentSpeed: state.currentSpeed - deceleration };
                }
                return state;   
                
            default:
                throw new Error('Unkown action!')
        }
    }   

    const [ state, dispatch ] = useReducer(reducer, initialState);

    return (
        <div className="App">
            <img style={{
                    border: state.engineOn ? '6px solid green' : '6px solid red'
                }}

                className='App__img' src={van} alt='van-logo'
            />

            <div className="App__engine">
                <p 
                    style={{
                        backgroundColor: state.engineOn ? 'green' : 'red',
                        color: 'white',
                        padding: '0.8rem',
                        borderRadius: '5px'    
                    }}
                    >
                    Engine Status: {state.engineOn ? 'ENGINE ON' : 'ENGINE OFF'}
                </p>
                <div className="App__engine__btn">
                    <button onClick={ () => dispatch({ type: actionType.START_ENGINE})}> START Engine</button>
                    <button onClick={ () => dispatch({type: actionType.STOP_ENGINE})}>STOP Engine</button>
                </div>
            </div>
            
            <div className="App__text">
                <p>The current gear is: <span>{state.currentGear}</span></p>
                <p>The current speed is: <span>{state.currentSpeed}</span></p>
            </div>

            <div className="App__btn">
                <button onClick={ () => dispatch({type: actionType.GEAR_UP}) }>GEAR UP</button>
                <button onClick={ () => dispatch({type: actionType.GEAR_DOWN}) }>GEAR DOWN</button>
                <button onClick={ () => dispatch({type: actionType.ACCELERATE}) }>ACCELERATE</button>    
                <button onClick={ () => dispatch({type: actionType.BREAK})}>BREAK</button>
            </div>
        </div>
    );
}
