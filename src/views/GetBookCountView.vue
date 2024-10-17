<template>
    <div id="app" class="center-content">
        <h1>Book Counter</h1>
        <button @click="getBookCount">Get book count</button>
        <p v-if="count !== null">Total number of books: {{ count }}</p>
        <p v-if="error">{{ error }}</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            count: null,
            error: null
        };
    },
    methods: {
        async getBookCount () {
            try {
                const response = await axios.get('https://countbooks-dxkv2yz7oa-uc.a.run.app');
                this.count = response.data.count;
                this.error = null
            } catch (error) {
                console.error('Error fetching book count: ', error)
                this.error = error;
                this.count = null;
            }
        }
    }
}
</script>

<style scoped>
.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}
</style>