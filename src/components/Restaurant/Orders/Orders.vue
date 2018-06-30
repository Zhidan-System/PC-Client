<template>
	<div id="Orders">
		<el-row id = "ShowButton">
			<el-button @click = "ChangeOrdersToShow(0)">显示未完成订单</el-button>
			<el-button @click = "ChangeOrdersToShow(1)">显示已完成订单</el-button>
		</el-row>

		<div v-if = "StateOfOrderToShow == -1">
			<el-row id="hint">请选择要显示的订单...</el-row>
		</div>

		<div v-else>
			<div v-if = "OrdersToShow.length == 0" id="NoOrderPage">
				<el-row id="hint">目前没有订单...</el-row>
			</div>

			<div v-else>
				<ul v-for = "(order, index) in OrdersToShow" :key="index">
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
				  				<div v-if="StateOfOrderToShow == 0" class="grid-content bg-purple-dark Font_Bold">
				  					<el-button @click = "FufuilOrder(index)">完成订单</el-button>
				  				</div>
				  			</el-col>

				  			<el-col :span="3" class = "Font_LeftAlign">
				  				<div class="grid-content bg-purple-dark Font_Bold">
				  					
				  				</div>
				  			</el-col>
						</el-row>

						<el-row id = "dishes">
							<p>菜品清单：</p>
							<ul v-for = "(dish, index1) in order.dish_list" :key="index1">
								<el-row>{{index1+1}} . {{dish.dish_name}}</el-row>
							</ul>
						</el-row>


						<el-row class = "GappingLine"></el-row>
					</div>
				</ul>
			</div>
		</div>



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

			FufuiledOrders:[],

			InfufuiledOrders:[],

			OrdersToShow:[],

			StateOfOrderToShow: -1, // 0 —— 显示未完成订单； 1 —— 显示已完成订单
		}


	},

	mounted () {
        this.GetOrders();
        //this.ChangeOrdersToShow(0);
        setInterval(function() {
        	this.GetOrders();
        }.bind(this), 30000);
    }, 

    methods: {
    	ChangeStateOfOrderToShow(val) {
    		this.StateOfOrderToShow = val;
    	},

    	ChangeOrdersToShow(val) {
    		this.ChangeStateOfOrderToShow(val);
    		if (val == 0) {
    			this.OrdersToShow = this.InfufuiledOrders;
    		} else {
    			this.OrdersToShow = this.FufuiledOrders;
    		}
    	},

    	GetOrders() {
    		var CurrentDate = new Date(); // 当前日期 YYYY-MM-DD
    		axios.get('/api/v1/order', {
        		params: {
        			date: CurrentDate
        			//date: "2018-06-27"
        		}
        	})	
        	.then(response => {
        		this.OrdersArray = response.data.data;
        		console.log("123123"+this.OrdersArray.dish_list);
        		this.FufuiledOrders = [];
        		this.InfufuiledOrders = [];
        		for (var i = 0; i < this.OrdersArray.length; i++) {
        			if (this.OrdersArray[i].state == "已完成") {
        				this.FufuiledOrders.push(this.OrdersArray[i]);
        			} else {
        				this.InfufuiledOrders.push(this.OrdersArray[i]);
        			}
        		}
        	});
    	},

    	FufuilOrder(IndexOfOrder) {
    		var OrderToFufuil = [];
    		var that = this;
    		OrderToFufuil.push(this.InfufuiledOrders[IndexOfOrder].order_id);
    		this.FufuiledOrders.push(this.InfufuiledOrders[IndexOfOrder]);
    		this.InfufuiledOrders.splice(IndexOfOrder, 1);
    		

    		axios.put('api/v1/order', {
    			order_list: OrderToFufuil
    		}).then((response) => {
		        that.$message({
			        type: 'success',
			        message: response.data.msg
			    });

			    console.log(response);
			}).catch((error) => {
		    that.$message({
			    type: 'error',
			    message: error.response.data.errmsg
			});
			        	
			console.log(error.response);
			});

    	},
    }
}

</script>

<style type="text/css">
#dishes {
	margin-bottom: 1%;
	left: -43.5%;
}

#ShowDishesButton {
	margin-bottom: 1%;
	left: -36%;
}

#ShowButton {
	margin-top: 1%;
	left: -36%;
}

#hint {
	font-weight: bold;
	font-size: 40px;
	text-align: center;
	left: 230%;
	top: 30%;
}

#NoOrderPage {
	height: 300px;
	width: 300px;

}

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