<script setup lang="ts">
import { ref } from 'vue'
import { Tabbar, TabbarItem } from 'vant';

const active = ref(0);

</script>

<template>

  <tabbar v-model="active" fixed >
    <tabbar-item icon="home-o">主页</tabbar-item>
    <tabbar-item icon="like-o">愿望</tabbar-item>
    <tabbar-item icon="chart-trending-o">图表</tabbar-item>
    <tabbar-item icon="friends-o">我的</tabbar-item>
  </tabbar>
</template>

<style scoped>

</style>
