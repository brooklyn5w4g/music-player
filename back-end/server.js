const express = require('express');
const bodyParser = require("body-parser");
const multer = require('multer')


const upload = multer({
  dest: '../front-end/public/files',
  limits: {
    fileSize: 100000000000 // added 2 zeros
  }
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
    name: 'session',
    keys: ['secretValue'],
    cookie: {
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// import the users module and setup its API path
const users = require("./users.js");
app.use("/api/users", users.routes);
const User = users.model;



const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/music-player', {
  useNewUrlParser: true
});

const albumSchema = new mongoose.Schema({
  name: String,
  src: String,
  user:{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  album: {
    type: mongoose.Schema.ObjectId,
    ref: 'Album'
  },
  user:{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  src: String,
});

const Album = mongoose.model("Album",albumSchema);

const Song = mongoose.model('Song', songSchema);


const validUser = users.valid;


app.post('/api/files',validUser, upload.single('newSong'), async (req, res) => {
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    src: "/files/" + req.file.filename
  });
});



app.post('/api/songs',validUser, async (req, res) => {
  let myAlbum = null;
  ///console.log(req.body)
  try {
    myAlbum = await Album.findOne({
      _id: req.body.album._id,
      user: req.user
    });
  }
  catch(error){
    console.log(error);
    res.sendStatus(500);
  }

  const item = new Song({
    title: req.body.title,
    artist : req.body.artist,
    album : myAlbum,
    src: req.body.src,
    user: req.user
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// app.get('/api/songs',validUser, async (req, res) => {
//   try {
//     let songs = await Song.find().populate('album');
//     res.send(songs);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// });

app.delete('/api/songs/:id',validUser, async (req,res) => {
  try {
    await Song.deleteOne({
      _id: req.params.id,
      user: req.user
    });
    res.sendStatus(200);
  }
  catch(error){
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/songs/:id',validUser, async (req,res) => {
  try {
    let mySong = await Song.findOne({
      _id: req.params.id,
      user: req.user
    }).populate('album');
    res.send(mySong);
  }
  catch(error){
    console.log(error);
    res.sendStatus(500);
  }
});


app.put('/api/songs/:id',validUser, async (req,res) => {
  try {
    let mySong= await Song.findOne({
      _id: req.params.id,
      user: req.user
    });
    mySong.title = req.body.title;
    mySong.artist = req.body.artist;
  
    
    await mySong.save();
    res.sendStatus(200);
  }
  catch(error){
    console.log(error);
    res.sendStatus(500);
  }
});






//Albums 


//returns songs
app.get('/api/album/:albumID',validUser, async (req, res) => {
  try {
    let myAlbum = await Album.findOne({
      _id: req.params.albumID,
      user: req.user
    });
    //console.log(myAlbum);
    let songs = await Song.find({
      album: myAlbum
    }).populate('album');

    //console.log(songs)
    res.send(songs);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});



app.post('/api/artwork',validUser, upload.single('newAlbum'), async (req, res) => {
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    src: "/files/" + req.file.filename
  });
});


app.post('/api/albums',validUser, async (req, res) => {
  const item = new Album({
    name: req.body.name,
    src: req.body.src,
    user: req.user
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.get('/api/albums',validUser, async (req, res) => {
  try {
    let albums = await Album.find({
      user: req.user
    });
    res.send(albums);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/albums/:id',validUser, async (req,res) => {
  try {
    let myAlbum = await Album.findOne({
      _id: req.params.id,
      user: req.user
    });
    res.send(myAlbum)
  }
  catch(error){
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/albums/:id',validUser, async (req,res) => {
  try {
    await Album.deleteOne({
      _id: req.params.id,
      user: req.user
    });
    res.sendStatus(200);
  }
  catch(error){
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/albums/:id',validUser, async (req,res) => {
  try {
    let myAlbum = await Album.findOne({
      _id: req.params.id,
      user: req.user
    });
    myAlbum.name = req.body.name;
    
    await myAlbum.save();
    res.sendStatus(200);
  }
  catch(error){
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3001, () => console.log('Server listening on port 3001!'));
