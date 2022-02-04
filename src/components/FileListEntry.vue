<template>
    <div>
        <button @click.native="download">download</button> {{ filename }}
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    filename: String,
  },
  methods: {
      download() {
          console.log(this.filename);
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
