
<template>
    <div class = "container mt-5">
        <div class = "row">
            <div class = "col-md-8 offset-md-2">
                <h1 class = "text-center">W7. Create an Account</h1>
                <p class = "text-center"><input type="text" placeholder="Email" v-model="email"></p>
                <p class = "text-center"><input type="password" placeholder="Password" v-model="password"></p>
                <p class = "col-md-4 offset-md-4">
                    <select class="form-select" id="role" required v-model="role">
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                    </select>
                </p>  
                <p class = "text-center"><button @click="register">Save to firebase</button></p>    
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from "vue";
import { db } from '../firebase/init.js';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const role = ref("");
const router = useRouter();
const auth = getAuth();
const register = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
        console.log(data);
        const { user } = data;
        console.log("Firebase Register Successful!");
        setUserRole(user);
        router.push('/fireLogin')
    }).catch((error) => {
        console.log(error.code)
    })
}

const setUserRole = (user) => {
    try{
        addDoc(collection(db, 'userRoles'), {
            userId: user.uid,
            role: role.value
        })
        alert('set role successfully!')
    } catch(error) {
        console.error('Error setting role:', error)
    }
}
</script>

<style>
</style>