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
      <span>{{'确认删除【' + claTitle + '】下的【' + neTitle + '】'}}</span>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "dataset-table",
  props: {
    claTitle: "",
    neTitle:"",
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
      this.$axios
        .get("/api/knowledge/database/ne/delete", {
          params: {
            // insert: JSON.stringify(this.form)
            delete_name: this.neTitle, // 命名实体
            delete_cls: this.claTitle // 类型
          }
        })
        .then(res => {
          // this.DetailModal.company_data = res.data.res;
          alert(res.data.res);
          this.$refs["delete-modal"].hide();
        });
      // console.log("NE词库:", this.claTitle + ':' + this.neTitle);
    }
  }
};
</script>
<style>
</style>
