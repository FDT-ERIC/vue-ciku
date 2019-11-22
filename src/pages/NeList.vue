<template>
  <div class="row">
    <div class="col-12">
      <card class="card-plain">
        <div class="table-full-width table-responsive">
          <NeTable
            type="hover"
            :data="ne_data"
            :columns="columns"
            v-model="currentPage"
            :rows="rows"
            :per-page="perPage"
            style="font-size:13px"
          ></NeTable>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
// 不能使用@/components引用
// TODO: 需要额外的配置
import NeTable from "./Tables/NeTable";
export default {
  components: {
    NeTable
  },
  data() {
    return {
      ne_data: [],
      columns: [
        { key: "index", label: "序号" },
        { key: "名称", label: "名称" },
        { key: "类型", label: "类型" },
        { key: "operation", label: "操作" }
      ],
      currentPage: 1,
      perPage: 8,
    };
  },
  mounted() {
    this.$axios.get("/api/knowledge/database/ne/all").then(res => {
      // this.keyword_data = res.data.res;
      this.ne_data = res.data.res
    });
    // this.ne_data = [{"名称":"1", "类型":"哈哈"},{"名称":"2", "类型":"哎哎"}]
  },
  computed: {
    rows() {
      return this.ne_data.length;
    }
  }
};
</script>
<style>
</style>
