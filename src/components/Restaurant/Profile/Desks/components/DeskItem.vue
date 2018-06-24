<template>
  <div class="desk-item">
    <el-card :body-style="{ padding: '0px' }">
      <canvas class="image" ref="canvas"/>
      <div style="padding: 14px;">
        <div class="bottom clearfix">
          <time class="time">桌号 {{id}}</time>
          <!-- <el-button type="text" class="button">保存图片</el-button> -->
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import QRCode from 'qrcode';

export default {
  name: 'desk-item',
  props: ['id', 'url'],
  data() {
    return {

    }
  },
  mounted() {
    QRCode.toCanvas(this.$refs['canvas'], this.url, function (error) {
      if (error) {
        this.$message.error(error);
      }
    });
  }
}
</script>

<style lang="less" scoped>

  .desk-item {
    width: 180px;
    text-align: left;
    display: inline-block;
    margin: 8px;
  }

  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    // margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    margin: 0 auto;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  
  .clearfix:after {
    clear: both
  }
</style>

