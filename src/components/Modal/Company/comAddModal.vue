<template>
  <div>
    <b-modal :id="id" size="xl" :title="title" hide-footer ref="add-modal" scrollable>
      <b-form @submit="onSubmit">
        <div class="row" style="margin-top:20px">
          <div class="col-6">
            <div
              v-for="(item, index) in Object.keys(form).slice(0, 13)"
              :key="index"
              class="text item"
              style="color:grey; font-size:13px; margin-bottom:6px"
            >
              <b-form-group id="input-group-2" :label="item" label-for="input-1">
                <b-form-input
                  style="border-style:solid; border-color:#66CCFF;"
                  id="input-1"
                  v-model="form[item]"
                ></b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="col-6">
            <div
              v-for="(item, index) in Object.keys(form).slice(13, 26)"
              :key="index"
              class="text item"
              style="color:grey; font-size:13px; margin-bottom:6px"
            >
              <b-form-group id="input-group-2" :label="item" label-for="input-2">
                <b-form-input
                  style="border-style:solid; border-color:#66CCFF"
                  id="input-2"
                  v-model="form[item]"
                ></b-form-input>
              </b-form-group>
            </div>
          </div>
        </div>
        <hr />
        <div style="float:right">
          <b-button @click="cancel" variant="warning" class="mr-3">Cancel</b-button>
          <b-button type="reset" variant="danger" class="mr-3">Reset</b-button>
          <b-button type="submit" variant="success">Submit</b-button>
        </div>
      </b-form>
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
      form: {
        公司简称: "",
        公司英文名称: "",
        上市日期: "",
        主承销商: "",
        注册资本: "",
        组织形式: "",
        公司电话: "",
        公司传真: "",
        公司电子邮箱: "",
        公司网址: "",
        信息披露网址: "",
        注册地址: "",
        公司简介: "",
        公司名称: "",
        上市市场: "",
        发行价格: "",
        成立日期: "",
        机构类型: "",
        董事会秘书: "",
        董秘电话: "",
        董秘传真: "",
        董秘电子邮箱: "",
        邮政编码: "",
        证券简称更名历史: "",
        办公地址: "",
        经营范围: ""
      }
    };
  },
  methods: {
    cancel() {
      this.$refs["add-modal"].hide();
    },
    onSubmit(evt) {
      //   evt.preventDefault();
      this.$axios
        .get("/api/knowledge/database/company/insert", {
          params: {
            // insert: JSON.stringify(this.form)
            insert: this.form
          }
        })
        .then(res => {
          // this.DetailModal.company_data = res.data.res;
          console.log(res.data.res)
          alert(res.data.res);
          this.$refs["add-modal"].hide();
        });
      // alert(JSON.stringify(this.form));
      // alert("添加成功");
      // this.$refs["add-modal"].hide();
      // console.log(this.form);
    }
  }
};
</script>

<style>
</style>
