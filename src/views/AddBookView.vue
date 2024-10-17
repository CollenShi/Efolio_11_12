
<template>
    <div class = "container mt-5">
        <div class = "row">
            <div class = "col-md-8 offset-md-2">
                <h1 class = "text-center">Add book</h1>
                <form @submit.prevent = "addBook">
                    <div class = "row mb-3">
                        <div class="col-md-8 offset-md-2"> 
                            <label for="isbn" class="form-label">ISBN:</label>
                            <input type="text" class="form-control" id="isbn" v-model="isbn">
                        </div>
                    </div>
                    <div class = "row mb-3">
                        <div class="col-md-8 offset-md-2">
                            <label for="name" class="form-label">Name:</label>
                            <input type="text" class="form-control" id="name" v-model="name">
                        </div>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary me-2">Submit</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="booklist">
            <BookList />
        </div>
    </div>
</template>
  
<script>
import { ref } from "vue";
import axios from 'axios';
import BookList from "@/components/BookList.vue";

const isbn = ref("");
const name = ref("");

export default {
    setup() {
        const addBook = async() => {
            try{
                const isbnNumber = Number(isbn.value);
                if (isNaN(isbnNumber)) {
                    alert('ISBN must be a valid number');
                    return;
                }

                const response = await axios.post('https://addbook-dxkv2yz7oa-uc.a.run.app', {
                    isbn: isbnNumber,
                    name: name.value
                });
                console.log(response);
                isbn.value = '';
                name.value = '';
                alert("Book added successfully!")
            } catch(error) {
                console.error('Error adding book:', error)
            }
        }
        return {
            isbn,
            name,
            addBook
        };
    },
    components: {
        BookList
    }
}
</script>

<style>
.booklist {
    margin-top: 30px;
}
</style>