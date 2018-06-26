<template>
	<div　id="Types">
		<p>全部品类</p>

		<el-row id="Menubar">
		  <el-col :span="24" >
		  	<div class="grid-content bg-purple-light">
		  		<el-button type="text" @click="createType"> <i class="el-icon-circle-plus-outline"> 新建</i></el-button>
				<!-- <el-button type="text"><i class="el-icon-edit-outline">修改</i></el-button>
				<el-button type="text"><i class="el-icon-delete">删除</i></el-button> -->					  		
		  	</div>
		  </el-col>
		</el-row>

		<div id="TypesList">

 			<el-card :body-style="{ margin: '0', padding: '0' }" v-for="(category, index) in CategoriesArray" :key="category.category_id" :index="index" shadow="hover">
 				<div style="width:170px; height:160px;">					
		      		<img :src="category.dishes.length > 0 ? category.dishes[0].image_url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKwmAWWCWg4IMz3M8QrzamqQvoBrF5YPV80eExjEfkL1YKH8W9'" class="image" width="100%" height="100%">
 				</div>
		      	

		      	<div style="padding: 3px;">
		        	<span>{{ category.category_name }}</span>
			        <div class="typeBottom">
			          	<i>共 {{ category.dishes.length }} 项</i>
			          	<el-button type="text" @click="updateType(category.category_id)"><i class="el-icon-edit"></i></el-button>
			          	<el-button type="text" @click="deleteType(category.category_id)"><i class="el-icon-delete"></i></el-button>

			        </div>
		      	</div>

		    </el-card>

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

			checkWhetherCategoryRepeat(value) {
				var isValueValid = true;
	        	
	        	for (var item of this.CategoriesArray) {
	        		if (item.category_name == value) {
	        			this.$message({
			            	type: 'error',
			            	message: '该品类已创建'
			          	});
			          	isValueValid = false;
			          	break;
	        		}
	        	}
	        	return isValueValid;
			},

			updateType(category_id) {
				var that = this;
		        that.$prompt('请输入新的品类名称', '修改品类', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		        	inputPattern: /.+/,
		          	inputErrorMessage: '品类名称格式不正确'
		        })
		        .then(({ value }) => {
		        	// check whether 'value' is in CategoriesArray already
		        	var isValueValid = this.checkWhetherCategoryRepeat(value);
		        	

		        	if (isValueValid) {

			          	axios.put('/api/v1/menu/category', {
			          		category_id: category_id,
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
		        	}

		        })
		        .catch(() => {});

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
		        	// check whether 'value' is in CategoriesArray already
		        	var isValueValid = this.checkWhetherCategoryRepeat(value);
		        	

		        	if (isValueValid) {

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
		        	}

		        })
		        .catch(() => {});
	      	},

	      	deleteType(category_id) {
	      		var that = this;

	      		this.$confirm('是否删除该品类?', '提示', {
          			confirmButtonText: '确定',
          			cancelButtonText: '取消',
          			type: 'warning'
        		}).then(() => {
        			axios.delete('/api/v1/menu/category', {
			          	data: {category_id: category_id}
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

        		}).catch(() => {
          			this.$message({
            			type: 'info',
            			message: '已取消删除'
          			});          
        		});
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

	#Menubar .el-button {
      font-size: 15px;
      width: auto;
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
		/*border: 1px solid, #BFBFBF;
		box-shadow: 0px 0px 2px #888888;*/
		background-color: white;

		display: flex;
		flex-flow: row wrap;
		align-content: space-around;
	}

	.typeBottom {
		font-size: 13px;
    	color: #999;
	}

	.typeBottom .el-button {
		color: #111;
		margin: 0;
		padding: 0;
	}

	.typeBottom .el-button i {
		margin: 2px;
	}

	div.el-card.is-hover-shadow {
		margin: 6px;
	}


</style>

