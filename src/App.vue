<template>
    <h1>Zh Share</h1>
    <file-list-entry
        v-for="file in files"
        :key="file.fileName"
        :filename="file.fileName"
        :filesize="file.fileSizeReadable"
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

function humanFileSize(bytes, si) {
    var thresh = si ? 1000 : 1024;
    if(Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var units = si
        ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
        : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while(Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1)+' '+units[u];
}

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
        loadFileNames() {
            axios.get('/api/file/name').then(response => {
                this.files = response.data.files;
                for (let x of this.files) {
                    x.fileSizeReadable = humanFileSize(x.fileSize, false);
                }
            });
        },
        uploadFile(e) {
            if (e.target.files.length === 0) {
                return ;
            }
            const formData = new FormData();
            formData.append('inputFile', e.target.files[0]);
            axios({
                url: '/api/file/upload',
                method: 'post',
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
