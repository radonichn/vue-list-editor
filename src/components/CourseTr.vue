<template>
  <tr>
    <th>{{course.name}}</th>
    <td>{{course.code}}</td>
    <td>
      <button class="btn btn-sm btn-primary mr-2" @click="openCourseEditor(course.id)">Edit</button>
      <button class="btn btn-sm btn-danger" @click="deleteCourseItem(course.id)">Delete</button>
    </td>
  </tr>
</template>

<script>
export default {
  name: "CourseTr",
  props: ["course"],
  methods: {
    openCourseEditor(id) {
      const store = this.$store;
      store.commit("show");
      store.commit("changeEdit", { status: true, id: id, category: "courses" });
    },
    deleteCourseItem(id) {
      this.$store.commit("deleteItem", { id, cat: "courses" });
    }
  }
};
</script>

<style scoped>
</style>
