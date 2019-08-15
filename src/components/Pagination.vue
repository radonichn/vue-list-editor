<template>
  <nav v-if="pageCount > 1">
    <ul class="pagination">
      <li :class="[pageNumber === 0 ? 'disabled' : '', 'page-item']">
        <button class="page-link" @click="prevPage" :disabled="pageNumber===0">&lt;</button>
      </li>
      <li
        v-for="num in this.pageCount"
        :key="num"
        :class="['page-item', num==pageNumber+1 ? 'active' : '']"
      >
        <button @click="$emit('setPage', num - 1)" class="page-link">{{num}}</button>
      </li>
      <li
        @click="nextPage"
        :class="[pageNumber === this.pageCount-1 ? 'disabled' : '', 'page-item']"
      >
        <button class="page-link" href="#" :disabled="pageNumber === this.pageCount-1">&gt;</button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNumber", "dataLength"],
  computed: {
    pageCount() {
      let l = this.dataLength;
      const s = this.$store.state.size;
      return s > 0 ? Math.ceil(l / s) : false;
    }
  },
  methods: {
    nextPage() {
      if (this.pageNumber < this.pageCount - 1) {
        this.$emit("nextPage");
      }
    },
    prevPage() {
      if (this.pageNumber > 0) {
        this.$emit("prevPage");
      }
    }
  }
};
</script>

<style scoped>
li.page-item.disabled button {
  background-color: #dee2e6;
}
</style>