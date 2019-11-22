<template>
  <div>
    <b-modal :id="id" size="sm" title="警告" ref="delete-modal" scrollable @cancel="cancelDelete" @ok="confirmDelete">
      <span>{{'确认删除【' + lastTitle + '】模块下的【' + title + '】模块？'}}</span>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "dataset-table",
  props: {
    title: "",
    id: "",
    lastTitle: ""
  },
  data() {
    return {
      newTitle: "" //修改的标题
    };
  },
  methods: {
    // 修改
    cancelDelete(item) {
      console.log("取消删除");
    },
    // 删除
    confirmDelete() {
      this.$axios
        .get("/api/knowledge/database/keywds/relationwds/delete", {
          params: {
            // insert: JSON.stringify(this.form)
            // insert_name: this.newInput
            relationwds_del: this.title
          }
        })
        .then(res => {
          // this.DetailModal.company_data = res.data.res;
          console.log(res.data.res)
          alert(res.data.res);
          // this.$refs["delete-modal"].hide();
        });
      // console.log(this.lastTitle + ':' + this.title);
    }
  }
};
</script>
<style>
</style>
