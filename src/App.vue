<template>
  <div class="custom">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-around">
      <router-link to="/" class="main">Test Task by Radonich</router-link>
      <div class="collapse navbar-collapse f-0 show" id="navbarNav">
        <ul :class="['navbar-nav', 'd-flex', 'flex-row', currentPageClass]">
          <li class="nav-item users">
            <router-link to="/">Users</router-link>
          </li>
          <li class="nav-item courses">
            <router-link to="/courses">Courses</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <div class="wrapper d-flex align-items-center mb-2">
        <form class="form-inline">
          <input
            class="form-control mr-sm-2"
            type="text"
            placeholder="Search by name"
            v-model="searchtext"
          />
          <button
            class="btn btn-outline-info my-2 my-sm-0 mr-1"
            type="submit"
            @click.prevent="findInfo"
          >Search</button>
        </form>
        <button class="btn btn-outline-success" type="submit" @click.prevent="showModal">Add</button>
        <h1 class="text-center">{{h1_val}}</h1>
        <select class="custom-select" @change="setSize" v-model="size">
          <option value="0" selected>{{h1_val}} per page</option>
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>

      <ModalWindow :modal_title="h1_val" v-if="this.$store.state.showModal" />
      <router-view :key="$route.path"></router-view>
    </div>
  </div>
</template>

<script>
import ModalWindow from "./components/ModalWindow.vue";
export default {
  name: "app",
  components: {
    ModalWindow
  },
  mounted() {
    this.current_dir = this.$route.path;
    this.$store.commit("setSearchUsers", this.usersState);
    this.$store.commit("setSearchCourses", this.coursesState);
  },
  data() {
    return {
      current_dir: "/",
      searchtext: "",
      size: this.$store.state.size
    };
  },
  methods: {
    showModal() {
      this.$store.commit("show");
    },
    findInfo() {
      const str = this.searchtext.toLowerCase();
      let ids = [];
      const dir = this.h1_val.toLowerCase();
      this.$store.state[dir].forEach(e => {
        if (e.name.toLowerCase().indexOf(str) !== -1) ids.push(e);
      });
      this.$store.commit(`setSearch${this.h1_val}`, ids);
    },
    setSize() {
      // console.log("changed");
      this.$store.commit("setSize", this.size);
    }
  },
  watch: {
    $route() {
      this.current_dir = this.$route.path;
      this.searchtext = "";
      this.size = 0;
      this.$store.commit("setSize", 0);
    },
    usersState() {
      localStorage.setItem("users", JSON.stringify(this.usersState));
      this.$store.commit("setSearchUsers", this.usersState);
    },
    coursesState() {
      localStorage.setItem("courses", JSON.stringify(this.coursesState));
      this.$store.commit("setSearchCourses", this.coursesState);
    }
  },
  computed: {
    h1_val() {
      return this.current_dir === "/" ? "Users" : "Courses";
    },
    currentPageClass() {
      return this.current_dir === "/" ? "active-users" : "active-courses";
    },
    usersState() {
      return this.$store.state.users;
    },
    coursesState() {
      return this.$store.state.courses;
    }
  }
};
</script>

<style scoped>
.active-users .users a {
  color: #fff !important;
}
.active-courses .courses a {
  color: #fff !important;
}
.container {
  margin: 40px auto;
}
h1 {
  flex: 1;
}
.main {
  color: #fff;
  text-transform: uppercase;
  text-decoration: none;
}
.nav-item a {
  color: rgba(255, 255, 255, 0.5);
  padding: 0 5px;
  text-decoration: none;
}
.nav-item a:hover {
  color: rgba(255, 255, 255, 0.75);
}
.modal {
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal .modal-dialog {
  margin-top: 150px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.f-0 {
  flex: 0;
}
select.custom-select {
  width: 200px;
}
@media all and (max-width: 768px) {
  .wrapper {
    flex-direction: column;
  }
  .wrapper > h1 {
    order: 1;
    width: 100%;
  }
  .wrapper > form {
    order: 2;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .wrapper > form input[type="text"] {
    width: calc(100% - 80px);
    margin: 0 !important;
  }
  .wrapper > form button {
    width: 75px;
    margin: 0 !important;
  }
  .wrapper > button {
    order: 3;
    width: 100%;
  }
  .wrapper > select.custom-select {
    width: 100%;
    order: 4;
  }
  .wrapper > .btn-outline-success {
    margin: 7px 0;
  }
}
</style>