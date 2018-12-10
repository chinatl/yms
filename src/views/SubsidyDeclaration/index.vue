<template>
  <div>
    <div class="box-item">
      <t-title>义务兵信息</t-title>
      <div class="box-item-form">
        <el-form :inline="true" :model="formInline" label-width="160px" :rules="formInlineRules" ref="formInline">
          <el-form-item label="义务兵姓名：" prop="csmanName">
            <el-input v-model.trim="formInline.csmanName" placeholder="请输入义务兵姓名" size="medium"
                      maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="义务兵身份证：" prop="csmanIdcard">
            <el-input v-model.trim="formInline.csmanIdcard" placeholder="请输入义务兵身份证" size="medium"
                      maxlength="18"></el-input>
          </el-form-item>
          <el-form-item label="义务兵通知书号：" prop="csmanNoticeNo">
            <el-input v-model.trim="formInline.csmanNoticeNo" placeholder="请输入义务兵通知书号" size="medium"
                      maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="义务兵所在学校：" prop="csmanSchool">
            <el-input v-model.trim="formInline.csmanSchool" placeholder="请输入义务兵所在学校" size="medium"
                      maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="义务兵学历：" prop="csmanEducation">
            <el-select v-model="formInline.csmanEducation" placeholder="请选择义务兵学历" size="medium"
                       style="width:202px">
              <el-option v-for="item in dict_edu" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="义务兵所在归属地：" prop="province">
            <el-select v-model="formInline.province" filterable placeholder="请选择省份" size="medium"
                       @change="select_city_options" style="width:202px">
              <el-option v-for="item in province_options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="city" ref="city">
            <el-select v-model="formInline.city" filterable placeholder="请选择地市  " size="medium"
                       @change="select_county_options" style="width:202px">
              <el-option v-for="item in city_options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="county" ref="county">
            <el-select v-model="formInline.county" filterable placeholder="请选择区县" size="medium" @change="select_address"
                       style="width:202px">
              <el-option v-for="item in county_options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="addressDetail" ref="addressDetail">
            <el-input v-model.trim="formInline.addressDetail" placeholder="请输入更详细的街道地址" size="medium"
                      maxlength="50"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="box-item">
      <t-title>领取人信息</t-title>
      <div class="box-item-form">
        <el-form :inline="true" :model="user_form" label-width="160px" :rules="user_form_rules" ref="user_form">
          <el-form-item label="领取人姓名：" prop="receiptorName">
            <el-input v-model.trim="user_form.receiptorName" placeholder="请输入领取人姓名" size="medium"
                      maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="领取人身份证：" prop="receiptorIdcard">
            <el-input v-model.trim="user_form.receiptorIdcard" placeholder="请输入领取人身份证" size="medium"
                      maxlength="18"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：" prop="receiptorPhone">
            <el-input v-model.trim="user_form.receiptorPhone" placeholder="请输入联系电话" size="medium"
                      maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="银行卡号：" prop="account">
            <el-input v-model.trim="user_form.account" placeholder="请输入银行卡号" size="medium"
                      maxlength="20"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="box-item">
      <t-title>附件资料</t-title>
      <div class="box-item-form">
        <upload-file bgc='身份证正' info='点击拍摄身份证正面' title="上传领取人身份证正面照片" :data='idcardFrontPhotoId' @upload='upload1'
                     @remove='idcardFrontPhotoId.src = ""'></upload-file>
        <upload-file bgc='身份证反' info='点击拍摄身份证反面' title="上传领取人身份证反面照片" :data='idcardBackPhotoId' @upload='upload2'
                     @remove='idcardBackPhotoId.src = ""'></upload-file>
        <upload-file bgc='银行卡' info='点击拍摄银行卡' title="上传银行卡照片" :data='receiptorBankPhotoId' @upload='upload6'
                     @remove='receiptorBankPhotoId.src = ""'></upload-file>
        <upload-file bgc='通知书例' info='点击拍摄义务兵入伍通知书' title="上传义务兵入伍通知书照片" :data='csmanNoticePhotoId' @upload='upload4'
                     @remove='csmanNoticePhotoId.src = ""'></upload-file>
        <upload-file bgc='户口本' info='点击拍摄义务兵户口本' title="上传义务兵户口本照片" :data='csmanHukouPhotoId' @upload='upload5'
                     @remove='csmanHukouPhotoId.src = ""'></upload-file>
        <upload-file bgc='人物照片' info='点击拍摄办理人照片' title="上传办理人照片" :data='transactorPhotoId' @upload='upload3'
                     @remove='transactorPhotoId.src = ""'></upload-file>
      </div>
    </div>
    <div style="text-align: right;">
      <el-button type="danger" @click.stop="back" v-show="isEdit">取消</el-button>
      <el-button type="primary" @click="onSubmit">申报</el-button>
    </div>
  </div>
