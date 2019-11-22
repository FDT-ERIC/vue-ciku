<template>
  <card class="card" title="Edit Dataset Profile">
    <div>
      <form @submit="addDataset" enctype="multipart/form-data">
        <div class="row">
          <div class="col-md-5">
            <fg-input type="text"
                      label="名称"
                      required
                      placeholder="如：cifar10"
                      v-model="dataset.dataset_name">
            </fg-input>
          </div>
          <div class="col-md-3">
            <fg-input type="text"
                      label="作者"
                      required
                      placeholder="如：小黑"
                      v-model="dataset.dataset_author">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      label="领域"
                      required
                      placeholder="如：图像"
                      v-model="dataset.dataset_domain">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="任务"
                      required
                      placeholder="如：图像分类"
                      v-model="dataset.dataset_task">
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input type="text"
                      label="格式"
                      required
                      placeholder="如：224*224"
                      v-model="dataset.dataset_format">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="存储格式"
                      required
                      placeholder="如：numpy"
                      v-model="dataset.dataset_store_format">
            </fg-input>
          </div>
		  <div class="col-md-6">
		   
		  </div>
        </div>
		<div class="row">
		  
		  <div class="col-md-6">
       <b-form-file ref="file" class="mt-3" v-model="dataset.dataset_file" plain></b-form-file>
		  </div>
		  <div class="col-md-6">
		  </div>
		</div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>描述</label>
              <textarea rows="5" class="form-control border-input"
                        placeholder="如：这是一个用于图像分类的数据集"
                        v-model="dataset.dataset_desc">
              </textarea>
            </div>
          </div>
        </div>
		
        <div class="text-center">
          <b-button type="submit" variant="primary">提交数据信息</b-button>
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
      dataset: {
        dataset_id: "",
        dataset_name: "",
		    dataset_author: "",
        dataset_domain: "",
        dataset_task : "",
        dataset_format : "",
        dataset_store_format : "",
        dataset_path : "",
        dataset_code : "",
        dataset_size: "",
        dataset_file: null,
        dataset_desc: "",
        dataset_labeled: "",
        dataset_label_file: ""
      },
    visible: false,
	  type: ["danger", "success"] ,
	  message : ["添加失败", "添加成功"],
	  icon : ["ti-face-sad", "ti-face-smile"],
	  file : ""
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
   
    addDataset(event) {
      event.preventDefault();
      let formData = new FormData();
      for (var key in this.dataset) {
        formData.append(key, this.dataset[key]);
      }
      console.log(this.$parent);
      var init_code = "# -*- coding:utf-8\n\nif __name__ =='__main__':\n\tpass\n";
      formData.append('dataset_code', this.$parent.$refs['code-content'].code?this.$parent.$refs['code-content'].code:init_code);
      console.log(this.dataset["dataset_file"]);
      this.visible = true;
      this.axios.post("/dataset/add/",formData,{
        'Content-Type':'multipart/form-data'
      }).then(res=>{
        console.log(res.data);
        this.visible = false;
        this.notifyVue('top', 'center', res.data['status']);
        
      });
     
    },
  },
  computed : {
    visibility(){
      console.log(this.visible);
      return "visiblility:"+this.visible?'visible':'hidden';
    }
  },
  mounted() {
  }
};
</script>
<style>
</style>
