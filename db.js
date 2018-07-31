const config = require('./config');
/**
	Database Connection
CREATE TABLE MUSIC_BOOKMARK(
	ID SERIAL PRIMARY KEY, 
	TRACK TEXT NOT NULL, 
	ARTIST TEXT NOT NULL, 
	GENRE TEXT, 
	URL TEXT NOT NULL);
**/

const pg = require('pg')
// db connection 
const client = new pg.Client(config.development.url)

const connect = () => {
	client.connect((err, res) => {
		if(err){
			return console.log('connection failure')
		}else{console.log('Connected to ' + res.database)}
	})
}

const publishTrack = (jsonData, callback) => {
	const values = []

	console.log(jsonData)
	for(const prop in jsonData){
		values.push(jsonData[prop])
	}
	console.log(values)
	const textQuery = 'INSERT INTO MUSIC_BOOKMARK(track, artist, url, genre) VALUES($1, $2, $3, $4)'

	client.query(textQuery, values, (err, res) => {
		if(err){ 
			return callback(err, null) 
		}else{
		 	console.log(res.rows[0])
		 	callback(null, res)
		} 
	})
}

const removeTrack = (object, callback) => {
	id = object.id
	let removeQuery = 'DELETE FROM MUSIC_BOOKMARK WHERE id=' + id
	client.query(removeQuery, (err, res) => {
		if (err) { return callback(err, null)}
		callback(null, res)
	})
	// console.log(removeQuery)
}

/**
	Grab all products to append go table (GET)
**/
const getAllTracks = (callback) => {
	let getQuery = 'SELECT * FROM MUSIC_BOOKMARK'
	client.query(getQuery, (err, res) => {
		if (err) { return callback(err, null) }
		callback(null, res.rows)
	})
}



module.exports = {connect, publishTrack, removeTrack, getAllTracks}