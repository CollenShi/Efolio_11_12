
<template>
    <div class = "container mt-5">
        <div class = "row">
            <div class = "col-md-8 offset-md-2">
                <h1 class = "text-center">Home Page</h1>
                <!-- <h3 class = "text-center role-text"> {{ displayRole }}</h3> -->
                <h3 class = "text-center role-text"> {{ displayEmail }}</h3>
                <span class="sub-title">Welcome to our digital library! We're dedicated to providing a vast collection of books and resources to our community.</span>
                <button class = "text-center role-text" @click="userSignOut">Sign Out</button>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const displayRole = ref('')
const displayEmail = ref('')
onMounted(() => {
    const storeData = localStorage.getItem(`library-userRole`);
    if (storeData) {
        const userRole = JSON.parse(storeData);
        const { role, email } = userRole;
        if (role) displayRole.value = ` role: ${role}`;
        if (email) displayEmail.value = ` email: ${email}`;
    }
})

const userSignOut = () => {
    router.push('/signOut');
}
</script>

<style>
.role-text {
    color: red;
}
</style>