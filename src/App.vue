<template>
  <div class="container">
    <add-ticker></add-ticker>
    <hr />
    <list-tickers></list-tickers>
  </div>
</template>

<script>
import AddTicker from "@/components/AddTicker";
import ListTickers from "./components/ListTickers.vue";
import { mapActions } from "vuex";

export default {
  components: {
    AddTicker,
    ListTickers,
  },
  mounted() {
    //this.loadTickers()
    //console.log(this.loadTickers())
  },
  methods: {
    ...mapActions(["loadTickers"]),
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.container {
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
}
hr {
  margin: 20px 0;
}
</style>
