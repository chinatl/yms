<template>
    <div>
         <div class="box-item">
            <t-title>我的申报</t-title>
            <div class="table-content ">
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="label1" align='center' label="义务兵姓名"></el-table-column>
                    <el-table-column prop="label2" align='center' label="领取人姓名"></el-table-column>
                    <el-table-column prop="label3" align='center' label="领取人身份证"></el-table-column>
                    <el-table-column prop="label4" align='center' label="联系电话"></el-table-column>
                    <el-table-column prop="label5" align='center' label="申报状态">
                        <template slot-scope="scope">
                            <span :style="{
                                color: scope.row.label6 ? 'red':'green'
                            }">{{!scope.row.label6 ? '待审核':'未通过'}} </span>
                        </template>
                    </el-table-column>
                    <el-table-column               align='center' label="操作">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="warning"
                                @click="handleDelete(scope.row)"   v-if='scope.row.label6'>
                                编辑
                            </el-button>
                            <el-button
                                size="mini"
                                type="primary"
                                @click="handleDelete(scope.row)"  v-else>
                                查看
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import tTitle from "@/components/tTitle";
export default {
  components: {
    tTitle
  },
  data() {
    return {
      tableData: [
        {
          label1: "黄宗泽",
          label2: "黄维德",
          label3: "610524196005231256",
          label4: "13952364195",
          label5: "123456789987654123",
          label6: true
        },
        {
          label1: "黄宗泽",
          label2: "黄维德",
          label3: "610524196005231256",
          label4: "13952364195",
          label5: "123456789987654123",
          label6: false
        },
        {
          label1: "黄宗泽",
          label2: "黄维德",
          label3: "610524196005231256",
          label4: "13952364195",
          label5: "123456789987654123",
          label6: true
        },
        {
          label1: "黄宗泽",
          label2: "黄维德",
          label3: "610524196005231256",
          label4: "13952364195",
          label5: "123456789987654123",
          label6: false
        },
        {
          label1: "黄宗泽",
          label2: "黄维德",
          label3: "610524196005231256",
          label4: "13952364195",
          label5: "123456789987654123",
          label6: true
        }
      ]
    };
  },
  methods:{
      handleDelete(){
          
      }
  }
};
</script>
