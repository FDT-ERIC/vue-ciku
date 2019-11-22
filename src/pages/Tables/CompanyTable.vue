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
          <b-button size="sm" @click="check(row.item, row.index)" class="mr-2" variant="info">查看</b-button>
          <!-- <b-button size="sm" @click="add(row.item, row.index)" class="mr-2" variant="success">添加</b-button> -->
          <b-button size="sm" @click="modify(row.item, row.index)" class="mr-2" variant="warning">修改</b-button>
          <b-button size="sm" @click="delete1(row.item, row.index)" class="mr-2" variant="danger">删除</b-button>
        </template>
      </b-table>
    </div>
    <b-pagination v-model="curPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table"></b-pagination>
    <!-- 查看弹框 -->
    <comDetailModal
      :id="DetailModal.id"
      :title="DetailModal.title"
      :company_data="DetailModal.company_data"
      size="xl"
      data-backdrop="static"
    ></comDetailModal>
    <!-- 修改弹框 -->
    <comModifyModal
      :id="ModifyModal.id"
      :title="ModifyModal.title"
      :company_data="ModifyModal.company_data"
      size="xl"
      data-backdrop="static"
    ></comModifyModal>
    <!-- 删除弹框 -->
    <comDeleteModal
      :id="DeleteModal.id"
      :title="DeleteModal.title"
      :com_title="DeleteModal.com_title"
      size="xl"
      data-backdrop="static"
    ></comDeleteModal>
    <!-- 添加弹框 -->
    <comAddModal
      :id="AddModal.id"
      :title="AddModal.title"
      size="xl"
      data-backdrop="static"
    ></comAddModal>
  </div>
</template>
<script>
// import EditDatasetForm from "../Forms/EditDatasetForm.vue";
import comDetailModal from "../../components/Modal/Company/comDetailModal.vue";
import comModifyModal from "../../components/Modal/Company/comModifyModal.vue";
import comAddModal from "../../components/Modal/Company/comAddModal.vue";
import comDeleteModal from "../../components/Modal/Company/comDeleteModal.vue";
export default {
  components: {
    // EditDatasetForm,
    comDetailModal,
    comModifyModal,
    comAddModal,
    comDeleteModal
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
        id: "comDetailModal",
        title: "",
        company_data: Object
      },
      // 修改
      ModifyModal: {
        id: "comModifyModal",
        title: "",
        company_data: Object
      },
      // 添加
      DeleteModal: {
        id: "comDeleteModal",
        title: "",
        com_title: "", 
      },
      // 添加
      AddModal: {
        id: "comAddModal",
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
    check(item, index, button) {
      this.$axios
        .get("/api/knowledge/database/company/select", {
          params: {
            name: item["公司简称"]
          }
        })
        .then(res => {
          this.DetailModal.company_data = res.data.res;
        });
      this.DetailModal.title = item["公司简称"];
      this.$root.$emit("bv::show::modal", this.DetailModal.id);
    },
    // 修改
    modify(item, index) {
      this.$axios
        .get("/api/knowledge/database/company/select", {
          params: {
            name: item["公司简称"]
          }
        })
        .then(res => {
          this.ModifyModal.company_data = res.data.res;
        });
      this.ModifyModal.title = item["公司简称"];
      this.$root.$emit("bv::show::modal", this.ModifyModal.id);
    },
    // 删除
    delete1(item) {
      this.DeleteModal.title = "警告";
      this.DeleteModal.com_title = item["公司简称"]
      this.$root.$emit("bv::show::modal", this.DeleteModal.id);
    },
    // 添加
    add() {
      this.AddModal.title = "添加企业信息";
      this.$root.$emit("bv::show::modal", this.AddModal.id);
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
