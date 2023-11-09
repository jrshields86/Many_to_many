const pg = require('pg');
const client = new pg.Client('postgres://localhost/the_vacation_planner_lives_db');
const express = require('express');
const app = express();
const path = require('path');

const homePage = path.join(__dirname, 'index.html');
app.get('/', (req, res)=> res.sendFile(homePage));

const reactApp = path.join(__dirname, 'dist/main.js');
app.get('/dist/main.js', (req, res)=> res.sendFile(reactApp));

const reactSourceMap = path.join(__dirname, 'dist/main.js.map');
app.get('/dist/main.js.map', (req, res)=> res.sendFile(reactSourceMap));

const styleSheet = path.join(__dirname, 'styles.css');
app.get('/styles.css', (req, res)=> res.sendFile(styleSheet));

const init = async()=> {
  await client.connect();
  console.log('connected to database');
  const SQL = `
    DROP TABLE IF EXISTS vacations;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS places;
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) UNIQUE
    );
    CREATE TABLE places(
      id SERIAL PRIMARY KEY,
      name VARCHAR(100)
    );
    CREATE TABLE vacations(
      id SERIAL PRIMARY KEY,
      place_id INTEGER REFERENCES places(id) NOT NULL,
      user_id INTEGER REFERENCES users(id) NOT NULL
    );
    INSERT INTO users(name) VALUES ('Joe');
    INSERT INTO users(name) VALUES ('Slater');
    INSERT INTO users(name) VALUES ('Charle');
    INSERT INTO users(name) VALUES ('Andrew');
    INSERT INTO users(name) VALUES ('Pat');
    INSERT INTO places(name) VALUES ('ICELAND');
    INSERT INTO places(name) VALUES ('TANZANIA');
    INSERT INTO places(name) VALUES ('UK');
    INSERT INTO places(name) VALUES ('CHILE');
    INSERT INTO vacations(user_id, place_id) VALUES (
      (SELECT id FROM users WHERE name='Joe'),
      (SELECT id FROM places WHERE name= 'ICELAND')
    );
  `;
  await client.query(SQL);
  console.log('create your tables and seed data');

  const port = process.env.PORT || 3000;
  app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
  });
}

init();
