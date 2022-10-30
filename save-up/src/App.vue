<script setup lang="ts">
import SaveUp from './components/SaveUp.vue'
</script>

<template>
  <el-container>
    <el-header height="7rem">📙记账</el-header>
    <el-main>
      <SaveUp />
    </el-main>
  </el-container>
  
</template>

<style scoped lang="less">
header{
  font-size: 50px;
  background-color: #626aef;
}
main{
  padding: 0 ;
}
</style>
