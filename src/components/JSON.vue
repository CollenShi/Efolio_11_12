<!-- JSONLab.vue -->
<template>
  <div class="json-lab">
    <h1>🗄️ JSON Data & Vue Directives Lab</h1>

    <section class="lab-section">
      <div>
        <h2>📚 Authors born after 1850 - activity 2</h2>
        <ul>
          <li v-for="author in modernAuthors" :key="author.id"
            :class="{ highlight: author.name === 'George Orwell' }"
            :style="author.name === 'George Orwell' ? highlightStyle : null">
            {{ author.name }} ({{ author.birthYear }})
          </li>
        </ul>
      </div>

      <div>
        <h2>📚 Get All Famous Works - activity 3</h2>
        <ul>
          <li v-for="work in allFamousWorks" :key="work.id">
            {{ work.title }}
          </li>
        </ul>
      </div>

      <div>
        <h2>📚 Search Author By Name</h2>
        <input v-model="searchQuery" placeholder="Enter author name" />
        <button @click="searchAuthor">Search</button>

        <div v-if="searchResult">
          <h3>Found Author</h3>
          <p>Name: {{ searchResult.name }}</p>
          <p>Birth Year: {{ searchResult.birthYear }}</p>
        </div>
        <p v-else-if="searchQuery">
          Author not found.
        </p>
      </div>

      <div>
        <h2>📚 Search Author By Id</h2>
        <input v-model="searchQueryId" placeholder="Enter author Id" />
        <button @click="searchAuthorId">Search</button>

        <div v-if="searchResultId">
          <h3>Found Author</h3>
          <p>Name: {{ searchResultId.name }}</p>
          <p>Birth Year: {{ searchResultId.birthYear }}</p>
        </div>
        <p v-else-if="searchQueryId">
          Author not found.
        </p>
      </div>

      <div>
        <h2>📚 Authors List - activity 6</h2>
        <ul>
          <li v-for="author in authors" :key="author.id"
            :class="{ highlight: author.name === 'George Orwell' }"
            :style="author.name === 'George Orwell' ? highlightStyle : null">
            {{ author.name }} ({{ author.birthYear }})
          </li>
        </ul>
      </div>

      <div>
        <h2>📚 A list containing authors born after 1850 - activity 7</h2>
        <ul>
          <li v-for="author in modernAuthors" :key="author.id">
            {{ author.name }} ({{ author.birthYear }})
          </li>
        </ul>
      </div>

      <div>
        <h2>📚 A list of all famous works - activity 8</h2>
        <ul>
          <li v-for="work in allFamousWorks" :key="work.id">
            {{ work.title }}
          </li>
        </ul>
      </div>
      
    </section>

    <section class="lab-section">

      <h3>🏢 Accessing Properties - Activity 9</h3>
      <p>
        Company: {{ bookstores.name }}
        <!-- Activity 9a: Get the company name from the bookstores object. -->
      </p>

      <p>
        Total Stores: {{ bookstores.totalStores }}
        <!-- Activity 9b: Get the total number of stores from the bookstores object. -->
      </p>
      
      <p></p>

      <h3>🏢 Iterating Object Properties - Activity 10</h3>
      <p>Store Types:</p>
      <!-- Activity 10: Iterate through the storeTypes array and display the store type and the number of stores that use that type. -->
      <ul>
        <li v-for="([type, count]) in Object.entries(bookstores.storeTypes)" :key="type">
        {{ type }}: {{ count }}
      </li>
      </ul>

      <p></p>
      <h3>🏢 Nested Objects - Activity 11</h3>
      <p>Opening Hours:</p>
      <!-- Activity 11: Iterate through the openingHours object and display the day of the week and the opening and closing times. -->
      <ul>
        <li v-for="(times, day) in bookstores.openingHours" :key="day">
          {{ day }} - OpenTime: {{ times.open }}, CloseTime: {{ times.close }}
        </li>
      </ul>

      <h3>🏢 Working with Arrays in Objects - Activity 12</h3>
      <!-- Activity 12: Get the top sellers from the bookstores object. -->
      <ul>
        <li v-for="(book, index) in bookstores.topSellers" :key="index">
          {{ book }}
        </li>
      </ul>
      <p>We operate in:</p>
      <p>Our #1 seller:</p>
    </section>

    <section class="lab-section">
      <h2>v-if & v-else - Activity 13</h2>
      <p>Toggle visibility based on a condition.</p>
      <!-- Activity 13: Toggle the message visibility when the button is clicked. -->

      <button @click="showMessage = !showMessage">Toggle Message</button>
      <p v-if="showMessage" class="message success">✨ You're a Vue superstar! ✨</p>
      <p>Click the button to see a message.</p>
      
    </section>

    <section class="lab-section">
      <h2>Attribute, Class and Style Binding with <code>v-bind</code></h2>
      <p>Highlighting Specific Authors:</p>

    </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import authors from "../assets/json/authors.json"
import bookstores from "../assets/json/bookstores.json"

// Activity 1: Import JSON files (authors.json and bookstores.json)
// TODO: CODE TO IMPORT JSON FILES HERE

const showMessage = ref(false)
const searchQuery = ref('');
const searchResult = ref(null);

const searchQueryId = ref('');
const searchResultId = ref(null);

// Activity 2, 7: Get authors born after 1850
const modernAuthors = computed(() => {
  return authors.filter((author) => author.birthYear > 1850)
})

// Activity 3, 8: Get all famous works
const allFamousWorks = computed(() => {
  return authors.flatMap(author => author.famousWorks);
})

// Activity 4: Find author by name
const searchAuthor = computed(() => {
  const query = searchQuery.value.trim();
  console.log(query);
  if (query) {
    searchResult.value = authors.find(author => author.name === query);
    console.log(searchResult.value);
    if (!searchResult.value) {
      searchResult.value = null;
    }
  }
})

// Activity 5: Find author by ID
const searchAuthorId = computed(() => {
  const query = searchQueryId.value.trim();
  if (query) {
    console.log(query);
    searchResultId.value = authors.find(author => author.id === Number(query));
    console.log(searchResultId.value);
    if (!searchResultId.value) {
      searchResultId.value = null;
    }
  }
})

const highlightStyle = {
  color: 'blue',
  fontWeight: 'bold',
  fontSize: '1.2em'
};
</script>

<style scoped>
.json-lab {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1,
h2 {
  color: #333;
}
h1 {
  text-align: center;
}

.lab-section {
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.message {
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
}

.success {
  background-color: #e7faf3;
  color: #42b883;
  border: 1px solid #42b883;
}

.highlight {
  background-color: #42b883;
}

code {
  background-color: #e0e0e0;
  padding: 2px 5px;
  border-radius: 4px;
  font-family: "Courier New", Courier, monospace;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  background-color: #f0f0f0;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
}

</style>
