<template>
  <section class="music">
    <div class="container">
      <ul  class="music__list">
        <li v-for="(song, i) of spotySongs" :key="i" class="music__item">
          <h3 @click.prevent="user" class="music__title">{{ song.name }}</h3>
          <p>{{ song.artists[0].name }}</p>
          <figure>
            <img :src="song.album.images[0].url" alt="">
          </figure>
          <button v-if="!audio.play || audio.paused == true" @click="play(song.preview_url, i)" class="btn btn-play">
            <svg viewBox="0 0 24 24" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM10.6935 15.8458L15.4137 13.059C16.1954 12.5974 16.1954 11.4026 15.4137 10.941L10.6935 8.15419C9.93371 7.70561 9 8.28947 9 9.21316V14.7868C9 15.7105 9.93371 16.2944 10.6935 15.8458Z"
                    fill="currentColor"/>
            </svg>
          </button>
          <button v-if="current" @click.prevent="pausess" class="btn btn-play">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                 viewBox="0 0 56 56">
              <path
                  d="M 27.9999 51.9063 C 41.0546 51.9063 51.9063 41.0781 51.9063 28 C 51.9063 14.9453 41.0312 4.0937 27.9765 4.0937 C 14.8983 4.0937 4.0937 14.9453 4.0937 28 C 4.0937 41.0781 14.9218 51.9063 27.9999 51.9063 Z M 21.8593 36.4609 C 20.7812 36.4609 20.3124 35.8984 20.3124 35.0312 L 20.3124 20.9922 C 20.3124 20.1484 20.7812 19.5625 21.8593 19.5625 L 23.9921 19.5625 C 25.0702 19.5625 25.5390 20.1484 25.5390 20.9922 L 25.5390 35.0312 C 25.5390 35.8984 25.0702 36.4609 23.9921 36.4609 Z M 31.9843 36.4609 C 30.9296 36.4609 30.4140 35.8984 30.4140 35.0312 L 30.4140 20.9922 C 30.4140 20.1484 30.9296 19.5625 31.9843 19.5625 L 34.1171 19.5625 C 35.1718 19.5625 35.6640 20.1484 35.6640 20.9922 L 35.6640 35.0312 C 35.6640 35.8984 35.1718 36.4609 34.1171 36.4609 Z"/>
            </svg>
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      serialize: '',
      audio: '',
      userId: 'e9ecce03e7814b51a1fd06158d441259',
      userSec: 'f2905a01c56649feb4302c6f3428ae72',
      token: '',
      spotySongs: null,
      current: '',
      pause: null,
    }
  },
  methods: {
    play(src, i) {
          this.audio = new Audio(src)
          this.current = this.spotySongs[i]
          this.audio.play();
    },
    pausess() {
        this.current = false
        this.audio.pause();
    },
    async user() {
     await axios
          .post('https://accounts.spotify.com/api/token',
              this.serialize({
                grant_type: 'client_credentials'
              }), {
                headers: {
                  'Authorization': 'Basic ' + btoa(this.userId + ':' + this.userSec),
                }
              })
          .then(res => this.token = res.data.access_token)
          .catch(err => console.log(err))
    },
    async getMusic() {
        await axios.get('https://api.spotify.com/v1/search?q=Travis&type=track', {
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        })
        .then(response => this.spotySongs = response.data.tracks.items)
      },
      load() {
        return this.spotySongs.find(el => el.id == this.current.id)
      }
  },
  created() {
    this.serialize = function (obj) {
      const str = [];
      for (let p in obj) {
        if (obj.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
      }
      return str.join("&");
    },
    this.user();
  },
  watch: {
    token() {
      this.getMusic();
    },
   
    audio() {
      if (this.audio.src) {
        console.log(this.audio.played);
      } 
    }
  }
}

</script>
<style lang="scss">
svg {
  width: 75px;
  height: 75px;
}
</style>
