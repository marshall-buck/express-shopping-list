const { BadRequestError, NotFoundError } = require('./expressError');
const db = require('./fakeDb');

/** Checks if the URL param is in the database. Returns NotFoundError or next. */
function checkInDatabase (req, res, next) {
  const name = req.params.name;
  const item = db.items.find(item => item.name === name);

  if (!item) {
    throw new NotFoundError("Item not found.");
  } return next();
}

/** Checks if the body data is valid. Returns BadRequestError or next. */
function checkValidBodyData (req, res, next) {
  const name = req.body.name;
  const price = parseFloat(req.body.price);
  if (!name || !price) {
    throw new BadRequestError("Provide valid name and price.")
  } return next();
}

module.exports = {
  checkValidBodyData,
  checkInDatabase
}