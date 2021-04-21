<template>
<div id="app">
  <div class="header">
    <div class="header-main">
      <router-link to="/">
      <div class="logo">
        <img src="/music.png">
      </div>
      </router-link>
      <div class="title">
        <h2>MyTunes</h2>
      </div>
      <router-link to="/">
        <h2>Albums</h2>
      </router-link>
    </div>
    <a>
    <h2 id="logout" @click="logout()">Logout</h2>
    </a>
  </div>


  <div v-if="user" class="content" >
    <router-view v-on:playSong="loadSong($event)"/>
  </div>
  <Login v-else/>


  <div v-if="user" class="player" >
      <p><strong>Song:</strong> {{currentSong.title}}</p> 
      <p><strong>Album:</strong> {{currentSong.album.name}}</p> 
      <p><strong>Artist:</strong> {{currentSong.artist}}</p>
      <audio ref="songPlayer" controls>
        <source :src="currentSong.src" type="audio/mpeg">
      </audio>
    </div>

  <div class="footer">
    <p>Want to see the source code for this site? You can see it <a href="https://github.com/brooklyn5w4g/music-player">here</a>.
    I spent about 8 hours on this final project.
    </p>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import Login from '@/components/Login.vue'
export default {
  name: 'App',
  components:{
    Login
  },
  data() {
    return {
      currentSong : {title:"",album:{},artist:"",src:""}
    }
  },
  computed:{
    user(){
      return this.$root.$data.user;
    },
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  methods: {
    async loadSong(id) {      
      try {
        let response = await axios.get("/api/songs/" + id);
        this.currentSong = response.data;
        this.$refs.songPlayer.load()
        return true;
      }catch(error){
        console.log(error);
      }
    },
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
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
  margin: 20px;
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

a{
  text-decoration: none;
  color: black;
  padding-left:10px;
  padding-right:10px;
}
a:hover{
  color: greenyellow;
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
  margin: 0px;
  padding-bottom: 75px;
}

/* Header */
.header {
  display: flex;
  background-color: grey;
  align-items: center;
  justify-content: space-between;
}
.header-main{
  display: flex;
  flex-direction: row;
  align-items:center;
}

#logout{
  padding-right: 15px;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}

/* Footer */
.footer {
  height: 50px;
  padding: 10px;
  background: grey;
  position: fixed;
  left:0;
  bottom: 0;
  width: 100%;
}

.footer a {
  color: #000;
  text-decoration: underline;
  padding:0px;
}

</style>
