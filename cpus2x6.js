window.onload = function () {
    resize_canvas()

    var chart = new SmoothieChart(
    { millisPerPixel: 80, maxValueScale: 1.1, minValueScale: 1.1, scaleSmoothing: 0.1,
      grid: { fillStyle: '#000001', millisPerLine: 5000, verticalSections: 8 },
      labels: { fillStyle: '#ffffff', fontSize: 18, precision: 1 },
      tooltip:true
    }),
    
    canvas = document.getElementById('temps'),
    seriesData = [
      new TimeSeries(),	new TimeSeries(),	new TimeSeries(),	new TimeSeries(),	new TimeSeries(),	new TimeSeries(),
      new TimeSeries(),	new TimeSeries(),	new TimeSeries(),	new TimeSeries(),	new TimeSeries(),	new TimeSeries()
    ];

    chart.addTimeSeries(seriesData[0], { lineWidth: 2, strokeStyle: '#ff0000' }); // red, CPU s0 core 0
    chart.addTimeSeries(seriesData[1], { lineWidth: 2, strokeStyle: '#00ffff' }); // light blue, CPU s0 core 1
    chart.addTimeSeries(seriesData[2], { lineWidth: 2, strokeStyle: '#ffff00' }); // yellow, CPU s0 core 2
    chart.addTimeSeries(seriesData[3], { lineWidth: 2, strokeStyle: '#ff9900' }); // orange, CPU s0 core 3
    chart.addTimeSeries(seriesData[4], { lineWidth: 2, strokeStyle: '#00ff00' }); // green, CPU s0 core 4
    chart.addTimeSeries(seriesData[5], { lineWidth: 2, strokeStyle: '#f000f0' }); // purple, CPU s0 core 5

    chart.addTimeSeries(seriesData[6], { lineWidth: 2, strokeStyle: '#ff0000' }); // red, CPU s1 core 0
    chart.addTimeSeries(seriesData[7], { lineWidth: 2, strokeStyle: '#00ffff' }); // light blue, CPU s1 core 1
    chart.addTimeSeries(seriesData[8], { lineWidth: 2, strokeStyle: '#ffff00' }); // yellow, CPU s1 core 2
    chart.addTimeSeries(seriesData[9], { lineWidth: 2, strokeStyle: '#ff9900' }); // orange, CPU s1 core 3
    chart.addTimeSeries(seriesData[10], { lineWidth: 2, strokeStyle: '#00ff00' }); // green, CPU s1 core 4
    chart.addTimeSeries(seriesData[11], { lineWidth: 2, strokeStyle: '#f000f0' }); // purple, CPU s1 core 5

    chart.streamTo(canvas, 500);

    function get_cpu0_temp(series,core) {
	      var socket = 0;
        var proc = cockpit.script("sensors 2>/dev/null|grep 'coretemp-isa-0000' -A7|grep 'Core "+ core +":'|awk '{print $3}'");
        proc.done(function(data){
            pt = parseFloat(data.match(/([0-9\.]+)/)[1]);
            series.append(new Date().getTime(), pt);
            document.getElementById("cpu"+ socket +"_"+ core +"_temp").innerHTML = pt;
        });
    };

    function get_cpu1_temp(series,core) {
      	var socket = 1;
        var proc = cockpit.script("sensors 2>/dev/null|grep 'coretemp-isa-0001' -A7|grep 'Core "+ core +":'|awk '{print $3}'");
        proc.done(function(data){
            pt = parseFloat(data.match(/([0-9\.]+)/)[1]);
            series.append(new Date().getTime(), pt);
            document.getElementById("cpu"+ socket +"_"+ core +"_temp").innerHTML = pt;
        });
    };

    setInterval(function () { 
        get_cpu0_temp(seriesData[0],0) 
        get_cpu0_temp(seriesData[1],1) 
        get_cpu0_temp(seriesData[2],2) 
        get_cpu0_temp(seriesData[3],8) 
        get_cpu0_temp(seriesData[4],9) 
        get_cpu0_temp(seriesData[5],10) 

	      get_cpu1_temp(seriesData[6],0) 
        get_cpu1_temp(seriesData[7],1) 
        get_cpu1_temp(seriesData[8],2) 
        get_cpu1_temp(seriesData[9],8) 
        get_cpu1_temp(seriesData[10],9) 
        get_cpu1_temp(seriesData[11],10) 
    }, 1000);
}

function resize_canvas() {
    document.getElementById("temps").width = window.innerWidth - 50;
}
