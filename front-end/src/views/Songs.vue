<template>
<div class="songs">
  <div class="albumHead">
  <img :src="currentAlbum.src"/>
  <h2>{{currentAlbum.name}} </h2>
  </div>
  <div class="song" v-for="song in songs" :key="song.id" @click="playSong(song._id)">
    <div class="info">
      <p><strong>Song:</strong> {{song.title}}</p> 
      <p><strong>Album:</strong> {{song.album.name}}</p> 
      <p><strong>Artist:</strong> {{song.artist}}</p>
    </div>

    <div>
    <button v-on:click="deleteSong(song._id)">Delete</button>
    <button v-on:click="loadEditSong(song)">Edit</button>
    </div>
  </div>
  

  <div v-if="edit">
    <h2>Edit Song</h2> 
    <input v-model="newSong.title" placeholder="Title">
    <input v-model="newSong.artist" placeholder="Artist">
    <button @click="cancelEdit()"> Cancel</button>
    <button @click="editSong(editId)">Edit</button>

  </div>
  <div v-else>
    <h2>Add Song</h2> 
    <input v-model="newSong.title" placeholder="Title">
    <input v-model="newSong.artist" placeholder="Artist">

    
    <input type="file" name="newSong" @change="fileChanged">
    <button @click="upload">Upload</button>
  </div>

</div>
</template>


<style scoped>

.info{
  display: flex;
  flex-direction: row;
}
.info p {
  padding-right:15px;

}

.song{
  display: flex;
  flex-direction: row;
  margin: 5px;
  padding: 10px;
  justify-content: space-between;
  flex-wrap: wrap;
  border:1px solid grey;
  margin:2px;
  align-items: center;
}

.song:hover{
  background:greenyellow;
}
img{
  width: 300px;
  height: 300px;
}
</style>


<script>
import axios from 'axios';
export default {
  name: 'Songs',
  data() {
    return {
      songs: [],
      file: null,
      edit: false,
      editId: "",
      currentAlbum : {},
      newSong : {title:"",artist:"",album:{},src:""}
    }
  },
  created() {
    this.getAlbum(this.$route.params.id)
  },
  methods: {
    async getAlbum(id){
      try {
        let response = await axios.get("/api/albums/" + id);
        console.log(response.data)
        this.currentAlbum = response.data;
        this.getSongs();
      } catch (error) {
        console.log(error);
      }
      
    },
    cancelEdit(){
      this.edit = false;
      this.newSong.title = "";
      this.newSong.artist = "";
    },
    loadEditSong(song){
      this.edit = true;
      this.newSong = Object.assign({},song)
      this.editId = song._id
    },
    playSong(id){
      this.$emit('playSong',id);
      console.log("CLicked on " + id);
    },
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async getSongs() {
    try {
      let response = await axios.get("/api/album/" + this.currentAlbum._id);
      this.songs = response.data;
      console.log(this.songs)
      return true;
    } catch (error) {
      console.log(error);
    }
    },
    async deleteSong(id) {
      try {
        await axios.delete("/api/songs/" + id);
        this.getSongs();
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    async editSong(id) {
      try {
        await axios.put("/api/songs/" + id, {
          title: this.newSong.title,
          artist : this.newSong.artist,
        });
        
        this.getSongs();
        this.cancelEdit();

        return true;
      } catch (error) {
        console.log(error);
      }
    },

    async upload() {
      try {
        const formData = new FormData();
        formData.append('newSong', this.file, this.file.name)
        let r1 = await axios.post('/api/files', formData);

        console.log(this.currentAlbum);

        await axios.post('/api/songs', {
          title: this.newSong.title,
          artist : this.newSong.artist,
          album : this.currentAlbum,
          src: r1.data.src
        });
        this.newSong.title = "";
        this.newSong.artist = "";
        this.getSongs();
        
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

