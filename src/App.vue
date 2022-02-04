<template>
  <h1>Hello, pipiwu!</h1>
  <file-list-entry
    v-for="file in files"
    :key="file.filename"
    :filename="file.filename"
    :click="download"
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
  methods: {
    click(event) {
      console.log(event.key);
    },
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
