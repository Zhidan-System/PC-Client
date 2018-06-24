<template>
	<div class="profile-layout">
		<el-card header="餐厅信息" shadow="never" v-loading="loading">
			<div class="profile-inner">
				<div class="upload-cont">
					<img class="avatar" :src="image_url"/>
					<el-upload
						action="/api/v1/restaurant/detail"
						name="avatar"
						ref="upload"
						:data="this.pkg"
						:file-list="imageList"
						:show-file-list="false"
						:on-success="onImageUploadSuccess"
						:on-error="onImageUploadFailed"
					>
						<el-button size="mini" type="primary">修改图片</el-button>
					</el-upload>
				</div>
				<editable-item label="餐厅名称" :value="name" :onChange="handleChange('restaurant_name')" />
				<editable-item label="餐厅描述" :value="description" :onChange="handleChange('description')" />
				<editable-item label="餐厅电话" :value="number" :onChange="handleChange('restaurant_number')" />
			</div>
		</el-card>
	</div>
</template>


<script>
	import EditableItem from './components/EditableItem';
	import axios from 'axios';
	
	const defaultAvatar = 'img/67e0f875c68feb5d7b4edf99bcf8ed81.png';

	export default {
		data() {
			return {
				loading: true,
				imageList: [],

				image_url: defaultAvatar,
				name: '',
				description: '',
				number: '',
			}
		},
		computed: {
			pkg() {
				return {
					restaurant_name: this.name,
					description: this.description,
					restaurant_number: this.number,
				}
			}
		},
		methods: {
			fetchData() {
				axios.get('/api/v1/restaurant')
					.then(({ data: { code, data, msg } }) => {
						if (code != 200) {
							return this.$message.error(`${msg}`);
						}

						this.image_url = data.image_url || defaultAvatar;
						this.name = data.restaurant_name;
						this.description = data.description;
						this.number = data.restaurant_number;

						this.loading = false;
					})
					.catch(err => this.$message.error(err.message));
			},
			handleChange(key) {
				return (value) => {
					return new Promise((resolve, reject) => {
						axios.post('/api/v1/restaurant/detail', {
							...this.pkg,
							[key]: value,
						})
							.then(({ data: { code, data, msg } }) => {
								if (code != 200) {
									return this.$message.error(`${msg}`);
								}
								this[key] = value;
								resolve();
							})
							.catch(err => this.$message.error(err.message));
					})
				}
			},
			onImageUploadSuccess({ data: { image_url }}) {
				this.image_url = image_url;
			},
			onImageUploadFailed(err) {
				this.$message.error('上传图片失败');
			}
		},
		mounted() {
			this.fetchData();
		},
		components: {
			EditableItem,
		}
	}
</script>

<style lang="less" scoped>

	.profile-layout {

		.el-button {
      font-size: 12px;
      width: auto;
      margin: 0;
    }

		.el-card {
			text-align: left;
		}

		.profile-inner {
			width: 480px;
			margin: 0 auto;
			text-align: center;

			.upload-cont {

				margin-bottom: 24px;

				.avatar {
					width: 120px;
					height: 120px;
					object-fit: cover;
					border-radius: 50%;
					margin-bottom: 8px;
					border: 1px solid #ebeef5;
				}
			}
			.editable-item {
				margin-bottom: 16px;
			}
		}
	}

</style>