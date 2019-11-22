<template>
  <div>
    <b-modal :id="id" size="sm" title="警告" ref="delete-modal" scrollable @cancel="cancelDelete" @ok="confirmDelete">
      <span>{{'确认删除【' + lastTitle + ':' + title + '】模块下的【' + oldTitle + '】模块吗?'}}</span>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "dataset-table",
  props: {
    title: "",
    id: "",
    lastTitle: "",
    nextTitle: "",
    oldTitle: "", // 存放修改之前的标题
    sub_keyword_data: {}
  },
  data() {
    return {
     
    };
  },
  methods: {
    // 取消删除
    cancelDelete() {
      console.log("取消删除");
    },
    // 确认删除
    confirmDelete() {
      this.$axios
        .get("/api/knowledge/database/keywds/keywds/delete", {
          params: {
            // insert: JSON.stringify(this.form)
            // insert_name: this.newInput
            relation_name: this.title,
            keywds_del: this.oldTitle
          }
        })
        .then(res => {
          // this.DetailModal.company_data = res.data.res;
          console.log(res.data.res)
          alert(res.data.res);
          // this.$refs["modify-modal"].hide();
        });
      // console.log(this.lastTitle + ':' + this.title + ':' + this.oldTitle);
    },
  },
};
</script>
<style>
</style>
