import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";


function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] = useState("All");
  console.log(foods)
  const foodsToDisplay = foods.filter(food => {
    if (filterBy === "All") {
      return true;
    } else {
      return food.cuisine === filterBy;
    }
  });
  const handleFilterChange = e => {
    setFilterBy(e.target.value);
  };

  const addNewFood = () => {
    const newFood = getNewRandomSpicyFood();
    const newSpicyFood = [...foods, newFood];
    setFoods(newSpicyFood);
  };
  const removeFood = id => {
    setFoods(foods.filter(food => food.id !== id));
  };

  const updateFood = id => {
    setFoods(
      foods.map(food => {
        if (food.id === id) {
          return { ...food, heatLevel: food.heatLevel + 1 };
        } else {
          return food;
        }
      })
    );
  };

  const foodList = foodsToDisplay.map(food => {
    return (
      <React.Fragment>
        <li key={food.id} onClick={() => updateFood(food.id)}>
          {food.name}| Heat: {food.heatLevel} | Cuisine: {food.cuisine}{" "}
        </li>
        <button onClick={() => removeFood(food.id)}>Remove</button>
      </React.Fragment>
    );
  });

  return (
    <div>
      <button onClick={addNewFood}>Add Spicy Food</button>
      <select name="filter" onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList;
