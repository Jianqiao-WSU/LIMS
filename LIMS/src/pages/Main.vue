<template>
  <el-tabs v-model="activeName" type="border-card">
    <el-tab-pane label="因子" name="first"><Factor/></el-tab-pane>
    <el-tab-pane label="方法" name="second"><Method/></el-tab-pane>
    <el-tab-pane label="分析" name="third"><Analysis/></el-tab-pane>
  </el-tabs>
</template>

<script>
import Factor from '@/components/Factor';
import Method from '@/components/Method';
import Analysis from '@/components/Analysis';

export default {
  name: 'mainPage',
  components: { Factor, Method, Analysis },
  data() {
    return {
      activeName: 'first',
    };
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
