var d3; // Minor workaround to avoid error messages in editors

// Waiting until document has loaded
window.onload = () => {

  var screenWidth = window.screen.width;

  var screenHeight = window.screen.height;


  // config du radar chart :

  var radarChartOptions = {
    w: width,
    h: height,
    margin: margin,
    maxValue: 0.5,
    levels: 5,
    roundStrokes: true,
    //color: color,
  };

  // set the dimensions and margins of the graph
  var margin = { top: 20, right: 20, bottom: 70, left: 70 },
    width = screenWidth - margin.left - margin.right,
    height = screenHeight - margin.top - margin.bottom;


  // set the ranges
  var y = d3.scaleLinear().range([height, 0]);
  var x = d3.scaleLinear().range([0, width]);

  var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  // Get the data
  d3.csv("cars.csv").then(function (data) {

    compteur =0;


    data.forEach(function (d) {
      
      d.idData = compteur
      d.weight = parseInt(d.Weight);
      d.cityMilesPerGallon = parseInt(d.CityMilesPerGallon);
      d.engine = parseInt(d.Engine_Size);
      d.horsepower = parseInt(d.Horsepower);
      d.price = parseInt(d.Retail_Price);
      d.cylindree = parseInt(d.Cyl);
      compteur = compteur + 1;
    });


    // Scale the range of the data
    x.domain([0, d3.max(data, function (d) { return d.weight; })]);
    y.domain([0, d3.max(data, function (d) { return d.cityMilesPerGallon; })]);
    y.domain([0, 30]);


    var colorScale = d3.scaleOrdinal().domain(data)
      .range(d3.schemeSet1);


    var div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    // Add the scatterplot
    svg.selectAll("dot")
      .data(data)
      .enter().append("circle")
      .attr("r", function (d) { return d.Cyl*1.5 })
      .attr("fill", function (d) { return colorScale(d.Type) })
      .attr("opacity", 0.5)
      .attr("cx", function (d) { return x(d.weight); })
      .attr("cy", function (d) { return y(d.cityMilesPerGallon); })
      .on("mouseover", function (d) {
        //Call function to draw the Radar chart
        RadarChart(".radarChart", radarChartOptions, d.idData);
        div.transition()
          .duration(200)
          .style("opacity", .9);
        div.html(d.Name + "<br>")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY) + "px");
      })
      .on("mouseout", function (d) {
        div.transition()
          .duration(500)
          .style("opacity", 0);
      });



    // Add the X Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
      .call(d3.axisLeft(y));

    svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width / 2 + margin.left)
      .attr("y", height + margin.top + 20)
      .text("Weight (kg)");

    svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -margin.top - height / 2 + 20)
      .text("City Miles Per Gallon (Miles)")







  });

};