</template>
<script>
  import tTitle from "@/components/tTitle";
  import uploadFile from "@/components/uploadFile";
  import region from "@/assets/region";
  import {validateIdCard, validatePhone} from "@/utils/validate";
  import {mapGetters} from "vuex";

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
          if(/^\d*$/.test(value)) {
            callback();
          } else {
            callback(new Error('请输入正确格式'))
          }
        }
      };
      return {
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
          csmanIdcard: [{trigger: "blur", validator: checkIdCard}],
          csmanName: [{trigger: "blur", validator: checkCsmanName}],
          csmanNoticeNo: [{trigger: "blur", validator: checkCsmanNoticeNo}],
          csmanSchool: [{trigger: "blur", validator: checkCsmanSchool}],
          csmanEducation: [{trigger: "change", validator: checkCsmanEducation}],
          province: [{trigger: "change", validator: checkProvince}],
          city: [{trigger: "change", validator: checkCity}],
          county: [{trigger: "change", validator: checkCounty}],
          addressDetail: [{trigger: "blur", validator: checkAddressDetail}]
        },
        user_form: {
          receiptorName: "",
          receiptorIdcard: "",
          receiptorPhone: "",
          account: ""
        },
        user_form_rules: {
          receiptorName: [{trigger: "blur", validator: checkReceiptorName}],
          receiptorIdcard: [{trigger: "blur", validator: checkReceiptorIdcard}],
          receiptorPhone: [{trigger: "blur", validator: checkReceiptorPhone}],
          account: [
            {trigger: "blur", validator: checkAccount},
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
        }, // 银行卡照片
        isEdit: false, // 是否是从我的申报编辑来的。而不是直接跳转
        id: ``,
        userId: ``
      };
    },
    computed: {
      ...mapGetters([`applyInfo`, `dict_edu`, `user_info`])
    },
    watch: {
      // 'user_form.account': function (val) {
      //   this.user_form.account = val - 0
      // }
    },
    created() {
      var list = region["100000"];
      for (let key in list) {
        this.province_options.push({
          value: key,
          label: list[key]
        });
      }
      if (this.$route.query.hasOwnProperty("temp")) {
        this.getUserApplyInfo(this.applyInfo.csmanNoticeNo);
        this.isEdit = true
      }
    },
    methods: {
      upload1(e) {
        this.idcardFrontPhotoId.src = e.fullAttaPath;
        this.idcardFrontPhotoId.id = e.fileId;
      },
      upload2(e) {
        this.idcardBackPhotoId.src = e.fullAttaPath;
        this.idcardBackPhotoId.id = e.fileId;
      },
      upload3(e) {
        this.transactorPhotoId.src = e.fullAttaPath;
        this.transactorPhotoId.id = e.fileId;
      },
      upload4(e) {
        this.csmanNoticePhotoId.src = e.fullAttaPath;
        this.csmanNoticePhotoId.id = e.fileId;
      },
      upload5(e) {
        this.csmanHukouPhotoId.src = e.fullAttaPath;
        this.csmanHukouPhotoId.id = e.fileId;
      },
      upload6(e) {
        this.receiptorBankPhotoId.src = e.fullAttaPath;
        this.receiptorBankPhotoId.id = e.fileId;
      },
      back() {
        this.$router.go(-1)
      },
      onSubmit() {
        this.$refs.formInline.validate(res => {
          this.$refs.user_form.validate(response => {
            if (!res || !response) return;
            if (!this.idcardFrontPhotoId.src) {
              this.$message({
                type: "warning",
                message: "请上传身份证正面照片"
              });
              return;
            }
            if (!this.idcardBackPhotoId.src) {
              this.$message({
                type: "warning",
                message: "请上传身份证反面照片"
              });
              return;
            }
            if (!this.receiptorBankPhotoId.src) {
              this.$message({
                type: "warning",
                message: "请上传银行卡照片"
              });
              return;
            }
            if (!this.csmanNoticePhotoId.src) {
              this.$message({
                type: "warning",
                message: "请上传义务兵入伍通知书照片"
              });
              return;
            }
            if (!this.csmanHukouPhotoId.src) {
              this.$message({
                type: "warning",
                message: "请上传义务兵户口本照片"
              });
              return;
            }
            let option = {
              ...this.formInline,
              ...this.user_form,
              idcardFrontPhotoId: this.idcardFrontPhotoId.id,
              idcardBackPhotoId: this.idcardBackPhotoId.id,
              transactorPhotoId: this.transactorPhotoId.id,
              csmanNoticePhotoId: this.csmanNoticePhotoId.id,
              csmanHukouPhotoId: this.csmanHukouPhotoId.id,
              receiptorBankPhotoId: this.receiptorBankPhotoId.id
            };
            if (this.$route.query.hasOwnProperty("temp")) {
              option.id = this.id;
              option.userId = this.userId;
              this.$post(`yfcsman/UpdateYFCsman`, option, "json").then(res => {
                if (res.code === 0) {
                  this.$router.push(`/UserDeclaration/index`);
                }
              });
            } else {
              // option.id = this.user_info.id;
              option.userId = this.user_info.id;
              this.$post(`yfcsman/addCsman`, option).then(res => {
                if (res.code === 0) {
                  this.$router.push(`/UserDeclaration/index`);
                }
              });
            }
          });
        });
      },
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
            if (data.idcardFrontPhoto.fileId !== null) {
              this.idcardFrontPhotoId.id =
                data.idcardFrontPhoto && data.idcardFrontPhoto.fileId;
              this.idcardFrontPhotoId.src =
                "/" +
                `${data.idcardFrontPhoto.attaPath}` +
                "/" +
                `${data.idcardFrontPhoto.smallImgName}`;
            }
            if (data.idcardBackPhoto.fileId !== null) {
              this.idcardBackPhotoId.id =
                data.idcardBackPhoto && data.idcardBackPhoto.fileId;
              this.idcardBackPhotoId.src =
                "/" +
                `${data.idcardBackPhoto.attaPath}` +
                "/" +
                `${data.idcardBackPhoto.smallImgName}`;
            }
            if (data.transactorPhoto.fileId !== null) {
              this.transactorPhotoId.id =
                data.transactorPhoto && data.transactorPhoto.fileId;
              this.transactorPhotoId.src =
                "/" +
                `${data.transactorPhoto.attaPath}` +
                "/" +
                `${data.transactorPhoto.smallImgName}`;
            }
            if (data.csmanNoticePhoto.fileId !== null) {
              this.csmanNoticePhotoId.id =
                data.csmanNoticePhoto && data.csmanNoticePhoto.fileId;
              this.csmanNoticePhotoId.src =
                "/" +
                `${data.csmanNoticePhoto.attaPath}` +
                "/" +
                `${data.csmanNoticePhoto.smallImgName}`;
            }
            if (data.csmanHukouPhoto.fileId !== null) {
              this.csmanHukouPhotoId.id =
                data.csmanHukouPhoto && data.csmanHukouPhoto.fileId;
              this.csmanHukouPhotoId.src =
                "/" +
                `${data.csmanHukouPhoto.attaPath}` +
                "/" +
                `${data.csmanHukouPhoto.smallImgName}`;
            }
            // todo
            if (data.receiptorBankPhoto.fileId !== null) {
              this.receiptorBankPhotoId.id =
                data.receiptorBankPhoto && data.receiptorBankPhoto.fileId;
              this.receiptorBankPhotoId.src =
                "/" +
                `${data.receiptorBankPhoto.attaPath}` +
                "/" +
                `${data.receiptorBankPhoto.smallImgName}`;
            }
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

