<template>
  <div>
    <b-modal :id="id" size="xl" :title="title" hide-footer ref="detail-modal" scrollable>
      <div class="row" style="margin-top:20px">
        <div class="col-6">
          <div
            v-for="(item, index) in mes_left"
            :key="index"
            class="text item"
            style="color:grey; font-size:13px; margin-bottom:6px"
          >
            {{item}}
            <span>：</span>
            <span style="color:black">{{company_data[item]}}</span>
          </div>
        </div>
        <div class="col-6">
          <div
            v-for="(item, index) in mes_right"
            :key="index"
            class="text item"
            style="color:grey; font-size:13px; margin-bottom:6px"
          >
            {{item}}
            <span>：</span>
            <span style="color:black">{{company_data[item]}}</span>
          </div>
        </div>
      </div>
      <hr />
      <div style="float:right">
        <!-- <b-button @click="modify" variant="warning" class="mr-3">修改</b-button> -->
        <!-- <b-button @click="delete1" type="submit" variant="danger" class="mr-3">删除</b-button> -->
        <b-button @click="confirm" variant="success">确定</b-button>
      </div>
    </b-modal>
    <!-- 修改弹框 -->
    <!-- <comModifyModal
      :id="ModifyModal.id"
      :title="ModifyModal.title"
      :company_data="this.ModifyModal.company_data"
      size="xl"
      data-backdrop="static"
    ></comModifyModal> -->
  </div>
</template>

<script>
// import comModifyModal from "./comModifyModal.vue"; // 修改
export default {
  name: "dataset-table",
  props: {
    title: "",
    id: "",
    company_data: {}
  },
  data() {
    return {
      mes_left: [
        "公司简称",
        "公司英文名称",
        "上市日期",
        "主承销商",
        "注册资本",
        "组织形式",
        "公司电话",
        "公司传真",
        "公司电子邮箱",
        "公司网址",
        "信息披露网址",
        "注册地址",
        "公司简介"
      ],
      mes_right: [
        "公司名称",
        "上市市场",
        "发行价格",
        "成立日期",
        "机构类型",
        "董事会秘书",
        "董秘电话",
        "董秘传真",
        "董秘电子邮箱",
        "邮政编码",
        "证券简称更名历史",
        "办公地址",
        "经营范围"
      ],
      // 修改
      ModifyModal: {
        id: "comModifyModal",
        title: "",
        company_data: {}
      },
    };
  },
  methods: {
    // 修改
    // modify(item, index) {
    //   this.$refs["detail-modal"].hide();
    //   this.ModifyModal.company_data = this.company_data
    //   this.ModifyModal.title = "修改：" + this.company_data["公司简称"];
    //   this.$root.$emit("bv::show::modal", this.ModifyModal.id);
    // },
    confirm() {
      this.$refs["detail-modal"].hide();
    },
  },
  components: {
    // comModifyModal // 修改
  }
};
</script>
<style>
</style>
