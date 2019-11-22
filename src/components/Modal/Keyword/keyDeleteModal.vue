<template>
  <div>
    <b-modal
      :id="id"
      size="sm"
      title="警告"
      ref="delete-modal"
      scrollable
      @cancel="cancelDelete"
      @ok="confirmDelete"
    >
      <span>{{'确认删除【' + title + '】关键词库？'}}</span>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "dataset-table",
  props: {
    title: "",
    id: ""
  },
  data() {
    return {};
  },
  methods: {
    // 修改
    cancelDelete(item) {
      console.log("取消删除");
    },
    // 删除
    confirmDelete() {
      console.log("关键词库:", this.title);
    }
  }
};
</script>
<style>
</style>
