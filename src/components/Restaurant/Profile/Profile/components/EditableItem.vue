
<template>
  <div class="editable-item">
    <div class="text-cont" v-if="!actived">
      <label>{{ label }}</label>
			<el-card shadow="never" :body-style="{
        padding: '6px 12px',
        'border-radius': '4px',
        'text-align': 'left',
        'font-size': '14px',
      }">
				{{ innerValue }}
			</el-card>
      <el-button type="primary" size="small" @click="onEdit">编辑</el-button>
    </div>
    <div class="input-cont" v-else>
      <label>{{ label }}</label>
			<el-input
        ref="input"
				placeholder="请输入内容"
        size="small"
				v-model="innerValue"
				clearable>
			</el-input>
      <div class="btn-group">
        <el-button type="primary" size="small" @click="onSave" :loading="loading">保存</el-button>
        <el-button size="small" @click="onCancel" :disabled="loading">取消</el-button>
      </div>
    </div>
	</div>
</template>

<script>
export default {
  name: 'editable-item',
  props: ['label', 'value', 'onChange'],
  data() {
    return {
      actived: false,
      loading: false,
      innerValue: this.value,
    }
  },
  methods: {
    onEdit() {
      this.actived = true;
      setTimeout(() => {
        this.$refs['input'].focus();
      }, 0);
    },
    onCancel() {
      this.actived = false;
      this.innerValue = this.value;
    },
    onSave() {
      this.loading = true;
      this.onChange(this.innerValue).then(() => {
        this.actived = false;
        this.loading = false;
      });
    }
  },
  watch: {
    value(nextValue) {
      this.innerValue = nextValue;
    }
  },
  
}
</script>

<style lang="less" scoped>
  .editable-item {

    .el-button {
      font-size: 12px;
      width: auto;
      margin: 0;
    }

    label {
      line-height: 32px;
      width: 80px;
      position: absolute;
      left: 0;
      top: 1px;
      font-size: 14px;
      text-align: center;
    }

    .text-cont {
      position: relative;

      .el-card {
        margin-right: 64px;
        margin-left: 80px;
        min-height: 32px;
      }

      .el-button {
        position: absolute;
        right: 0;
        top: 1px;
      }
    }

    .input-cont {
      position: relative;
      text-align: left;

      .el-input {
        margin-right: 124px;
        margin-left: 80px;
        margin-top: 0;
        width: inherit;
        display: block;
        padding: 1px 0;

        input {
          display: flex;
        }
      }

      .btn-group {
        position: absolute;
        right: 0;
        top: 1px;
      }
    }
  }
</style>
