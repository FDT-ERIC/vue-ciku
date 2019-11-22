<template>
    <div class="row">
      
      <div class="col-xl-4 col-lg-7 col-md-6">
        <add-dataset-form>

        </add-dataset-form>
      </div>
      <div class="col-xl-8 col-lg-5 col-md-6">
        <code-card v-bind:value="value" ref="code-content">
        </code-card>
      </div>
    </div>
</template>
<script>

import CodeCard from "./UserProfile/CodeCard.vue";
import AddDatasetForm from "./Forms/AddDatasetForm.vue";

export default {
  components: {
    // UserCard,
    // MembersCard,
    AddDatasetForm,
    CodeCard
  },
  data(){
    return {
      value : "# -*- coding:utf-8\n\nif __name__ =='__main__':\n\tpass\n"
    }
  },
  mounted: () => {
  }
};
</script>
<style>
</style>
