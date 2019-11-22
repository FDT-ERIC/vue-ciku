<template>
  <div>
    <b-modal :id="id" size="sm" :title="title" hide-footer ref="add-modal" scrollable>
      <span>类别</span>
      <b-input style="border-style:solid; border-color:#66CCFF; margin:10px 0 10px 0" v-model="claInput" required></b-input>
      <span>命名实体</span>
      <b-input style="border-style:solid; border-color:#66CCFF; margin:10px 0 10px 0" v-model="neInput" required></b-input>

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
    id: ""
  },
  data() {
    return {
      claInput: "", // 输入的 命名实体 类别
      neInput: "" // 输入的 命名实体 名
    };
  },
  methods: {
    cancel() {
      this.$refs["add-modal"].hide();
    },
    confirm() {
      this.$axios
        .get("/api/knowledge/database/ne/insert", {
          params: {
            // insert: JSON.stringify(this.form)
            insert_name: this.neInput, // 命名实体
            insert_cls: this.claInput // 类型
          }
        })
        .then(res => {
          // this.DetailModal.company_data = res.data.res;
          console.log(res.data.res)
          alert(res.data.res);
          this.$refs["add-modal"].hide();
        });
      // this.$refs["add-modal"].hide();
      // var relationStr = "类别:" + this.claInput + " ne:" + this.neInput;
      // console.log("传给后台的数据格式: ", relationStr);
    }
  }
};
</script>
<style>
</style>
