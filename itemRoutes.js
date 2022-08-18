const express = require('express');

const { checkInDatabase, checkValidBodyData } = require('./middleware');


const db = require('./fakeDb');
const router = new express.Router();


/**  returns JSON { items: [
          { name: "popsicle", price: 1.45 },
          { name: "cheerios", price: 3.40 }
                ]} */
router.get('/', function (req, res) {
  return res.json({ items: db.items });
});

/** accepts JSON body  { name: "cheerios", price: 3.40 }
 * adds to db
 * -returns  {added: {name: "popsicle", price: 1.45}}
 */
router.post('/', checkValidBodyData, function (req, res) {
  const name = req.body.name;
  const price = parseFloat(req.body.price);

  db.items.push({ name, price });

  return res.json({ added: { name, price } });

});

/** GET /items/:name: return single item: as json {name: "popsicle", "price": 1.45}  */
router.get('/:name', checkInDatabase, function (req, res) {
  const name = req.params.name;

  const item = db.items.find(item => item.name === name);
  return res.json(item);
});


/** PATCH /items/:name: accept JSON body: {name: "new popsicle", price: 2.45},
 * modify item, return json: {updated: {name: "new popsicle", price: 2.45}} */
router.patch('/:name',
            checkValidBodyData,
            checkInDatabase,
            function (req, res) {
  const oldNAme = req.params.name;
  const newName = req.body.name;
  const price = parseFloat(req.body.price);

  const index = db.items.findIndex(item => item.name === oldNAme);
  const item = db.items[index];

  item.name = newName || oldNAme;
  item.price = price || item.price;

  db.items[index] = item;

  return res.json({ updated: { item } });
});


/** DELETE /items/:name: , returns json {message: "Deleted"} */
router.delete('/:name', checkInDatabase, function (req, res) {
  const name = req.params.name;
  const index = db.items.findIndex(item => item.name === name);

  db.items.splice(index, 1);

  return res.json({message: "Deleted"});

});


module.exports = router;