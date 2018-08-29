<template>
  <div class="method">
    <el-button
      type="primary"
      icon="el-icon-circle-plus-outline"
      @click="addDialog()">新增</el-button>
    <el-dialog
      title="新增"
      :visible.sync="addDialogVisible"
      width="400px">
      <el-form ref="addForm" :model="addForm" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="标准号" prop="standard">
          <el-input v-model="addForm.standard"></el-input>
        </el-form-item>
        <el-form-item label="版本" prop="version">
          <el-input v-model="addForm.version"></el-input>
        </el-form-item>
        <el-form-item label="发布日期" prop="issueDate">
          <el-date-picker
            v-model="addForm.issueDate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="失效日期" prop="expiryDate">
          <el-date-picker
            v-model="addForm.expiryDate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
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
    <el-input
        placeholder="请输入方法名称进行查找"
        v-model="searchValue"
        class="input-with-select"
        @keyup.enter.native="searchData"
        clearable>
        <el-button slot="append" icon="el-icon-search" @click="searchData"></el-button>
    </el-input>
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
        prop="name"
        label="名称"
        width="350"
        header-align=center>
      </el-table-column>
      <el-table-column
        prop="standard"
        label="标准号"
        header-align=center>
      </el-table-column>
      <el-table-column
        prop="issueDate"
        label="发布日期"
        width="100"
        header-align=center>
      </el-table-column>
      <el-table-column
        prop="expiryDate"
        label="失效日期"
        width="100"
        header-align=center>
      </el-table-column>
      <el-table-column
        prop="version"
        label="版本"
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
        <el-form-item label="名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="标准号" prop="standard">
          <el-input v-model="editForm.standard"></el-input>
        </el-form-item>
        <el-form-item label="版本" prop="version">
          <el-input v-model="editForm.version"></el-input>
        </el-form-item>
        <el-form-item label="发布日期" prop="issueDate">
          <el-date-picker
            v-model="editForm.issueDate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="失效日期" prop="expiryDate">
          <el-date-picker
            v-model="editForm.expiryDate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
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
  name: 'method',
  data() {
    return {
      tableData: [],
      tempData: [],
      currentPage: 1,
      pageSize: 15,
      total: 0,
      layout: 'total, prev, pager, next, jumper',
      addForm: {
        name: '',
        standard: '',
        issueDate: '',
        expiryDate: '',
        version: '',
        priority: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入因子名称', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'change' },
        ],
        standard: [
          { min: 0, max: 20, message: '长度在 0 到 20 个字符' },
        ],
        version: [
          { min: 0, max: 255, message: '长度在 0 到 255 个字符' },
        ],
        priority: [
          { required: true, message: '请输入优先级', trigger: 'blur' },
          { type: 'number', message: '优先级必须为数字值' },
        ],
      },
      editForm: {
        name: '',
        standard: '',
        issueDate: '',
        expiryDate: '',
        version: '',
        priority: '',
      },
      editRules: {
        name: [
          { required: true, message: '请输入因子名称', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'change' },
        ],
        standard: [
          { min: 0, max: 20, message: '长度在 0 到 20 个字符' },
        ],
        version: [
          { min: 0, max: 255, message: '长度在 0 到 255 个字符' },
        ],
        priority: [
          { required: true, message: '请输入优先级', trigger: 'blur' },
          { type: 'number', message: '优先级必须为数字值' },
        ],
      },
      searchValue: '',
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
      this.layout = 'total, prev, pager, next, jumper';
      this.$http.get('/api/method',
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
      this.pageSize = data.per_page;
      this.total = data.total;
      for (let i = 0; i < data.data.length; i += 1) {
        let currentData = [];
        currentData = data.data[i];
        this.tableData.push({
          key: currentData.id,
          name: currentData.title,
          standard: currentData.sn,
          issueDate: currentData.issued_at,
          expiryDate: currentData.expire_at,
          version: currentData.version,
          priority: currentData.weight,
        });
      }
    },
    handleCurrentChange(val) { // 更改当前页码
      this.currentPage = val;
      this.getData();
    },
    addDialog() { // 增加方法的弹出框
      this.addDialogVisible = true;
      this.addForm = {
        name: '',
        standard: '',
        issueDate: '',
        expiryDate: '',
        version: '',
        priority: '',
      };
    },
    addItem(formName) { // 新增方法
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/api/method',
            {
              title: this.addForm.name,
              sn: this.addForm.standard,
              issued_at: this.addForm.issueDate,
              expire_at: this.addForm.expiryDate,
              version: this.addForm.version,
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
    editDialog(scope) { // 编辑方法的弹出框
      this.editDialogIndex = scope.row.key;
      this.editDialogVisible = true;
      this.editForm = this.tableData[scope.$index];
    },
    editItem(formName) { // 编辑方法
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.put(`/api/method/${this.editDialogIndex}`,
            {
              title: this.editForm.name,
              sn: this.editForm.standard,
              issued_at: this.editForm.issueDate,
              expire_at: this.editForm.expiryDate,
              version: this.editForm.version,
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
    deleteDialog(index) { // 删除方法的弹出框
      this.deleteDialogIndex = index;
      this.deleteDialogVisible = true;
    },
    deleteItem(index) { // 删除方法
      this.$http.delete(`/api/method/${index}`,
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
          // console.log(error);
          this.$message.error(error.response.data.message);
        });
    },
    searchData() { // 搜索函数
      this.currentPage = 1;
      this.result = [];
      this.tableData = [];
      let returnList = 1;
      if (this.searchValue) {
        this.$http.get('/api/method',
          {
            params: {
              return_list: returnList,
              query: this.searchValue,
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
        this.$http.get('/api/method',
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
            // console.log(response.data.data);
            response.data.data.forEach((element, index) => {
              this.tableData.push({
                key: response.data.data[index].id,
                name: response.data.data[index].title,
                anotherName: response.data.data[index].alias,
                standard: response.data.data[index].sn,
                priority: response.data.data[index].weight,
              });
            });
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
    float: right;
    width: 300px;
}
</style>
