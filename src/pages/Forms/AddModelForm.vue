<template>
  <card class="card" title="Edit Model Profile">
    <div>
      <form @submit.prevent enctype="multipart/form-data">
        <div class="row">
          <div class="col-md-5">
            <fg-input type="text"
                      label="名称"
                      placeholder="如：AlexNet"
                      v-model="model.model_name">
            </fg-input>
          </div>
          <div class="col-md-3">
            <fg-input type="text"
                      label="版本"
                      placeholder="如：V1.0.0"
                      v-model="model.model_version">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      label="作者"
                      placeholder="如：小白"
                      v-model="model.model_author">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="框架"
                      placeholder="如：TensorFlow"
                      v-model="model.model_framework">
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input type="text"
                      label="来源"
                      placeholder="如：http://www.alexnet.com"
                      v-model="model.model_resource">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <input type="file" label="Upload" ref="file">
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>描述</label>
              <textarea rows="5" class="form-control border-input"
                        placeholder="如：这是一个图像识别模型"
                        v-model="model.model_desc">
              </textarea>
            </div>
          </div>
        </div>
        <div class="text-center">
          <p-button type="info"
                    round
                    @click.native.prevent="addModel">
            添加模型
          </p-button>
          <span v-if="this.visible" class="text-center"><img src="@/assets/img/timg.gif" width="40px" height="40px" /></span>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>
<script>
import Axios from 'axios';
import NotificationTemplate from '../Notifications/NotificationTemplate';

const BASEURL = "http://localhost:8090";

export default {
  props: ["id"],
  data() {
    return {
      model: {
        model_name: "",
        model_version: "",
        model_author: "",
        model_desc: "",
        model_framework: "",
        model_dataset: "",
		    model_resource : "",
		    model_code : ""
      },
      visible: false,
      type: ["danger", "success"] ,
      message : ["添加失败", "添加成功"],
      icon : ["ti-face-sad", "ti-face-smile"]
    };
  },
  methods: {
	  
	notifyVue(verticalAlign, horizontalAlign, status) {		
	    this.$notify({
        message : this.message[status],
        icon: this.icon[status],
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: this.type[status]
	    });
	 },
	  
    addModel() {
      let formData = new FormData();
      for (var key in this.model) {
        formData.append(key, this.model[key]);
      }
      console.log(this.$parent.$children[0].code);
      var init_code = "# -*- coding:utf-8\n\nif __name__ =='__main__':\n\tpass\n";
      formData.append('model_code', this.$parent.$children[0].code?this.$parent.$children[0].code:init_code);
      formData.append('file', this.$refs.file.files[0]);
      this.visible = true;
      this.axios.post("/model/add/",formData,{
        'Content-Type':'multipart/form-data'
      }).then(res=>{
        console.log(res.data);
        this.visible = false;
        this.notifyVue('top', 'center', res.data['status']);
      });
    },
  },

  mounted() {
  }
};
</script>
<style>
</style>
