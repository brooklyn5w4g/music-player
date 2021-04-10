<template>
<div id="app">
  <div class="header">
    <router-link to="/">
      <div class="logo">
        <img src="/music.png">
      </div>
    </router-link>

    
    <div class="title">
      <h1>MyTunes</h1>
    </div>

    <router-link to="/">
      <h2>Albums</h2>
    </router-link>

  </div>
  <div class="content" >
    <router-view v-on:playSong="loadSong($event)"/>
  </div>
  <div class="player" >
      <p><strong>Song:</strong> {{currentSong.title}}</p> 
      <p><strong>Album:</strong> {{currentSong.album}}</p> 
      <p><strong>Artist:</strong> {{currentSong.artist}}</p>
      <audio ref="songPlayer" controls>
        <source :src="currentSong.src" type="audio/mpeg">
      </audio>
    </div>

  <div class="footer">
    <p>Want to see the source code for this site? You can see it <a href="https://github.com/BYU-CS-260-Winter-2021/lab-4-museum-of-ordinary-objects-brooklyn5w4g">here</a>
    </p>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'App',
  data() {
    return {
      currentSong : {title:"",album:"",artist:"",src:""}
    }
  },
  computed: {
  },

  methods: {
    async loadSong(id) {
      console.log("loading song");
      
      try {
        let response = await axios.get("/api/songs/" + id);
        this.currentSong = response.data;

        this.$refs.songPlayer.load()
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>


<style>

.player{
  display: flex;
  flex-direction: row;
  background: greenyellow;
  margin: 5px;
  padding: 20px;
  justify-content: space-between;
  flex-wrap: wrap;
}
.player p{
  padding-left: 10px;
  padding-right: 10px;
}
audio {
  padding-top: 10px;
}



.logo img{
  height: 50px;
  padding:15px;
}
.header h2{
  padding-left: 15px;
}


html {
  box-sizing: border-box;
}

body {
  padding: 0px;
  margin: 0px;
}

/* Header */
.header {
  display: flex;
  background-color: grey;
  align-items: center;
}


.content {
  padding: 20px 100px;
  min-height: 500px;
}

/* Footer */
.footer {
  height: 50px;
  padding: 20px 100px 0px 100px;
  background: grey;
}

.footer a {
  color: #000;
}

</style>
