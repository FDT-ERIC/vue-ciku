<template>
  <div>
    <b-modal :id="id" size="sm" :title="title" @ok="confirmDelete" @cancel="confirmCancel" ref="my-modal">
      <span>{{'确认删除【'+ this.com_title + '】吗？'}}</span>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "dataset-table",
  props: {
    title: "",
    id: "",
    com_title: ""
  },
  data() {
    return {
        
    };
  },
  methods: {
    confirmDelete() {
      this.$axios
        .get("/api/knowledge/database/company/delete", {
          params: {
            delete: this.com_title,
          }
        })
        .then(res => {
          // this.DetailModal.company_data = res.data.res;
          // console.log("啦啦啦222：", res.data.res)
          alert(res.data.res);
          this.$refs["my-modal"].hide();
        });
    },
    confirmCancel() {
      console.log(this.title)
    }
  },
};
</script>
<style>
</style>
