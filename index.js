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
     {'X-Mashape-Key': 'HMGCCCcGW9mshhPZsZQ880WxAc1Mp1snUAMjsn69fDjNL2VZSa'},
     {'Accept': 'application/json'}
   )
   .end(result => res.json(result.body))
})

app.get('/ingred', (req, res, next) => {
  const query = req.query.id + '/information'
  unirest.get('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + query)
    .header(
      {'X-Mashape-Key': 'HMGCCCcGW9mshhPZsZQ880WxAc1Mp1snUAMjsn69fDjNL2VZSa'},
      {'Accept': 'application/json'}
    )
    .end(result => res.json(result.body))
})

app.get('/nutritional', (req, res, next) => {
  const query = 'targetCalories=' + req.query.number + '&timeFrame=day'
  unirest.get('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/mealplans/generate?' + query)
    .header(
      {'X-Mashape-Key': 'HMGCCCcGW9mshhPZsZQ880WxAc1Mp1snUAMjsn69fDjNL2VZSa'},
      {'Accept': 'application/json'}
    )
    .end(result => res.json(result.body))
})

app.use(router)

app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT)
})
