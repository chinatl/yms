<template>
  <div>
    <div class="box-item">
      <t-title>我的发放</t-title>
      <div class="table-content ">
        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
          <el-table-column prop="CSMAN_NAME" align='center' label="义务兵"></el-table-column>
          <el-table-column prop="RECEIPTOR_NAME" align='center' label="领取人"></el-table-column>
          <el-table-column prop="RECEIPTOR_PHONE" align='center' label="联系方式"></el-table-column>
          <el-table-column prop="ACCOUNT" align='center' label="补助账号"></el-table-column>
          <el-table-column prop="ARMS_TYPE" align='center' label="优抚类别">
            <template slot-scope="scope">
              {{getYfType(scope.row.ARMS_TYPE)}}
            </template>
          </el-table-column>
          <el-table-column prop="GRANT_ORG" align='center' label="发放机构">
            <template slot-scope="scope">
              {{getBankType(scope.row.GRANT_ORG)}}
            </template>
          </el-table-column>
          <el-table-column prop="GRANT_DURATION" align='center' label="发放时长(月)"></el-table-column>
          <el-table-column prop="GRANT_MONEY" align='center' label="发放金额(元)"></el-table-column>
          <el-table-column prop="GRANT_TIME" align='center' label="发放时间">
            <template slot-scope="scope">
              {{scope.row.GRANT_TIME | formatDate('yyyy-MM-dd hh:mm')}}
            </template>
          </el-table-column>
          <el-table-column align='center' label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleGetDetails(scope.row)">
                详情
              </el-button>
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
          :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog class="userInfoClass" title="发放详情" :visible.sync="releaseModel">
      <p class="usertitle">
        <span>基本信息</span>
      </p>
      <div class="user-info">
        <p>
          <span>义务兵姓名：</span>
          <span>{{user_data.CSMAN_NAME}}</span>
        </p>
        <p>
          <span>领取人姓名：</span>
          <span>{{user_data.RECEIPTOR_NAME}}</span>
        </p>
        <p>
          <span>联系电话：</span>
          <span>{{user_data.RECEIPTOR_PHONE}}</span>
        </p>
        <p>
          <span>领取人身份证：</span>
          <span>{{user_data.RECEIPTOR_IDCARD}}</span>
        </p>
      </div>
      <p class="usertitle">
        <span>补助信息</span>
      </p>
      <div class="user-info">
        <p>
          <span>优抚类别：</span>
          <span class="spanTypeWidth">{{getTypeSoldier(user_data.PREFERENTIAL_TREATMENT_TYPE)}}</span>
          <span class="spanTypeWidth">{{getEduType(user_data.EDUCATION)}}</span>
          <span class="spanTypeWidth">{{getYfType(user_data.ARMS_TYPE)}}</span>
        </p>
        <p>
          <span>补助账号：</span>
          <span class="spanTypeWidth spanWidth">{{user_data.ACCOUNT}}</span>
        </p>
        <p>
          <span>补助标准：</span>
          <span class="spanTypeWidth spanWidth">{{user_data.STANDARD_AMOUNT}}</span>
          元/月
        </p>
        <p>
          <span>补助时长：</span>
          <span class="spanTypeWidth spanWidth">{{user_data.SUBSIDY_DURATION}}</span>
          月
        </p>
        <p v-if="user_data.ARMS_TYPE === 2">
          <span>高原补助：</span>
          <span class="spanTypeWidth spanWidth">{{user_data.PLATEAU_SUBSIDY}}</span>
          元
        </p>
        <p>
          <span>补助总额：</span>
          <span class="spanTypeWidth spanWidth">{{user_data.totalMoney}}</span>
          元
        </p>
      </div>
      <p class="usertitle">
        <span>发放信息</span>
      </p>
      <div class="user-info">
         <p>
          <span>发放机构：</span>
          <span class="spanTypeWidth spanWidth">{{getBankType(user_data.GRANT_ORG)}}</span>
        </p>
        <p>
          <span>发放月份：</span>
          <span class="spanTypeWidth">{{user_data.START_DATE | formatDate('yyyy年MM月')}}</span>
          <span class="spanTypeWidth">{{user_data.END_DATE | formatDate('yyyy年MM月')}}</span>
        </p>
        <p>
          <span>增发金额：</span>
          <el-input
            size="small"
            style="width: 350px;margin-right:15px;"
            v-model="user_data.ADDITIONAL_MONEY"
            readonly
          ></el-input>
        </p>
        <p>
          <span>增发原因：</span>
          <el-input
            size="small"
            type="textarea"
            style="width: 350px;margin-right:15px;"
            v-model="user_data.ADDITONAL_REASON"
            readonly
          ></el-input>
        </p>
        <p>
          <span>发放总额：</span>
          <span class="spanTypeWidth spanWidth">{{user_data.SUBSIDY_MONEY}}</span>
          元
        </p>
        <p>
          <span>发放时间：</span>
          <span>{{user_data.GRANT_TIME | formatDate('yyyy-MM-dd hh:mm')}}</span>
        </p>
      </div>
      <p style="text-align:right;">
        <el-button type="primary" size="small" @click.stop="releaseModel = false">取消</el-button>
        <el-button type="primary" size="small" @click.stop="releaseModel = false">确定</el-button>
      </p>
    </el-dialog>
  </div>
