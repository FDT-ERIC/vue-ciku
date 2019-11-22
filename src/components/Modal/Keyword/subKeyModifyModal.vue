<template>
  <div>
    <b-modal
      :id="id"
      size="sm"
      :title="lastTitle + ':' + title"
      hide-footer
      ref="modify-modal"
      scrollable
    >
      <b-form-input
        style="border-style:solid; border-color:#66CCFF"
        v-model="newTitle"
      ></b-form-input>
      <hr />
      <b-button style="float:right" @click="confirm" variant="success" size="sm">提交</b-button>
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
  },
  data() {
    return {
      newTitle: "" //修改的标题
    };
  },
  methods: {
    // 修改
    modify(item) {
      console.log(item);
    },
    // 删除
    delete1(item) {
      console.log(item);
    },
    subBtn(item, value) {
      console.log(item, value);
    },
    confirm() {
      this.$axios
        .get("/api/knowledge/database/keywds/relationwds/update", {
          params: {
            // insert: JSON.stringify(this.form)
            // insert_name: this.newInput
            relationwds_pre: this.title,
            relationwds_after: this.newTitle,
          }
        })
        .then(res => {
          // this.DetailModal.company_data = res.data.res;
          console.log(res.data.res)
          alert(res.data.res);
          this.$refs["modify-modal"].hide();
        });
      // this.$refs["modify-modal"].hide();
      // var relationStr = this.lastTitle + ':' + this.title + ':' + this.newTitle
      // console.log(relationStr)
    }
  },
};
</script>
<style>
</style>
