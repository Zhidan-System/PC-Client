<template>
	<div id="Orders">

		<ul v-for = "(order, index) in OrdersArray" :key="index">
			<div class="Order">
				<el-row class = "OrderNum">
		  			<el-col :span="24">
		  				<div class="grid-content bg-purple-dark Font_LeftAlign">
		  					<i class="el-icon-tickets Font_Bold "> 单号： {{order.OrderId}} </i>
		  				</div>
		  			</el-col>
				</el-row>

				<el-row id="SecondRow">
		  			<el-col :span="6" class = "Font_LeftAlign">
		  				<div class="grid-content bg-purple-dark">
		  					创建人： {{order.OrderCreater}}
		  				</div>
		  			</el-col>

		  			<el-col :span="12" class = "Font_LeftAlign">
		  				<div class="grid-content bg-purple-dark">
		  					数量： {{order.OrderNum}}
		  				</div>
		  			</el-col>

		  			<el-col :span="3" class = "Font_LeftAlign">
		  				<div class="grid-content bg-purple-dark">
		  					状态
		  				</div>
		  			</el-col>

		  			<el-col :span="3" class = "Font_LeftAlign">
		  				<div class="grid-content bg-purple-dark">
		  					订单金额
		  				</div>
		  			</el-col>
				</el-row>

				<el-row id="ThirdRow">
		  			<el-col :span="6" class = "Font_LeftAlign">
		  				<div class="grid-content bg-purple-dark">
		  					创建时间： {{order.OrderCreateTime}}
		  				</div>
		  			</el-col>

		  			<el-col :span="12" class = "Font_LeftAlign">
		  				<div class="grid-content bg-purple-dark">
		  					优惠金额： {{order.OrderDiscount}}
		  				</div>
		  			</el-col>

		  			<el-col :span="3" class = "Font_LeftAlign">
		  				<div class="grid-content bg-purple-dark Font_Bold">
		  					{{order.OrderStatus}}
		  				</div>
		  			</el-col>

		  			<el-col :span="3" class = "Font_LeftAlign">
		  				<div class="grid-content bg-purple-dark Font_Bold">
		  					{{order.OrderTotalAmount}}
		  				</div>
		  			</el-col>
				</el-row>

				<el-row class = "GappingLine"></el-row>
			</div>
		</ul>

	</div>
</template>

<script>

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


			]
		}
	}
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