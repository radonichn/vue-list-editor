<template>
  <div class="table-wrapper">
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th>Name</th>
          <th>Code</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <CourseTr v-for="course in paginatedData" v-bind:key="course.id" :course="course" />
      </tbody>
    </table>
    <Pagination
      @nextPage="nextPage"
      @prevPage="prevPage"
      @setPage="setPage"
      :dataLength="this.courses.length"
      :pageNumber="this.pageNumber"
    />
  </div>
</template>

<script>
import CourseTr from "./CourseTr";
import Pagination from "./Pagination.vue";
export default {
  name: "Courses",
  components: {
    CourseTr,
    Pagination
  },
  data() {
    return {
      pageNumber: 0
    };
  },
  mounted() {
    const courses = JSON.parse(localStorage.getItem("courses"));
    if (courses) this.$store.commit("updateCourses", courses);
  },
  computed: {
    size() {
      return this.$store.state.size;
    },
    courses() {
      return this.$store.state.searchedCourses;
    },
    paginatedData() {
      if (this.size > 0) {
        let start = this.pageNumber * this.size,
          end = start + this.size;
        return this.courses.slice(start, end);
      } else {
        return this.courses.slice(0);
      }
    }
  },
  methods: {
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
    setPage(num) {
      this.pageNumber = num;
    }
  }
};
</script>

<style>
</style>