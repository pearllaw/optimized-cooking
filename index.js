require('dotenv/config')
const server = require('json-server')
const unirest = require('unirest')
const app = server.create()
const middleware = server.defaults()
const router = server.router('db.json')

app.use(middleware)

app.get('/recipes', (req, res, next) => {
  const query = 'fillIngredients=false&ingredients=' + req.query.ingredients + '&limitLicense=false&number=12&ranking=2'
  unirest.get('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?' + query)
   .header(
     {'X-Mashape-Key': process.env.KEY},
     {'Accept': 'application/json'}
   )
   .end(result => res.json(result.body))
})

app.get('/instructions', (req, res, next) => {
  const query = req.query.id + '/analyzedInstructions'
  unirest.get('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + query)
    .header(
      {'X-Mashape-Key': process.env.KEY},
      {'Accept': 'application/json'}
    )
    .end(result => res.json(result.body))
})

app.use(router)
app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT)
})
