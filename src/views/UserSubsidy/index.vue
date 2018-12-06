<template>
  <div>
    <div class="box-item">
      <t-title>我的补助</t-title>
      <div class="table-content">
        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
          <el-table-column prop="csmanName" align="center" label="义务兵"></el-table-column>
          <el-table-column prop="receiptorName" align="center" label="领取人"></el-table-column>
          <el-table-column prop="receiptorPhone" align="center" label="联系电话"></el-table-column>
          <el-table-column prop="account" align="center" label="补助账号"></el-table-column>
          <el-table-column prop="armsType" align="center" label="优抚类别">
            <template slot-scope="scope">
              {{getYfType(scope.row.armsType)}}
            </template>
          </el-table-column>
          <el-table-column prop="standardAmount" align="center" label="补助标准"></el-table-column>
          <el-table-column prop="subsidyDuration" align="center" label="补助时长(月)"></el-table-column>
          <el-table-column prop="plateauSubsidy" align="center" label="高原兵补助(元)"></el-table-column>
          <el-table-column prop="subsidyMoney" align="center" label="补助总额(元)"></el-table-column>
          <el-table-column prop="status" align="center" label="补助状态">
            <template slot-scope="scope">
              <span
                :style="{
                                color: [5,7].includes(scope.row.status) ? 'red':'green'
                            }"
              >{{getApplyStatus(scope.row.status)}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="common-page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNo"
          :page-sizes="$store.getters.page_list"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          background
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import tTitle from "@/components/tTitle";
import { mapGetters, mutations, mapMutations } from "vuex";
export default {
  components: {
    tTitle
  },
  data() {
    return {
      tableData: [],
      user_data: {
        CSMAN_NAME: "", // 义务兵姓名
        RECEIPTOR_NAME: "", // 领取人姓名
        RECEIPTOR_IDCARD: "", // 领取人身份证
        RECEIPTOR_PHONE: "", // 联系电话
        PREFERENTIAL_TYPE: 1, // 优抚类别
        ACCOUNT: "", // 银行卡号
        SUBSIDY_DURATION: 0, // 补助时长
        STANDARD_MONEY: 0, // 标准金额
        INCREASE_MONEY: 0, // 增发金额
        GRANT_MONEY: 0, // 发放金额(总额)
        GRANT_ORG: "", // 发放机构
        GRANT_TIME: 0, // 发放时间
        GRANT_DURATION: 0, // 发放时长
        SUBSIDY_MONEY: 0,
        CSMAN_IDCARD: "",
        ID: ""
      },
      loading: true,
      dialogVisible: false,
      pageSize: 10,
      pageNo: 1,
      total: 0
    };
  },
  computed: {
    ...mapGetters([`user_info`, `dict`])
  },
  created() {
    this.init(this.pageSize, this.pageNo);
  },
  methods: {
    /**
     * params ==>  status  1 待提交,2待审核,3未通过,4已通过,5待发放,6,已发放,7已停发
     * 在这里只需要取 2， 3 ，4 的状态
     */
    getApplyStatus(status) {
      let str = ``;
      switch (status) {
        case 2:
          str = "待审核";
          break;
        case 3:
          str = "未通过";
          break;
        case 4:
          str = "已通过";
          break;
        case 5:
          str = "待发放";
          break;
        case 6:
          str = "已发放";
          break;
        case 7:
          str = "已停发";
          break;
        default:
          break;
      }
      return str;
    },
    init(pageSize, pageNo) {
      this.loading = true;
      this.$post(`yfcsman/getYFCsmanDetail/${this.user_info.phone}`, {
        current: pageNo, //当前页
        size: pageSize
      })
        .then(res => {
          this.tableData = res.data.records;
          this.total = res.data.total;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
    },
    handleSizeChange(e) {
      this.pageNo = 1;
      this.pageSize = e;
      this.init(e, 1);
    },
    handleCurrentChange(e) {
      this.pageNo = e;
      this.init(this.pageSize, e);
    },
    getYfType(armsType) {
      let armsStr = ``
      if (!this.dict.armsType) return;
      this.dict.armsType.filter(f => {
        if (armsType === f.value) {
          armsStr = f.label
        }
      })
      return `${armsStr}`
    },
    getType(yfType, education, armsType) {
      let yfTypeStr = ``;
      let eduStr = ``;
      let armsStr = ``;
      if (!this.dict.yfType) return;
      this.dict.yfType.filter(f => {
        if (yfType === f.value) {
          yfTypeStr = f.label;
        }
      });
      this.dict.education.filter(f => {
        if (yfType === f.value) {
          eduStr = f.label;
        }
      });
      this.dict.armsType.filter(f => {
        if (armsType === f.value) {
          armsStr = f.label;
        }
      });
      return `${yfTypeStr}  ${eduStr}  ${armsStr}`;
    },
    getBankType(backType) {
      let str = ``;
      if(!this.dict.bank)return
      this.dict.bank.filter(f => {
        if (backType === f.value) {
          str = f.label;
        }
      });
      return str;
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
