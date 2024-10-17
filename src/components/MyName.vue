<template>
    <div>
      <h1>Welcome to Monash, {{ name }}!</h1>
    </div>
</template>

<script>
    export default {
    data() {
        return {
        name: 'Xingchen Shi' 
        }
    }
}
</script>

<style scoped>
    h1 {
        color: red;
    }
</style>