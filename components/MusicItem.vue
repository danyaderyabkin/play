<template>
  <li  class="music__item">
    <h3 class="music__title">{{ name }}</h3>
    <p>{{ artistName }}</p>
    <figure>
      <img :src="img" alt="">
    </figure>
    <PlayButton @click="play(songUrl),footerPlay(), paused = !paused" v-if="paused" />
    <PauseButton @click="pause(), paused = !paused" v-else />
  </li>
</template>
<script>
export default {
  props: ['songUrl', 'name', 'artistName', 'img', 'songed', 'art'],
  data() {
    return {
      paused: true,
      player: new Audio()
    }
  },
  methods: {
    play(hrefSong) {
      if (this.player.src) {
        this.player.play()
      }else {
        this.player.src = hrefSong
        this.player.play()
      }
    },
    pause() {
      if(this.player.play()) {
        this.player.pause()
      }
    },
    footerPlay() {
      this.$emit('songed', this.name)
      this.$emit('art', this.artistName)
    }
  }
}
</script>
