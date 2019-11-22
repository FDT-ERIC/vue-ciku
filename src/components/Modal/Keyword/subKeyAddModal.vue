<template>
  <div>
    <b-modal
      :id="id"
      size="sm"
      :title="'在【' + title + '】模块下添加'"
      hide-footer
      ref="add-modal"
      scrollable
    >
      <b-form-input style="border-style:solid; border-color:#66CCFF" v-model="newInput"></b-form-input>
      <hr />
      <div style="float:right">
        <b-button @click="cancel" variant="warning" size="sm" class="mr-2">取消</b-button>
        <b-button @click="confirm" variant="success" size="sm">添加</b-button>
      </div>
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
      newInput: "" // 输入的 关键词 名
    };
  },
  methods: {
    cancel() {
      this.$refs["add-modal"].hide();
    },
    confirm() {
      this.$axios
        .get("/api/knowledge/database/keywds/relationwds/insert", {
          params: {
            // insert: JSON.stringify(this.form)
            insert_name: this.newInput
          }
        })
        .then(res => {
          // this.DetailModal.company_data = res.data.res;
          console.log(res.data.res)
          alert(res.data.res);
          this.$refs["add-modal"].hide();
        });
      // this.$refs["add-modal"].hide();
      // var relationStr = this.title + ":" + this.newInput;
      // console.log("传给后台的: ", relationStr);
    }
  }
};
</script>
<style>
</style>
