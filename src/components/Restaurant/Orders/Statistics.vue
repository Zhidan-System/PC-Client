<template>
	<div>
    	<div id="NumOfPayments">
    		<p>6560</p>
    	</div>

    	<div id="TotalSales">
    		<div id="InsideTS">
    			<p>总销售额</p>
                <div v-if = "SalesTotal == '统计中...'">
    			    <p>统计中...</p>
                </div>
                <div v-else>
                     <p id="bold">￥{{SalesTotal}}</p>
                </div>
    			<p> 周同比 {{Weekly}}% <i class="el-icon-caret-top"></i></p>
    			<p> 日环比 {{Daily}}%<i class="el-icon-caret-bottom"></i></p>
    			<p style="width : 150px">日均销售额: ￥{{DailySales}}</p>
    		</div>
    	</div>

        <div id="BottomDiv">
            <div id="Selector">
                <div id="ChartSelector">
                    <el-row>
                        <el-button @click = "ChartTypeSelect(0)">销售额</el-button>
                        <el-button @click = "ChartTypeSelect(1)">订单数</el-button>
                    </el-row>
                </div>
                <div id="RangeSelector">
                    <el-row>
                        <el-button @click = "DrawDailyChart('RevenueChart')">今日</el-button>
                        <el-button @click = "DrawWeeklyChart('RevenueChart')">本周</el-button>
                        <el-button @click = "DrawMonthlyChart('RevenueChart')">本月</el-button>
                        <el-button @click = "DrawYearlyChart('RevenueChart')">本年</el-button>
                    </el-row>
                </div>
            </div>        
            <div id="RevenueChart"></div>
        </div>
    	

	</div>
</template>

<script type="text/javascript">
var axios = require('axios');

