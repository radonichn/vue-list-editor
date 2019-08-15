<template>
  <div class="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add/Edit {{modal_title}}</h5>
          <button type="button" class="close" @click="closeModal">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form v-if="formUsers">
            <div class="form-group">
              <label for="userNameInput">User name</label>
              <input
                type="text"
                class="form-control"
                id="userNameInput"
                placeholder="Name"
                v-model="userName"
                required
              />
            </div>
            <div class="form-group">
              <label for="emailInput">Email address</label>
              <input
                type="email"
                class="form-control"
                id="emailInput"
                placeholder="Email"
                v-model="userEmail"
                required
              />
            </div>
            <div class="status_container d-flex align-items-center flex-wrap">
              <p>Status:</p>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="defaultCheck1"
                  v-model="userActive"
                />
                <label class="form-check-label" for="defaultCheck1">{{activeString}}</label>
              </div>
            </div>
            <button
              class="btn btn-success"
              type="submit"
              v-if="!this.$store.state.editing.status"
              :disabled="!this.formValidUsers"
              @click="addUser"
            >Add</button>
            <button
              class="btn btn-info"
              type="submit"
              v-if="this.$store.state.editing.status"
              :disabled="!this.formValidUsers"
              @click.prevent="editUser"
            >Save</button>
          </form>
          <form @submit.prevent="addCourse" v-if="!formUsers">
            <div class="form-group">
              <label for="courseNameInput">Course name</label>
              <input
                type="text"
                class="form-control"
                id="courseNameInput"
                placeholder="Name"
                required
                v-model="courseName"
              />
            </div>
            <div class="form-group">
              <label for="courseCodeInput">Course code</label>
              <input
                type="text"
                class="form-control"
                id="courseCodeInput"
                placeholder="Code"
                required
                v-model="courseCode"
              />
            </div>
            <button
              class="btn btn-success"
              type="submit"
              v-if="!this.$store.state.editing.status"
              :disabled="!this.formValidCourses"
              @click="addCourse"
            >Add</button>
            <button
              class="btn btn-info"
              type="submit"
              v-if="this.$store.state.editing.status"
              :disabled="!this.formValidCourses"
              @click.prevent="editCourse"
            >Save</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import uuid from "uuid";
export default {
  name: "ModalWindow",
  props: ["modal_title"],
  data() {
    return {
      userName: "",
      userEmail: "",
      userActive: false,
      courseName: "",
      courseCode: ""
    };
  },
  computed: {
    activeString() {
      return this.userActive ? "Active" : "Inactive";
    },
    formUsers() {
      return this.modal_title.toLowerCase() === "users" ? true : false;
    },
    formValidUsers() {
      return this.userName && /\S+@\S+\.\S+/.test(this.userEmail);
    },
    formValidCourses() {
      return this.courseName && this.courseCode;
    }
  },
  mounted() {
    const s = this.$store.state;
    const edits = s.editing;
    if (edits.status && edits.category === "users") {
      const user = s.users.find(u => u.id === s.editing.id);
      this.userName = user.name;
      this.userEmail = user.email;
      this.userActive = user.active;
    } else if (edits.status && edits.category === "courses") {
      const course = s.courses.find(c => c.id === s.editing.id);
      this.courseName = course.name;
      this.courseCode = course.code;
    }
  },
  methods: {
    addUser() {
      const user = {
        id: uuid.v4(),
        name: this.userName,
        email: this.userEmail,
        active: this.userActive
      };
      if (this.formValidUsers) {
        this.$store.commit("addUser", user);
        this.closeModal();
      } else {
        alert("Incorrect data, please change your input");
      }
    },
    addCourse() {
      const course = {
        id: uuid.v4(),
        name: this.courseName,
        code: this.courseCode
      };
      if (this.formValidCourses) {
        this.$store.commit("addCourse", course);
        this.closeModal();
      } else {
        alert("Incorrect data, please change your input");
      }
    },
    resetData() {
      this.userName = "";
      this.userEmail = "";
      this.userActive = false;
      this.courseName = "";
      this.courseCode = "";
    },
    getIndex(cat) {
      const s = this.$store.state;
      const id = s.editing.id;
      const old = s[`${cat}`].find(x => x.id === id);
      return s[`${cat}`].indexOf(old);
    },
    editUser() {
      if (this.formValidUsers) {
        const users = [...this.$store.state.users];
        let newUser = {
          id: this.$store.state.editing.id,
          name: this.userName,
          email: this.userEmail,
          active: this.userActive
        };
        users[this.getIndex("users")] = newUser;
        this.$store.commit("updateUsers", users);
        this.closeModal();
      } else {
        alert("Incorrect data, please change your input");
      }
    },
    editCourse() {
      if (this.formValidCourses) {
        const courses = [...this.$store.state.courses];
        let newCourse = {
          id: this.$store.state.editing.id,
          name: this.courseName,
          code: this.courseCode
        };
        courses[this.getIndex("courses")] = newCourse;
        this.$store.commit("updateCourses", courses);
        this.closeModal();
      } else {
        alert("Incorrect data, please change your input");
      }
    },
    closeModal() {
      this.resetData();
      this.$store.commit("close");
    }
  }
};
</script>

<style scoped>
.status_container {
  margin-bottom: 15px;
}
.status_container p {
  width: 100%;
  margin-bottom: 0;
}
.status_container .form-check:first-of-type {
  margin-right: 10px;
}
</style>