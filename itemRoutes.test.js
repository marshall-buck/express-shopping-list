const request = require("supertest");

const app = require("./app");
let db = require("./fakeDb");

let pickles = {name: "pickles", price: 3.99};

beforeEach(function() {
  db.items = [];
  db.items.push(pickles);
});

afterEach(function() {
  db.items.pop();
})

/** test get all items */
describe("GET /items", function() {
  it("gets all items in database", async function() {
    const resp = await request(app)
      .get('/items')
      expect(resp.statusCode).toEqual(200);
      expect(resp.body.items[0]).toEqual({name: "pickles", price: 3.99});
  });
})
