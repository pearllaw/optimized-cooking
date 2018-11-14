import React, {Component, Fragment} from 'react'
import Nav from './components/navbar'
import hash from './hash'
import Ingredients from './containers/ingredients'
import GeneratedRecipes from './containers/generated-recipes'
import ViewRecipe from './containers/view-recipe'
import RecipebyCalories from './containers/view-calorie-recipe'
import RecipeCollection from './containers/view-recipe-collection'
import ViewGroceries from './containers/view-grocery-list'
import MakeRecipe from './containers/make-recipe'
import CompletedMessage from './components/completed-message'

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
    const { id } = params
    switch (path) {
      case 'list':
        return <Ingredients />
      case 'get-recipes':
        return <GeneratedRecipes />
      case 'recipes-by-calorie':
        return <RecipebyCalories />
      case 'view-recipe':
        return <ViewRecipe id={id} />
      case 'recipe-collection':
        return <RecipeCollection />
      case 'grocery-list':
        return <ViewGroceries />
      case 'instructions':
        return <MakeRecipe />
      case 'recipe-complete':
        return <CompletedMessage id={id}/>
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
