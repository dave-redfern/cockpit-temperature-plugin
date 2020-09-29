window.onload = function () {
    resize_canvas()

    var chart = new SmoothieChart({millisPerPixel: 80, maxValueScale: 1.1, minValueScale: 1.1, scaleSmoothing: 0.1, grid: { fillStyle: '#000001', millisPerLine: 5000, verticalSections: 8 }, labels: { fillStyle: '#ffffff', fontSize: 18, precision: 1 }, tooltip:true  }),
        canvas = document.getElementById('temps'),
        seriesData = [ new TimeSeries(), new TimeSeries(), new TimeSeries(), new TimeSeries(), new TimeSeries() ];

    chart.addTimeSeries(seriesData[0], { lineWidth: 2, strokeStyle: '#ff0000' }); // red, CPU core 0
    chart.addTimeSeries(seriesData[1], { lineWidth: 2, strokeStyle: '#00ffff' }); // light blue, CPU core 1
    chart.addTimeSeries(seriesData[2], { lineWidth: 2, strokeStyle: '#ffff00' }); // yellow, CPU core 2
    chart.addTimeSeries(seriesData[3], { lineWidth: 2, strokeStyle: '#f000f0' }); // purple, CPU core 3
    chart.addTimeSeries(seriesData[4], { lineWidth: 2, strokeStyle: '#00ff00' }); // green, GPU card 0
    //chart.addTimeSeries(seriesData[5], { lineWidth: 2, strokeStyle: '#ff9900' }); // orange, GPU card 1
    chart.streamTo(canvas, 500);

    function get_cpu_temp(series,core) {
        var proc = cockpit.script("sensors | grep 'Core "+ core +":' | awk '{print $3}'");
        proc.done(function(data){
            pt = parseFloat(data.match(/([0-9\.]+)/)[1]);
            series.append(new Date().getTime(), pt);
            document.getElementById("cpu"+ core +"_temp").innerHTML = pt;
        });
    };

    function get_gpu_temp(series,card) {
        var gpu = cockpit.script("nvidia-smi -i "+ card +" --query-gpu=temperature.gpu --format=csv,noheader");
        gpu.done(function(data){
            pt = parseFloat(data.match(/([0-9\.]+)/)[1]);
            series.append(new Date().getTime(), pt);
            document.getElementById("gpu"+ card +"_temp").innerHTML = pt;
        });
    };

    setInterval(function () { 
        get_cpu_temp(seriesData[0],0) 
        get_cpu_temp(seriesData[1],1) 
        get_cpu_temp(seriesData[2],2) 
        get_cpu_temp(seriesData[3],3) 
        get_gpu_temp(seriesData[4],0) 
        //get_gpu_temp(seriesData[5],1) 
    }, 1000);
}

function resize_canvas() {
    document.getElementById("temps").width = window.innerWidth - 50;
}
