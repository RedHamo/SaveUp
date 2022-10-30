<script setup lang="ts">
import { reactive } from 'vue';
import dayjs from 'dayjs'
import api from "@/api/request"
import { ElMessage } from 'element-plus'

const tagList = ["","success","info","warning","danger"]
let tableData = reactive([
  {
    item: '早饭',
    cost: '0',
    memo: '',
  },
  {
    item: '午饭',
    cost: '0',
    memo: '',
  },
  {
    item: '晚饭',
    cost: '0',
    memo: '',
  },
  {
    item: '其他',
    cost: '0',
    memo: '',
  }
])

const load = () => {
  api({
    url: '/info',
    method: 'get',
  }).then((res)=>{
    const data = res.data;
    if(data?.result?.length>0) {
      tableData.length = 0;
      for(const el of data.result){
        tableData.push(el)
      }
    }
  })
}

const submit = () => {
  api({
    url: '/submit',
    method: 'post',
    data: tableData
  }).then((res)=>{
    if (res.data.success) {
      ElMessage({
        message: '保存成功.',
        type: 'success',
      })
    }
  })
}

const out = (info: any)=>{
  console.log(info)
}

load();
</script>

<template>
  <div class="save-up">
    <div class="header">{{dayjs().format("YYYY-MM-DD")}}消费</div>
    <!-- {{tableData}} -->
    <div class="body">
      <el-table 
        :data="tableData" 
        style="width: 100%"
        max-height="300"
      >
        <el-table-column prop="no" label="No" width="57">
          <template #default="scope">
            {{scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column prop="item" label="项目" width="100">
          <template #default="scope">
            <el-tag
              :type="tagList[scope.$index%5]"
              disable-transitions
              >{{ scope.row.item }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="cost" label="金额" width="100">
          <template #default="scope">
            <el-input 
              v-model="tableData[scope.$index].cost" 
              size="small" 
              :formatter="(value:String) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
              :parser="(value:String) => {
                if(value=='') return '0'
                return value.replace(/[^\d]/g, '').replace(/^0*([\d]*$)/, '$1')
              }"
              maxlength="6"
              class="cost-input"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="memo" label="备注">
          <template #default="scope">
            <el-input 
              v-model="tableData[scope.$index].memo" 
              size="small" 
              class="memo-input"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-divider>总消费:{{tableData.map(o=>o.cost.replace(/,/g,"")).reduce((a,b)=>+a + +b,0)}}</el-divider>
      <el-row :gutter="20">
        <el-col :span="12" :offset="0">
          <el-button color="#626aef" class="btn" size="large" auto-insert-space @click="submit">保存</el-button>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-button color="#626aef" class="btn" size="large" auto-insert-space>重置</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped lang="less">
.save-up{
  width: 100%;
  height: 100%;
  text-align: center;
  overflow: hidden;
   font-size: 1.2rem;

  .header{
    margin: 10px 0;
    font-size: 30px;
  }
  .body{
    margin: 10px;
    .cost-input{
      width: 50px;
    }
    .btn{
      width: 80%;
    }
  }
}
:deep(.cell){
   font-size: 1.5rem;
}
:deep(.el-tag) {
   font-size: 1.3rem;
}
:deep(.el-input),:deep(.el-button),:deep(.el-divider__text) {
   font-size: 1.2rem;
}
</style>
