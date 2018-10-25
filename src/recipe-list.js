import React, {Component} from 'react'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'

const styles = {
  title: {
    marginTop: 100,
    marginBottom: 50
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
  },
  text: {
    marginTop: 1 + 'rem',
    padding: 2 + 'rem',
    display: 'flex'
  },
  select: {
    marginRight: 10,
    marginLeft: 10
  },
  button: {
    background: 'rgb(80,173,85)',
    marginLeft: 20
  }
}

class ShowRecipes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      number: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { classes, recipeImages } = this.props
    const { number } = this.state
    return (
      <div>
      <Typography variant="h3" align="center" className={classes.title}>What Looks Good?</Typography>
      <div className={classes.container}>
        <GridList cols={3} cellHeight={'auto'} className={classes.gridList}>
          {recipeImages.map(tile => (
            <GridListTile key={tile.image}>
              <img src={tile.image} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                titlePosition="top"
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
      <Grid container
        justify="center"
      >
        <Grid item>
          <Typography variant="h6" className={classes.text}>Want more recipes? Include up to<span>
            <Select value={number}
              className={classes.select}
              onChange={this.handleChange}
              inputProps={{
                name: 'number'
              }}>
              <MenuItem value=""></MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </span>
          additional ingredients not on my list
          <span><Button variant="contained" className={classes.button}>Get New Recipes!</Button></span>
          </Typography>
        </Grid>
      </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(ShowRecipes)
