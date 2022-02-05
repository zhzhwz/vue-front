<template>
    <h1>Hello, files!</h1>
    <file-list-entry
        v-for="file in files"
        :key="file.filename"
        :filename="file.filename"
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
