import React, { Component } from 'react'
import MealsByCal from '../components/meals-by-cal'

export default class RecipebyCalories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: []
    }
  }

  componentDidMount() {
    fetch('/daily-calories')
      .then(res => res.json())
      .then(result => console.log(result[0].calories))
    // fetch(`/nutritional?number=${dailyCalories}`)
    //   .then(res => console.log(res.json()))

  }

  render() {
    return (
      <MealsByCal />
    )
  }
}
