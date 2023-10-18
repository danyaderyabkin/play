<template>
  <section class="music">
    <div class="container">
      <h1 class="main-title">Поиск по треку или исполнителю</h1>
      <form @submit.prevent="getMusic">
        <div>
          <input v-model="search" type="text">
          <button class="btn-play" type="submit">
            <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M34.9887 35.0278L48 48M40.5 21.75C40.5 32.1052 32.1052 40.5 21.75 40.5C11.3947 40.5 3 32.1052 3 21.75C3 11.3947 11.3947 3 21.75 3C32.1052 3 40.5 11.3947 40.5 21.75Z" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

          </button>
        </div>
      </form>
      <ul class="music__list">
        <MusicItem v-for="song of spotySongs" :key="song.id" v-on:songed="songed" v-on:art="songedName" :song-url="song.preview_url" :name="song.name" :artist-name="song.artists[0].name" :img="song.album.images[0].url" />
      </ul>

    </div>
    <footer class="footer">
      <div class="container footer__container">
        <div class="footer__btns btn-group">
          <p v-if="current.name" class="now-play">Сейчас играет: {{ current.name }}</p>
          <p v-if="current.artist" class="now-author">Исполнитель:  {{ current.artist }}</p>

          <div class="footer__wrap">
            <button type="button" class="btn btn-primary  btn-prev">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="800px"
                   height="800px" viewBox="0 -2 12 12" version="1.1">

                <title>next [#998]</title>
                <desc>Created with Sketch.</desc>
                <defs>

                </defs>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Dribbble-Light-Preview" transform="translate(-144.000000, -3805.000000)" fill="currentColor">
                    <g id="icons" transform="translate(56.000000, 160.000000)">
                      <path
                          d="M99.684,3649.69353 L95.207,3652.82453 C94.571,3653.25353 94,3652.84553 94,3652.13153 L94,3650.14053 L89.78,3652.82453 C89.145,3653.25353 88,3652.84553 88,3652.13153 L88,3645.86853 C88,3645.15453 89.145,3644.74653 89.78,3645.17453 L94,3647.85953 L94,3645.86853 C94,3645.15453 94.571,3644.74653 95.207,3645.17453 L99.516,3648.30653 C100.03,3648.65353 100.198,3649.34653 99.684,3649.69353"
                          id="next-[#998]">

                      </path>
                    </g>
                  </g>
                </g>
              </svg>
            </button>
            <button type="button" class="btn btn-play">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM10.6935 15.8458L15.4137 13.059C16.1954 12.5974 16.1954 11.4026 15.4137 10.941L10.6935 8.15419C9.93371 7.70561 9 8.28947 9 9.21316V14.7868C9 15.7105 9.93371 16.2944 10.6935 15.8458Z"
                      fill="currentColor"/>
              </svg>
            </button>
            <button type="button" class="btn btn-primary btn-next">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="800px"
                   height="800px" viewBox="0 -2 12 12" version="1.1">

                <title>next [#998]</title>
                <desc>Created with Sketch.</desc>
                <defs>

                </defs>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Dribbble-Light-Preview" transform="translate(-144.000000, -3805.000000)" fill="currentColor">
                    <g id="icons" transform="translate(56.000000, 160.000000)">
                      <path
                          d="M99.684,3649.69353 L95.207,3652.82453 C94.571,3653.25353 94,3652.84553 94,3652.13153 L94,3650.14053 L89.78,3652.82453 C89.145,3653.25353 88,3652.84553 88,3652.13153 L88,3645.86853 C88,3645.15453 89.145,3644.74653 89.78,3645.17453 L94,3647.85953 L94,3645.86853 C94,3645.15453 94.571,3644.74653 95.207,3645.17453 L99.516,3648.30653 C100.03,3648.65353 100.198,3649.34653 99.684,3649.69353"
                          id="next-[#998]">

                      </path>
                    </g>
                  </g>
                </g>
              </svg>
            </button>
          </div>
        </div>
        <div class="range-container">
          <div class="range"></div>
        </div>
      </div>

    </footer>
  </section>
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
        artist: null
      }
    }
  },
  methods: {
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
      await axios.get(`https://api.spotify.com/v1/search?q=${this.search ? this.search : 'танцы'}&type=track&limit=6`, {
        headers: {
          'Authorization': 'Bearer ' + this.token
        }
      })
          .then(response => this.spotySongs = response.data.tracks.items)
    },
    songed(src) {
      this.current.name = src
    },
    songedName(src) {
      this.current.artist = src
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
    }, this.user()
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
.now-author {
  text-align: center;
  margin-bottom: 1em;
}
.now-play {
  text-align: center;
  font-size: 28px;
  margin-bottom: .25em;
}
form{
  margin-bottom: 3em;
  padding: 2em;
  div {
    display: flex;
    position: relative;
    input {
      background-color: #fff;
      border-radius: 10px;
      width: 100%;
      font-size: 22px;
      padding: 1em;
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
