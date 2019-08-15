<template>
  <div class="table-wrapper">
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th>Name</th>
          <th>E-mail</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <UserTr v-for="user in this.paginatedData" v-bind:key="user.id" :user="user" />
      </tbody>
    </table>
    <Pagination
      :dataLength="this.users.length"
      :pageNumber="this.pageNumber"
      @nextPage="nextPage"
      @prevPage="prevPage"
      @setPage="setPage"
    />
  </div>
</template>

<script>
import UserTr from "./UserTr.vue";
import Pagination from "./Pagination.vue";
export default {
  name: "Users",
  components: {
    UserTr,
    Pagination
  },
  data() {
    return {
      pageNumber: 0
    };
  },
  mounted() {
    const users = JSON.parse(localStorage.getItem("users"));
    if (users) this.$store.commit("updateUsers", users);
  },
  computed: {
    size() {
      return this.$store.state.size;
    },
    users() {
      return this.$store.state.searchedUsers;
    },
    paginatedData() {
      if (this.size > 0) {
        let start = this.pageNumber * this.size,
          end = start + this.size;
        return this.users.slice(start, end);
      } else {
        return this.users.slice(0);
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
.table tr th {
  text-transform: uppercase;
}

@media all and (max-width: 768px) {
  .table-wrapper {
    overflow-x: scroll;
    width: 100%;
  }
  table td > button {
    width: 70px;
    margin: 1px 0;
  }
}
</style>
