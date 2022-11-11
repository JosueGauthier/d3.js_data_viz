var d3; // Minor workaround to avoid error messages in editors

// Waiting until document has loaded
window.onload = () => {

  // YOUR CODE GOES HERE
  /* console.log("YOUR CODE GOES HERE"); */

  // Load the data set from the assets folder:

  var screenWidth = window.screen.width;

  var screenHeight = window.screen.height;





  // set the dimensions and margins of the graph
  var margin = { top: 20, right: 20, bottom: 70, left: 70 },
    width = screenWidth - margin.left - margin.right,
    height = screenHeight - margin.top - margin.bottom;


  // set the ranges
  var y = d3.scaleLinear().range([height, 0]);
  var x = d3.scaleLinear().range([0, width]);


  // append the svg obgect to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  // Get the data
  d3.csv("cars.csv").then(function (data) {

    // format the data
    /*   data.forEach(function (d) {
        d. = parseTime(d.date);
        d.close = +d.close;
      }); */


    data.forEach(function (d) {
      d.weight = parseInt(d.Weight);
      d.cityMilesPerGallon = parseInt(d.CityMilesPerGallon);
      d.engine = parseInt(d.Engine_Size);
      d.horsepower = parseInt(d.Horsepower);

      d.price = parseInt(d.Retail_Price);


      d.cylindree = parseInt(d.Cyl);

      /* console.log(d.cylindree); */




    });

    /* var xData = d.price;
    var yData = d.engine; */


    /*     console.log(d3.max(data, function (d) { return d.cost; }))
     */
    // Scale the range of the data
    x.domain([0, d3.max(data, function (d) { return d.weight; })]);
    y.domain([0, d3.max(data, function (d) { return d.cityMilesPerGallon; })]);
    y.domain([0, 65]);




    /* var color = d3.scaleOrdinal()
      .domain(["setosa", "versicolor", "virginica"])
      .range(["#BF8955", "#D18975", "#8FD175"]) */


    var colorScale = d3.scaleOrdinal().domain(data)
      .range(d3.schemeSet1);


    var div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);




    // Add the scatterplot
    svg.selectAll("dot")
      .data(data)
      .enter().append("circle")
      .attr("r", function (d) { return d.Cyl })
      .attr("fill", function (d) { return colorScale(d.Type) })
      .attr("opacity", 0.5)
      .attr("cx", function (d) { return x(d.weight); })
      .attr("cy", function (d) { return y(d.cityMilesPerGallon); })
      .on("mouseover", function (d) {
        div.transition()
          .duration(200)
          .style("opacity", .9);
        div.html(d.cylindree + "<br>" + d.Type + "<br>" + d.price)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 200) + "px");
      })
      .on("mouseout", function (d) {
        div.transition()
          .duration(500)
          .style("opacity", 0);
      });
    /* .style("fill", function (d) { return color(d.Species) }) */










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
      /* .attr("fill","red") */
      .text("Weight (kg)");

    svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -margin.top - height / 2 + 20)
      .text("City Miles Per Gallon (Miles)")


  });










};
