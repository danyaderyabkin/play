<template>
  <div class="container">
    <h1 class="main-title">Поиск по треку или исполнителю</h1>
    <form @submit.prevent="getMusic">
      <div>
        <input v-model="search" type="text">
        <button class="btn-play" type="submit">
          <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M34.9887 35.0278L48 48M40.5 21.75C40.5 32.1052 32.1052 40.5 21.75 40.5C11.3947 40.5 3 32.1052 3 21.75C3 11.3947 11.3947 3 21.75 3C32.1052 3 40.5 11.3947 40.5 21.75Z"
                stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

        </button>
      </div>
    </form>
    <ul class="music__list">
      <li v-for="(song, i) of spotySongs" :key="song.id" class="music__item">
        <h3 class="music__title">{{ song.name }}</h3>
        <p>{{ song.artists[0].name }}</p>
        <figure>
          <img :src="song.album.images[0].url" alt="">
        </figure>
        <div class="btn-wrap" v-if="song.preview_url">
          <PlayButton v-if="this.$refs.audioPlayer.currentPlayIndex === i && this.$refs.audioPlayer.isPlaying ? false : true" @click="playMusic(i)"/>
          <PauseButton @click="pauseMusic(i)" v-else />
        </div>
        <div class="music__item-error" v-else>Невозможно <br> воспроизвести</div>
      </li>
    </ul>
  </div>
  <footer class="footer">
    <div class="container footer__container">
      <div class="footer__btns btn-group">
        <p v-if="current.name" class="now-play">Сейчас играет: {{ current.name }}</p>
        <p v-if="current.artist" class="now-author">Исполнитель: {{ current.artist }}</p>

        <div class="footer__wrap">
          <client-only>
            <audio-player
                          :before-play="handleBeforePlay"
                          :audio-list="spotySongs.map((elm) => elm.preview_url)"
                          :is-loop="false"
                          @loadedmetadata="updatePlayer"
                          theme-color="#fff"
                          ref="audioPlayer"
            />
          </client-only>
        </div>
      </div>
    </div>

  </footer>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      serialize: '',
      token: '',
      userId: 'e9ecce03e7814b51a1fd06158d441259',
      userSec: 'f2905a01c56649feb4302c6f3428ae72',
      spotySongs: [],
      search: null,
      current: {
        name: null,
        artist: null,
        played: true
      },

    }
  },
  methods: {
    updatePlayer(event) {
      if (!document.querySelector('.audio-player__audio').classList.contains('created')) {
        event.target.play()
      }
    },
    playMusic(index) {
      if (this.$refs.audioPlayer.currentPlayIndex === index) {
          document.querySelector('.audio-player__audio').classList.remove('created')
          this.$refs.audioPlayer.play()
      } else {
        document.querySelector('.audio-player__audio').classList.remove('created')
        this.$refs.audioPlayer.currentPlayIndex = index
        this.$refs.audioPlayer.play()
      }
    },
    pauseMusic(index) {
      if (this.$refs.audioPlayer.currentPlayIndex === index) {
        this.$refs.audioPlayer.pause()
      } else {
        this.$refs.audioPlayer.currentPlayIndex = index
        this.$refs.audioPlayer.pause()
      }
    },
    handleBeforePlay(next) {
      this.current.name = this.spotySongs[this.$refs.audioPlayer.currentPlayIndex].name
      this.current.artist = this.spotySongs[this.$refs.audioPlayer.currentPlayIndex].artists[0].name
      next()
    },
    async userAuth() {
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
      await axios.get(`https://api.spotify.com/v1/search?q=${this.search ? this.search : 'танцыnlo'}&type=track&limit=8`, {
        headers: {
          'Authorization': 'Bearer ' + this.token
        }
      })
          .then(response => this.spotySongs = response.data.tracks.items)
          .then(() => {
            document.querySelector('.audio-player__audio').classList.add('created')
            this.current.name = null
            this.current. artist = null
            this.$refs.audioPlayer.pause()
          })

    },
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
    }, this.userAuth()
  },
  watch: {
    token() {
      this.getMusic();
    },
  }
}

</script>
<style scoped lang="scss">
.main-title {
  color: #fff;
  text-align: center;
}

div.btn-wrap {
  align-self: center;
}

.now-author {
  text-align: center;
  margin-bottom: 1em;
}

.music__item-error {
  font-weight: 700;
  margin: 1.75em 1.5em 1.75em;
}

.now-play {
  text-align: center;
  font-size: 28px;
  margin-bottom: .25em;
}
.audio-player .audio__play-rate__dropdown {
  color: black;
}
form {
  margin-bottom: 1.5em;
  padding: 1em;

  div {
    display: flex;
    position: relative;

    input {
      background-color: #fff;
      border-radius: 10px;
      width: 100%;
      font-size: 22px;
      padding: .5em;
    }

    .btn-play {
      align-items: center;
      justify-content: center;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: transparent;
      border-radius: 10px;

      svg {
        width: 25px;
        height: 25px;
      }
    }
  }
}
</style>
