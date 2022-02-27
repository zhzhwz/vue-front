<template>
    <el-container
        class="layout-container-demo"
        style="height: 500px; border: 1px solid #eee"
    >
        <el-header style="text-align: left; font-size: 12px">
            <div class="header">
                <span>Zh Share</span>
            </div>
        </el-header>
        <el-main>
            <el-table :data="files" border style="width: 100%">
                <el-table-column prop="fileName" label="File Name"></el-table-column>
                <el-table-column prop="fileSizeReadable" label="File Size" width=180px></el-table-column>
                <el-table-column label="Operation" width=360px>
                <template #default="scope">
                    <el-button
                        size="small"
                        @click="download(scope.$index, scope.row)"
                    >Download</el-button>
                    <el-button
                        size="small"
                        type="danger"
                        @click="alert('Delete not avaliable!')"
                    >Delete(Not completed!)</el-button>
                </template>
                </el-table-column>
            </el-table>
            <div class="h-6"></div>
            <el-upload
                class="upload-demo"
                action="/api/file/upload/"
                multiple
                :limit="3"
                :on-success="loadFileNames"
            >
                <el-button type="primary">Click to upload</el-button>
                <template #tip>
                <div class="el-upload__tip">
                    files with size no more than 100M
                </div>
                </template>
            </el-upload>
        </el-main>
    </el-container>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

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
    data() {
        return {
            files: [],
            activeIndex: ref('1'),
            activeIndex2: ref('1'),
        }
    },
    methods: {
        loadFileNames() {
            axios.get('/api/file/name').then(response => {
                this.files = [];
                for (let x of response.data.files) {
                    this.files.push({
                        fileName: x.fileName,
                        fileSizeReadable: humanFileSize(x.fileSize, false),
                    });
                }
            });
        },
        download(index, row) {
            axios({
                method: 'post',
                url: '/api/file/download',
                data: {
                    filename: row.fileName,
                },
                responseType: 'blob',
            })
            .then((res) => {
                const { data, headers } = res
                // const fileName = headers['content-disposition'].replace(/\w+;\s*filename="(.*)"/, '$1')
                const fileName = row.fileName
                const blob = new Blob([data], {type: headers['content-type']})
                let dom = document.createElement('a')
                let url = window.URL.createObjectURL(blob)
                dom.href = url
                dom.download = decodeURI(fileName)
                dom.style.display = 'none'
                document.body.appendChild(dom)
                dom.click()
                dom.parentNode.removeChild(dom)
                window.URL.revokeObjectURL(url)
            }).catch((err) => {console.log('download error: ' + err);})
        },
        alert(message) {
            alert(message);
        }
    },
    mounted() {
        this.loadFileNames();
    },
}
</script>

<style scoped>
    .layout-container-demo .el-header {
        position: relative;
        background-color: #c5c8cc;
        color: var(--el-text-color-primary);
    }
    .layout-container-demo .header {
        position: absolute;
        display: inline-flex;
        align-items: center;
        top: 50%;
        left: 20px;
        transform: translateY(-50%);
    }
    .h-6 {
        padding: 20px;
    }
</style>
