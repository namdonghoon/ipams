/**
 * Created by JetBrains WebStorm.
 * User: LINESNEZ
 * Date: 12. 4. 2
 * Time: 오전 10:56
 * To change this template use File | Settings | File Templates.
 */

/**
 *
 * @param target 타켓ID
 * @param type 차트유형
 * @param colorset 테마색
 */

/**
 평가진행현황 정보조회

 background-black일 경우

 1.수행일정   #88afe4
 2.운영계획   #ee7d56
 3.오늘       #e2dca9
 4.완료       #c8cce0
 */

var htmlConverSeriesToChart = function(table_id,chart){

    var table = $('#'+table_id);

    //drilldown (상세통계)에 쓰일 카테고리는 첫번째 row의 th에서 불러온다.
    var sub_categories = {};
    $('thead th', table).each( function(i) {
        // 첫번째 칸은 공백이므로 패스
        if(i>0){
            sub_categories[i] = this.innerHTML;
        }
    });

    $('tbody tr',table).each(function(i){
        var tr = this;
        var sum_data=0; // sub  category 'td'의 합은 main category의 data가 된다.
        // 첫번째 th는 main category의 값을 가진다.

        var series = {
            name:'',
            categories:[],
            data:[]
        }

        $('th, td',tr).each(function(j){
            if (j==0){
                var main_category_name = this.innerHTML;
                series.name = main_category_name;
                series.categories.push('');
                series.data[0] = {
                    y:0,
                    color: chart.options.colors[i%chart.options.colors.length],
                    drilldown :{
                        name : main_category_name,
                        color: chart.options.colors[i%chart.options.colors.length],
                        categories:[],
                        data:[]
                    }
                }
                //options.series.name = main_category_name;
            }
            else{
                series.data[0].drilldown.categories.push(sub_categories[j]);
                series.data[0].drilldown.data.push(parseFloat(this.innerHTML));
                series.data[0].y += parseFloat(this.innerHTML);
                sum_data +=parseFloat(this.innerHTML);
            }
        });
        series.data[0].y = sum_data;
        //alert(series.data[0].y);
        chart.addSeries(series,false);
    });
}


