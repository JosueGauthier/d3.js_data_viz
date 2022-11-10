var d3; // Minor workaround to avoid error messages in editors

// Waiting until document has loaded
window.onload = () => {

  // YOUR CODE GOES HERE
  console.log("YOUR CODE GOES HERE");

  // Load the data set from the assets folder:


  // set the dimensions and margins of the graph
  var margin = { top: 20, right: 20, bottom: 30, left: 50 },
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


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
      d.price = parseInt(d.Retail_Price);
      d.cost = parseInt(d.Dealer_Cost);

    });


    console.log(d3.max(data, function (d) { return d.cost; }))

    // Scale the range of the data
    x.domain([0, d3.max(data, function (d) { return d.price; })]);
    y.domain([0, d3.max(data, function (d) { return d.cost; })]);


    /* var color = d3.scaleOrdinal()
      .domain(["setosa", "versicolor", "virginica"])
      .range(["#BF8955", "#D18975", "#8FD175"]) */


    var myColor = d3.scaleOrdinal().domain(data)
      .range(d3.schemeSet3);
    



    // Add the scatterplot
    svg.selectAll("dot")
      .data(data)
      .enter().append("circle")
      .attr("r", 5)
      .attr("fill", function (d) { return myColor(d.Type) })
      .attr("cx", function (d) { return x(d.price); })
      .attr("cy", function (d) { return y(d.cost); });
    /* .style("fill", function (d) { return color(d.Species) }) */

    // Add the X Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
      .call(d3.axisLeft(y));

  });





};
