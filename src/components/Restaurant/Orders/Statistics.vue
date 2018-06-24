<template>
	<div>
		
    	<!-- 为ECharts准备一个具备大小（宽高）的Dom -->
    	<div id="NumOfPayments">
    		<p>6560</p>
    	</div>
		<!-- 为ECharts准备一个具备大小（宽高）的Dom -->
    	<div id="TotalSales">
    		<div id="InsideTS">
    			<p>总销售额</p>
    			<p id="bold">￥{{SalesTotal}}</p>
    			<p> 周同比 {{Weekly}}% <i class="el-icon-caret-top"></i></p>
    			<p> 日环比 {{Daily}}%<i class="el-icon-caret-bottom"></i></p>
    			<el-row class = "GappingLine" id="GappingLine2"></el-row>
    			<p style="width : 150px">日均销售额: ￥{{DailySales}}</p>
    		</div>
    	</div>
    	<!-- 为ECharts准备一个具备大小（宽高）的Dom -->
    	<div id="myChart"></div>

	</div>
</template>

<script type="text/javascript">
export default {


  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      SalesTotal: '126,560',
      Weekly: "12",
      Daily: "11",
      DailySales: "12423",
    }
  },
  mounted(){
    this.drawLine();
    this.DrawNOP();
    //this.DrawTS();
  },
  methods: {
    drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title: { text: '销售额趋势' },
            tooltip: {},
            xAxis: {
                data: ["1月","2月","3月","4月","5月","6月", "7月", "8月", "9月", "10月", "11月", "12月"]
            },
            yAxis: {},
            series: [{
                name: '销售额趋势',
                type: 'bar',
                data: [0, 200, 400, 600, 800, 1000, 1200],
                itemStyle:{
                    normal:{
                        color:'#4169E1'
                    }
                }
            }]
        });
    },

    DrawNOP() {
        // 基于准备好的dom，初始化echarts实例
        let NumOfPayments = this.$echarts.init(document.getElementById('NumOfPayments'))
        // 绘制图表
        NumOfPayments.setOption({
            title: { text: '支付笔数' },
            tooltip: {},
            xAxis: {
                data: ["","","","","",""]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20],
                itemStyle:{
                    normal:{
                        color:'#4169E1'
                    }
                }                
            }]
        });
    },

    DrawTS() {
        // 基于准备好的dom，初始化echarts实例
        let TotalSales = this.$echarts.init(document.getElementById('TotalSales'))
        // 绘制图表
        TotalSales.setOption({
            title: { text: '总销售额' },
            tooltip: {},
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20],
                center: ['50%', '50%'],
                itemStyle:{
                    normal:{
                        color:'#4169E1'
                    }
                }                
            }]
        });
    }    
  }
}
</script>

<style type="text/css">
#myChart {
	width: 1000px;
	height: 500px;
	margin-top: 50px;
	position: relative;
	left: 20%;
	background-color: white;
}

#NumOfPayments {
	width: 400px;
	height: 300px;
	position: relative;
	float: right;
	right: 20%;
	background-color: white;
}

#TotalSales {
	width: 400px;
	height: 300px;
	margin-left: 20%;
	background-color: white;
}

#InsideTS {
	position: relative;
	top: 15%;
}

#bold {
	font-size: 40px;
	font-weight: bold;
	color: black;
}

#GappingLine2 {
	width: 300px;
	left: 25%;
	margin-top: 5%;
	margin-bottom:5%;
}

p {
	width: 100px;
	color: grey;
	font-size: 15px;
	margin-left: 0px;
	margin: 5px;
	left: 100px;
	position: relative;
}

</style>