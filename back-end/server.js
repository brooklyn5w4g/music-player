const express = require('express');
const bodyParser = require("body-parser");


const multer = require('multer')
const upload = multer({
  dest: '/var/www/mytunes.byujosh.com/files',
  limits: {
    fileSize: 100000000000 // added 2 zeros
  }
});



const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/music-player', {
  useNewUrlParser: true
});

const itemSchema = new mongoose.Schema({
  title: String,
  artist: String,
  album: String,
  albumID: String,
  src: String,
});

const Item = mongoose.model('Item', itemSchema);


const albumSchema = new mongoose.Schema({
  name: String,
  src: String,
});

const Album = mongoose.model("Album",albumSchema);

app.post('/api/files', upload.single('newSong'), async (req, res) => {
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    src: "/files/" + req.file.filename
  });
});



app.post('/api/songs', async (req, res) => {
  const item = new Item({
    title: req.body.title,
    artist : req.body.artist,
    album : req.body.album,
    albumID: req.body.albumID,
    src: req.body.src
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/songs', async (req, res) => {
  try {
    let songs = await Item.find();
    res.send(songs);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/songs/:id', async (req,res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  }
  catch(error){
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/songs/:id', async (req,res) => {
  try {
    let myItem = await Item.findOne({
      _id: req.params.id
    });
    res.send(myItem);
  }
  catch(error){
    console.log(error);
    res.sendStatus(500);
  }
});


app.put('/api/songs/:id', async (req,res) => {
  try {
    let mySong= await Item.findOne({
      _id: req.params.id
    });
    mySong.title = req.body.title;
    mySong.artist = req.body.artist;
    mySong.album = req.body.album;
    
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
app.get('/api/album/:albumID', async (req, res) => {
  try {
    let songs = await Item.find({
      albumID: req.params.albumID
    });
    //console.log("getting songs" + req.params.albumID);
    res.send(songs);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});



app.post('/api/artwork', upload.single('newAlbum'), async (req, res) => {
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    src: "/files/" + req.file.filename
  });
});


app.post('/api/albums', async (req, res) => {
  const item = new Album({
    name: req.body.name,
    src: req.body.src
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.get('/api/albums', async (req, res) => {
  try {
    let albums = await Album.find();
    res.send(albums);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/albums/:id', async (req,res) => {
  try {
    await Album.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  }
  catch(error){
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/albums/:id', async (req,res) => {
  try {
    let myAlbum = await Album.findOne({
      _id: req.params.id
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
