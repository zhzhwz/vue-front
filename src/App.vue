<template>
    <h1>Zh Share</h1>
    <file-list-entry
        v-for="file in files"
        :key="file.filename"
        :filename="file.filename"
    >
    </file-list-entry>
  <form method="POST" action="/api/file/upload" encType="multipart/form-data" name="form">
    <input id="inputFile" type="file"
           accept="application/vnd.ms-excel|xls"
           name="inputFile" />
    <button @click="onClick">Upload</button>
  </form>
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
    onClick() {
    }
  },
      mounted() {
        axios.get('/api/file/name').then(response => {
            this.files = response.data;
        });
    },
}
</script>

<style>

</style>
