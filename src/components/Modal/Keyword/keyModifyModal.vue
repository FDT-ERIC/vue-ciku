<template>
  <div>
    <b-modal
      :id="id"
      size="sm"
      :title="'修改:'+title"
      hide-footer
      ref="add-modal"
      scrollable
    >
      <b-input style="border-style:solid; border-color:#66CCFF" v-model="newInput" required></b-input>
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
    title: "",
    id: "",
  },
  data() {
    return {
      newInput: "" // 输入的 关键词库 名
    };
  },
  methods: {
    cancel() {
      this.$refs["add-modal"].hide();
    },
    confirm() {
      this.$refs["add-modal"].hide();
      var relationStr = "关键词库:" + this.title + ':' + this.newInput;
      console.log("传给后台的数据格式: ", relationStr);
    }
  }
};
</script>
<style>
</style>
