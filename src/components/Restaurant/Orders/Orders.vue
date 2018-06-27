<template>
	<div id="Orders">

		<ul v-for = "(order, index) in OrdersArray" :key="index">
			<div class="Order">
				<el-row class = "OrderNum">
		  			<el-col :span="24">
		  				<div class="grid-content bg-purple-dark Font_LeftAlign">
		  					<i class="el-icon-tickets Font_Bold "> 单号： {{order.order_id}} </i>
		  				</div>
		  			</el-col>
				</el-row>

				<el-row id="SecondRow">
		  			<el-col :span="6" class = "Font_LeftAlign">
		  				<div class="grid-content bg-purple-dark">
		  					订单状态: {{order.state}}
		  				</div>
		  			</el-col>

		  			<el-col :span="12" class = "Font_LeftAlign">
		  				<div class="grid-content bg-purple-dark">
		  					订单金额： {{order.total_price}}
		  				</div>
		  			</el-col>

		  			<el-col :span="3" class = "Font_LeftAlign">
		  				<div class="grid-content bg-purple-dark">
		  					
		  				</div>
		  			</el-col>

		  			<el-col :span="3" class = "Font_LeftAlign">
		  				<div class="grid-content bg-purple-dark">
		  					
		  				</div>
		  			</el-col>
				</el-row>

				<el-row id="ThirdRow">
		  			<el-col :span="6" class = "Font_LeftAlign">
		  				<div class="grid-content bg-purple-dark">
		  					创建时间： {{order.date}}
		  				</div>
		  			</el-col>

		  			<el-col :span="12" class = "Font_LeftAlign">
		  				<div class="grid-content bg-purple-dark">
		  					是否需要餐具： {{order.tableware}}
		  				</div>
		  			</el-col>

		  			<el-col :span="3" class = "Font_LeftAlign">
		  				<div class="grid-content bg-purple-dark Font_Bold">
		  					
		  				</div>
		  			</el-col>

		  			<el-col :span="3" class = "Font_LeftAlign">
		  				<div class="grid-content bg-purple-dark Font_Bold">
		  					
		  				</div>
		  			</el-col>
				</el-row>

				<el-row class = "GappingLine"></el-row>
			</div>
		</ul>

	</div>
</template>

<script>
var axios = require('axios');

export default {

	data: function() {
		return {

			OrdersArray:[

				{
					OrderId: '111111111111', // 订单单号
					OrderCreater: '由丽丽', // 订单创建人
					OrderNum: '7', // 订单数量
					OrderStatus: '进行中', // 订单状态
					OrderDiscount: '20.01', // 订单优惠金额
					OrderCreateTime: '2017-07-07', // 订单创建时间
					OrderTotalAmount: '￥568.08', // 订单金额
				},

				{
					OrderId: '222222222222',
					OrderCreater: '由丽丽', // 订单创建人
					OrderNum: '7',
					OrderStatus: '进行中',
					OrderDiscount: '20.01',
					OrderCreateTime: '2017-07-07',
					OrderTotalAmount: '￥568.08',
				}

			],

			TestArray:[]
		}


	},

	mounted () {
        axios.get('/api/v1/order', {
        		params: {
        			date: '18-06-27'
        		}
        	})	
        	.then(response => {
        	console.log(response.data.data);
        	this.OrdersArray = response.data.data;
        });
    }, 
}

</script>

<style type="text/css">
#Orders {
	margin-top: 15px;
	margin-left: 6px;
	border: solid;	
	border-color: grey;
	border-width: 1px;
	box-shadow: 0px 0px 5px #888888;
	background-color: white;
}


.Font_Bold {
	font-weight: bold;
	font-size: 25px;
}

.OrderNum {
	margin-left: 50px;
	margin-bottom: 30px;
	margin-top: 40px;
}

.Font_LeftAlign {
	text-align: left;
}

#SecondRow {
	margin-left: 83px;
	margin-bottom: 10px;
}

#ThirdRow {
	margin-left: 83px;
	margin-bottom: 30px;	
}

.GappingLine {
    border: 0;
    height: 1px;
    background: #333;
    background-image: linear-gradient(to right, #ccc, #333, #ccc);
}


</style>