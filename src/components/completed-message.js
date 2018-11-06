import React, {Component} from 'react'
import { Typography, withStyles, MuiThemeProvider, createMuiTheme, Grid, Button } from '@material-ui/core'
import hash from '../hash'
import blue from '@material-ui/core/colors/blue'

const styles = theme => ({
  container: {
    marginTop: 100
  },
  button: {
    color: theme.palette,
    margin: 20
  },
  image: {
    marginTop: 20,
    padding: 20,
    maxHeight: '300px',
    maxWidth: '500px'
  }
})

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
  typography: {
    useNextVariants: true,
  }
})

class CompletedMessage extends Component {
  constructor(props) {
    super(props)
    const { path, params } = hash.parse(location.hash)
    this.state = {
      message: [],
      view: { path, params }
    }
  }

  componentDidMount() {
    const { id } = this.state.view.params
    fetch(`/ingred?id=${id}`)
      .then(res => res.json())
      .then(data => {
        const message = (({ title, image }) =>
            Object.values({ title, image }))(data)
          return message
      })
      .then(result => this.setState({ message: result }))
  }

  render() {
  const { classes } = this.props
  const { message } = this.state
  if (message.length === 0) return null
    return (
      <Grid container
        alignItems="center"
        direction="column"
        spacing={40}>
        <Grid item xs>
          <Typography variant="h3" className={classes.container}>Recipe Completed!</Typography>
        </Grid>
        <Grid item xs>
          <img src={message[1]} alt={message[0]} />
        </Grid>
        <Grid item xs>
          <Typography variant="h4">Enjoy your {`${message[0]}`}</Typography>
        </Grid>
        <MuiThemeProvider theme={theme}>
          <Button className={classes.button}
            color="primary"
            variant="contained"
            href="#recipe-collection">Whip Up Another Recipe
          </Button>
        </MuiThemeProvider>
      </Grid>
    )
  }
}

export default withStyles(styles)(CompletedMessage)
