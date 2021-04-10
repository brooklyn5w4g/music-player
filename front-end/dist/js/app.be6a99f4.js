(function(e){function t(t){for(var r,i,u=t[0],s=t[1],l=t[2],m=0,p=[];m<u.length;m++)i=u[m],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&p.push(a[i][0]),a[i]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);c&&c(t);while(p.length)p.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,u=1;u<n.length;u++){var s=n[u];0!==a[s]&&(r=!1)}r&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={app:0},o=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],s=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var c=s;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"0be1":function(e,t,n){"use strict";n("5663")},3587:function(e,t,n){},5663:function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"header"},[n("router-link",{attrs:{to:"/"}},[n("div",{staticClass:"logo"},[n("img",{attrs:{src:"/music.png"}})])]),e._m(0),n("router-link",{attrs:{to:"/"}},[n("h2",[e._v("Albums")])])],1),n("div",{staticClass:"content"},[n("router-view",{on:{playSong:function(t){return e.loadSong(t)}}})],1),n("div",{staticClass:"player"},[n("p",[n("strong",[e._v("Song:")]),e._v(" "+e._s(e.currentSong.title))]),n("p",[n("strong",[e._v("Album:")]),e._v(" "+e._s(e.currentSong.album))]),n("p",[n("strong",[e._v("Artist:")]),e._v(" "+e._s(e.currentSong.artist))]),n("audio",{ref:"songPlayer",attrs:{controls:""}},[n("source",{attrs:{src:e.currentSong.src,type:"audio/mpeg"}})])]),e._m(1)])},o=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"title"},[n("h1",[e._v("MyTunes")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"footer"},[n("p",[e._v("Want to see the source code for this site? You can see it "),n("a",{attrs:{href:"https://github.com/brooklyn5w4g/music-player"}},[e._v("here")])])])}],i=n("1da1"),u=(n("96cf"),n("bc3a")),s=n.n(u),l={name:"App",data:function(){return{currentSong:{title:"",album:"",artist:"",src:""}}},computed:{},methods:{loadSong:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return console.log("loading song"),n.prev=1,n.next=4,s.a.get("/api/songs/"+e);case 4:return r=n.sent,t.currentSong=r.data,t.$refs.songPlayer.load(),n.abrupt("return",!0);case 10:n.prev=10,n.t0=n["catch"](1),console.log(n.t0);case 13:case"end":return n.stop()}}),n,null,[[1,10]])})))()}}},c=l,m=(n("034f"),n("2877")),p=Object(m["a"])(c,a,o,!1,null,null,null),d=p.exports,g=n("8c4f"),v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"albums"},[n("div",{staticClass:"albumContainer"},e._l(e.albums,(function(t){return n("div",{key:t._id,staticClass:"album"},[n("img",{attrs:{src:t.src},on:{click:function(n){return e.openAlbum(t._id)}}}),n("div",{staticClass:"albumFoot"},[n("h3",[e._v(" "+e._s(t.name)+" ")]),n("button",{on:{click:function(n){return e.deleteAlbum(t._id)}}},[e._v("Delete")]),n("button",{on:{click:function(n){return e.loadEditAlbum(t)}}},[e._v("Edit")])])])})),0),e.edit?n("div",[n("h2",[e._v("Edit Album")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.newAlbum.name,expression:"newAlbum.name"}],attrs:{placeholder:"Album"},domProps:{value:e.newAlbum.name},on:{input:function(t){t.target.composing||e.$set(e.newAlbum,"name",t.target.value)}}}),n("button",{on:{click:function(t){return e.cancelEdit()}}},[e._v("Cancel")]),n("button",{on:{click:function(t){return e.editAlbum(e.editId)}}},[e._v("Edit")])]):n("div",[n("h2",[e._v("Add Album")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.newAlbum.name,expression:"newAlbum.name"}],attrs:{placeholder:"Album Name"},domProps:{value:e.newAlbum.name},on:{input:function(t){t.target.composing||e.$set(e.newAlbum,"name",t.target.value)}}}),n("input",{attrs:{type:"file",name:"newAlbum"},on:{change:e.fileChanged}}),n("button",{on:{click:e.upload}},[e._v("Upload")])])])},f=[],b=(n("b0c0"),{name:"Albums",data:function(){return{albums:[],file:null,edit:!1,editId:"",newAlbum:{name:"",src:""}}},created:function(){this.getAlbums()},methods:{cancelEdit:function(){this.edit=!1,this.newAlbum.name=""},loadEditAlbum:function(e){this.edit=!0,this.newAlbum=Object.assign({},e),this.editId=e._id},openAlbum:function(e){this.$router.push({name:"songs",params:{id:e}})},fileChanged:function(e){this.file=e.target.files[0]},getAlbums:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,s.a.get("/api/albums");case 3:return n=t.sent,e.albums=n.data,t.abrupt("return",!0);case 8:t.prev=8,t.t0=t["catch"](0),console.log(t.t0);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})))()},deleteAlbum:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,s.a["delete"]("/api/albums/"+e);case 3:return t.getAlbums(),n.abrupt("return",!0);case 7:n.prev=7,n.t0=n["catch"](0),console.log(n.t0);case 10:case"end":return n.stop()}}),n,null,[[0,7]])})))()},editAlbum:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,s.a.put("/api/albums/"+e,{name:t.newAlbum.name});case 3:return t.getAlbums(),t.edit=!1,t.newAlbum.name="",n.abrupt("return",!0);case 9:n.prev=9,n.t0=n["catch"](0),console.log(n.t0);case 12:case"end":return n.stop()}}),n,null,[[0,9]])})))()},upload:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,n=new FormData,n.append("newAlbum",e.file,e.file.name),t.next=5,s.a.post("/api/artwork",n);case 5:return r=t.sent,t.next=8,s.a.post("/api/albums",{name:e.newAlbum.name,src:r.data.src});case 8:e.getAlbums(),t.next=14;break;case 11:t.prev=11,t.t0=t["catch"](0),console.log(t.t0);case 14:case"end":return t.stop()}}),t,null,[[0,11]])})))()}}}),h=b,w=(n("ebac"),Object(m["a"])(h,v,f,!1,null,"621d8f86",null)),S=w.exports,_=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"songs"},[e._l(e.songs,(function(t){return n("div",{key:t.id,staticClass:"song",on:{click:function(n){return e.playSong(t._id)}}},[n("div",{staticClass:"info"},[n("p",[n("strong",[e._v("Song:")]),e._v(" "+e._s(t.title))]),n("p",[n("strong",[e._v("Album:")]),e._v(" "+e._s(t.album))]),n("p",[n("strong",[e._v("Artist:")]),e._v(" "+e._s(t.artist))])]),n("div",[n("button",{on:{click:function(n){return e.deleteSong(t._id)}}},[e._v("Delete")]),n("button",{on:{click:function(n){return e.loadEditSong(t)}}},[e._v("Edit")])])])})),e.edit?n("div",[n("h2",[e._v("Edit Song")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.newSong.title,expression:"newSong.title"}],attrs:{placeholder:"Title"},domProps:{value:e.newSong.title},on:{input:function(t){t.target.composing||e.$set(e.newSong,"title",t.target.value)}}}),n("input",{directives:[{name:"model",rawName:"v-model",value:e.newSong.artist,expression:"newSong.artist"}],attrs:{placeholder:"Artist"},domProps:{value:e.newSong.artist},on:{input:function(t){t.target.composing||e.$set(e.newSong,"artist",t.target.value)}}}),n("input",{directives:[{name:"model",rawName:"v-model",value:e.newSong.album,expression:"newSong.album"}],attrs:{placeholder:"Album"},domProps:{value:e.newSong.album},on:{input:function(t){t.target.composing||e.$set(e.newSong,"album",t.target.value)}}}),n("button",{on:{click:function(t){return e.cancelEdit()}}},[e._v(" Cancel")]),n("button",{on:{click:function(t){return e.editSong(e.editId)}}},[e._v("Edit")])]):n("div",[n("h2",[e._v("Add Song")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.newSong.title,expression:"newSong.title"}],attrs:{placeholder:"Title"},domProps:{value:e.newSong.title},on:{input:function(t){t.target.composing||e.$set(e.newSong,"title",t.target.value)}}}),n("input",{directives:[{name:"model",rawName:"v-model",value:e.newSong.artist,expression:"newSong.artist"}],attrs:{placeholder:"Artist"},domProps:{value:e.newSong.artist},on:{input:function(t){t.target.composing||e.$set(e.newSong,"artist",t.target.value)}}}),n("input",{directives:[{name:"model",rawName:"v-model",value:e.newSong.album,expression:"newSong.album"}],attrs:{placeholder:"Album"},domProps:{value:e.newSong.album},on:{input:function(t){t.target.composing||e.$set(e.newSong,"album",t.target.value)}}}),n("input",{attrs:{type:"file",name:"newSong"},on:{change:e.fileChanged}}),n("button",{on:{click:e.upload}},[e._v("Upload")])])],2)},A=[],x={name:"Songs",data:function(){return{songs:[],file:null,edit:!1,editId:"",currentAlbum:"",newSong:{title:"",artist:"",album:"",src:""}}},created:function(){this.currentAlbum=this.$route.params.id,this.getSongs()},methods:{cancelEdit:function(){this.edit=!1,this.newSong.title="",this.newSong.album="",this.newSong.artist=""},loadEditSong:function(e){this.edit=!0,this.newSong=Object.assign({},e),this.editId=e._id},playSong:function(e){this.$emit("playSong",e),console.log("CLicked on "+e)},fileChanged:function(e){this.file=e.target.files[0]},getSongs:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,s.a.get("/api/album/"+e.currentAlbum);case 3:return n=t.sent,e.songs=n.data,t.abrupt("return",!0);case 8:t.prev=8,t.t0=t["catch"](0),console.log(t.t0);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})))()},deleteSong:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,s.a["delete"]("/api/songs/"+e);case 3:return t.getSongs(),n.abrupt("return",!0);case 7:n.prev=7,n.t0=n["catch"](0),console.log(n.t0);case 10:case"end":return n.stop()}}),n,null,[[0,7]])})))()},editSong:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,s.a.put("/api/songs/"+e,{title:t.newSong.title,artist:t.newSong.artist,album:t.newSong.album});case 3:return t.getSongs(),n.abrupt("return",!0);case 7:n.prev=7,n.t0=n["catch"](0),console.log(n.t0);case 10:case"end":return n.stop()}}),n,null,[[0,7]])})))()},upload:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,n=new FormData,n.append("newSong",e.file,e.file.name),t.next=5,s.a.post("/api/files",n);case 5:return r=t.sent,console.log(e.currentAlbum),t.next=9,s.a.post("/api/songs",{title:e.newSong.title,artist:e.newSong.artist,album:e.newSong.album,albumID:e.currentAlbum,src:r.data.src});case 9:e.newSong.title="",e.newSong.album="",e.newSong.artist="",e.getSongs(),t.next=18;break;case 15:t.prev=15,t.t0=t["catch"](0),console.log(t.t0);case 18:case"end":return t.stop()}}),t,null,[[0,15]])})))()}}},k=x,y=(n("0be1"),Object(m["a"])(k,_,A,!1,null,"6d1d3e1f",null)),O=y.exports;r["a"].use(g["a"]);var j=[{path:"/album",name:"songs",component:O},{path:"/",name:"albums",component:S}],C=new g["a"]({mode:"history",base:"/",routes:j}),E=C;r["a"].config.productionTip=!1,new r["a"]({router:E,render:function(e){return e(d)}}).$mount("#app")},"85ec":function(e,t,n){},ebac:function(e,t,n){"use strict";n("3587")}});
//# sourceMappingURL=app.be6a99f4.js.map