export default {
    name: 'hello',

    data () {
        return {
            SalesTotal: '统计中...',
            Weekly: "12",
            Daily: "11",
            DailySales: "统计中...",
            ChartSelector: "CS",
            RangeSelector: "RS",
            ChartTypeSelector: 0,
            defaultVal: 0,
        }
    },

    mounted() {
        this.DrawMonthlyChart("RevenueChart");
        this.DrawNOP();
        this.GetTotalSales();
        //this.GetDayilySales();
        //this.DrawTS();
    },

    methods: {
        GetTotalSales() {
            axios.get('/api/v1/statistics', {})  
                .then(response => {
                //console.log(response.data.data[0]["sum(total_price)"]);
                this.SalesTotal = response.data.data[0]["sum(total_price)"] == null ? 0 : response.data.data[0]["sum(total_price)"];
                this.DailySales = parseInt(response.data.data[0]["sum(total_price)"] == null ? 0 : response.data.data[0]["sum(total_price)"]) / 365;
            });
                      
        },

        GetDayilySales() {
            console.log(this.SalesTotal);
            var tempDailySales = parseInt(this.SalesTotal) / 365;
            console.log(parseInt(this.SalesTotal));
            console.log(tempDailySales);
            this.DailySales = (isNaN(tempDailySales)) ? '错误' : tempDailySales;  
        },

        ChartTypeSelect(para) {
            this.ChartTypeSelector = para;
        },

        // ChartType —— 0代表绘制营业额表格，1代表绘制支付数表格
        DrawYearlyChart(ChartName) {
            var CurrentDate = new Date(); // 当前日期 YYYY-MM-DD
            var MonthOfThisYear = CurrentDate.getMonth(); // 获取本机时间是这年第几月 0~11
            var MaxIterator = 12 - MonthOfThisYear + 1; // 增量
            var MinIterator = -(MonthOfThisYear - 1);

            var Yearly_Array = [];

            for (var it = MinIterator; it < MaxIterator; it++) {
                var DateToGet = new Date();
                DateToGet.setMonth(CurrentDate.getMonth()+it);
                //console.log(DateToGet.toLocaleDateString());
                var RevenueThisMonth;
                if (this.ChartTypeSelector == 0) {

                    axios.get('/api/v1/statistics/month', {
                            params: {
                                date: DateToGet
                            }
                        })  
                        .then(response => {
                        console.log(response.data.data[0]["sum(total_price)"]);
                        RevenueThisMonth = response.data.data[0]["sum(total_price)"];
                    });
                    RevenueThisMonth = (RevenueThisMonth == null) ? this.defaultVal : RevenueThisMonth; 
                    Yearly_Array.push(RevenueThisMonth);

                } else if (this.ChartTypeSelector == 1) {

                }

               
            }

            /*if (this.ChartTypeSelector == 0) {
                for (var i = 0; i < 12; i++) {
                    var RevenueThisMonth = 0;
                    for (var j = 0; j < DaysInThisMonth; j++) {
                        RevenueThisMonth += i;
                    }
                    Yearly_Array.push(RevenueThisMonth);
                }
            } else if (this.ChartTypeSelector == 1) {
                for (var i = 0; i < 12; i++) {
                    var RevenueThisMonth = 0;
                    for (var j = 0; j < DaysInThisMonth; j++) {
                        RevenueThisMonth += i;
                    }
                    Yearly_Array.push(100);
                }
            }*/
            // 基于准备好的dom，初始化echarts实例
            let Chart = this.$echarts.init(document.getElementById(ChartName))
            // 绘制图表
            Chart.setOption({
                title: { text: '销售额趋势' },
                tooltip: {},

                xAxis: {
                    data: ["1月","2月","3月","4月","5月","6月", "7月", "8月", "9月", "10月", "11月", "12月"]
                },
                yAxis: {},
                series: [{
                    name: '销售额趋势',
                    type: 'bar',
                    data: Yearly_Array,
                    itemStyle:{
                        normal:{
                            color:'#4169E1'
                        }
                    }
                }]
            });
        },

        DrawMonthlyChart(ChartName) {
            var DaysInThisMonth;
            var CurrentDate = new Date(); // 当前日期 YYYY-MM-DD
            var DateOfNextMonth = new Date();
            DateOfNextMonth.setMonth(CurrentDate.getMonth()+1);
            DateOfNextMonth.setDate(0);

            //console.log(DateOfNextMonth.toLocaleDateString());
            DaysInThisMonth = DateOfNextMonth.getDate();

            var MonthArray = [];
            for (var i = 0; i < DaysInThisMonth; i++) {
                MonthArray[i] = (i+1).toString() + "日";
            }

            var Monthly_Array = [];

            for (var it = 1; it <= DaysInThisMonth; it++) {
                var DateToGet = new Date();
                DateToGet.setDate(it);
                //console.log(DateToGet.toLocaleDateString());
                var RevenueThisDate;
                if (this.ChartTypeSelector == 0) {

                    axios.get('/api/v1/statistics/day', {
                            params: {
                                date: DateToGet
                            }
                        })  
                        .then(response => {
                        console.log(response.data.data[0]["sum(total_price)"]);
                        RevenueThisDate = response.data.data[0]["sum(total_price)"];
                    });
                    RevenueThisDate = (RevenueThisDate == null) ? this.defaultVal : RevenueThisDate; 
                    Monthly_Array.push(RevenueThisDate);

                } else if (this.ChartTypeSelector == 1) {

                }

               
            }
            // 基于准备好的dom，初始化echarts实例
            let Chart = this.$echarts.init(document.getElementById(ChartName))
            // 绘制图表
            Chart.setOption({
                title: { text: '销售额趋势' },
                tooltip: {},

                xAxis: {
                    data: MonthArray
                },
                yAxis: {},
                series: [{
                    name: '销售额趋势',
                    type: 'bar',
                    data: Monthly_Array,
                    itemStyle:{
                        normal:{
                            color:'#4169E1'
                        }
                    }
                }]
            });
        },

        DrawWeeklyChart(ChartName) {
            console.log("DrawWeeklyChart");

            var CurrentDate = new Date(); // 当前日期 YYYY-MM-DD
            var DayOfThisWeek = CurrentDate.getDay(); // 获取本机时间是这周第几天 0~6
            var MaxIterator = 7 - DayOfThisWeek + 1; // 增量
            var MinIterator = -(DayOfThisWeek - 1);

            var Weekly_Array = [];

            for (var it = MinIterator; it < MaxIterator; it++) {
                var DateToGet = new Date();
                DateToGet.setDate(CurrentDate.getDate()+it);
                //console.log(DateToGet.toLocaleDateString());
                var RevenueThisDate;
                if (this.ChartTypeSelector == 0) {

                    axios.get('/api/v1/statistics/day', {
                            params: {
                                date: DateToGet
                            }
                        })  
                        .then(response => {
                        console.log(response.data.data[0]["sum(total_price)"]);
                        RevenueThisDate = response.data.data[0]["sum(total_price)"];
                    });
                    RevenueThisDate = (RevenueThisDate == null) ? this.defaultVal : RevenueThisDate; 
                    Weekly_Array.push(RevenueThisDate);

                } else if (this.ChartTypeSelector == 1) {

                }

               
            }

            // 基于准备好的dom，初始化echarts实例
            let Chart = this.$echarts.init(document.getElementById(ChartName))
            // 绘制图表
            Chart.setOption({
                title: { text: '销售额趋势' },
                tooltip: {},

                xAxis: {
                    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
                },
                yAxis: {},
                series: [{
                    name: '销售额趋势',
                    type: 'bar',
                    data: Weekly_Array,
                    itemStyle:{
                        normal:{
                            color:'#4169E1'
                        }
                    }
                }]
            });
        },

        DrawDailyChart(ChartName) {
            var CurrentDate = new Date(); // 当前日期 YYYY-MM-DD
            var DayOfThisWeek = CurrentDate.getDay(); // 获取本机时间是这周第几天 0~6
            var MaxIterator = 7 - DayOfThisWeek + 1; // 增量
            var MinIterator = -(DayOfThisWeek - 1);

            var Daily_Array = [];

            var DayArray = [];
            for (var i = 0; i < 24; i++) {
                DayArray.push(i.toString());
            }

            for (var it = 0; it < 24; it++) {
                var DateToGet = new Date();
                DateToGet.setHours(it);
                //console.log(DateToGet.toLocaleDateString());
                var RevenueThisDate;
                if (this.ChartTypeSelector == 0) {

                    axios.get('/api/v1/statistics/hour', {
                            params: {
                                date: DateToGet
                            }
                        })  
                        .then(response => {
                        console.log(response.data);
                        RevenueThisDate = response.data;
                    });
                    RevenueThisDate = (RevenueThisDate == null) ? this.defaultVal : RevenueThisDate; 
                    Daily_Array.push(RevenueThisDate);

                } else if (this.ChartTypeSelector == 1) {

                }

               
            }

            // 基于准备好的dom，初始化echarts实例
            let Chart = this.$echarts.init(document.getElementById(ChartName))
            // 绘制图表
            Chart.setOption({
                title: { text: '销售额趋势' },
                tooltip: {},

                xAxis: {
                    data: DayArray
                },
                yAxis: {},
                series: [{
                    name: '销售额趋势',
                    type: 'bar',
                    data: Daily_Array,
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
#BottomDiv {
    width: 1000px;
    height: 600px;
    margin-top: 50px;
    position: relative;
    left: 20%;
    background-color: white;    
}

#Selector {
    padding-top: 2%;
}

#ChartSelector {
    float: left;
    padding-left: 10%;
}

#RangeSelector {
    padding-left: 35%;
}

#RevenueChart {
	width: 800px;
	height: 400px;
	margin-top: 50px;
	position: relative;
	left: 10%;
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