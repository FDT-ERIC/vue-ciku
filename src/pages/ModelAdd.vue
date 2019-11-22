<template>
    <div class="row">
      <div class="col-xl-4 col-lg-7 col-md-6">
        <add-model-form>
        </add-model-form>
      </div>
      <div class="col-xl-8 col-lg-5 col-md-6">
        <code-card v-bind:value="value">
        </code-card>
      </div>
    </div>
</template>
<script>

import AddModelForm from "./Forms/AddModelForm.vue";
// import UserCard from "./UserProfile/UserCard.vue";
// import MembersCard from "./UserProfile/MembersCard.vue";
import CodeCard from "./UserProfile/CodeCard.vue";


export default {
  name : 'model-add',
  components: {
    // UserCard,
    // MembersCard,
    AddModelForm,
    CodeCard
  },
  data(){
    return {
      value : "# -*- coding:utf-8\n\nif __name__ =='__main__':\n\tpass\n"
    }
  },
  
  methods: {
    
  },
  mounted: () => {
  }
  
};
</script>
<style>
</style>
