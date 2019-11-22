<template>
  <div class="row">
    <div class="col-12">
      <card class="card-plain">
        <div class="table-full-width table-responsive">
          <CompanyTable
            type="hover"
            :data="company_data"
            :columns="columns"
            v-model="currentPage"
            :rows="rows"
            :per-page="perPage"
            style="font-size:13px"
          ></CompanyTable>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
// 不能使用@/components引用
// TODO: 需要额外的配置
import CompanyTable from "./Tables/CompanyTable";
export default {
  components: {
    CompanyTable
  },
  data() {
    return {
      company_data: [],
      columns: [
        { key: "index", label: "排名" },
        { key: "公司简称", label: "公司简称" },
        { key: "公司全称", label: "公司全称" },
        { key: "operation", label: "操作" }
      ],
      currentPage: 1,
      perPage: 8,
    };
  },
  mounted() {
    this.$axios.get("/api/companyAll").then(res => {
      this.company_data = res.data.res;
    });
  },
  computed: {
    rows() {
      return this.company_data.length;
    }
  }
};
</script>
<style>
</style>
