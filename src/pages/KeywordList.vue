<template>
  <div class="row">
    <div class="col-12">
      <card class="card-plain">
        <div class="table-full-width table-responsive">
          <KeywordTable
            type="hover"
            :data="keyword_data"
            :columns="columns"
            v-model="currentPage"
            :rows="rows"
            :per-page="perPage"
            style="font-size:13px"
          ></KeywordTable>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
// 不能使用@/components引用
// TODO: 需要额外的配置
import KeywordTable from "./Tables/KeywordTable";
export default {
  components: {
    KeywordTable
  },
  data() {
    return {
      keyword_data: [],
      columns: [
        { key: "index", label: "序号" },
        { key: "关键词分类", label: "关键词分类" },
        { key: "关键词子模块", label: "关键词子模块" },
        { key: "operation", label: "操作" }
      ],
      currentPage: 1,
      perPage: 8,
    };
  },
  mounted() {
    // this.$axios.get("/api/companyAll").then(res => {
    //   this.keyword_data = res.data.res;
    // });
    this.keyword_data = [{"关键词分类":"关系"}]
  },
  computed: {
    rows() {
      return this.keyword_data.length;
    }
  }
};
</script>
<style>
</style>
