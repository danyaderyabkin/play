<template>
  <li  class="music__item">
    <h3 class="music__title">{{ name }}</h3>
    <p>{{ artistName }}</p>
    <figure>
      <img :src="img" alt="">
    </figure>
    <audio-player />
  </li>
</template>
<script>
export default {
  props: ['songUrl', 'name', 'artistName', 'img', 'songed', 'art'],
  data() {
    return {
      title: '',
      paused: true,
    }
  },
}
</script>
