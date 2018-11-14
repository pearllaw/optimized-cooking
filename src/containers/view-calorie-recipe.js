import React, { Component, Fragment } from 'react'
import MealsByCal from '../components/meals-by-cal'
import Nutrition from '../components/nutritional-info'

export default class RecipebyCalories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: []
    }
    this.reload = this.reload.bind(this)
  }

  reload() {
    window.location.reload()
  }

  componentDidMount() {
    fetch('/daily-calories')
      .then(res => res.json())
      .then(result => result[0].calories)
      .then(cals => {
        return fetch(`/nutritional?number=${cals}`)
          .then(res => res.json())
          .then(recipes => this.setState({ recipes: recipes }))
      })
  }

  render() {
    const { recipes } = this.state
    if (recipes.length === 0) return null
    return (
      <Fragment>
        <MealsByCal recipes={recipes}
          reload={this.reload} />
        <Nutrition recipes={recipes} />
      </Fragment>
    )
  }
}