/* 2012.05.10 변경*/
var getChartOption = function(templateType){
	var t_statics = {
			colors: ["#86bcf2", "#fec65e", "#8dc15f", "#9e94ff", "#fda8fd", "#ff6e6e"],
			chart: {
				renderTo: 'container',
				borderRadius: 0,
				plotBackgroundColor: '#FFFFFF',
				plotBorderColor: "#C0C0C0",
				plotBorderWidth: 0,
				plotShadow: false,
				shadow: false,
				showAxes: false,
				backgroundColor:'#FFFFFF'
			}
	,title: {
		marginTop:10,
		align: 'center', //add
		style: {
			color: '#24344d',//add
			fontSize: '15px',//add
			fontWeight: 'bold',//add
			fontFamily:'Gulim'//add
		}
	},
	subtitle: {
		marginTop:10,
		style: {
			color: '#717171',//add
			fontSize: '13px',//add
			fontFamily:'Gulim'//add
				
		}
	},
	xAxis: {
		lineColor: '#585858'//add
	},
	yAxis: {
		title:'',
		lineColor: '#585858',//add
		lineWidth: 1,//add
		gridLineColor: '#bfbfbf'//add
	},
	tooltip: {
		backgroundColor: 'rgba(0, 0, 0, 0.75)',
		style: {
			color: '#F0F0F0'
		},
		formatter: function() {
			var s = '<b>'+this.series.name +"</b><br>"+this.x+" : "+ this.y +'<br/>';
			return s;
		}
	},
	toolbar: {
		itemStyle: {
			color: 'silver'
		}
	},
	
	plotOptions: {
		series: {
			borderWidth: 1,
			borderColor: '#ffffff',
			shadow: false
		}
	},
	legend: {
		layout: 'vertical',
		align: 'right',
		verticalAlign: 'top',
		x: 0,
		y: 50,
		floating: true,
		borderRadius: 0,
		borderWidth: 1,
		borderColor: '#c0c0c0',
		backgroundColor: '#FFFFFF',
		symbolPadding: 5,//add
		symbolWidth: 20,//add
		shadow: false,
		style: {
			color: '#717171',//add
			fontSize: '11px',//add
			fontFamily:'dotum'//add
		}
	},
	credits: {
		enabled: false,
		style: {
			color: '#666'
		}
	},
	labels: {
		style: {
			color: '#CCC'
		}
	},
	exporting: {
		enabled : false,
		buttons: {
			exportButton: {
				symbolFill: '#55BE3B'
			},
			printButton: {
				symbolFill: '#7797BE'
			}
		}
	},
	// special colors for some of the
	legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
	legendBackgroundColorSolid: 'rgb(35, 35, 70)',
	dataLabelsColor: '#444',
	textColor: '#C0C0C0',
	maskColor: 'rgba(255,255,255,0.3)'
	};
	
	var t_dashboard = {
			colors: ["#356da4", "#b48123", "#51782d", "#575098", "#965196", "#9a3d3d"],
			chart: {
				renderTo: 'container',
				marginTop: 70,
				marginLeft: 80,
				marginRight: 40,
				defaultSeriesType:'column',
				backgroundColor: {
					linearGradient: [25, 25, 25, 25],
					stops: [
					        [0, '#000'],
					        [1, '#000']
					        ]
				},
				showAxes: false,
				plotBackgroundColor: '#000'
			}
	,title: {
		align: 'left', //add
		x: 10,
		style: {
			color: '#C0C0C0',//add
			fontSize: '12px',//add
			fontWeight: 'bold',//add
			fontFamily:'Gulim'//add
		}
	},
	subtitle: {
		align:'left',
		x:20,
		style: {
			color: '#666',
			fontSize: '12px',//add
			fontWeight: 'bold',//add
			fontFamily:'Gulim'//add
				
		}
	},
	xAxis: {
		gridLineColor: '#303030',
		gridLineWidth: 1,
		categories:[],
		labels: {
			style: {
				color: '#ededed'
			},
			staggerLines: 2
		},
		lineColor: '#ededed',
		tickColor: '#ededed',
		title: {
			style: {
				color: '#CCC',
				fontSize: '12px',//add
				fontWeight: 'bold',//add
				fontFamily:'Gulim'//add
					
			}
		}
	},
	yAxis: {
		gridLineColor: '#303030',
		labels: {
			style: {
				color: '#ededed'
			}
		},
		lineColor: '#ededed',
		minorTickInterval: null,
		tickColor: '#ededed',
		tickWidth: 1,
		title:'',
		/*
		title: {
			style: {
				color: '#303030',
				fontSize: '12px',//add
				fontWeight: 'bold',//add
				fontFamily:'Gulim'//add
			}
		}*/
	},
	tooltip: {
		backgroundColor: 'rgba(0, 0, 0, 0.75)',
		style: {
			color: '#F0F0F0'
		},
		formatter: function() {
			var s = '<b>'+this.series.name +"</b><br>"+this.x+" : "+ this.y +'<br/>';
			return s;
		}
	},
	toolbar: {
		itemStyle: {
			color: 'silver'
		}
	},
	
	plotOptions: {
		column: {
			cursor: 'pointer'
		},
		line: {
			dataLabels: {
				color: '#CCC'
			},
			marker: {
				lineColor: '#333'
			}
		},
		spline: {
			marker: {
				lineColor: '#333'
			}
		},
		scatter: {
			marker: {
				lineColor: '#333'
			}
		},
		candlestick: {
			lineColor: 'white'
		},
		
		series: {
			borderWidth: 1,
			borderColor: '#191919',
			shadow: true,
			animation: {
				duration: 1000
			}
		}
	},
	legend: {
		layout: 'vertical',
		align: 'right',
		verticalAlign: 'top',
		x:0,
		y:0,
		floating: true,
		borderRadius: 0,
		borderWidth: 1,
		borderColor: '#696969',
		backgroundColor: '#0f0f0f',
		symbolPadding: 5,//add
		symbolWidth: 20,//add
		shadow: false,
		style: {
			color: '#b7b7b7',//add
			fontSize: '11px',//add
			fontFamily:'dotum'//add
		},
		itemStyle: {
			fontSize: '11px',//add
			fontFamily:'dotum',//add
			color: '#b7b7b7'
		},
		itemHoverStyle: {
			color: '#FFF'
		},
		itemHiddenStyle: {
			color: '#444'
		}
	},
	credits: {
		enabled: false,
		style: {
			color: '#666'
		}
	},
	labels: {
		style: {
			color: '#CCC'
		}
	},
	exporting: {
		enabled: false,
		buttons: {
			exportButton: {
				symbolFill: '#55BE3B'
			},
			printButton: {
				symbolFill: '#7797BE'
			}
		}
	},
	// special colors for some of the
	legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
	legendBackgroundColorSolid: 'rgb(35, 35, 70)',
	dataLabelsColor: '#444',
	textColor: '#C0C0C0',
	maskColor: 'rgba(255,255,255,0.3)'
	};
    // templateType 0 : 대시보드 , 1: 메뉴 별통계
    // 기본값은 1
    if(!templateType){
        templateType = 'statics';
    }

    if(templateType == 'dashboard'){
        return t_dashboard;
    }
    else{
        return t_statics;
    }
}

