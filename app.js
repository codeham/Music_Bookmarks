const express = require('express')
const app = express();
const db = require('./db')


const bodyParser = require('body-parser')
// define public resources in express
// define data that will be parsed by body-parser
app.use(express.static('public'))
app.use(bodyParser.json())
// data will be passed through url
const urlencodedParser = bodyParser.urlencoded({ extended: false })

/**
	Defined routes
**/
app.get('/', (req, res) => res.sendFile(__dirname + '/public/main.html'))

// make a post request to add track
app.post('/', urlencodedParser, (req, res) => {
	db.publishTrack(req.body, (err, res) => {
		if (err) {return(err.stack)}
		console.log(res)
	})
	res.redirect('/')
})

app.delete('/deleteTrack', (req, res) => {
	db.removeTrack(req.body, (err, payload) => {
		if (err) {return(err.stack)}
		res.json(payload)
	})
	// console.log(req.body)
	// res.send(req.body)
})

app.get('/getAllTracks', (req, res) => {
	db.getAllTracks((err, payload) => {
		if (err) {err.stack}
		res.json(payload)
	})
})

// database connection
db.connect()

app.listen(3001, () => console.log('currently listening on port 3001'))
