<template>
    <div>
        <button @click="download">download</button> {{ filename }}
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'FileListEntry',
    props: {
        filename: String,
    },
    methods: {
        download() {
            const url = 'http://zhzhwz.cn/api/fileDownload';
            axios.post(url, {filename: this.filename}, {responseType: 'blob'})
            .then((res) => {
                const { data, headers } = res
                const fileName = headers['content-disposition'].replace(/\w+;filename=(.*)/, '$1')
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
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
