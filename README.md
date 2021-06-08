# pokedex-fastify-mongodb
Pokedex created with fastify and mongodb!

How to run:
Step 1) Clone this repo and install node modules
Step 2) Download MongoDB Compass
Step 3) Create a new database (PokeMongo is what I used) and collection (Pokemon is what I used)
Step 4) Run the project with npm start or nodemon
Step 5) Use your favorite RESTful API tool such as Postman to test the endpoints

API endpoints:

GET
http://localhost:1337/api/Pokemon
  examples: 
    http://localhost:1337/api/Pokemon?number=1
    http://localhost:1337/api/Pokemon?name=Charmander

POST
http://localhost:1337/api/Create
  example json body:
    {
    "number": 2,
    "name": "Ivysaur",
    "type": ["Grass", "Poison"]
    }

PATCH
http://localhost:1337/api/Update
  example:
    http://localhost:1337/api/Update?number=1
      json body:
      {
        "name": "Bulbasaur"
      }

DELETE
http://localhost:1337/api/Delete
  example:
    http://localhost:1337/api/Delete?name=Ivysaur
