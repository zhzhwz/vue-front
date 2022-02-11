<template>
  <h1>Hello, files!</h1>
  <ul>
    <li v-for="user in users" :key="user.id">
      {{ user.name }}
    </li>
  </ul>
  <form method="POST" action="/apps/rel" encType="multipart/form-data" name="form">
    <input id="inputFile" type="file"
           accept="application/vnd.ms-excel|xls"
           name="inputFile" @change="onChange" />
    <button @click="onClick">点击提交</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      users: [],
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
    axios.get('/api/users').then(response => {
      this.users = response.data;
    });
  },
}
</script>

<style>

</style>
