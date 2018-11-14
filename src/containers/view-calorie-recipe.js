import React, { Component } from 'react'
import MealsByCal from '../components/meals-by-cal'

export default class RecipebyCalories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipeInfo: []
    }
  }
  render() {
    return (
      <MealsByCal />
    )
  }
}
