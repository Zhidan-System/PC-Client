<template>
	<div　id="Dishes">
		
		<div id="Head">
			<p>品类选择</p>

		    <el-select v-model="TypeSelected" slot="prepend" placeholder="请选择" @change="loadDishes">
		    	<el-option label="全部" value="all" key="-1"></el-option>
		    	<el-option v-for="(category, index) in CategoriesArray" :label="category.category_name" :key="category.category_id" :value="category.category_id"></el-option>
		    </el-select>

		</div>

		<div id="Bottom">
			<el-container>
				<el-header>
					<router-link to="newDish"><el-button icon="el-icon-circle-plus-outline">新建</el-button></router-link>		  		
			  		<el-button icon="el-icon-arrow-up" @click="move('upward')">上移</el-button>
			  		<el-button icon="el-icon-arrow-down" @click="move('downward')">下移</el-button>
			  		<el-button icon="el-icon-upload2" @click="setTop()">置顶</el-button>
			  		
			  	</el-header>

			 	<el-main>
			 		<el-table　border style="width: 100%" :data="DishesArray" @selection-change="handleSelectionChange">
			 			<el-table-column type="selection" width="55">
    					</el-table-column>

					    <el-table-column label="图片" width="150">
					    	<template slot-scope="scope">
					    		<img :src="scope.row.image_url">
					    	</template>
					    </el-table-column>

					    <el-table-column label="名称" width="150">
					    	<template slot-scope="scope">{{ scope.row.dish_name }}</template>
					    </el-table-column>

					    <el-table-column label="基础价格" width="110" prop="price" sortable>
					    	<!-- <template slot-scope="scope">{{ scope.row.price }}</template> -->
					    </el-table-column>

					    <el-table-column label="口味" width="110">
					    	<template slot-scope="scope">{{ scope.row.flavor }}</template>
					    </el-table-column>

					    <el-table-column label="好评度" width="90" prop="favorable_rate" sortable>
					    	<!-- <template slot-scope="scope">{{ scope.row.favorable_rate }}</template> -->
					    </el-table-column>

					    <el-table-column label="详细描述">
					    	<template slot-scope="scope">{{ scope.row.description }}</template>
					    </el-table-column>

					    <el-table-column label="操作">
					    	<template slot-scope="scope">
								<router-link :to="{path: '/home/updateDish', query: {dish_info: scope.row}}">
									<el-button size="mini">编辑</el-button>	
								</router-link>		  		
						        
						        <el-button size="mini" type="warning">售罄</el-button>
						        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" style="margin: 0">删除</el-button>
						    </template>
					    </el-table-column>
			 		</el-table>
			 	</el-main>
			</el-container>
			
		</div>
	</div>
</template>

<script type="text/javascript">
	var axios = require('axios');

	export default {
		data: function() {
			return {
				TypeSelected: 'all',  // 该类型在CategoriesArray的索引

				multipleSelection: [],  // 选中的行

				CategoriesArray: [],

				DishesArray: []

			}
		},

		mounted () {
			axios.get('/api/v1/menu')
					.then((response) => {
						console.log('in res')
						console.log(response.data.data)		


						this.CategoriesArray = response.data.data;

						var menu = response.data.data;
						for (var type of menu)
			    			this.DishesArray = this.DishesArray.concat(type.dishes);
			    	});
		},

		methods: {
			handleSelectionChange: function(val) {
        		this.multipleSelection = val;
        		console.log("selections: ", this.multipleSelection);
      		},

			setTop: function() {
				console.log(this.multipleSelection);
				if (this.multipleSelection) {
					var top = this.DishesArray.filter(x => this.multipleSelection.indexOf(x) != -1);
					var bottom = this.DishesArray.filter(x => this.multipleSelection.indexOf(x) == -1);
					this.DishesArray = top.concat(bottom);
				}
			},

			move: function(direction) {
				for (var i in this.multipleSelection) {
					var index;
					for (var x in this.DishesArray) {
						if (this.DishesArray[x] == this.multipleSelection[i]) {
							index = x;
							break;
						}	
					}
					console.log(index);

					if (direction.toString() == 'upward') {
						if (index >= 1) {
							this.DishesArray.splice(index - 1, 2, this.DishesArray[index], this.DishesArray[index-1]);
						}
					} else {
						console.log(this.DishesArray[index]);
						console.log(parseInt(index)+1);
						console.log(this.DishesArray[1]);
						if (index < this.DishesArray.length-1) {
							this.DishesArray.splice(index, 2, this.DishesArray[parseInt(index)+1], this.DishesArray[index]);
						}		
					}											
				}

			},

			loadDishes() {

				var that = this;
				axios.get('/api/v1/menu')
					.then((response) => {

			        	var menu = response.data.data;
			        	if (that.TypeSelected == 'all') {
			        		that.DishesArray = [];
			        		for (var type of menu)
			        			that.DishesArray = that.DishesArray.concat(type.dishes);
			        		
			        	} else {
				        	for (var i = 0; i < menu.length; i++) {
				        		if (menu[i].category_id == that.TypeSelected) {
				        			that.DishesArray = menu[i].dishes;
				        			break;
				        		}
				        	}
			        		
			        	}

		          	})
		          	.catch((error) => {
		          		// that.$message({
			           //  	type: 'error',
			           //  	message: error.response.data.errmsg
			          	// });
			        	
				    	console.log(error.response);
				  	});
			},

		    handleDelete(index, row) {
		        var that = this;

		        this.$confirm('是否删除这道菜?', '提示', {
          			confirmButtonText: '确定',
          			cancelButtonText: '取消',
          			type: 'warning'
        		}).then(() => {
        			axios.delete('/api/v1/menu/dish', {
			          	data: {dish_id: row.dish_id}
			        })
			        .then((response) => {
		          		that.$message({
			            	type: 'success',
			            	message: response.data.msg
			          	});

			        	console.log(response);
			        	
			        	that.loadDishes();
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

<style>
	#Dishes {
		/*margin: 15px 6px;*/
		border: 1px solid, #BFBFBF;
		box-shadow: 0px 0px 5px #888888;
		background-color: white;
		min-height: 100%;
		padding: 10px;	
	}

	.el-button {
		margin: 1px;
	}

	#Bottom .el-header .el-button {
		margin: 10px;
	}

	p {
		text-align: left;
		font-size: 20px;
		font-weight: normal;
		margin: 0;
	}

	.el-select {
		display: flex;
		justify-content: left;

		width: 217px;
		padding: 10px 0;
	}

	#Bottom {
		margin: 20px 0;
		border: 1px solid, #BFBFBF;
		box-shadow: 0px 0px 2px #888888;
	}

	.el-header {
	    color: #333;
	    text-align: center;
	    line-height: 60px;
	}
  
  
 	.el-main {
	    background-color: #E9EEF3;
	    color: #333;
	    text-align: center;
	    padding: 0;
	    /*line-height: 160px;*/
  	}

  	.el-table th {
  		background-color: #B3C0D1;
  		text-align: center;
  	}

  	.el-table img {
  		width: 130px;
  		height: 130px;
  	}

  	/*.el-button {
  		margin: 0;
  	}*/
</style>