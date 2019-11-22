<template>
  <div>
    <b-modal :id="id" size="lg" :title="title" hide-footer ref="detail-modal" scrollable>
      <div>
        <b-card
          v-for="(item, index) in keyword_data"
          :key="index"
          style="border:solid; margin:15px 0 40px 0"
          border-variant="info"
          align="left"
          header-bg-variant="info"
        >
          <div>
            <span>{{Object.keys(item)[0]}}</span>
            <div style="float:right;">
              <b-button
                @click="modify(Object.keys(item)[0])"
                variant="warning"
                size="sm"
                class="mr-2"
              >修改</b-button>
              <b-button @click="delete1(Object.keys(item)[0])" variant="danger" size="sm">删除</b-button>
            </div>
          </div>
          <hr style="margin-top:25px" />
          <!-- <b-button
              v-for="(value, i) in Object.values(item)[0]"
              :key="i"
              size="sm"
              variant="info"
              class="mr-2"
              @click="subBtn(Object.keys(item)[0], value)"
          >{{value}}</b-button>-->
          <div style="margin:5px 0 5px 0">
            <b-dropdown
              v-for="(value, i) in Object.values(item)[0]"
              :key="i"
              dropright
              size="sm"
              :text="String(value)"
              class="mr-2"
              variant="info"
            >
              <b-dropdown-item-button @click="subModifyBtn(Object.keys(item)[0], value)">修改</b-dropdown-item-button>
              <b-dropdown-item-button @click="subDeleteBtn(Object.keys(item)[0], value)">删除</b-dropdown-item-button>
            </b-dropdown>
            <b-button size="sm" variant="success" @click="subAddBtn(Object.keys(item)[0])">+</b-button>
          </div>
          <!-- <subKeyModifyModel :id="subKeyModifyModal.id" :title="Object.keys(item)[0]"></subKeyModifyModel> -->
        </b-card>
        <b-button
          style="width:100%"
          variant="success"
          @click="add(title)"
        >{{'添加【'+title+'】模块下的子模块'}}</b-button>
      </div>
      <hr />
      <div style="float:right">
        <!-- <b-button @click="modify" variant="warning" class="mr-3">修改</b-button> -->
        <!-- <b-button @click="delete1" type="submit" variant="danger" class="mr-3">删除</b-button> -->
        <b-button @click="confirm" variant="success">确定</b-button>
      </div>
    </b-modal>

    <!-- 修改 - 子模块 -->
    <subKeyModifyModal
      :id="subKeyModifyModal.id"
      :title="subKeyModifyModal.title"
      :lastTitle="title"
      :oldTitle="subKeyModifyModal.oldTitle"
    ></subKeyModifyModal>

    <!-- 删除 - 子模块 -->
    <subKeyDeleteModal
      :id="subKeyDeleteModal.id"
      :title="subKeyDeleteModal.title"
      :lastTitle="title"
      :oldTitle="subKeyDeleteModal.oldTitle"
    ></subKeyDeleteModal>

    <!-- 添加 - 子模块 -->
    <subKeyAddModal
      :id="subKeyAddModal.id"
      :title="title"
    ></subKeyAddModal>

    <!-- 修改 - 子模块的子模块 -->
    <subChiKeyModifyModal
      :id="subChiKeyModifyModal.id"
      :title="subChiKeyModifyModal.title"
      :lastTitle="title"
      :nextTitle="subChiKeyModifyModal.nextTitle"
      :oldTitle="subChiKeyModifyModal.oldTitle"
    ></subChiKeyModifyModal>

    <!-- 删除 - 子模块的子模块 -->
    <subChiKeyDeleteModal
      :id="subChiKeyDeleteModal.id"
      :title="subChiKeyDeleteModal.title"
      :lastTitle="title"
      :nextTitle="subChiKeyDeleteModal.nextTitle"
      :oldTitle="subChiKeyDeleteModal.oldTitle"
    ></subChiKeyDeleteModal>

    <!-- 添加 - 子模块的子模块 -->
    <subChiKeyAddModal
      :id="subChiKeyAddModal.id"
      :title="subChiKeyAddModal.title"
      :lastTitle="title"
    ></subChiKeyAddModal>
  </div>
</template>

