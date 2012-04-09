NB.Ui.charts = {
  options: {
    chart: {
      renderTo: 'container_top',
      defaultSeriesType: 'spline',
      borderRadius: 0,
      spacingTop: 0,
      spacingRight: 0,
      spacingBottom: 5,
      spacingLeft: 0,
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0
    },
    colors: [
      '#22aecc',
      '#75d42f',
      '#D3120F',
      '#86853a',
      '#b32fd4',
      '#f74b23',
      '#336699'
    ],
    credits: {
      enabled: false
    },
    xAxis: {
      labels: {
        style: {
          font: 'normal 11px Tahoma, Geneva, sans-serif',
          color: '#999999'
        },
        y: 15
      },
      lineColor: '#cccccc',
      gridLineColor: '#cccccc',
      offset: 0
    },
    yAxis: {
      title: null,
      min: 0,
      allowDecimals: false,
      tickInterval: 5,
      maxPadding: 0,
      offset: 0,
      labels: {
        style: {
          font: 'bold 11px Menlo, Consolas, monospace',
          color: '#999999'
        },
        y: 15,
        x: 12
      },
      lineColor: '#cccccc',
      gridLineColor: '#cccccc',
      showFirstLabel: false,
      tickPosition: 'inside'
    },
    plotOptions: {
      series: {
        marker: {
          radius: 2,
          lineWidth: 1,
          fillColor: null,
          lineColor: null
        }
      },
      spline: {
        shadow: false,
        marker: {
          symbol: 'circle'
        }
      }
    },
    title: {
      text: ''
    },
    tooltip: {
        formatter: function() {
           return '<strong>'+ this.x.toLowerCase() +
           '</strong> is '+ this.y +'% of ' + 
           this.series.name + ' text';
        },
        borderRadius: 0,
        borderWidth: 1,
        shadow: false
     },
     legend: {
      floating: true,
      align: 'right',
      verticalAlign: 'top',
      lineHeight: '20px',
      borderWidth: 0,
       itemStyle: {
            color: '#999999',
            font: 'normal 13px Tahoma, Geneva, sans-serif'
        },
       itemHoverStyle: {
            color: '#f74b23',
            font: 'normal 13px Tahoma, Geneva, sans-serif'
        }
     }
  },
  draw: function(table, options) {
     options.xAxis.categories = [];
     options.series = [];
     $('tr', table).each( function(i) {
        var tr = this;
        $('th, td', tr).each( function(j) {
           if (j == 0) {
              if (i > 0) {
                options.xAxis.categories.push(this.innerHTML);
              }
           } else {
              if (i == 0) {
                 options.series[j - 1] = { 
                    name: this.innerHTML,
                    data: []
                 };
              } else { 
                 options.series[j - 1].data.push(parseFloat(this.innerHTML));
              }
           }
        });
     });
     NB.Ui.charts.chart = new Highcharts.Chart(options);
  },
  table: function(){
      $('#NB-datatable').dataTable({
        'bDestroy': true,
        'aLengthMenu': [[10, 25, 50, 100, -1], [10, 25, 50, 100, 'All']],
        'iDisplayLength': 50,
        'fnDrawCallback': function() {
          NB.Ui.charts.draw(document.getElementById('#NB-datatable'), NB.Ui.charts.options);
        }   
      });
  },
  initialise: function(){
    $(document).ready(function(){
      NB.Ui.charts.table();
      $('body').bind('content.loaded', NB.Ui.charts.table);
    });
  }
}

/*******************************************************************************
 *
 * This file is loaded on-demand.
 *
 */   
 
 NB.Ui.charts.initialise();
