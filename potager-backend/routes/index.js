const express = require('express');
const router = express.Router();
let DATA = [{
  id: 'plant-1',
  name: "Tomatoes",
  state: "Planted",
  type: "Fruit",
  desc: "Tomatos are Delicious",
  mise_a_jour: new Date()
}, {
  id: 'plant-2',
  name: "Peppers",
  state: "Flowering",
  type: "Fruit",
  desc: "Every kind of pepper, from the bell pepper to the jalapeño, fits the bill as a fruit and not a vegetable.",
  mise_a_jour: new Date()
}, {
  id: 'plant-3',
  name: "Bananas",
  state: "Harvested",
  type: "Fruit",
  mise_a_jour: new Date()
}, {
  id: 'plant-5',
  name: "Spinach",
  state: "Planted",
  type: "Vegetable",
  desc: "Spinach is at its peak between March and November",
  mise_a_jour: new Date()
},
{
  id: 'plant-6',
  name: "Pumpkin",
  state: "Planted",
  type: "Vegetable",
  desc: "The versatile pumpkin can be baked, roasted, made into soups, tarts and scones",
  mise_a_jour: new Date()
},
{
  id: 'plant-7',
  name: "Spinach",
  state: "Planted",
  type: "Vegetable",
  desc: "Spinach is at its peak between March and November",
  mise_a_jour: new Date()
}, {
  id: 'plant-8',
  name: "Celery",
  state: "Planted",
  type: "Vegetable",
  desc: "The long, pale green stalks of celery are a good source of vitamins and minerals.",
  mise_a_jour: new Date()
}]
/* GET home page. */
router.get('/all', function (req, res, next) {

  res.status(200).json(DATA);
});
router.get('/filter', function (req, res, next) {
  console.log(req)
  res.status(200).json(DATA.filter(elm => elm.type === req.query.type));
});
router.delete('/', function (req, res, next) {
  DATA = DATA.filter(elm => !containsObject(elm, req.body));

  res.status(200).json(DATA);
});
router.post('/add/', function (req, res, next) {
  let result = req.body
  result.id = `plant-${DATA.length + 1}`
  result.mise_a_jour = new Date()
  DATA = [...DATA, result]
  res.status(200).json(DATA)

})
router.post('/edit/', function (req, res, next) {
  DATA.forEach((elm, i) => {
    if (elm.id === req.body.id) {
      return DATA[i] = req.body
    }
  })
  res.status(200).json(DATA)
})
function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i].id === obj.id) {
      return true;
    }
  }
}

module.exports = router;
