<template>
  <card class="card" title="Edit Model Profile">
    <div>
      <form @submit.prevent enctype="multipart/form-data">
        <div class="row">
          <div class="col-md-5">
            <fg-input type="text"
                      label="模型名称"
                      placeholder="如：AlexNet"
                      v-model="model.model_name">
            </fg-input>
          </div>
          <div class="col-md-3">
            <fg-input type="text"
                      label="模型版本"
                      placeholder="如：v1.0.0"
                      v-model="model.model_version">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      label="模型作者"
                      placeholder="如：小白"
                      v-model="model.model_author">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="模型框架"
                      placeholder="如：Tensorflow"
                      v-model="model.model_framework">
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input type="text"
                      label="模型大小"
                      disabled
                      placeholder="Model Size"
                      v-model="model.model_size">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="模型来源"
                      placeholder="如：http://www.alexnet.com"
                      v-model="model.model_resource">
            </fg-input>
          </div>
        </div>


        <div class="row">
		  
          <div class="col-md-6">
          <input type="file" label="Upload" ref="file">
          </div>
          <div class="col-md-6">
            <p-button type="warn" round @click.native.prevent="uploadFile">
              上传
            </p-button>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>模型描述</label>
              <textarea rows="5" class="form-control border-input"
                        placeholder="Model Description"
                        v-model="model.model_desc">

              </textarea>
            </div>
          </div>
        </div>
        <div class="text-center">
          <p-button type="info"
                    round
                    @click.native.prevent="updateProfile">
            更新模型信息
          </p-button>
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
        model_id: "",
        model_name: "",
        model_version: "",
        model_author: "",
        model_desc: "",
        model_framework: "",
        model_path: "",
        model_dataset: "",
        model_size: "",
		    model_resource : "",
		    model_code : ""
      },
      type: ["danger", "success"] ,
      message : ["更新失败", "更新成功"],
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
	  
    updateProfile() {
      Axios({
      method: 'post',
      url: "/model/change", 
      data : JSON.stringify(this.model)
      }).then(
        (res) => {
          this.notifyVue('top', 'center', res.data['status']);
        }
      )
    },

    uploadFile() {
      let formData = new FormData();
      formData.append('name', this.$refs.file.files[0].name);
      formData.append('id', this.model.model_id);
      console.log(this.$refs);
      formData.append('file',this.$refs.file.files[0])
      this.axios.post("/upload/model/",formData,{
        'Content-Type':'multipart/form-data'
      }).then(res=>{
        console.log(res.data);
      })
		
	  },
  },

  mounted() {
    Axios.get("/model/one/" +this.id)
    .then((res) => {
        this.model = res.data.data;
        console.log(this.model);
    });
  }
};
</script>
<style>
</style>
