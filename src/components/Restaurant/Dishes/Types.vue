<template>
	<div　id="Types">
		<p>全部品类</p>

		<el-row id="Menubar">
		  <el-col :span="24" >
		  	<div class="grid-content bg-purple-light">
		  		<el-button type="text"><i class="el-icon-circle-plus-outline">新建</i></el-button>
				<el-button type="text"><i class="el-icon-edit-outline">修改</i></el-button>
				<el-button type="text"><i class="el-icon-delete">删除</i></el-button>					  		
		  	</div>
		  </el-col>
		</el-row>

		<div id="TypesList">
			<el-collapse v-for="category in CategoriesArray">
				<el-collapse-item>
					<template slot="title">
				    	{{ category.name }}　<i>共 {{ category.quantity }} 项</i>
				    </template>
				    <div></div>
				</el-collapse-item>
			</el-collapse>
		</div>
	</div>
</template>


<script type="text/javascript">
	export default {
		data: function() {
			return {
				CategoriesArray: [
					{
						name: "小吃 snack",
						quantity: 10
					},

					{
						name: "饮料 Drink",
						quantity: 19
					},

					{
						name: "甜品　dessert",
						quantity: 10
					},

					{
						name: "火锅 HotPot",
						quantity: 35
					},

					{
						name: "饮料 Drink",
						quantity: 19
					},

					{
						name: "火锅 HotPot",
						quantity: 35
					},
					{
						name: "小吃 snack",
						quantity: 10
					},

					{
						name: "饮料 Drink",
						quantity: 19
					},

					{
						name: "火锅 HotPot",
						quantity: 35
					}
				]
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