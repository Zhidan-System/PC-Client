<template>
	<div　id="Types">
		<p>全部品类</p>

		<el-row id="Menubar">
		  <el-col :span="24" >
		  	<div class="grid-content bg-purple-light">
		  		<el-button type="text" @click="createType"><i class="el-icon-circle-plus-outline">新建</i></el-button>
				<el-button type="text" @click="updateType"><i class="el-icon-edit-outline">修改</i></el-button>
				<el-button type="text"><i class="el-icon-delete">删除</i></el-button>					  		
		  	</div>
		  </el-col>
		</el-row>

		<div id="TypesList">
			<el-collapse v-for="(category, index) in CategoriesArray" :key="category.category_id" :index="index">
				<el-collapse-item>
					<template slot="title">
				    	{{ category.category_name }}　
				    	<i>共 {{ category.dishes.length }} 项</i>
				    </template>
				    <div></div>
				</el-collapse-item>
			</el-collapse>
		</div>
	</div>
</template>


<script type="text/javascript">
	var axios = require('axios');
	
	export default {
		data: function() {
			return {
				CategoriesArray: []
			}
		},

		mounted () {
			axios.get('/api/v1/menu').then(response => {console.log(response.data.data); this.CategoriesArray = response.data.data});
		},

		methods: {
			loadCategories() {
				axios.get('/api/v1/menu').then(response => {this.CategoriesArray = response.data.data});
			},

			updateType() {
				this.loadCategories();
			},

	      	createType() {
	      		var that = this;
		        that.$prompt('请输入品类名称', '创建品类', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		        	inputPattern: /.+/,
		          	inputErrorMessage: '品类名称格式不正确'
		        })
		        .then(({ value }) => {

		          	axios.post('/api/v1/menu/category', {
		          		category_name: value
		          	})
		          	.then((response) => {
		          		that.$message({
			            	type: 'success',
			            	message: response.data.msg
			          	});

			        	console.log(response);
			        	
			        	that.loadCategories();
		          	})
		          	.catch((error) => {
		          		that.$message({
			            	type: 'error',
			            	message: error.response.data.errmsg
			          	});
			        	
				    	console.log(error.response);
				  	});

		        })
		        .catch(() => {});
	      	}
    	}
	}
</script>




<style type="text/css">
	#Types {
		/*margin: 15px 6px;*/
		border: 1px solid, #BFBFBF;
		box-shadow: 0px 0px 5px #888888;
		background-color: white;
		height: 100%;
	}

	p {
		text-align: left;
		padding: 10px;
		font-size: 20px;
		font-weight: normal;
		margin: 0;
	}

	.grid-content {
    	display:flex;
    	justify-content: left;
    	align-items: center;

	    border-radius: 8px;
	    min-height: 36px;
	    margin: 10px;
	    padding: 0 10px;
	}

	i {
		margin: 0 10px;
	}

	.bg-purple-light {
	    background: #e5e9f2;
	}

	#TypesList {
		margin: 15px 10px;
		border: 1px solid grey;
		box-shadow: 0px 0px 5px #888888;
		background-color: white;
	}


</style>