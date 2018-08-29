<template>
  <div class="analysis">
    <div>
      <div class="add">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="addDialog()">新增</el-button>
        <el-dialog
          title="新增"
          :visible.sync="addDialogVisible"
          width="400px">
          <el-form ref="addForm" :model="addForm" :rules="rules" label-width="80px">
            <el-form-item label="因子" prop="factor">
              <!-- <el-input v-model="addForm.factor"></el-input> -->
              <el-autocomplete
                v-model="addForm.factor"
                :fetch-suggestions="querySearchFactor"
                @select="handleFactorSelect"
                style="width: 280px">
              </el-autocomplete>
            </el-form-item>
            <el-form-item label="方法" prop="method">
              <el-autocomplete
                v-model="addForm.method"
                :fetch-suggestions="querySearchMethod"
                @select="handleMethodSelect"
                style="width: 280px">
              </el-autocomplete>
            </el-form-item>
            <el-form-item label="单位" prop="unit">
              <el-select v-model="addForm.unit" multiple placeholder="请选择" style="width: 280px">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="章节" prop="chapter">
              <el-input v-model="addForm.chapter"></el-input>
            </el-form-item>
            <el-form-item label="有效位数" prop="significand">
              <el-input v-model="addForm.significand"></el-input>
            </el-form-item>
            <el-form-item label="精度" prop="decimals">
              <el-input v-model="addForm.decimals"></el-input>
            </el-form-item>
            <el-form-item label="优先级" prop="priority">
              <el-input v-model="addForm.priority"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addItem('addForm')">确 定</el-button>
          </span>
        </el-dialog>
        <el-button type="primary" @click="getData">刷新</el-button>
      </div>
      <div class="search">
        因子
        <el-input
          placeholder="请输入因子名称进行查找"
          v-model="searchFactorValue"
          class="input-with-select"
          @keyup.enter.native="searchData"
          clearable>
        </el-input>
        方法
        <el-input
          placeholder="请输入方法名称进行查找"
          v-model="searchMethodValue"
          class="input-with-select"
          @keyup.enter.native="searchData"
          clearable>
          <el-button slot="append" icon="el-icon-search" @click="searchData"></el-button>
        </el-input>
      </div>
    </div>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :layout="layout"
      :total="total">
    </el-pagination>
    <el-table
      :data="tableData"
      stripe
      style="height: 100%;margin-left: auto; margin-right: auto;text-align: center;"
      height="600">
      <el-table-column
        prop="key"
        label="key"
        header-align=center>
      </el-table-column>
      <el-table-column
        prop="factor"
        label="因子"
        header-align=center>
      </el-table-column>
      <el-table-column
        prop="method"
        label="方法"
        header-align=center>
      </el-table-column>
      <el-table-column
        prop="chapter"
        label="章节"
        width="150"
        header-align=center>
      </el-table-column>
      <el-table-column
        prop="unitString"
        label="单位"
        width="200"
        header-align=center>
      </el-table-column>
      <el-table-column
        prop="significand"
        label="有效位数"
        width="100"
        header-align=center>
      </el-table-column>
      <el-table-column
        prop="decimals"
        label="精度"
        width="100"
        header-align=center>
      </el-table-column>
      <el-table-column
        prop="priority"
        label="优先级"
        width="100"
        header-align=center>
      </el-table-column>
      <el-table-column
        prop="action"
        label="操作"
        header-align=center>
        <template slot-scope="scope">
          <el-button
            type="small"
            icon="el-icon-edit"
            @click="editDialog(scope)">修改</el-button>
          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete"
            @click="deleteDialog(scope.row.key)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="修改"
      :visible.sync="editDialogVisible"
      width="400px">
      <el-form ref="editForm" :model="editForm" :rules="editRules" label-width="80px">
        <el-form-item label="因子" prop="factor">
          <!-- <el-input v-model="addForm.factor"></el-input> -->
          <el-input
            v-model="editForm.factor"
            disabled
            style="width: 280px">
          </el-input>
        </el-form-item>
        <el-form-item label="方法" prop="method">
          <el-input
            v-model="editForm.method"
            disabled
            style="width: 280px">
          </el-input>
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-select v-model="editForm.unit" multiple placeholder="请选择" style="width: 280px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="章节" prop="chapter">
          <el-input v-model="editForm.chapter"></el-input>
        </el-form-item>
        <el-form-item label="有效位数" prop="significand">
          <el-input v-model="editForm.significand"></el-input>
        </el-form-item>
        <el-form-item label="精度" prop="decimals">
          <el-input v-model="editForm.decimals"></el-input>
        </el-form-item>
        <el-form-item label="优先级" prop="priority">
          <el-input v-model="editForm.priority"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editItem('editForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="deleteDialogVisible"
      width="30%">
    <span>此操作将永久删除该条数据，是否继续？</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="deleteDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="deleteItem(deleteDialogIndex)">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'analysis',
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 15,
      total: 0,
      layout: 'total, prev, pager, next, jumper',
      options: [
        {
          value: 'm/s',
          label: 'm/s',
        }, {
          value: 'cm',
          label: 'cm',
        }, {
          value: 'mmol/L',
          label: 'mmol/L',
        }, {
          value: 'mol/L',
          label: 'mol/L',
        }, {
          value: '℃',
          label: '℃',
        }, {
          value: 'KPa',
          label: 'KPa',
        }, {
          value: 'mg/L',
          label: 'mg/L',
        },
      ],
      factorList: [],
      methodList: [],
      addForm: {
        factor: '',
        factorID: '',
        method: '',
        methodID: '',
        unit: [],
        chapter: '',
        significand: '',
        decimals: '',
        priority: '',
      },
      rules: {
        factor: [
          { required: true, message: '请输入因子名称', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'change' },
        ],
        method: [
          { required: true, message: '请输入方法名称', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'change' },
        ],
        chapter: [
          { min: 0, max: 100, message: '长度在 0 到 100 个字符' },
        ],
        significand: [
          { required: true, message: '请输入有效位数', trigger: 'blur' },
          { type: 'number', message: '有效位数必须为数字值' },
        ],
        decimals: [
          { required: true, message: '请输入精度', trigger: 'blur' },
          { type: 'number', message: '精度必须为数字值' },
        ],
        priority: [
          { required: true, message: '请输入优先级', trigger: 'blur' },
          { type: 'number', message: '优先级必须为数字值' },
        ],
      },
      editForm: {
        factor: '',
        factorID: '',
        method: '',
        methodID: '',
        unit: [],
        chapter: '',
        significand: '',
        decimals: '',
        priority: '',
      },
      editRules: {
        factor: [
          { required: true, message: '请输入因子名称', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'change' },
        ],
        method: [
          { required: true, message: '请输入方法名称', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'change' },
        ],
        chapter: [
          { min: 0, max: 100, message: '长度在 0 到 100 个字符' },
        ],
        significand: [
          { required: true, message: '请输入有效位数', trigger: 'blur' },
          { type: 'number', message: '有效位数必须为数字值' },
        ],
        decimals: [
          { required: true, message: '请输入精度', trigger: 'blur' },
          { type: 'number', message: '精度必须为数字值' },
        ],
        priority: [
          { required: true, message: '请输入优先级', trigger: 'blur' },
          { type: 'number', message: '优先级必须为数字值' },
        ],
      },
      searchFactorValue: '',
      searchMethodValue: '',
      addDialogVisible: false,
      editDialogVisible: false,
      editDialogIndex: 0,
      deleteDialogVisible: false,
      deleteDialogIndex: 0,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() { // 获取数据
      this.$http.get('/api/analyse',
        {
          params: {
            page: this.currentPage,
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer${this.$store.state.token}`,
          },
        })
        .then((response) => {
          // console.log(response);
          this.pushData(response.data);
        })
        .catch((error) => {
          // 请求失败页面弹出失败框
          console.log(error);
          this.$message({
            message: '服务器错误!',
            type: 'error',
          });
        });
    },
    pushData(data) { // 数据渲染
      this.tableData.splice(0, this.tableData.length);
      // this.currentPage = data.current_page;
      this.pageSize = data.per_page;
      this.total = data.total;
      // console.log(data.length);
      for (let i = 0; i < data.data.length; i += 1) {
        let currentData = [];
        currentData = data.data[i];
        this.tableData.push({
          key: currentData.id,
          factor: currentData.factor_title,
          factorID: currentData.factor_id,
          method: currentData.method_title,
          methodID: currentData.factor_id,
          chapter: currentData.chapter,
          unit: currentData.uom,
          unitString: this.arrayToString(currentData.uom),
          significand: currentData.significand,
          decimals: currentData.decimals,
          priority: currentData.weight,
        });
      }
    },
    handleCurrentChange(val) { // 更改当前页码
      this.currentPage = val;
      this.getData();
    },
    addDialog() { // 增加弹出框
      this.addDialogVisible = true;
      this.addForm = {
        factor: '',
        factorID: '',
        method: '',
        methodID: '',
        unit: [],
        chapter: '',
        significand: '',
        decimals: '',
        priority: '',
      };
    },
    addItem(formName) { // 新增功能
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/api/analyse',
            {
              // newItem,
              factor_title: this.addForm.factor,
              factor_id: this.addForm.factorID,
              method_title: this.addForm.method,
              method_id: this.addForm.methodID,
              uom: this.addForm.unit,
              chapter: this.addForm.chapter,
              significand: this.addForm.significand,
              decimals: this.addForm.decimals,
              weight: this.addForm.priority,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer${this.$store.state.token}`,
              },
            })
            .then((response) => {
              // console.log(response);
              if (response.data) {
                this.addDialogVisible = false;
                this.$message({
                  message: '添加成功！',
                  type: 'success',
                  duration: 1500,
                });
                this.getData();
              }
            })
            .catch((error) => {
              console.log(error);
              this.$message({
                message: '服务器错误!',
                type: 'error',
              });
            });
        } else {
          console.log('error submit!!');
          return false;
        }
        return false;
      });
    },
    loadAllFactor(data) { // 对因子格式进行处理
      const serier = [];
      if (data) {
        for (let i = 0, l = data.length; i < l; i += 1) {
          // console.log(data[i]);
          serier.push({
            factorID: data[i].id,
            value: data[i].title,
          });
        }
      } else { // 如果没有请求到数据，则显示暂无数据！
        serier.push({ str: '暂无数据' });
      }
      return serier;
    },
    querySearchFactor(queryString, callback) { // 因子搜索建议
      let factorList = [];
      if (queryString) {
        this.$http.get('/api/factor',
          {
            params: {
              return_list: 1,
              query: queryString,
            },
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer${this.$store.state.token}`,
            },
          })
          .then((response) => {
            factorList = this.loadAllFactor(response.data);
            // 调用 callback 返回建议列表的数据
            callback(factorList);
          })
          .catch((error) => {
            console.log(error);
            this.$message({
              message: '服务器错误!',
              type: 'error',
            });
          });
      } else {
        this.$http.get('/api/factor',
          {
            params: {
              page: 1,
            },
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer${this.$store.state.token}`,
            },
          })
          .then((response) => {
            // console.log(response);
            factorList = this.loadAllFactor(response.data.data);
            callback(factorList);
          })
          .catch((error) => {
            console.log(error);
            this.$message({
              message: '服务器错误!',
              type: 'error',
            });
          });
      }
    },
    handleFactorSelect(item) { // 暂存因子ID
      this.addForm.factorID = item.factorID;
    },
    loadAllMethod(data) { // 对方法格式进行处理
      const serier = [];
      if (data) {
        for (let i = 0, l = data.length; i < l; i += 1) {
          serier.push({
            methodID: data[i].id,
            value: data[i].title,
          });
        }
      } else { // 如果没有请求到数据，则显示暂无数据！
        serier.push({ str: '暂无数据' });
      }
      return serier;
    },
    querySearchMethod(queryString, callback) { // 方法搜索建议
      let methodList = [];
      if (queryString) {
        this.$http.get('/api/method',
          {
            params: {
              return_list: 1,
              query: queryString,
            },
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer${this.$store.state.token}`,
            },
          })
          .then((response) => {
            // console.log(response);
            methodList = this.loadAllMethod(response.data);
            callback(methodList);
          })
          .catch((error) => {
            console.log(error);
            this.$message({
              message: '服务器错误!',
              type: 'error',
            });
          });
      } else {
        this.$http.get('/api/method',
          {
            params: {
              page: 1,
            },
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer${this.$store.state.token}`,
            },
          })
          .then((response) => {
            // console.log(response);
            methodList = this.loadAllMethod(response.data.data);
            callback(methodList);
          })
          .catch((error) => {
            console.log(error);
            this.$message({
              message: '服务器错误!',
              type: 'error',
            });
          });
      }
    },
    handleMethodSelect(item) { // 暂存方法ID
      this.addForm.methodID = item.methodID;
    },
    editDialog(scope) { // 编辑弹出框
      this.editDialogIndex = scope.row.key;
      this.editDialogVisible = true;
      this.editForm = this.tableData[scope.$index];
    },
    editItem(formName) { // 编辑功能
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.put(`/api/analyse/${this.editDialogIndex}`,
            {
              factor_title: this.editForm.factor,
              factor_id: this.editForm.factorID,
              method_title: this.editForm.method,
              method_id: this.editForm.methodID,
              uom: this.editForm.unit,
              chapter: this.editForm.chapter,
              significand: this.editForm.significand,
              decimals: this.editForm.decimals,
              weight: this.editForm.priority,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer${this.$store.state.token}`,
              },
            })
            .then((response) => {
              // console.log(response);
              if (response.data) {
                this.editDialogVisible = false;
                this.$message({
                  message: '修改成功！',
                  type: 'success',
                  duration: 1500,
                });
                this.getData();
              }
            })
            .catch((error) => {
              console.log(error);
              this.$message({
                message: '服务器错误!',
                type: 'error',
              });
            });
        } else {
          console.log('error submit!!');
          return false;
        }
        return false;
      });
    },
    deleteDialog(index) { // 删除弹出框
      this.deleteDialogIndex = index;
      this.deleteDialogVisible = true;
    },
    deleteItem(index) { // 删除功能
      this.$http.delete(`/api/analyse/${index}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer${this.$store.state.token}`,
          },
        })
        .then((response) => {
          // console.log(response);
          if (response) {
            this.deleteDialogVisible = false;
            this.$message({
              message: '删除成功！',
              type: 'success',
              duration: 1500,
            });
            this.getData();
          }
        })
        .catch((error) => {
          console.log(error);
          this.$message({
            message: '服务器错误!',
            type: 'error',
          });
        });
    },
    searchData() { // 搜索函数
      this.currentPage = 1;
      this.result = [];
      this.tableData = [];
      let returnList = 1;
      if (this.searchFactorValue || this.searchMethodValue) {
        this.$http.get('/api/analyse',
          {
            params: {
              return_list: returnList,
              factor_title: this.searchFactorValue,
              method_title: this.searchMethodValue,
            },
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer${this.$store.state.token}`,
            },
          })
          .then((response) => {
            // console.log(response.data);
            this.pushData(response);
            this.total = this.tableData.length;
            this.layout = 'total';
            if (this.tableData.length === 0) {
              this.total = 0;
              this.layout = 'total';
              this.$message({
                message: '暂无查询结果',
                type: 'warning',
              });
            }
          })
          .catch((error) => {
            // 请求失败页面弹出失败框
            console.log(error);
            this.$message({
              message: '服务器错误!',
              type: 'error',
            });
          });
      } else {
        returnList = 0;
        this.$http.get('/api/analyse',
          {
            params: {
              return_list: returnList,
            },
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer${this.$store.state.token}`,
            },
          })
          .then((response) => {
            // console.log(response.data);
            this.pushData(response.data);
            this.total = response.data.total;
            this.layout = 'total, prev, pager, next, jumper';
          })
          .catch((error) => {
            // 请求失败页面弹出失败框
            console.log(error);
            this.$message({
              message: '服务器错误!',
              type: 'error',
            });
          });
      }
    },
    arrayToString(arr) { // 将数组转化为字符串
      let string = '';
      if (arr.length > 0) {
        for (let i = 0; i < arr.length; i += 1) {
          string += `${arr[i]},`;
        }
        string = string.substr(0, string.length - 1);
        return string;
      }
      return string;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
.input-with-select {
    /* float: right; */
    width: 300px;
}
.add {
  float: left;
}
.search {
  float: right;
}
.el-pagination {
  padding-top: 42px;
}
</style>
