<script setup lang="ts">
import { reactive, ref } from 'vue'
import FooterBarVue from '../components/FooterBar.vue';
import { Divider } from 'vant';
import dayjs from 'dayjs'

const columns = [
  {
    title: '项目',
    dataIndex: 'item',
    width: '25%',
  },
  {
    title: '金额',
    dataIndex: 'cost',
    width: '25%',
  },
  {
    title: '备注',
    dataIndex: 'memo',
  },
];

interface DataItem {
  key: string;
  item: string;
  cost: string;
  memo: string;
}
const data: DataItem[] = [];

data.push({ key: "1", item: "早饭", cost: "", memo: "" })
data.push({ key: "2", item: "午饭", cost: "", memo: "" })
data.push({ key: "3", item: "晚饭", cost: "", memo: "" })
data.push({ key: "4", item: "其他", cost: "", memo: "" })

const dataSource = ref(data);

interface EditCellData{
  data: any,
  row: string,
  column: string
}

const editCellData:EditCellData = reactive({
  data: undefined,
  row: "",
  column: ""
});

const tagStyle: string[] = [ "pink",  "red",  "orange",  "green",  "cyan",  "blue",  
  "purple",  "success",  "processing",  "error",  "warning",  "default"]

const edit = (row: string, column: string) => {
  editCellData.data = dataSource.value.find(item => row === item.key)![column as keyof DataItem];
  editCellData.row = row;
  editCellData.column = column;
  setTimeout(() => {
    document.getElementById(column+row)?.focus()
  },200)
};

const save = (row: string, column: string) => {
  let index = dataSource.value.findIndex(item => row === item.key);
  let params = {[column]: editCellData.data};
  Object.assign(dataSource.value[index], params)
  
  editCellData.data = null;
  if(column=="cost"){
    setTimeout(() => {
      edit(row, "memo")
    },200)
  }
};

const cancel = () => {
  editCellData.data = null;
};

const out = (el: string) => {
  console.log(el)
};

</script>

<template>
  <div class="title">记账📙
    <div class="date">{{dayjs().format("YYYY-MM-DD")}}</div>
  </div>
  <div class="content">
    <a-table 
      style="font-size: 18px;"
      :columns="columns" 
      :data-source="dataSource" 
      :scroll="{ y: 300 }"
      :pagination="false"
      bordered>
      <template #bodyCell="{ column, text, record, index }">
        <template v-if="['item'].includes(column.dataIndex)">
          <a-tag 
            :color="tagStyle[index%tagStyle.length + 3]"
            style="font-size: 15px; padding: 3px 8px;"
          >
            {{ text }}
          </a-tag>
        </template>
        <template v-else-if="['cost', 'memo'].includes(column.dataIndex)">
            <template v-if="editCellData.data != undefined">
              <a-input-number
                v-if="column.dataIndex=='cost' && record.key==editCellData.row && editCellData.column==column.dataIndex"
                v-model:value="editCellData.data"
                style="margin: -5px 0;width: 100%"
                @blur="cancel()"
                @keyup="$event.keyCode==13&&save(record.key, column.dataIndex)"
                onchange="value=value.replace(/^0+/,'')"
                :id="column.dataIndex+record.key"
                :type="column.dataIndex=='cost'?'number':'text'"
              />
              <a-input
                v-else-if="column.dataIndex=='memo' && record.key==editCellData.row && editCellData.column==column.dataIndex"
                v-model:value="editCellData.data"
                style="margin: -5px 0"
                @blur="cancel()"
                @keyup="$event.keyCode==13&&save(record.key, column.dataIndex)"
                onchange="value=value.substr(0,50)"
                :id="column.dataIndex+record.key"
                :type="column.dataIndex=='cost'?'number':'text'"
              />
            </template>
            <template v-else>
              <div 
                @click="edit(record.key, column.dataIndex)"
                style="min-height: 22px;"
              >{{ text }}</div>
            </template>
        </template>
      </template>
    </a-table>
    <divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px', fontSize: '20px' }"
    >今日总消费:{{dataSource.map(o=>o.cost).reduce((a,b)=>+a + +b,0)}}</divider>
  </div>
  <FooterBarVue/>
</template>

<style scoped lang="less">
.title{
  font-size: 3rem;
  background-color: #626aef;
  padding: 1.5rem;
  height: 8rem;
  z-index: 1;
  top: 0;
  position: sticky;
  .date{
    font-size: 1.5rem;
    float: right;
  }
  /* display: flex; */
}
</style>
