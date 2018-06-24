<template>
	<div class="desks-layout">
		<el-card header="餐桌管理" shadow="never" v-loading="loading">
			<div class="desks-inner">
				<p>餐桌数量</p>
				<el-input-number v-model="number" @change="handleChange" :min="0" :max="100" size="small" label="餐桌数量"></el-input-number>
				<div class="qccode-cont">
					<p>餐桌二维码</p>
					<desk-item v-for="n in number" :key="n" :id="n" :url="getUrl(n)" />
				</div>
			</div>
		</el-card>
	</div>
</template>

<script>
import DeskItem from './components/DeskItem';
import axios from 'axios';

export default {
	data() {
		return {
			loading: true,
			number: 0,
			restaurantId: null,
		}
	},
	mounted() {
		this.fetchData();
	},
	methods: {
		fetchData() {
			axios.get('/api/v1/restaurant')
				.then(({ data: { code, data, msg } }) => {
					if (code != 200) {
						return this.$message.error(`${msg}`);
					}

					this.restaurantId = data.restaurant_id;
					this.number = data.desk_number;

					this.loading = false;
				})
				.catch(err => this.$message.error(err.message));
		},
		handleChange(value) {
			this.loading = true;
			axios.put('/api/v1/restaurant/desk', { desk_number: value }).then(({ data: { code, data, msg } }) => {
				if (code != 200) {
					return this.$message.error(`${msg}`);
				}
				this.number = value;
				this.loading = false;
			});
		},
		getUrl(deskId) {
			return `http://zhidan.site:8080/desk/${deskId}/restaurant/${this.restaurantId}`;
		}
	},
	components: {
		DeskItem,
	}
}
</script>

<style lang="less" scoped>
	.desks-layout {

		.el-card {
			text-align: left;
		}

		.desks-inner {
			// width: 480px;
			margin: 0 auto;
			text-align: left;

			.el-input-number {
				margin-top: 8px;
			}

			.qccode-cont {
				margin-top: 32px;
				padding-top: 4px;
				border-top: 1px solid #ebeef5;
			}
		}
	}

</style>
