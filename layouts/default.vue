<template>
  <v-app dark>
    <v-content>
      <Navbar />
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '~/components/Navbar';
export default {
  components: {
    Navbar
  }
}
</script>