</template>

<script>
  import tTitle from "@/components/tTitle";
  import {mapGetters, mutations, mapMutations} from "vuex";

  export default {
    components: {
      tTitle
    },
    data() {
      return {
        dialogVisible: false,
        releaseModel: false,
        user_data: {
          CSMAN_NAME: "", // 义务兵姓名
          RECEIPTOR_NAME: "", // 领取人姓名
          RECEIPTOR_IDCARD: "", // 领取人身份证
          RECEIPTOR_PHONE: "", // 联系电话
          PREFERENTIAL_TYPE: 1, // 优抚类别
          ACCOUNT: "", // 银行卡号
          SUBSIDY_DURATION: 0, // 补助时长
          // todo : 这里做个标记,以后计算
          totalMoney:"", // 补助总额
          STANDARD_AMOUNT: 0, // 标准金额
          ADDITIONAL_MONEY: 0, // 增发金额
          PLATEAU_SUBSIDY: 0, // 如果是高原兵的话。
          GRANT_MONEY: 0, // 发放金额(总额)
          GRANT_ORG: "", // 发放机构
          GRANT_TIME: 0, // 发放时间
          END_DATE: ``, // 发放结束时间
          START_DATE: ``, // 发放开始时间
          GRANT_DURATION: 0, // 发放时长
          SUBSIDY_MONEY: 0,
          CSMAN_IDCARD: "",
          ID: ""
        },
        tableData: [],
        loading: true,
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
      check_desc() {
        // this.dialogVisible = true;
        this.releaseModel = true
      },
      init(pageSize, pageNo) {
        this.loading = true;
        this.$post(
          `yfcsmanGrant/yfGrantList/${this.user_info.phone}`,
          {
            current: pageNo, //当前页
            size: pageSize
          },
          "json"
        ).then(res => {
          this.tableData = res.data.records;
          this.total = res.data.total;
          this.loading = false;
        })
          .catch(err => {
            console.log(err);
            this.loading = false;
          });
      },
      handleGetDetails(e) {
        // this.$post(

        //   `yfcsmanGrant/yfGrant`,
        //   {
        //     id: e.ID
        //   },
        //   "json"
        // ).then(res => {
        //   console.log(`getDetails----------------`);
        //   console.log(res);
        // });
        // console.log(e)
        this.user_data = e
        if (typeof(e.PLATEAU_SUBSIDY) === "undefined") {
          this.user_data.totalMoney = e.SUBSIDY_DURATION * e.STANDARD_AMOUNT
        } else {
          this.user_data.totalMoney = e.SUBSIDY_DURATION * e.STANDARD_AMOUNT + (e.PLATEAU_SUBSIDY - 0)
        }
        this.user_data.SUBSIDY_MONEY = e.GRANT_DURATION * e.STANDARD_AMOUNT + e.ADDITIONAL_MONEY
        this.releaseModel = true
        // this.dialogVisible = true;
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
      getTypeSoldier(yfType) {
        let yfTypeStr = ``
        if (!this.dict.yfType) return;
        this.dict.yfType.filter(f => {
          if (yfType === f.value) {
            yfTypeStr = f.label
          }
        })
        return `${yfTypeStr}`
      },
      getEduType(education) {
        let eduStr = ``
        if (!this.dict.education) return;
        this.dict.education.filter(f => {
          if (education === f.value) {
            eduStr = f.label
          }
        })
        return `${eduStr}`
      },
      getBankType(bankType) {
        let str = ``
        if (!this.dict.bank) return;
        this.dict.bank.filter(f => {
          if (bankType === f.value) {
            str = f.label
          }
        })
        return str
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
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

  .el-dialog__wrapper, .userInfoClass {
    > .el-dialog {
      > .el-dialog__body {
        /*padding: 0 20px 10px;*/
        padding: 0 20px 30px 20px !important;

        > .usertitle {
          position: relative;

          &:before {
            height: 16px;
            width: 4px;
            background-color: #39aaf2;
            display: inline-block;
            position: absolute;
            left: 0px;
            top: 2px;
            border-radius: 6px;
            content: "";
          }

          > span {
            margin-left: 10px;
          }
        }

        > .user-info {
          padding: 0 20px;

          .spanTypeWidth {
            display: inline-block;
            border: 1px solid #dcdfe6;
            outline: 0;
            padding: 0 15px;
            color: #606266;
            border-radius: 4px;
            height: 32px;
            line-height: 32px;
            width: 125px;
          }

          .spanWidth {
            width: 350px;
          }
        }
      }
    }
  }
</style>

