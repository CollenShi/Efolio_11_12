
<template>
    <div class = "container mt-5">
        <div class = "row">
            <div class = "col-md-8 offset-md-2">
                <h1 class = "text-center">Sign Out</h1>
                <h3 class = "text-center role-text"> {{ displayEmail }}</h3>
                <span class="sub-title">Are you sure to Sign out?</span>
                <button @click="userSignOut">Confirm</button>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from "vue";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
const router = useRouter();
const displayEmail = ref('')
const auth = getAuth();

onMounted(() => {
    const storeData = localStorage.getItem(`library-userRole`);
    if (storeData) {
        const userRole = JSON.parse(storeData);
        const { role, email } = userRole;
        if (email) displayEmail.value = ` User: ${email}`;
    }
})

const userSignOut = async () => {
    signOut(auth).then(() => {
        alert("User signed out successfully")
        localStorage.removeItem('library-userRole');
        router.push('/fireLogin')
    }).catch((error) => {
        console.error("Error signing out: ", error);
    });
}
</script>

<style>
.role-text {
    color: red;
}
</style>