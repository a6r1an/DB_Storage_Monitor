var Controller = {
    createTable: function (res) {
        var str = ""
        res.forEach(function (tuple) {
            str += "<tr>"
            tuple.forEach(function (element) {
                str += "<td>" + element + "</td>"
            })            
            str += "</tr>"
        })
        $("#table").html(str)
    },
    createBarChart: function (res) {

        google.charts.load('current', {packages: ['corechart', 'bar']});
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Tablespace N');
        data.addColumn('number', 'Used');
        data.addColumn('number', 'Free');

        res = res.map(function (e) {
            return [e[0], e[3], e[2]];
        })

        data.addRows(res)

        var options = {
            title: 'Space level of tablespaces',
            isStacked: true,
            colors: ["red", "blue"],
            hAxis: {
                title: 'Tablespaces',
                format: 'tableSpace',
                viewWindow: {
                    min: [7, 30, 0],
                    max: [17, 30, 0]
                }
            },
            vAxis: {
                title: 'Size MB'
            }
        };

        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
        chart.draw(data, options);



    },
    createPieChart: function (res, tablespace_position) {
        google.charts.load('current', {'packages': ['corechart']});

        res = res[tablespace_position]
        var data = google.visualization.arrayToDataTable([
            ['Storage', 'size'],
            ['Free MB', res[2]],
            ['Used MB', res[3]]
        ]);

        var options = {
            title: 'TableSpace storage information ' + res[0]
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
    }
}