<template>
  <tr>
    <th>{{user.name}}</th>
    <td>{{user.email}}</td>
    <td :class="status">{{status}}</td>
    <td>
      <button class="btn btn-sm btn-primary mr-2" @click="openEditor(user.id)">Edit</button>
      <button class="btn btn-sm btn-danger" @click="deleteItem(user.id)">Delete</button>
    </td>
  </tr>
</template>

<script>
export default {
  name: "UserTr",
  props: ["user"],
  computed: {
    status() {
      return this.user.active ? "active" : "inactive";
    }
  },
  methods: {
    openEditor(id) {
      const store = this.$store;
      store.commit("show");
      store.commit("changeEdit", { status: true, id: id, category: "users" });
    },
    deleteItem(id) {
      this.$store.commit("deleteItem", { id: id, cat: "users" });
    }
  }
};
</script>

<style scoped>
.active,
.inactive {
  text-transform: capitalize;
}
.active {
  color: #30b530;
}
.inactive {
  color: #e43232;
}
</style>
