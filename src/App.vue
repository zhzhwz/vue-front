<template>
    <h1>Hello, files!</h1>
    <file-list-entry
        v-for="file in files"
        :key="file.filename"
        :filename="file.filename"
    >
    </file-list-entry>
  <form method="POST" action="/apps/rel" encType="multipart/form-data" name="form">
    <input id="inputFile" type="file"
           accept="application/vnd.ms-excel|xls"
           name="inputFile" @change="onChange" />
    <button @click="onClick">点击提交</button>
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
    onChange() {
      console.log("changed!");
    },
    onClick() {
      console.log("clicked!");
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
