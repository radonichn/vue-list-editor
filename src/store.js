import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    users: [
      {
        id: 1,
        name: "Gary Busey",
        email: "busey@mail.com",
        active: true
      },
      {
        id: 2,
        name: "Jeff Bridges",
        email: "bridges@mail.com",
        active: false
      },
      {
        id: 3,
        name: "Michael Cimino",
        email: "cimino@mail.com",
        active: true
      },
      {
        id: 4,
        name: "Roger Corman",
        email: "corman@mail.com",
        active: true
      },
      {
        id: 5,
        name: "Don Rickles",
        email: "ricles@mail.com",
        active: false
      }
    ],
    searchedUsers: [],
    courses: [
      {
        id: 1,
        name: "Python-Base",
        code: "P012345"
      },
      {
        id: 2,
        name: "Python-Database",
        code: "P043345"
      },
      {
        id: 3,
        name: "HTML",
        code: "P012527"
      },
      {
        id: 4,
        name: "Java-Base",
        code: "P048652"
      },
      {
        id: 5,
        name: "JavaScript-Base",
        code: "P168735"
      }
    ],
    size: 0,
    searchedCourses: [],
    showModal: false,
    editing: {
      status: false,
      id: null,
      category: null
    }
  },
  mutations: {
    show(state) {
      state.showModal = true;
    },
    close(state) {
      state.showModal = false;
      state.editing.status = false;
      state.editing.id = null;
    },
    addUser(state, user) {
      state.users.unshift(user);
    },
    addCourse(state, course) {
      state.courses.unshift(course);
    },
    updateUsers(state, users) {
      state.users = users;
    },
    updateCourses(state, courses) {
      state.courses = courses;
    },
    changeEdit(state, payload) {
      state.editing = {
        status: payload.status,
        id: payload.id,
        category: payload.category
      };
    },
    deleteItem(state, payload) {
      const copy = [...state[`${payload.cat}`]];
      state[`${payload.cat}`] = copy.filter(x => x.id !== payload.id);
    },
    setSearchUsers(state, users) {
      state.searchedUsers = users;
    },
    setSearchCourses(state, courses) {
      state.searchedCourses = courses;
    },
    setSize(state, val) {
      state.size = parseInt(val);
    }
  }
});
export default store;
