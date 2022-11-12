/////////////////////////////////////////////////////////
/////////////// The Radar Chart Function ////////////////
/////////////// Written by Nadieh Bremer ////////////////
////////////////// VisualCinnamon.com ///////////////////
/////////// Inspired by the code of alangrafu ///////////
/////////////////////////////////////////////////////////

function RadarChart(id, options) {


  d3.csv("cars.csv").then(function (data) {


    //console.log(data[0]["Retail_Price"]);


    var data = [
      [
        { axis: "Length", value: data[0]["Len"] },
        { axis: "Width", value: data[0]["Width"] },
        { axis: "Wheel base", value: data[0]["WheelBase"] },
        { axis: "Retail price", value: data[0]["Retail_Price"] / 200 },
        { axis: "Engine size", value: data[0]["Engine_Size"] * 50 },
        { axis: "HorsePower", value: data[0]["Horsepower"] },
      ],];



    var config = {
      w: 600,				//Width of the circle
      h: 600,				//Height of the circle
      margin: { top: 20, right: 20, bottom: 20, left: 20 }, //The margins of the SVG
      levels: 3,				//How many levels or inner circles should there be drawn
      maxValue: 0, 			//What is the value that the biggest circle will represent
      labelFactor: 1.25, 	//How much farther than the radius of the outer circle should the labels be placed
      wrapWidth: 60, 		//The number of pixels after which a label needs to be given a new line
      opacityArea: 0.35, 	//The opacity of the area of the blob
      dotRadius: 4, 			//The size of the colored circles of each blog
      opacityCircles: 0.1, 	//The opacity of the circles of each blob
      strokeWidth: 2, 		//The width of the strok a  e around each blob
      roundStrokes: false,	//If true the area and stroke will follow a round path (cardinal-closed)
      //color: d3.scale.category10()	//Color function
    };


    var myColor = d3.scaleOrdinal()
      .domain(data)
      .range(d3.schemeSet2);

    //Put all of the options into a variable called cfg
    if ('undefined' !== typeof options) {
      for (var i in options) {
        if ('undefined' !== typeof options[i]) { config[i] = options[i]; }
      }//for i
    }//if

    //If the supplied maxValue is smaller than the actual one, replace by the max in the data
    var maxValue = Math.max(config.maxValue, d3.max(data, function (i) { return d3.max(i.map(function (o) { return o.value; })) }));

    var allAxis = (data[0].map(function (i, j) { return i.axis })),	//Names of each axis
      total = allAxis.length,					//The number of different axes
      radius = Math.min(config.w / 2, config.h / 2), 	//Radius of the outermost circle
      //Format = d3.format('%'),			 	//Percentage formatting
      Format = d3.format('.1f'),
      angleSlice = Math.PI * 2 / total;		//The width in radians of each "slice"

    //Scale for the radius






    /////////////////////////////////////////////////////////
    //////////// Create the container SVG and g /////////////
    /////////////////////////////////////////////////////////

    //Remove whatever chart with the same id/class was present before
    d3.select(id).select("svg").remove();

    //Initiate the radar chart SVG
    var svg = d3.select(id).append("svg")
      .attr("width", config.w + config.margin.left + config.margin.right)
      .attr("height", config.h + config.margin.top + config.margin.bottom)
      .attr("class", "radar" + id);
    //Append a g element		
    var g = svg.append("g")
      .attr("transform", "translate(" + (config.w / 2 + config.margin.left) + "," + (config.h / 2 + config.margin.top) + ")");

    /////////////////////////////////////////////////////////
    ////////// Glow filter for some extra pizzazz ///////////
    /////////////////////////////////////////////////////////

    //Filter for the outside glow
    var filter = g.append('defs').append('filter').attr('id', 'glow'),
      feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation', '2.5').attr('result', 'coloredBlur'),
      feMerge = filter.append('feMerge'),
      feMergeNode_1 = feMerge.append('feMergeNode').attr('in', 'coloredBlur'),
      feMergeNode_2 = feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    /////////////////////////////////////////////////////////
    /////////////// Draw the Circular grid //////////////////
    /////////////////////////////////////////////////////////

    //Wrapper for the grid & axes
    var axisGrid = g.append("g").attr("class", "axisWrapper");

    //Draw the background circles
    axisGrid.selectAll(".levels")
      .data(d3.range(1, (config.levels + 1)).reverse())
      .enter()
      .append("circle")
      .attr("class", "gridCircle")
      .attr("r", function (d, i) { return radius / config.levels * d; })
      .style("fill", "#CDCDCD")
      .style("stroke", "#CDCDCD")
      .style("fill-opacity", config.opacityCircles)
      .style("filter", "url(#glow)");

    //Text indicating at what % each level is


    /*     axisGrid.selectAll(".axisLabel")
          .data(d3.range(1, (config.levels + 1)).reverse())
          .enter().append("text")
          .attr("class", "axisLabel")
          .attr("x", 4) // decale echelle  en abscisse
          .attr("y", function (d) { return -d * radius / config.levels; }) // gere espacement entre données en y 
          .attr("dy", "0.4em") // decale echelle en ordonnée
          .style("font-size", "10px")
          .attr("fill", "#737373")
          .text(function (d) { return Format(maxValue * d / config.levels); });
     */


    /////////////////////////////////////////////////////////
    //////////////////// Draw the axes //////////////////////
    /////////////////////////////////////////////////////////


    var scale = d3.scaleLinear()
      .domain([10, 15])
      .range([0, 200]);

    var x_axis = d3.axisBottom()




      .scale(scale);

    var rScale = d3.scaleLinear()
      .range([0, radius])
      .domain([0, 400]);




    //Create the straight lines radiating outward from the center
    var axis = axisGrid.selectAll(".axis")
      .data(allAxis)
      .enter()
      .append("g")
      .attr("class", "axis");

    //Append the lines
    axis.append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", function (d, i) { return radius * Math.cos(angleSlice * i - Math.PI / 2); })
      .attr("y2", function (d, i) { return radius * Math.sin(angleSlice * i - Math.PI / 2); })
      .attr("class", "line")
      .style("stroke", "red")
      .style("stroke-width", "2px");


      
    //Append the labels at each axis
    axis.append("text")
      .attr("class", "legend")
      .style("font-size", "11px")
      .attr("text-anchor", "middle")
      //.attr("dy", "0px")

      .attr("transform", function (d, i) {
        //console.log(d);
        //console.log(i)
        var angleI = angleSlice * i * 180 / Math.PI - 90;   // the angle to rotate the label
        var distance = radius + 70; // the distance from the center
        var flip = angleI > 90 ? 180 : 0;                    // 180 if label needs to be flipped
        return "rotate(" + (angleI) + ") translate(" + distance + ")" + "rotate(" + flip + ")"
      })

      //.attr("x", function (d, i) { return rScale(maxValue * config.labelFactor) * Math.cos(angleSlice * i - Math.PI / 2); })
      //.attr("y", function (d, i) { return rScale(maxValue * config.labelFactor) * Math.sin(angleSlice * i - Math.PI / 2); })
      .text(function (d) { return d });







    var scaleList = [


      { "Length": [0, 100, 200, 300, 400] },

    ];









    axis.append("text")
      .attr("class", "textscale")
      .style("font-size", "10px")
      .attr("fill", "#737373")
      //.attr("text-anchor", "middle")

      .data(d3.range(1, (config.levels + 1)).reverse())
      //.enter().append("text")
      .attr("x", 4) // decale echelle  en abscisse
      .attr("y", function (d) {

        /*  console.log("aaaa"+-d * radius / config.levels); */

        return -d * radius / config.levels;
      }) // gere espacement entre données en y 
    //.attr("dy", "0.4em") // decale echelle en ordonnée

    /* .text(function (d) {

      console.log(Format(maxValue * d / config.levels))

      return Format(maxValue * d / config.levels);
    }); */


    axis.append("text")
      .attr("class", "textscale")
      .style("font-size", "10px")
      .attr("fill", "#737373")
      //.attr("text-anchor", "middle")

      .data(scaleList[0]["Length"])
      //.enter().append("text")
      .attr("x", 4) // decale echelle  en abscisse
      .attr("y", function (d, i) { /* console.log(radius+10) */

        return (-(radius) * i) / scaleList[0]["Length"].length;
      }) // gere espacement entre données en y 
      .attr("dy", "-1em") // decale echelle en ordonnée

      .text(function (d) {
        return Format(d);
      });


    /*     axis.append("text")
          .attr("class", "textscale")
          .style("font-size", "10px")
          .attr("fill", "#737373")
    
    
          .attr("transform", function (d, i) {
            console.log(d);
            console.log(i)
            var angleI = angleSlice * i * 180 / Math.PI - 90;   // the angle to rotate the label
            var distance = radius + 70; // the distance from the center
            var flip = angleI > 90 ? 180 : 0;                    // 180 if label needs to be flipped
            return "rotate(" + (angleI) + ") translate(" + distance + ")" + "rotate(" + flip + ")"
          })
          .call(a);
     */




    /* 
    
        axis.append("g")
          .attr("transform", function (d, i) {
            console.log(d);
            console.log(i)
            var angleI = angleSlice * i * 180 / Math.PI - 90;   // the angle to rotate the label
            var distance = radius + 70; // the distance from the center
            var flip = angleI > 90 ? 180 : 0;                    // 180 if label needs to be flipped
            return "rotate(" + (angleI) + ") translate(" + distance + ")" + "rotate(" + flip + ")"
          })
          .call(x_axis);
    
     */

    /////////////////////////////////////////////////////////
    ///////////// Draw the radar chart blobs ////////////////
    /////////////////////////////////////////////////////////

    //The radial line function
    var radarLine = d3.lineRadial()
      .curve(d3.curveCardinalClosed)
      .radius(function (d) { return rScale(d.value); })
      .angle(function (d, i) { return i * angleSlice; });

    /* if(cfg.roundStrokes) {
      radarLine.interpolate("cardinal-closed");
    } */

    //Create a wrapper for the blobs	
    var blobWrapper = g.selectAll(".radarWrapper")
      .data(data)
      .enter().append("g")
      .attr("class", "radarWrapper");

    //Append the backgrounds	
    blobWrapper
      .append("path")
      .attr("class", "radarArea")
      .attr("d", function (d, i) { return radarLine(d); })

      .style("fill", function (d, i) { return myColor(i) })
      /* .style("fill", "rgba(198, 45, 205, 0.8)" ) */
      .style("fill-opacity", config.opacityArea)
      .on('mouseover', function (d, i) {
        //Dim all blobs
        d3.selectAll(".radarArea")
          .transition().duration(200)
          .style("fill-opacity", 0.1);
        //Bring back the hovered over blob
        d3.select(this)
          .transition().duration(200)
          .style("fill-opacity", 0.7);
      })
      .on('mouseout', function () {
        //Bring back all blobs
        d3.selectAll(".radarArea")
          .transition().duration(200)
          .style("fill-opacity", config.opacityArea);
      });

    //Create the outlines	
    blobWrapper.append("path")
      .attr("class", "radarStroke")
      .attr("d", function (d, i) { return radarLine(d); })
      .style("stroke-width", config.strokeWidth + "px")
      .style("stroke", function (d, i) { return myColor(i) })
      .style("fill", "none")
      .style("filter", "url(#glow)");

    //Append the dot
    blobWrapper.selectAll(".radarCircle")
      .data(function (d, i) {
        return d;
      })
      .enter().append("circle")
      .attr("class", "radarCircle")
      .attr("r", config.dotRadius)
      .attr("cx", function (d, i) { return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2); })
      .attr("cy", function (d, i) { return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2); })
      .style("fill", function (d, i) { return myColor(d) })
      .style("fill-opacity", 0.8);

    /////////////////////////////////////////////////////////
    //////// Append invisible circles for tooltip ///////////
    /////////////////////////////////////////////////////////

    //Wrapper for the invisible circles on top
    var blobCircleWrapper = g.selectAll(".radarCircleWrapper")
      .data(data)
      .enter().append("g")
      .attr("class", "radarCircleWrapper");

    //Append a set of invisible circles on top for the mouseover pop-up
    blobCircleWrapper.selectAll(".radarInvisibleCircle")
      .data(function (d, i) { return d; })
      .enter().append("circle")
      .attr("class", "radarInvisibleCircle")
      .attr("r", config.dotRadius * 1.5)
      .attr("cx", function (d, i) { return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2); })
      .attr("cy", function (d, i) { return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2); })
      .style("fill", "none")
      .style("pointer-events", "all")
      .on("mouseover", function (d, i) {
        newX = parseFloat(d3.select(this).attr('cx')) - 10;
        newY = parseFloat(d3.select(this).attr('cy')) - 10;

        tooltip
          .attr('x', newX)
          .attr('y', newY)
          .text(Format(d.value))
          .transition().duration(200)
          .style('opacity', 1);
      })
      .on("mouseout", function () {
        tooltip.transition().duration(200)
          .style("opacity", 0);
      });

    //Set up the small tooltip for when you hover over a circle
    var tooltip = g.append("text")
      .attr("class", "tooltip")
      .style("opacity", 0);

    /////////////////////////////////////////////////////////
    /////////////////// Helper Function /////////////////////
    /////////////////////////////////////////////////////////

    //Taken from http://bl.ocks.org/mbostock/7555321
    //Wraps SVG text	
    function wrap(text, width) {
      text.each(function () {
        var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.4, // ems
          y = text.attr("y"),
          x = text.attr("x"),
          dy = parseFloat(text.attr("dy")),
          tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
          }
        }
      });
    }//wrap	



  });





}//RadarChart