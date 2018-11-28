import React, { Component, Fragment } from 'react'
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
import { withStyles } from '@material-ui/core'

const backgroundUrl = 'https://d39l2hkdp2esp1.cloudfront.net/img/photo/126844/126844_00_2x.jpg?20170622031731'
const styles = {
  background: {
    backgroundImage: `url(${backgroundUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: 767,
    opacity: 0.85
  }
}

class Recipes extends Component {
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
    const { path } = this.state.view
    const { classes } = this.props
    return (
      <Fragment>
        <Nav/>
        <div className={ path === 'list' || path === '' ? classes.background : null }>
          {this.renderView()}
        </div>
      </Fragment>
    )
  }
}

export default withStyles(styles)(Recipes)
