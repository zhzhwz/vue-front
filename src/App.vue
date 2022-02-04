<template>
  <h1>Hello, pipiwu!</h1>
  <file-list-entry
    v-for="file in files"
    :key="file.name"
    :filename="file.name"
  >

  </file-list-entry>
</template>

<script>
import axios from 'axios';
import FileListEntry from './components/FileListEntry.vue';

export default {
  name: 'App',
  components: {
    FileListEntry
  },
  data() {
    return {
      files: [],
    }
  },
  mounted() {
    axios.get('/api/fileName').then(response => {
      this.files = response.data;
    });
  },
}
</script>

<style>

</style>
