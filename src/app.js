import React, {Component, Fragment} from 'react'
import Nav from './navbar'
import hash from './hash'
import Ingredients from './ingredients'
import GeneratedRecipes from './generated-recipes'
import ViewRecipe from './view-recipe'
import RecipeCollection from './view-recipe-collection'
import GroceryList from './view-grocery-list'

export default class Recipes extends Component {
  constructor(props) {
    super(props)
    const { path, params } = hash.parse(location.hash)
    this.state = {
      view: { path, params }
    }
  }

  componentDidMount() {
    window.onhashchange = () => {
      const { path, params } = hash.parse(location.hash)
      this.setState({ view: { path, params } })
    }
  }

  renderView() {
    const { path, params } = this.state.view
    switch (path) {
      case 'list':
        return <Ingredients />
      case 'get-recipes':
        return <GeneratedRecipes />
      case 'view-recipe':
        const { id } = params
        return <ViewRecipe id={id} />
      case 'recipe-collection':
        return <RecipeCollection />
      case 'grocery-list':
        return <GroceryList />
      default:
        return <Ingredients />
    }
  }

  render () {
    return (
      <Fragment>
        <Nav/>
        {this.renderView()}
      </Fragment>
    )
  }
}
