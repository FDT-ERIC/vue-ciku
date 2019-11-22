<template>
  <card class="card" title="Edit Dataset Profile">
    <div>
      <form @submit.prevent enctype="multipart/form-data">
        <div class="row">
          <div class="col-md-5">
            <fg-input type="text"
                      label="数据名称"
                      placeholder="Dataset Name"
                      v-model="dataset.dataset_name">
            </fg-input>
          </div>
          <div class="col-md-3">
            <fg-input type="text"
                      label="数据作者"
                      placeholder="Dataset Author"
                      v-model="dataset.dataset_author">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      label="数据领域"
                      placeholder="Dataset Domain"
                      v-model="dataset.dataset_domain">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="数据任务"
                      placeholder="Dataset Task"
                      v-model="dataset.dataset_task">
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input type="text"
                      label="数据格式"
                      placeholder="Dataset Format"
                      v-model="dataset.dataset_format">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="数据存储格式"
                      placeholder="Dataset Store Format"
                      v-model="dataset.dataset_store_format">
            </fg-input>
          </div>
		  <!-- <div class="col-md-6">
		   <fg-input type="text"
		             label="dataset Path"
		             placeholder="Dataset Path"
						v-model="dataset.dataset_path"
		            >
		   </fg-input>
		  </div> -->
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
              <label>数据描述</label>
              <textarea rows="5" class="form-control border-input"
                        placeholder="Dataset Description"
                        v-model="dataset.dataset_desc">
              </textarea>
            </div>
          </div>
        </div>
		
        <div class="text-center">
          <p-button type="info" round @click.native.prevent="updateProfile">
            更新数据信息
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
      dataset: {
        dataset_id: "",
        dataset_name: "michael23",
		    dataset_author: "Chet",
        dataset_domain: "",
        dataset_task : "",
        dataset_format : "",
        dataset_store_format : "",
        dataset_path : "",
        dataset_code : "",
        dataset_size: "",
        dataset_desc: "Faker",
        dataset_labeled: "Melbourne, Australia",
        dataset_label_file: ""
      },
	  type: ["danger", "success"] ,
	  message : ["更新失败", "更新成功"],
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
	  
    updateProfile() {
	  Axios({
		method: 'post',
		url: "/dataset/change", 
		data : JSON.stringify(this.dataset)
	  }).then(
		(res) => {
			this.notifyVue('top', 'center', res.data['status']);
		}
	  )
    },
	
	uploadFile() {
		let formData = new FormData();
		formData.append('name', this.$refs.file.files[0].name);
		formData.append('id', this.dataset.dataset_id);
		console.log(this.$refs);
		formData.append('file',this.$refs.file.files[0])
		this.axios.post("/upload/dataset/",formData,{
			'Content-Type':'multipart/form-data'
		}).then(res=>{
			console.log(res.data);
		})
		
	},
  },

  mounted() {
    Axios.get("/dataset/one/" +this.id)
	.then((res) => {
      this.dataset = res.data.data;
	  console.log(this.dataset);
    });
  }
};
</script>
<style>
</style>
