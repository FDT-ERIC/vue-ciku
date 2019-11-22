<template>
  <div>
    <div>
      <b-button style="float:left" size="sm" @click="add" class="mr-2" variant="success">添加</b-button>
      <b-form-group
        label="搜索"
        label-cols-sm="3"
        label-align-sm="center"
        label-size="sm"
        label-for="filterInput"
        class="mb-0"
        style="width:70%"
      >
        <b-input-group size="sm" style="margin:auto">
          <b-form-input
            v-model="filter"
            type="search"
            id="filterInput"
            placeholder="Type to Search"
          ></b-form-input>
          <b-input-group-append>
            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </div>
    <div style="margin-top:30px"></div>
    <div style="height:550px">
      <b-table
        head-variant="light"
        :items="data"
        :fields="columns"
        id="my-table"
        :per-page="perPage"
        :current-page="curPage"
        :filter="filter"
        @filtered="onFiltered"
      >
        <!-- 索引 -->
        <template v-slot:cell(index)="row">{{ row.index + 1 }}</template>
        <!-- 操作 -->
        <template v-slot:cell(operation)="row">
          <!-- <b-button size="sm" @click="check(row.item, row.index)" class="mr-2" variant="info">查看</b-button> -->
          <b-button size="sm" @click="modify(row.item, row.index)" class="mr-2" variant="warning">修改</b-button>
          <b-button size="sm" @click="delete1(row.item, row.index)" class="mr-2" variant="danger">删除</b-button>
        </template>
      </b-table>
    </div>
    <b-pagination v-model="curPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table"></b-pagination>
    <!-- 查看弹框 -->
    <!-- <keyDetailModal
      :id="DetailModal.id"
      :title="DetailModal.title"
      :keyword_data="DetailModal.keyword_data"
    ></keyDetailModal> -->
    <!-- 修改弹框 -->
    <neModifyModal
      :id="neModifyModal.id"
      :claTitle="neModifyModal.claTitle"
      :neTitle="neModifyModal.neTitle"
      data-backdrop="static"
    ></neModifyModal>
    <!-- 删除弹框 -->
    <neDeleteModal
      :id="neDeleteModal.id"
      :claTitle="neDeleteModal.claTitle"
      :neTitle="neDeleteModal.neTitle"
    ></neDeleteModal>
    <!-- 添加弹框 -->
    <neAddModal
      :id="neAddModal.id"
      :title="neAddModal.title"
      data-backdrop="static"
    ></neAddModal>
  </div>
</template>
<script>
// import EditDatasetForm from "../Forms/EditDatasetForm.vue";
import keyDetailModal from "../../components/Modal/Keyword/keyDetailModal.vue";
import neAddModal from "../../components/Modal/NE/neAddModal.vue";
import neModifyModal from "../../components/Modal/NE/neModifyModal.vue";
import neDeleteModal from "../../components/Modal/NE/neDeleteModal.vue";
export default {
  components: {
    // EditDatasetForm,
    keyDetailModal, // 查看
    neAddModal,  // 添加
    neModifyModal, // 修改
    neDeleteModal // 删除
  },
  inject: ["reload"],
  name: "dataset-table",
  props: {
    data: Array,
    currentPage: {
      type: Number,
      default: 1
    },
    columns: Array,

    rows: {
      type: Number,
      default: 10
    },
    perPage: {
      type: Number,
      default: 10
    },
    type: {
      type: String, // striped | hover
      default: "striped"
    }
  },
  computed: {
    tableClass() {
      return `table-${this.type}`;
    }
  },
  data() {
    return {
      curPage: this.currentPage,
      filter: "",
      filterOn: [],

      // 查看
      DetailModal: {
        id: "keyDetailModal",
        title: "",
        keyword_data: Object
      },
      // 修改
      neModifyModal: {
        id: "neModifyModal",
        claTitle: "",
        neTitle:""
      },
      // 删除
      neDeleteModal: {
        id: "neDeleteModal",
        claTitle: "",
        neTitle: "",
      },
      // 添加
      neAddModal: {
        id: "neAddModal",
        title: "",
      }
    };
  },
  methods: {
    // 搜索企业
    onFiltered(filteredItems) {
      this.currentPage = 1;
      this.rows = filteredItems.length;
    },
    // 查看
    // check(item, index) {
      // this.$axios
      //   .get("/api/company/intro/detail", {
      //     params: {
      //       name: item["公司简称"]
      //     }
      //   })
      //   .then(res => {
      //     this.DetailModal.company_data = res.data.res;
      //   });
      // this.DetailModal.title = item["公司简称"];
    //   this.DetailModal.title = item["关键词分类"]
    //   this.DetailModal.keyword_data = [{"合作":[1,2]}, {"子公司":[3,4]}]
    //   this.$root.$emit("bv::show::modal", this.DetailModal.id);
    // },
    // 修改
    modify(item, index) {
      this.neModifyModal.claTitle = item["类型"];
      this.neModifyModal.neTitle = item["名称"];
      this.$root.$emit("bv::show::modal", this.neModifyModal.id);
    },
    // 删除
    delete1(item, index) {
      this.neDeleteModal.claTitle = item["类型"];
      this.neDeleteModal.neTitle = item["名称"];
      this.$root.$emit("bv::show::modal", this.neDeleteModal.id);
    },
    // 添加
    add() {
      this.neAddModal.title = "添加NE词库";
      this.$root.$emit("bv::show::modal", this.neAddModal.id);
    }
  }
};
</script>
<style>
.modal-backdrop {
  opacity: 0;
  filter: alpha(opacity=0);
}
</style>
