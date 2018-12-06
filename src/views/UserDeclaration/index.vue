<template>
  <div>
    <div class="box-item" v-if="listShow">
      <t-title>我的申报</t-title>
      <div class="table-content">
        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
          <el-table-column prop="csmanName" align="center" label="义务兵姓名"></el-table-column>
          <el-table-column prop="receiptorName" align="center" label="领取人姓名"></el-table-column>
          <el-table-column prop="receiptorIdcard" align="center" label="领取人身份证"></el-table-column>
          <el-table-column prop="receiptorPhone" align="center" label="联系电话"></el-table-column>
          <el-table-column prop="status" align="center" label="申报状态">
            <template slot-scope="scope">
              <span
                :style="{
                                color: [3,7].includes(scope.row.status) ? 'red':'green'
                            }"
              >{{getApplyStatus(scope.row.status)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="auditReason" align="center" label="申报意见"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="warning"
                @click="handleEdit(scope.row)"
                v-if="scope.row.status === 3"
              >编辑</el-button>
              <el-button size="mini" type="primary" @click="handleDelete(scope.row)" v-else>查看</el-button>
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
    <div v-else>
      <div class="box-item">
        <t-title class="userInfoTitle">义务兵信息
          <span @click="backList">返回</span>
        </t-title>
        <div class="box-item-form">
          <el-form
            :inline="true"
            :model="formInline"
            label-width="160px"
            :rules="formInlineRules"
            ref="formInline"
          >
            <el-form-item label="义务兵姓名：" prop="csmanName">
              <el-input
                v-model.trim="formInline.csmanName"
                placeholder="请输入义务兵姓名"
                size="medium"
                maxlength="20"
                :readonly="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="义务兵身份证：" prop="csmanIdcard">
              <el-input
                v-model.trim="formInline.csmanIdcard"
                placeholder="请输入义务兵身份证"
                size="medium"
                maxlength="18"
                :readonly="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="义务兵通知书号：" prop="csmanNoticeNo">
              <el-input
                v-model.trim="formInline.csmanNoticeNo"
                placeholder="请输入义务兵通知书号"
                size="medium"
                maxlength="20"
                :readonly="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="义务兵所在学校：" prop="csmanSchool">
              <el-input
                v-model.trim="formInline.csmanSchool"
                placeholder="请输入义务兵所在学校"
                size="medium"
                maxlength="20"
                :readonly="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="义务兵学历：" prop="csmanEducation">
              <el-select
                v-model="formInline.csmanEducation"
                placeholder="请选择义务兵学历"
                size="medium"
                @change="select_city_options"
                :disabled="true"
                style="width:202px"
              >
                <el-option
                  v-for="item in dict_edu"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="义务兵所在归属地：" prop="province">
              <el-select
                v-model="formInline.province"
                filterable
                placeholder="请选择省份"
                size="medium"
                @change="select_city_options"
                :disabled="true"
                style="width:202px"
              >
                <el-option
                  v-for="item in province_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="city" ref="city">
              <el-select
                v-model="formInline.city"
                filterable
                placeholder="请选择地区"
                size="medium"
                :disabled="true"
                @change="select_county_options"
                style="width:202px"
              >
                <el-option
                  v-for="item in city_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="county" ref="county">
              <el-select
                v-model="formInline.county"
                filterable
                placeholder="请选择市县"
                size="medium"
                @change="select_address"
                :disabled="true"
                style="width:202px"
              >
                <el-option
                  v-for="item in county_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="addressDetail" ref="addressDetail">
              <el-input
                v-model.trim="formInline.addressDetail"
                placeholder="请输入更详细的街道地址"
                size="medium"
                maxlength="50"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="box-item">
        <t-title>领取人信息</t-title>
        <div class="box-item-form">
          <el-form
            :inline="true"
            :model="user_form"
            label-width="160px"
            :rules="user_form_rules"
            ref="user_form"
          >
            <el-form-item label="领取人姓名：" prop="receiptorName">
              <el-input
                v-model.trim="user_form.receiptorName"
                placeholder="请输入领取人姓名"
                size="medium"
                maxlength="20"
                :readonly="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="领取人身份证：" prop="receiptorIdcard">
              <el-input
                v-model.trim="user_form.receiptorIdcard"
                placeholder="请输入领取人身份证"
                size="medium"
                maxlength="18"
                :readonly="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系电话：" prop="receiptorPhone">
              <el-input
                v-model.trim="user_form.receiptorPhone"
                placeholder="请输入联系电话"
                size="medium"
                maxlength="20"
                :readonly="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="银行卡号：" prop="account">
              <el-input
                v-model.number.trim="user_form.account"
                placeholder="请输入银行卡号"
                size="medium"
                maxlength="20"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="box-item">
        <t-title>附件资料</t-title>
        <div class="box-item-form">
          <upload-file
            bgc="身份证正"
            info="点击拍摄身份证正面"
            title="上传身份证正面照片"
            :data="idcardFrontPhotoId"
            :isRemove="false"
          ></upload-file>
          <upload-file
            bgc="身份证反"
            info="点击拍摄身份证反面"
            title="上传身份证反面照片"
            :data="idcardBackPhotoId"
            :isRemove="false"
          ></upload-file>
          <upload-file
            bgc="人物照片"
            info="点击拍摄办理人照片"
            title="上传办理人照片"
            :data="transactorPhotoId"
            :isRemove="false"
          ></upload-file>
          <upload-file
            bgc="通知书例"
            info="点击拍摄义务兵入伍通知书"
            title="上传义务兵入伍通知书照片"
            :data="csmanNoticePhotoId"
            :isRemove="false"
          ></upload-file>
          <upload-file
            bgc="人物照片"
            info="点击拍摄义务兵户口本"
            title="上传义务兵户口本照片"
            :data="csmanHukouPhotoId"
            :isRemove="false"
          ></upload-file>
          <upload-file
            bgc="银行卡"
            info="点击拍摄银行卡"
            title="上传银行卡照片"
            :data="receiptorBankPhotoId"
            :isRemove="false"
          ></upload-file>
        </div>
      </div>
    </div>
    <el-dialog class="common-dialog" title="发放详情" :visible.sync="dialogVisible">
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
    <el-dialog class="common-dialog" title="申报详情" :visible.sync="notApplyData">
      <div class="user-info">
        <p>当前暂无任何申报,是否立即申报？</p>
      </div>
      <p style="text-align:right;margin: 20px 0 10px">
        <el-button type="primary" size="small" @click="handleToApply">确定</el-button>
      </p>
    </el-dialog>
  </div>
</template>

<script>
import tTitle from "@/components/tTitle";
import { mapGetters, mutations, mapMutations } from "vuex";
import { validateIdCard, validatePhone } from "@/utils/validate";
import region from "@/assets/region";
import uploadFile from "@/components/uploadFile";
export default {
  components: {
    tTitle,
    uploadFile
  },
  data() {
    //表单验证
    const checkIdCard = (rules, value, callback) => {
      if (!value) {
        callback(new Error("请输入身份证号"));
      } else {
        if (!validateIdCard(value)) {
          callback(new Error("身份证号不合法"));
        } else {
          callback();
        }
      }
    };
    const checkCsmanName = (rules, value, callback) => {
      if (!value) {
        callback(new Error("请输入姓名"));
      } else {
        callback();
      }
    };
    const checkCsmanNoticeNo = (rules, value, callback) => {
      if (!value) {
        callback(new Error("请输入通知书号"));
      } else {
        callback();
      }
    };
    const checkCsmanSchool = (rules, value, callback) => {
      if (!value) {
        callback(new Error("请输入所在学校"));
      } else {
        callback();
      }
    };
    const checkCsmanEducation = (rules, value, callback) => {
      if (!value) {
        callback(new Error("请选择学历"));
      } else {
        callback();
      }
    };
    const checkProvince = (rules, value, callback) => {
      if (!value) {
        callback(new Error("请选择省份"));
      } else {
        callback();
      }
    };
    const checkCity = (rules, value, callback) => {
      if (!value) {
        callback(new Error("请选择地区"));
      } else {
        callback();
      }
    };
    const checkCounty = (rules, value, callback) => {
      if (!value) {
        callback(new Error("请选择市县"));
      } else {
        callback();
      }
    };
    const checkAddressDetail = (rules, value, callback) => {
      if (!value) {
        callback(new Error("请输入街道地址"));
      } else {
        callback();
      }
    };
    const checkReceiptorName = (rules, value, callback) => {
      if (!value) {
        callback(new Error("请输入领取人姓名"));
      } else {
        callback();
      }
    };
    const checkReceiptorIdcard = (rules, value, callback) => {
      if (!value) {
        callback(new Error("请输入领取人身份证号"));
      } else {
        if (!validateIdCard(value)) {
          callback(new Error("身份证号不合法"));
        } else {
          callback();
        }
      }
    };
    const checkReceiptorPhone = (rules, value, callback) => {
      if (!value) {
        callback(new Error("请输入联系电话"));
      } else {
        if (!validatePhone(value)) {
          callback(new Error("电话号不合法"));
        } else {
          callback();
        }
      }
    };
    const checkAccount = (rules, value, callback) => {
      if (!value) {
        callback(new Error("请输入银行卡号"));
      } else {
        callback();
      }
    };
    return {
      tableData: [],
      dialogVisible: false,
      notApplyData: false,
      user_data: {
        receiptorIdcard: "610524196005231256",
        csmanName: "黄宗泽"
      },
      loading: true,
      pageSize: 10,
      pageNo: 1,
      total: 0,
      listShow: true,
      // 查看状态的数据
      edu_options: [],
      province_options: [],
      city_options: [],
      county_options: [],
      options: [],
      formInline: {
        csmanName: "",
        csmanIdcard: "",
        csmanNoticeNo: "",
        csmanSchool: "",
        csmanEducation: "",
        province: "",
        city: "",
        county: "",
        addressDetail: ""
      },
      formInlineRules: {
        csmanIdcard: [{ trigger: "blur", validator: checkIdCard }],
        csmanName: [{ trigger: "blur", validator: checkCsmanName }],
        csmanNoticeNo: [{ trigger: "blur", validator: checkCsmanNoticeNo }],
        csmanSchool: [{ trigger: "blur", validator: checkCsmanSchool }],
        csmanEducation: [{ trigger: "change", validator: checkCsmanEducation }],
        province: [{ trigger: "change", validator: checkProvince }],
        city: [{ trigger: "change", validator: checkCity }],
        county: [{ trigger: "change", validator: checkCounty }],
        addressDetail: [{ trigger: "change", validator: checkAddressDetail }]
      },
      user_form: {
        receiptorName: "",
        receiptorIdcard: "",
        receiptorPhone: "",
        account: ""
      },
      user_form_rules: {
        receiptorName: [{ trigger: "blur", validator: checkReceiptorName }],
        receiptorIdcard: [{ trigger: "blur", validator: checkReceiptorIdcard }],
        receiptorPhone: [{ trigger: "blur", validator: checkReceiptorPhone }],
        account: [
          { trigger: "blur", validator: checkAccount },
          { type: "number", message: "银行卡号必须为数字值" }
        ]
      },
      idcardFrontPhotoId: {
        src: "",
        id: ""
      },
      idcardBackPhotoId: {
        src: "",
        id: ""
      },
      transactorPhotoId: {
        src: "",
        id: ""
      },
      csmanNoticePhotoId: {
        src: "",
        id: ""
      },
      csmanHukouPhotoId: {
        src: "",
        id: ""
      },
      receiptorBankPhotoId: {
        src: "",
        id: ""
      },
      id: ``,
      userId: ``
    };
  },
  computed: {
    ...mapGetters([`user_info`, `dict_edu`])
  },
  async created() {
    await this.init(this.pageSize, this.pageNo);
    var list = region["100000"];
    for (let key in list) {
      this.province_options.push({
        value: key,
        label: list[key]
      });
    }
  },
  methods: {
    ...mapMutations([`SET_USER_APPLY_INFO`]),
    backList() {
      this.listShow = true;
    },
    /**
     * params ==>  status  1 待提交,2待审核,3未通过,4已通过,5待发放,6,发放中,7已停发
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
        case 7:
          str = "已停发";
          break;
        // case 4:
        //   str = "已通过";
        //   break;
        // case 5:
        //   str = "已通过";
        //   break;
        default:
          str = "已通过"
          break;
      }
      return str;
    },
    handleToApply() {
      this.$router.push("/SubsidyDeclaration/index");
    },
    handleDelete(e) {
      this.getUserApplyInfo(e.csmanNoticeNo);
      this.listShow = false;
      // this.dialogVisible = true;
    },
    handleEdit(e) {
      this.SET_USER_APPLY_INFO(e, 1);
      this.$router.push({
        path: "/SubsidyDeclaration/index",
        query: {
          temp: true
        }
      });
    },
    init(pageSize, pageNo) {
      this.loading = true;
      this.$post(`yfcsman/yfCsmanList/${this.user_info.phone}`, {
        current: pageNo, //当前页
        size: pageSize
      })
        .then(res => {
          this.tableData = res.data.records;
          this.total = res.data.total;
          this.loading = false;
          if (this.tableData.length === 0) {
            this.notApplyData = true;
          }
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
    //  修改查看函数
    /**
     * csmanNoticeNo 获取用户详情 义务兵通知书号码
     */
    getUserApplyInfo(csmanNoticeNo) {
      this.$post(`yfcsman/QueryYFCsman/${csmanNoticeNo}`)
        .then(res => {
          const data = res.data;
          this.formInline.csmanName = data.csmanName;
          this.formInline.csmanIdcard = data.csmanIdcard;
          this.formInline.csmanNoticeNo = data.csmanNoticeNo;
          this.formInline.csmanSchool = data.csmanSchool;
          this.formInline.csmanEducation = data.csmanEducation - 0;
          this.formInline.province = data.province;
          this.select_city_options(data.province);
          this.formInline.city = data.city;
          this.select_county_options(data.city);
          this.formInline.county = data.county;
          this.formInline.addressDetail = data.addressDetail;
          this.user_form.receiptorName = data.receiptorName;
          this.user_form.receiptorIdcard = data.receiptorIdcard;
          this.user_form.receiptorPhone = data.receiptorPhone;
          this.user_form.account = data.account - 0;
          this.idcardFrontPhotoId.id =
            data.idcardFrontPhoto && data.idcardFrontPhoto.fileId;
          this.idcardFrontPhotoId.src =
            "/" +
            `${data.idcardFrontPhoto.attaPath}` +
            "/" +
            `${data.idcardFrontPhoto.smallImgName}`;
          this.idcardFrontPhotoId.src = this.idcardFrontPhotoId.src;
          this.idcardBackPhotoId.id =
            data.idcardBackPhoto && data.idcardBackPhoto.fileId;
          this.idcardBackPhotoId.src =
            "/" +
            `${data.idcardBackPhoto.attaPath}` +
            "/" +
            `${data.idcardBackPhoto.smallImgName}`;
          this.transactorPhotoId.id =
            data.transactorPhoto && data.transactorPhoto.fileId;
          this.transactorPhotoId.src =
            "/" +
            `${data.transactorPhoto.attaPath}` +
            "/" +
            `${data.transactorPhoto.smallImgName}`;
          this.csmanNoticePhotoId.id =
            data.csmanNoticePhoto && data.csmanNoticePhoto.fileId;
          this.csmanNoticePhotoId.src =
            "/" +
            `${data.csmanNoticePhoto.attaPath}` +
            "/" +
            `${data.csmanNoticePhoto.smallImgName}`;
          this.csmanHukouPhotoId.id =
            data.csmanHukouPhoto && data.csmanHukouPhoto.fileId;
          this.csmanHukouPhotoId.src =
            "/" +
            `${data.csmanHukouPhoto.attaPath}` +
            "/" +
            `${data.csmanHukouPhoto.smallImgName}`;
          this.receiptorBankPhotoId.id =
            data.receiptorBankPhoto && data.receiptorBankPhoto.fileId;
          this.receiptorBankPhotoId.src =
            "/" +
            `${data.receiptorBankPhoto.attaPath}` +
            "/" +
            `${data.receiptorBankPhoto.smallImgName}`;
          this.userId = data.userId;
          this.id = data.id;
        })
        .catch(res => {
          console.log(res);
        });
    },
    select_city_options(e) {
      if (!e) return;
      this.$refs.city.resetField();
      this.$refs.county.resetField();
      this.$refs.addressDetail.resetField();
      var list = region[e];
      this.city_options = [];
      this.county_options = [];
      for (let key in list) {
        this.city_options.push({
          value: key,
          label: list[key]
        });
      }
    },
    select_county_options(e) {
      if (!e) return;
      this.$refs.county.resetField();
      this.$refs.addressDetail.resetField();
      var list = region[e];
      this.county_options = [];
      for (let key in list) {
        this.county_options.push({
          value: key,
          label: list[key]
        });
      }
    },
    select_address(e) {
      if (!e) return;
      this.$refs.addressDetail.resetField();
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.userInfoTitle {
  display: flex;
  justify-content: space-between;
  > span {
    color: #409eff;
    font-size: 18px;
    cursor: pointer;
  }
}
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
