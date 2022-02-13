<template>
    <h1>Zh Share</h1>
    <file-list-entry
        v-for="fileName in fileNames"
        :key="fileName"
        :filename="fileName"
    >
    </file-list-entry>
    <input
        id="inputFile"
        type="file"
        accept="*"
        name="inputFile"
        @change="uploadFile"
        v-show="false"
        ref="upload"
    >
    <button
        @click="$refs.upload.click"
    >上传文件</button>
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
            fileNames: [],
        }
    },
    methods: {
        loadFileNames() {
            axios.get('/api/file/name').then(response => {
                this.fileNames = response.data.fileNames;
            });
        },
        uploadFile(e) {
            if (e.target.files.length === 0) {
                return ;
            }
            const formData = new FormData();
            formData.append('inputFile', e.target.files[0]);
            axios({
                url: "/api/file/upload",
                method: "post",
                file: e.target.files[0],
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data'},
            }).then(() => {
                this.loadFileNames();
                e.target.value = '';
            });
        }
    },
    mounted() {
        this.loadFileNames();
    },
}
</script>

<style>

</style>
