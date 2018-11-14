import React from 'react'
import { GridList, GridListTile, GridListTileBar, Typography, withStyles } from '@material-ui/core/'

const styles = {
  heading: {
    marginTop: 100,
    marginBottom: 80
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  gridList: window.screen.availWidth < 760
  ? { width: 300, height: 180, transform: 'translateZ(0)' }
  : { width: 1200, height: 800, transform: 'translateZ(0)' },
  image: window.screen.availWidth < 760
  ? { width: '150px', height: '80px'}
  : { width: '396px', height: '235px'},
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  }
}

function RecipeList({ classes, recipes }) {
    if(!recipes) return <div>Loading...</div>
    return (
      <div>
      <Typography variant="h3" align="center" className={classes.heading}>What Looks Good?</Typography>
      <div className={classes.container}>
        <GridList cols={3} cellHeight={'auto'} className={classes.gridList}>
          {recipes.map(tile => (
            <GridListTile key={tile.image}>
              <a href={`#view-recipe?id=${tile.id}`}><img src={tile.image}
                alt={tile.title}
                id={tile.id}
                className={classes.image}/></a>
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

export default withStyles(styles)(RecipeList)
