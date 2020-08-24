import React from 'react';
import foods from './foods.json';
import FoodBox from './components/FoodBox';
import AddFood from './components/AddFood';
import Searchbar from './components/Searchbar';
import './App.css';
import 'bulma/css/bulma.css';
import ButtonAddForm from './components/ButtonAddForm';


class App extends React.Component{

  constructor(props){
    super(props)
    this.state ={
        foods: foods,
        filteredFood: foods,
        showForm:false,
        todaysFood: {}
    }
}

 // function to add new food
 handleAddFood=(event)=>{
   event.preventDefault()
   let newFood = event.currentTarget.food.value
   let newCalories = event.currentTarget.calories.value
   let newImage = event.currentTarget.urlImg.value
   let newQuantity = 0
   let newFoods =[{name:newFood,calories:newCalories,image:newImage,quantity:newQuantity},...this.state.foods]
   this.setState({
     foods:newFoods,
     filteredFood:newFoods

   })

 };
 hideOrShow=()=>{
   this.setState({showForm:!this.state.showForm})
 };

 handleSearch=(event)=>{
   console.log(event.currentTarget.value)
   let foodToSearch = event.currentTarget.value
   let clonedFoods = this.state.foods.filter((food)=>{
     return food.name.toLowerCase().includes(foodToSearch.toLowerCase())
   })
   this.setState({
     filteredFood:clonedFoods
   })

 };

 handleAdd = (ref, id) => {
  let quantity = ref.current.value
  let cloneArr = JSON.parse(JSON.stringify(this.state.filteredFood))
  cloneArr[id].quantity = Number(quantity)
  const clonedTodaysFood = JSON.parse(JSON.stringify(this.state.todaysFood));
  let itemName = cloneArr[id].name
  if (itemName in clonedTodaysFood){
    clonedTodaysFood[itemName].quantity += Number(quantity)
  }
  else {
    clonedTodaysFood[itemName]  = cloneArr[id]
  }
  console.log(clonedTodaysFood)
  this.setState({
    filteredFood: cloneArr,
    todaysFood: clonedTodaysFood
  })
}



  render (){

    let totalCalories =Object.keys(this.state.todaysFood).reduce((acc,foodName)=>{
      let item = this.state.todaysFood[foodName]
      return acc + (item.calories*item.quantity)
    },0)


    return (
      <div class="columns">
        <div class="column">
        <div>
           

            <Searchbar onSearch={this.handleSearch}/>
            {this.state.showForm ? <AddFood onAdd={this.handleAddFood} /> :<ButtonAddForm hideOrShow={this.hideOrShow}/>}
            {this.state.filteredFood.map((food,i)=>{
              return <FoodBox 
              id={i}
              food={food}
              onAdd={this.handleAdding}
              />
            })
            }

            </div>
                    </div>
        <div class="column">
          <h2>Today's food</h2>
          <ul>
            {
              Object.keys(this.state.todaysFood).map((foodName)=>{
                let item= this.state.todaysFood[foodName]
                return (
                  <li>{item.quantity}{item.name}={item.quantity*item.calories} cal</li>
                )
              })

            }
          </ul>
          <h5>Total:{
            Object.keys(this.state.todaysFood)
          } cal</h5>
        </div>
      </div>

    );
  }
}

export default App;
