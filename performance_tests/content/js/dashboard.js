/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 99.9962962962963, "KoPercent": 0.003703703703703704};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.8844821428571429, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.98315, 500, 1500, "http://localhost:8000/lists/0a78d57b-fe67-47b9-a6b0-e5379bc71993/items"], "isController": false}, {"data": [0.92025, 500, 1500, "http://localhost:8000/lists/0a78d57b-fe67-47b9-a6b0-e5379bc71993"], "isController": false}, {"data": [0.83375, 500, 1500, "http://localhost:8000/lists/a2cf2228-ac41-41cf-b022-679a4cca5f9d/items"], "isController": false}, {"data": [0.088, 500, 1500, "Test"], "isController": true}, {"data": [0.9975, 500, 1500, "http://localhost:8000/lists/0a78d57b-fe67-47b9-a6b0-e5379bc71993/items/ac9e3640-3d3e-40d4-859a-7ae9ddc6dd99"], "isController": false}, {"data": [0.4775, 500, 1500, "http://localhost:8000/login"], "isController": false}, {"data": [0.8374, 500, 1500, "http://localhost:8000/lists/tester@test.com"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost:3000/"], "isController": false}, {"data": [0.966, 500, 1500, "http://localhost:8000/lists/0a78d57b-fe67-47b9-a6b0-e5379bc71993/items/39f43f2b-b6de-475e-804c-b899850052d8"], "isController": false}, {"data": [0.936, 500, 1500, "http://localhost:8000/lists"], "isController": false}, {"data": [0.887, 500, 1500, "http://localhost:8000/lists/021ffb6c-0a80-4ae6-8064-830fbc3b9d2d/items"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 27000, 1, 0.003703703703703704, 319.6534814814808, 0, 4433, 245.0, 611.0, 759.0, 1272.9600000000064, 188.0615727519677, 10186.998359630756, 83.38877186433447], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["http://localhost:8000/lists/0a78d57b-fe67-47b9-a6b0-e5379bc71993/items", 10000, 0, 0.0, 236.18949999999873, 0, 1184, 212.0, 398.0, 459.0, 764.9799999999996, 76.38077343171176, 411.2850444536101, 35.332761193602344], "isController": false}, {"data": ["http://localhost:8000/lists/0a78d57b-fe67-47b9-a6b0-e5379bc71993", 2000, 0, 0.0, 318.2715000000006, 1, 1436, 307.5, 565.0, 635.8499999999995, 745.97, 15.562749003984063, 20.061356137948206, 7.39382557659985], "isController": false}, {"data": ["http://localhost:8000/lists/a2cf2228-ac41-41cf-b022-679a4cca5f9d/items", 2000, 0, 0.0, 392.5520000000008, 1, 1044, 361.0, 751.0, 828.0, 955.99, 15.08682467601044, 6.246888342410573, 5.996423479625244], "isController": false}, {"data": ["Test", 1000, 1, 0.1, 8630.644000000004, 208, 13599, 9446.5, 12120.399999999947, 12535.599999999999, 12770.84, 7.214174409880534, 10551.07169801601, 86.36900485198316], "isController": true}, {"data": ["http://localhost:8000/lists/0a78d57b-fe67-47b9-a6b0-e5379bc71993/items/ac9e3640-3d3e-40d4-859a-7ae9ddc6dd99", 1000, 0, 0.0, 222.1380000000001, 1, 834, 210.5, 369.0, 404.89999999999986, 488.0, 7.874573788693688, 10.150817774487956, 3.875766786622674], "isController": false}, {"data": ["http://localhost:8000/login", 1000, 1, 0.1, 1123.2030000000016, 15, 4433, 1006.0, 2177.1, 2680.85, 3198.2000000000007, 7.2576313994164865, 3.339382210003193, 3.0799927627806887], "isController": false}, {"data": ["http://localhost:8000/lists/tester@test.com", 5000, 0, 0.0, 439.54239999999965, 10, 3242, 362.0, 835.0, 1009.0, 2125.859999999997, 36.47611543961014, 10197.406286020165, 14.14874321544253], "isController": false}, {"data": ["http://localhost:3000/", 2000, 0, 0.0, 2.3245, 0, 34, 2.0, 4.0, 4.949999999999818, 7.0, 14.075982151654632, 16.385322973410467, 7.161705762707093], "isController": false}, {"data": ["http://localhost:8000/lists/0a78d57b-fe67-47b9-a6b0-e5379bc71993/items/39f43f2b-b6de-475e-804c-b899850052d8", 1000, 0, 0.0, 291.778, 1, 1027, 278.5, 451.0, 615.5999999999995, 998.9200000000001, 7.80420802896922, 10.060111912343135, 3.7191928888056442], "isController": false}, {"data": ["http://localhost:8000/lists", 1000, 0, 0.0, 322.12399999999985, 2, 1052, 308.0, 575.8, 669.6499999999995, 870.8500000000001, 7.6286379067017585, 9.811441526490444, 3.4790760765915243], "isController": false}, {"data": ["http://localhost:8000/lists/021ffb6c-0a80-4ae6-8064-830fbc3b9d2d/items", 2000, 0, 0.0, 342.74899999999985, 1, 1042, 307.0, 684.0, 770.0, 880.0, 15.19964736818106, 6.249073771488502, 6.0412660926266515], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 1, 100.0, 0.003703703703703704], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 27000, 1, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 1, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http://localhost:8000/login", 1000, 1, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
