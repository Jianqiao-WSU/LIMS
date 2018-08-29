<template>
  <div class="login">
    <el-form :model="form" ref="form" label-width="80px" style="width: 330px;">
      <el-form-item label="用户名">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-button @click="submit('form')" style="float: right;">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: 'test',
        password: 'test',
      },
    };
  },
  methods: {
    submit() {
      this.$http.post('/api/auth/login', {
        username: this.form.username,
        password: this.form.password,
      })
        .then((response) => {
          // 判断是否登录成功
          console.log(response);
          if (response.statusText === 'OK') {
            this.$store.commit('setToken', response.headers.authorization);
            this.$router.push({
              name: 'Main',
            });
          }
        })
        .catch((error) => {
          // 请求失败页面弹出失败框
          // console.log(error.response);
          this.$message.error(error.response.data[0]);
        });
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
.login {
  width: 100%;
  height: 700px;
  display: flex;
  align-items: center;
}
.el-form {
  margin: 0 auto;
}
.el-input {
  width: 250px;
}
</style>