var getColorset = function (type){
    var colorset = ["#356da4", "#b48123", "#51782d", "#575098", "#965196", "#9a3d3d"];
    if(type == 'light'){
        colorset = ["#86bcf2", "#fec65e", "#8dc15f", "#9e94ff", "#fda8fd", "#ff6e6e"];
    }
    else if(type == 'dark'){
        colorset = ["#6b98c4", "#bf9952", "#7ea559", "#746eb7", "#b974b9", "#be5d5d"];
    }
    return colorset;
}

var createChart = function(ChartOption){
    var chart = new Highcharts.Chart(ChartOption);
    return chart;
}

var changeChart = function(ChartOption,chart){
    //chart.setOptions(ChartOptions);
    chart(ChartOptions)
}
var addSeriesChart = function (series,chart){
    for(i=0; i < series.length;i++){
        chart.addSeries(series[i],false);
    }
}

var optSetTitle = function(ChartOption,title){
    ChartOption.title.text = title;
    return ChartOption;
}
var optSetSubtitle = function(ChartOption,subtitle){
    ChartOption.subtitle.text = subtitle;
    return ChartOption;
}

var optSetColorset = function(ChartOption,colorset){
    ChartOption.colors = colorset
    return ChartOption;
}
var optSetXAxis = function (ChartOption,xAxsis,xAxsisIndex){
    if(!xAxsisIndex){
        xAxsisIndex = 0;
    }
    ChartOption.xAxis[xAxsisIndex] = xAxsis;
    return ChartOption;
}
var optSetYAxis = function (ChartOption,yAxsis,yAxsisIndex){
    if(!yAxsisIndex){
        yAxsisIndex = 0;
    }
    ChartOption.yAxis[yAxsisIndex] = yAxsis;
    return ChartOption;
}

var optSetXAxisCategories = function(ChartOption,categories,xAxsisIndex){
    if(!xAxsisIndex){
        xAxsisIndex = 0;
    }
    ChartOption.xAxis[xAxsisIndex].categories = categories;
    return ChartOption;
}
var optSetYAxisCategories = function(ChartOption,categories,yAxsisIndex){
    if(!yAxsisIndex){
        yAxsisIndex = 0;
    }
    ChartOption.yAxis[yAxsisIndex].categories = categories;
    return ChartOption;
}

var optSetTarget = function(ChartOption,targetId){
    ChartOption.chart.renderTo = targetId;
    return ChartOption;
}

var optSetSeries = function(ChartOption,series){
    ChartOption.series = series;
}

var optSetDefseriestype = function(ChartOption,Defseriestype){
    ChartOption.chart.defaultSeriesType = Defseriestype;
    return ChartOption;
}

var optSetExporting = function(ChartOption,opt){
    if(opt == 'enable'){
        ChartOption.exporting.enabled = true
    }
    else{
        ChartOption.exporting.enabled = false
    }
    return ChartOption;
}

var optSetTooltip = function(ChartOption,tooltip){
    ChartOption.tooltip = tooltip;
    return ChartOption
}

// GanttChart 전용
var optSetGanttChart = function(ChartOption,start_date,end_date,today){
    ChartOption.chart.zoomType =  'y';
    ChartOption.yAxis.plotBands = [
        //평가완료일과 오늘색 배경 지정
        // 금일
        {
            color: '#fffac6',
            from: today-86400000,
            to: today
        },
        //평가완료일
        {
            color: '#e4e8f9',
            from: end_date-172800000,
            to: end_date-86400000}
    ]
    ChartOption.xAxis.gridLineWidth = 1;
    ChartOption.yAxis.type = 'datetime';
    ChartOption.yAxis.min = start_date;
    ChartOption.yAxis.max = end_date;
    ChartOption.yAxis.labels = {step:2};
    ChartOption.yAxis.opposite = true;
    //ChartOption.yAxis.minorTickInterval =  24 * 3600 * 1000;  // = 1 day
    ChartOption.yAxis.minorGridLineColor = '#bebebe'

    ChartOption.plotOptions.series = {pointPadding: 0, groupPadding: 0, borderWidth: 1, shadow: false}

    ChartOption.legend.y = 0;

    ChartOption.legend.symbolPadding =  20;
    ChartOption.legend.symbolWidth = 100;
    
    Highcharts.setOptions({
        lang: {
            months:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
            shortMonths:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
        }
    });
    
    ChartOption.yAxis.dateTimeLabelFormats = {
        day: '%b %e일',
        week: '%b %e일',
        month: '%y \'%b',
    };
    
    return ChartOption;
}


// utc형태의 날짜를 얻는 함수
function utcFormat(date, lastTime) {
    if(date === '' || !date) return null;
    
    var revisionPoint = 0;
    if(typeof date != 'date') {
        revisionPoint = 1;
        date = new Date(date);
    }
    
    if(lastTime)
        return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()+revisionPoint, 23, 59);
    else
        return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()+revisionPoint, 0, 1);
};