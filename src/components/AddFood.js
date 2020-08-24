import React from 'react';

function AddFood(props) {

    return (
        <form onSubmit={props.onAdd}>
            <input name="food" type="text" placeholder="food name"></input>
            <input name="calories" type="number" placeholder="amount of calories"></input>
            <input name="urlImg" type="text" placeholder="image URL"></input>
            <button type='submit'>Add food</button>
        </form>
    )
}


export default AddFood