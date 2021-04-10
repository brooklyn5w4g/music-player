

<template>
<div class="albums">
  <div class="albumContainer">
    <div class="album" v-for="album in albums" :key="album._id" >
      
      <img :src="album.src" @click="openAlbum(album._id)"/>
      <div class="albumFoot">
        <h3> {{album.name}} </h3>

        <button v-on:click="deleteAlbum(album._id)">Delete</button>
        <button v-on:click="loadEditAlbum(album)">Edit</button>
      </div>
    </div>
  </div>

  <div v-if="edit">
    <h2>Edit Album</h2> 
    
    <input v-model="newAlbum.name" placeholder="Album">
    <button @click="cancelEdit()">Cancel</button>
    <button @click="editAlbum(editId)">Edit</button>

  </div>
  <div v-else>
    <h2>Add Album</h2> 
    
    <input v-model="newAlbum.name" placeholder="Album Name">
    
    <input type="file" name="newAlbum" @change="fileChanged">
    <button @click="upload">Upload</button>
  </div>

</div>
</template>


<style scoped>

img{
  width: 300px;
  height: 300px;
}
.albumContainer{
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.album{
  display: flex;
  flex-direction: column;
  width:300px;
  padding: 20px;
}

.albumFoot{
  display:flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}
</style>


<script>
import axios from 'axios';
export default {
  name: 'Albums',
  data() {
    return {
      albums: [],
      file: null,
      edit: false,
      editId: "",
      newAlbum : {name:"",src:""}
    }
  },
  created() {
    this.getAlbums();
      
  },
  methods: {
    cancelEdit(){
      this.edit = false;
      this.newAlbum.name = "";
    },
    loadEditAlbum(album){
      this.edit = true;
      this.newAlbum = Object.assign({},album)
      this.editId = album._id
    },
    openAlbum(id){
      this.$router.push({name :"songs", params : {id} });
    },
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async getAlbums() {
    try {
      let response = await axios.get("/api/albums");
      this.albums = response.data;
      return true;
    } catch (error) {
      console.log(error);
    }
    },
    async deleteAlbum(id) {
      try {
        await axios.delete("/api/albums/" + id);
        this.getAlbums();
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    async editAlbum(id) {
      try {
        await axios.put("/api/albums/" + id, {
          name: this.newAlbum.name
        });
        
        this.getAlbums();
        this.edit = false;
        this.newAlbum.name = "";
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    async upload() {
      try {
        const formData = new FormData();
        formData.append('newAlbum', this.file, this.file.name)
        let r1 = await axios.post('/api/artwork', formData);
        await axios.post('/api/albums', {
          name: this.newAlbum.name,
          src: r1.data.src
        });
        this.getAlbums();
        
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

