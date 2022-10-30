<script setup lang="ts">
  function log(info:String) {
    console.log(info)
  }
</script>

<template>
  <div class="save-up">
    <el-button type="primary" size="default" @click="log('123')">1211113</el-button>
  </div>
</template>

<style scoped>
.save-up{
  flex: 1;
}
</style>
