import React, {Component} from 'react'
import { GridList, GridListTile, GridListTileBar, Typography, withStyles } from '@material-ui/core/'

const styles = {
  title: {
    marginTop: 100,
    marginBottom: 80
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  gridList: {
    width: 1200,
    height: 800,
    transform:'translateZ(0)'
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  }
}

class GeneratedRecipes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: null
    }
  }

  componentDidMount() {
    fetch('/ingredients')
      .then(res => res.json())
      .then(list => list.map(item => item.ingredient))
      .then(result => {
        fetch(`/recipes?ingredients=${result}`)
          .then(res => res.json())
          .then(recipes => {
            this.setState({ recipes: recipes })
          })
      })
  }

  render() {
    const { recipes } = this.state
    const { classes } = this.props
    if(!recipes) return null
    return (
      <div>
      <Typography variant="h3" align="center" className={classes.title}>What Looks Good?</Typography>
      <div className={classes.container}>
        <GridList cols={3} cellHeight={'auto'} className={classes.gridList}>
          {recipes.map(tile => (
            <GridListTile key={tile.image}>
              <a href={`#view-recipe?id=${tile.id}`}><img src={tile.image}
                alt={tile.title}
                id={tile.id}
                width="396px"
                height="235px"/></a>
              <GridListTileBar
                title={tile.title}
                titlePosition="top"
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
      </div>
    )
  }
}

export default withStyles(styles)(GeneratedRecipes)