<script>
import subKeyModifyModal from "./subKeyModifyModal.vue";
import subKeyDeleteModal from "./subKeyDeleteModal.vue";
import subKeyAddModal from "./subKeyAddModal";
import subChiKeyModifyModal from "./subChiKeyModifyModal";
import subChiKeyDeleteModal from "./subChiKeyDeleteModal";
import subChiKeyAddModal from "./subChiKeyAddModal";
export default {
  name: "dataset-table",
  props: {
    title: "",
    id: "",
    keyword_data: {}
  },
  data() {
    return {
      // 修改 - 子模块
      subKeyModifyModal: {
        id: "subKeyModifyModal",
        title: "", // 弹窗的标题
        lastTitle: "", // 弹窗接收父级弹窗的标题
        oldTitle: "" // 传值，用于存放修改前的标题
      },
      // 删除 - 子模块
      subKeyDeleteModal: {
        id: "subKeyDeleteModal",
        title: "", // 弹窗的标题
        lastTitle: "", // 弹窗接收父级弹窗的标题
        oldTitle: "" // 传值，用于存放修改前的标题
      },
      // 添加 - 子模块
      subKeyAddModal: {
        id: "subKeyAddModal",
        title: "", // 子弹窗的标题
      },
      // 修改 - 子模块的子模块
      subChiKeyModifyModal: {
        id: "subChiKeyModifyModal",
        title: "", // 子弹窗的标题
        lastTitle: "", // 子弹窗接收父级弹窗的标题
        nextTitle: "", // 子弹窗的标题
        oldTitle: "" // 传值，用于存放修改前的标题
      },
      // 删除 - 子模块的子模块
      subChiKeyDeleteModal: {
        id: "subChiKeyDeleteModal",
        title: "", // 子弹窗的标题
        lastTitle: "", // 子弹窗接收父级弹窗的标题
        nextTitle: "", // 子弹窗的标题
        oldTitle: "" // 传值，用于存放修改前的标题
      },
      // 添加 - 子模块的子模块
      subChiKeyAddModal: {
        id: "subChiKeyAddModal",
        title: "", // 子弹窗的标题
        lastTitle: "", // 子弹窗接收父级弹窗的标题
      }
    };
  },
  methods: {
    // 修改 - 子模块
    modify(item) {
      console.log(item);
      this.subKeyModifyModal.title = item;
      this.$root.$emit("bv::show::modal", this.subKeyModifyModal.id);
    },
    // 删除 - 子模块
    delete1(item) {
      console.log(item);
      this.subKeyDeleteModal.title = item;
      this.$root.$emit("bv::show::modal", this.subKeyDeleteModal.id);
    },
    // 添加 - 子模块
    add(item) {
      console.log(item);
      this.subKeyAddModal.title = item;
      this.$root.$emit("bv::show::modal", this.subKeyAddModal.id);
    },
    // 修改 - 子模块的子模块
    subModifyBtn(item, value) {
      console.log(item, value);
      this.subChiKeyModifyModal.title = item;
      this.subChiKeyModifyModal.nextTitle = value;
      this.subChiKeyModifyModal.oldTitle = value; // 传值，以便定位到修改之前的值
      this.$root.$emit("bv::show::modal", this.subChiKeyModifyModal.id);
    },
    // 删除 - 子模块的子模块
    subDeleteBtn(item, value) {
      console.log(item, value);
      this.subChiKeyDeleteModal.title = item;
      this.subChiKeyDeleteModal.nextTitle = value;
      this.subChiKeyDeleteModal.oldTitle = value; // 传值，以便定位到修改之前的值
      this.$root.$emit("bv::show::modal", this.subChiKeyDeleteModal.id);
    },
    // 添加 - 子模块的子模块
    subAddBtn(item) {
      console.log(item);
      this.subChiKeyAddModal.title = item;
      this.$root.$emit("bv::show::modal", this.subChiKeyAddModal.id);
    },
    // 确定按钮
    confirm() {
      this.$refs["detail-modal"].hide();
    }
  },
  components: {
    // comModifyModal // 修改
    subKeyModifyModal, // 修改 - 子模块
    subKeyDeleteModal, // 删除 - 子模块
    subKeyAddModal, // 添加 - 子模块
    subChiKeyModifyModal, // 修改 - 子模块的子模块
    subChiKeyDeleteModal, // 删除 - 子模块的子模块
    subChiKeyAddModal // 添加 - 子模块的子模块
  }
};
</script>
<style>
</style>
