import AudioPlayer from '@liripeng/vue-audio-player'
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(AudioPlayer)
})
