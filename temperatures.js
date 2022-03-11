window.onload = function () {
    resize_canvas()

    let chart = new SmoothieChart({
            millisPerPixel: 80,
            maxValueScale: 1.1,
            minValueScale: 1.1,
            scaleSmoothing: 0.1,
            grid: {fillStyle: '#000001', millisPerLine: 5000, verticalSections: 8},
            labels: {fillStyle: '#ffffff', fontSize: 18, precision: 1},
            tooltip: true
        }),
        canvas = document.getElementById('temps'),
        seriesData = [new TimeSeries(), new TimeSeries(), new TimeSeries(), new TimeSeries(), new TimeSeries(), new TimeSeries()];

    chart.addTimeSeries(seriesData[0], {lineWidth: 2, strokeStyle: '#ff0000'});
    chart.addTimeSeries(seriesData[1], {lineWidth: 2, strokeStyle: '#00ffff'});
    chart.addTimeSeries(seriesData[2], {lineWidth: 2, strokeStyle: '#ffff00'});
    chart.addTimeSeries(seriesData[3], {lineWidth: 2, strokeStyle: '#f000f0'});
    chart.addTimeSeries(seriesData[4], {lineWidth: 2, strokeStyle: '#00ff00'});
    chart.addTimeSeries(seriesData[5], {lineWidth: 2, strokeStyle: '#99ccff'});
    chart.streamTo(canvas, 500);

    function get_cpu_temp(series) {
        let proc = cockpit.script("sensors k10temp-pci-00c3 | grep \"Tctl:\"");
        proc.done(function (data) {
            pt = parseFloat(data.match(/([0-9.]+)/)[1]);
            series.append(new Date().getTime(), pt);
            document.getElementById("cpu_temp").innerHTML = pt;
        });
    }

    function get_hdd_temp(series, drive) {
        let hdd = cockpit.script("hddtemp -n " + drive);
        hdd.done(function (data) {
            let pt = parseFloat(data);
            series.append(new Date().getTime(), pt);
            document.getElementById("hdd" + drive.replace(/\//g, '_') + "_temp").innerHTML = pt;
        });
    }

    setInterval(function () {
        get_cpu_temp(seriesData[0])
        get_hdd_temp(seriesData[1], '/dev/nvme0n1')
        get_hdd_temp(seriesData[2], '/dev/nvme1n1')
        get_hdd_temp(seriesData[3], '/dev/nvme2n1')
        get_hdd_temp(seriesData[4], '/dev/nvme3n1')
        get_hdd_temp(seriesData[5], '/dev/nvme4n1')
    }, 2000);
}

function resize_canvas() {
    document.getElementById("temps").width = window.innerWidth - 50;
}
