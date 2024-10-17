
<template>
    <div class = "container mt-5">
        <div class = "row">
            <div class = "col-md-8 offset-md-2">
                <h1 class = "text-center">Sign In</h1>
                <p class = "text-center"><input type="text" placeholder="Email" v-model="email"></p>
                <p class = "text-center"><input type="password" placeholder="Password" v-model="password"></p>
                <p class = "text-center"><button @click="signin">Sign in via Firebase</button></p>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from "vue";
import { db } from '../firebase/init.js';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDoc, getDocs } from "firebase/firestore";
import { useRouter } from "vue-router";
import Cookies from 'js-cookie';

const email = ref("");
const password = ref("");
const router = useRouter();
const auth = getAuth();

const signin = async () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
        console.log("Firebase Sign Successful!");
        console.log(auth.currentUser);
        getUserRole(auth.currentUser)
    }).catch((error) => {
        console.log(error.code)
    })
}

const getUserRole = async(user) => {
    try {
        const q = query(collection(db, 'userRoles'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const userRole = querySnapshot.docs[0].data() || {};
        const { role = 'user' } = userRole;
        localStorage.setItem(`library-userRole`, JSON.stringify({ role, email: user.email }));
        router.push('/');
    } catch (error) {
        console.error('Error get role:', error)
    }
    
}


</script>

<style>
</style>