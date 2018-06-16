<template>
	<div　id="Dishes">
		
		<div id="Head">
			<p>品类选择</p>

		    <el-select v-model="TypeSelected" slot="prepend" placeholder="请选择" @change="loadDishes">
		      <el-option v-for="(category, index) in CategoriesArray" :label="category.category_name" :key="category.category_id" :value="category.category_id"></el-option>
		    </el-select>

		</div>

		<div id="Bottom">
			<el-container>
				<el-header>
					<router-link to="newDish"><el-button icon="el-icon-circle-plus-outline">新建</el-button></router-link>		  		
			  		<el-button icon="el-icon-edit-outline">修改</el-button>
			  		<el-button icon="el-icon-arrow-up" @click="move('upward')">上移</el-button>
			  		<el-button icon="el-icon-arrow-down" @click="move('downward')">下移</el-button>
			  		<el-button icon="el-icon-upload2" @click="setTop()">置顶</el-button>
			  		<el-button icon="el-icon-document">复制</el-button>
			  		<el-button icon="el-icon-sold-out">售罄</el-button>
			  		<el-button icon="el-icon-delete">删除</el-button>
			  	</el-header>

			 	<el-main>
			 		<el-table　border style="width: 100%" :data="DishesArray" @selection-change="handleSelectionChange">
			 			<el-table-column type="selection" width="55">
    					</el-table-column>

					    <el-table-column label="图片" width="150">
					    	<template slot-scope="scope">
					    		<img :src="scope.row.image">
					    	</template>
					    </el-table-column>

					    <el-table-column label="名称" width="150">
					    	<template slot-scope="scope">{{ scope.row.dish_name }}</template>
					    </el-table-column>

					    <el-table-column label="基础价格" width="120" prop="price" sortable>
					    	<!-- <template slot-scope="scope">{{ scope.row.price }}</template> -->
					    </el-table-column>

					    <el-table-column label="口味" width="150">
					    	<template slot-scope="scope">{{ scope.row.flavor }}</template>
					    </el-table-column>

					    <el-table-column label="好评度" width="150" prop="favorable_rate" sortable>
					    	<!-- <template slot-scope="scope">{{ scope.row.favorable_rate }}</template> -->
					    </el-table-column>

					    <el-table-column label="详细描述">
					    	<template slot-scope="scope">{{ scope.row.description }}</template>
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
				TypeSelected: '',  // 该类型在CategoriesArray的索引

				multipleSelection: [],  // 选中的行

				CategoriesArray: [],

				DishesArray: [
					// {
					// 	image: "https://himg.china.cn/2/3_289_59988_750_750.jpg",
					// 	dish_name: "炸鸡中翅",
					// 	price: 15,
					// 	flavor: "",
					// 	favorable_rate: "94%",
					// 	description: "一份五个"
					// },
					// {
					// 	image: "http://i3.sinaimg.cn/edu/2015/0513/U3649P42DT20150513095955.png",
					// 	dish_name: "炸薯条",
					// 	price: 12,
					// 	flavor: "",
					// 	favorable_rate: "97%",
					// 	description: "一份五个"
					// },
					// {
					// 	image: "https://ali.xinshipu.cn/20140407/original/1396838402494.jpg@300w_225h_90q_1e_1c.jpg",
					// 	dish_name: "青瓜",
					// 	price: 10,
					// 	flavor: "",
					// 	favorable_rate: "80%",
					// 	description: "一份五个"
					// },
					// {
					// 	image: "https://img1.doubanio.com/lpic/s10413937.jpg",
					// 	dish_name: "拔丝土豆",
					// 	price: 25,
					// 	flavor: "",
					// 	favorable_rate: "75%",
					// 	description: "一份五个"
					// }
				]

			}
		},

		mounted () {
			axios.get('/api/v1/menu').then(response => {this.CategoriesArray = response.data.data});
		},

		methods: {
			handleSelectionChange: function(val) {
        		this.multipleSelection = val;
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
			        	for (var i = 0; i < menu.length; i++) {

			        		if (menu[i].category_id == that.TypeSelected) {
			        			that.DishesArray = menu[i].dishes;
			        			break;
			        		}
			        	}
			        	
			        	console.log('here')
			        	console.log(that.DishesArray)
		          	})
	          	.catch((error) => {
	          		// that.$message({
		           //  	type: 'error',
		           //  	message: error.response.data.errmsg
		          	// });
		        	
			    	console.log(error.response);
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