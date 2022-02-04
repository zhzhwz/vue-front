<template>
    <div>
        <button @click="click">download</button> {{ filename }}
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    filename: String,
    click: Function,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
