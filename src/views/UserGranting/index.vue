<template>
    <div>
         <div class="box-item">
            <t-title>我的发放</t-title>
            <div class="table-content ">
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="label1" align='center' label="义务兵姓名"></el-table-column>
                    <el-table-column prop="label2" align='center' label="领取人姓名"></el-table-column>
                    <el-table-column prop="label3" align='center' label="联系方式"></el-table-column>
                    <el-table-column prop="label4" align='center' label="补助账号"></el-table-column>
                    <el-table-column prop="label4" align='center' label="发放金额"></el-table-column>
                    <el-table-column prop="label4" align='center' label="发放时长"></el-table-column>
                    <el-table-column prop="label4" align='center' label="发放机构"></el-table-column>
                    <el-table-column prop="label4" align='center' label="发放时间"></el-table-column>
                    <el-table-column               align='center' label="操作">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="primary"
                                @click="check_desc(scope.row)" >
                                查看
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog
            class="common-dialog"
            title="发放详情"
            :visible.sync="dialogVisible">
            <div class="user-info">
                <p>
                    <span>义务兵姓名：</span>
                    <span>黄宗泽</span>
                </p>
                <p>
                    <span>领取人姓名：</span>
                    <span>黄宗泽</span>
                </p>
                <p>
                    <span>领取人身份证：</span>
                    <span>{{user_data.receiptorIdcard}}</span>
                </p>
                <p>
                    <span>联系电话：</span>
                    <span>黄宗泽</span>
                </p>
                <p>
                    <span>补助类别：</span>
                    <span class="red">黄宗泽</span>
                </p>
                <p>
                    <span>补助账号：</span>
                    <span>1257824258411</span>
                </p>
                <p>
                    <span>补助时长：</span>
                    <span class="red">黄宗泽</span>
                </p>
                <p>
                    <span>补助标准：</span>
                    <span class="red">黄宗泽</span>
                </p>
                <p>
                    <span>增发金额：</span>
                    <span class="red">黄宗泽</span>
                </p>
                <p>
                    <span>补助总额：</span>
                    <span class="red">黄宗泽</span>
                </p>
                <p>
                    <span>发放机构：</span>
                    <span class="red">黄宗泽</span>
                </p>
                <p>
                    <span>发放时间：</span>
                    <span class="red">黄宗泽</span>
                </p>
            </div>
            <p style="text-align:right;margin: 20px 0 10px">
                <el-button type="primary" size="small" @click="dialogVisible = false">确定</el-button>
            </p>
        </el-dialog>
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
      dialogVisible: false,
      user_data: {
        receiptorIdcard: "610524196005231256",
        csmanName: "黄宗泽"
      },
      tableData: [
        {
          label1: "黄宗泽",
          label2: "黄维德",
          label3: "13952364195",
          label4: "13952364195",
          label5: "13952364195",
          label6: true
        },
        {
          label1: "黄宗泽",
          label2: "黄维德",
          label3: "13952364195",
          label4: "13952364195",
          label5: "13952364195",
          label6: false
        },
        {
          label1: "黄宗泽",
          label2: "黄维德",
          label3: "13952364195",
          label4: "13952364195",
          label5: "13952364195",
          label6: true
        },
        {
          label1: "黄宗泽",
          label2: "黄维德",
          label3: "13952364195",
          label4: "13952364195",
          label5: "13952364195",
          label6: false
        }
      ]
    };
  },
  methods: {
    check_desc() {
      this.dialogVisible = true;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.user-info {
  padding: 0 60px;
  p {
    margin-bottom: 12px;
    font-size: 15px;
    span:nth-of-type(1) {
      display: inline-block;
      width: 120px;
      text-align: right;
      margin-right: 8px;
    }
    span:nth-of-type(2) {
      &.red {
        color: rgb(245, 108, 108);
      }
    }
  }
}
</style>

