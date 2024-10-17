<template>
    <div class = "container">
        <div class = "row">
            <div class = "col-md-8 offset-md-2 form-container">
                <h2 class = "text-center">Book List</h2>
            </div>
        </div>
    </div>

    <div class="row">
      <div class="col-md-8 offset-md-2">
        
        <div class = "row mb-3">
            <div class="col-md-6">
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search by name"
                    class="form-control"
                />
            </div>
            <div class="col-md-2">
                <button type="button" class="btn btn-primary" @click="searchBook">Search</button>
            </div>
            <div class="col-md-2">
                <button type="button" class="btn btn-primary" @click="orderByISBN">Order</button>
            </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
        <div class="col-md-8 offset-md-2 title-container">
            <DataTable :value="listData">
                <Column field="name" header="name"></Column>
                <Column field="isbn" header="ISBN"></Column>
                <Column header="Actions">
                    <template #body="slotProps">
                    <button class="btn btn-primary" @click="editItem(slotProps)">Edit</button>
                    <button class="btn btn-danger" @click="deleteItem(slotProps)">Delete</button>
                    </template>
                </Column>
            </DataTable>

            <div class="pagination-controls">
                <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
                <span>Page {{ currentPage }}</span>
                <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
            </div>
        </div>
    </div>

    <div v-if="showModal" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Book</h5>
          </div>
          <div class="modal-body">
            <form @submit.prevent="editBook">
              <div class="form-group">
                <label for="username">name</label>
                <input v-model="editBookInfo.name" type="text" class="form-control" id="name" required>
              </div>
              <div class="form-group">
                <label for="age">isbn</label>
                <input v-model="editBookInfo.isbn" type="number" class="form-control" id="isbn" required>
              </div>
              <button type="submit" class="btn btn-primary">Save</button>
              <button type="button" class="btn btn-primary" @click="showModal = false">Cancel</button>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { collection, getDocs, query, where, doc, updateDoc, deleteDoc, getCountFromServer, orderBy, limit, startAfter } from "firebase/firestore";
import { db } from '../firebase/init.js';

const showModal = ref(false);
const editBookInfo = ref({
    documentId: '',
    name: '',
    isbn: '',
})

const currentPage = ref(1);
const totalPages = ref(1);
const searchQuery = ref("");
let lastVisible = null;

const listData = ref([]);

const orderFlag = ref(false)

const editBook = async() => {
    const docRef = doc(db, "books", editBookInfo.value.documentId);
    updateDoc(docRef, {
        name: editBookInfo.value.name,
        isbn: editBookInfo.value.isbn
    }).then(() => {
        console.log("Document successfully updated!");
    }).catch((error) => {
        console.error("Error updating document: ", error);
    });
    showModal.value = false;
};

const deleteItem = async(slotProps) => {
    const docRef = doc(db, "books", slotProps.data.documentId);
    deleteDoc(docRef).then(() => {
        console.log("Document successfully deleted!");
        booksCount()
        fetchBooks();
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
};

function editItem(slotProps) {
    console.log('slotProps', slotProps.data.documentId);
    showModal.value = true;
    editBookInfo.value = slotProps.data;
};

const fetchBooks = async() => {
    try {
        let queryConditions = [];

        if (searchQuery.value && searchQuery.value.trim()) {
            queryConditions.push(where("name", "==", searchQuery.value))
        }

        if (orderFlag.value) {
            queryConditions.push(orderBy("isbn", "desc"))
        }

        if (lastVisible) {
            queryConditions.push(startAfter(lastVisible))
        }

        const q = query(collection(db, 'books'), ...queryConditions, limit(5));
        const querySnapshot = await getDocs(q);
        const booksArray = [];
        querySnapshot.forEach((doc) => {
            booksArray.push({
                documentId: doc.id,
                ...doc.data()
            });
        });
        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        listData.value = booksArray;
    } catch (error) {
        console.error('Error fetching book:', error)
    }
}

const booksCount = async() => {
    const collectionRef = collection(db, "books");

    getCountFromServer(collectionRef)
    .then((snapshot) => {
        totalPages.value = Math.ceil(snapshot.data().count / 5);
    })
    .catch((error) => {
        console.error("Error getting document count: ", error);
    });
};

onMounted(() => {
    booksCount()
    fetchBooks()
})

const searchBook = () => {
    booksCount()
    fetchBooks()
}

const orderByISBN = () => {
    if (orderFlag.value) {
        orderFlag.value = false;
    } else {
        orderFlag.value = true;
    }
    fetchBooks()
}

const nextPage = () => {
    currentPage.value = currentPage.value + 1;
    fetchBooks()
}

const prevPage = () => {
    currentPage.value = currentPage.value - 1;
    fetchBooks()
}

</script>

<style scoped>
.modal {
  display: block;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.modal-dialog {
  margin: 10% auto;
}
</style>