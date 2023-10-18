// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/css/style.scss", "@/assets/css/normalize.css"],
  runtimeConfig: {
    public: {
      secret: process.env.PRIVATE_SECRET_TOKEN,
      publicId: process.env.PUBLIC_USER_ID
    }
  }
});
