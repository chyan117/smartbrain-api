// node.js and express.js
//express standard
//express body parser nodemon
// nice api server
// step: type: npm init -y (create json)----> install--> express---> body-parser ---> nodemon  ---> go to package.json file and edit script: "start": "nodemon server.js"--> install bcrypt-nodejs
// README

/*
res ------> this is working
use post can be ideally under https
signin----> POST = success / fail
register--> POST =user
/profile/: userId --->GET = user
/image ---> PUT---->user
*/

const express = require('express');

const app = express();

const knex = require('knex');

// knex.js can connect server and database

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'changhsinchien',
    password:'',
    database : 'smartbrain'
  }
});

const profile = require('./controllers/profile.js')

const register = require('./controllers/register.js')

const signin = require('./controllers/signin.js')

const image = require('./controllers/image.js')

db.select('*').from('users').then(data=>{
	// console.log(data)
});

// cors is used in web security : password ...

const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const bcrypt = require('bcrypt-nodejs');
app.use(cors());

// run on disk, keeping information and will not go down(has back up)
// const database  = {
// 	users: [
// 		{
// 			id: '123',
// 			name: 'John',
// 			email: 'john@gmail.com',
// 			// In reallife we never store password in string form instrad we stroe it like hashes
// 			password:'cookies',
// 			// Tract scores
// 			entries: '0',
// 			// time when join
// 			// create a date when this part gets executed
// 			join: new Date()
// 		},
// 		{
// 			id: '124',
// 			name: 'sally',
// 			email: 'Sally@gmail.com',
// 			password:'bananas',
// 			entries: '0',
// 			join: new Date()
// 		}
// 	],
// 	login:[
// 	// use bcrypt-nodejs to hash the password
// 		{
// 			id: '987',
// 			hash: '',
// 			email: 'john@gmail.com'
// 		}
// 	]
// }

//bcrypt mehtod
// bcrypt.hash();

// have to start over aka restart server
// when restart, lose all the data
app.get('/', (req, res)=>{
	res.send(db.users)
})

// this one is difficult
app.get('/profile/:id', (req, res)=>profile.handleProfileGet(req, res, db))

// update score
app.put('/image', (req, res)=> image.handleImage(req, res, db));

app.post('/imageurl', (req, res) => image.handleApiCall(req, res));

app.post('/signin', (req, res)=>{signin.handleSignin(req, res, db, bcrypt)});

// register
app.post('/register', (req, res)=>{register.handleRegister(req, res, db, bcrypt)});

app.listen(process.env.PORT||3000, ()=>{
	// run after listening happening
	console.log(`app is running at port ${process.env.PORT}`)
});