<template>
    <pre class="center-content">{{ jsondata }}</pre>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            jsondata: null,
            error: null
        };
    },
    methods: {
        async getBookCountAPI () {
            try {
                const response = await axios.get('https://countbooks-dxkv2yz7oa-uc.a.run.app');
                this.jsondata = response.data;
                this.error = null
            } catch (error) {
                console.error('Error fetching book count: ', error)
                this.error = error;
                this.count = null;
            }
        }
    },
    mounted() {
        this.getBookCountAPI();
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