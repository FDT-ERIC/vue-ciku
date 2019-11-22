<template>
  <div>
    <b-modal
      :id="id"
      size="sm"
      :title="'修改:' + claTitle + ':' + neTitle"
      hide-footer
      ref="modify-modal"
      scrollable
    >
      <span>类别</span>
      <b-input style="border-style:solid; border-color:#66CCFF; margin:10px 0 10px 0" v-model="newCla" required></b-input>
      <span>命名实体</span>
      <b-input style="border-style:solid; border-color:#66CCFF; margin:10px 0 10px 0" v-model="newNe" required></b-input>
      <hr />
      <div style="float:right">
        <b-button @click="cancel" variant="warning" size="sm" class="mr-2">取消</b-button>
        <b-button @click="confirm" variant="success" size="sm">提交</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "dataset-table",
  props: {
    claTitle: "",
    neTitle:"",
    id: "",
  },
  data() {
    return {
      newCla: "", // 输入的 关键词库 类别
      newNe: "" // 输入的 关键词库 名称
    };
  },
  methods: {
    cancel() {
      this.$refs["modify-modal"].hide();
    },
    confirm() {
      this.$axios
        .get("/api/knowledge/database/ne/update", {
          params: {
            ne_name_pre: this.neTitle, // 原来的名称
            ne_cls_pre: this.claTitle, // 原来的类别
            ne_name_after: this.newNe, // 现在的名称
            ne_cls_after: this.newCla, // 现在的类别
            // insert: JSON.stringify(this.form)
          }
        })
        .then(res => {
          // this.DetailModal.company_data = res.data.res;
          // console.log(res.data.res)
          alert(res.data.res);
          this.$refs["modify-modal"].hide();
        });
      // this.$refs["add-modal"].hide();
      // var relationStr = "NE词库:" + this.claTitle + ':' + this.neTitle + ':' + this.newCla + ':' + this.newNe;
      // console.log("传给后台的数据格式: ", relationStr);
    }
  }
};
</script>
<style>
</style>
