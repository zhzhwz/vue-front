<template>
    <div>
        <button>download</button> {{ filename }}
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    filename: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
