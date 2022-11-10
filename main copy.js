var d3; // Minor workaround to avoid error messages in editors

// Waiting until document has loaded
window.onload = () => {

  // YOUR CODE GOES HERE
  console.log("YOUR CODE GOES HERE");

  // Load the data set from the assets folder:


  d3.selectAll("hello").style("color", "blue");

  d3
    .select(".target")  // select the elements that have the class 'target'
    .style("stroke-width", 8) // change their style: stroke width is not equal to 8 pixels
    .style("opacity", 0.2)


  var svg = d3.select("#dataviz_area")


  svg.append("circle")
    .attr("cx", 2).attr("cy", 2).attr("r", 40).style("fill", "blue");
  svg.append("circle")
    .attr("cx", 140).attr("cy", 70).attr("r", 40).style("fill", "red");
  svg.append("circle")
    .attr("cx", 300).attr("cy", 100).attr("r", 40).style("fill", "green");

  svg.append("circle")
    .attr("cx", 300).attr("cy", 00).attr("r", 40).style("fill", "green");

  /* svg.style("color", "red"); */


  var svg = d3.select("#viz_area_2")

  // Create a scale: transform value in pixel
  var x = d3.scaleLinear()
    .domain([0, 100])         // This is the min and the max of the data: 0 to 100 if percentages
    .range([0, 400]);       // This is the corresponding value I want in Pixel
  // Try console.log( x(25) ) to see what this x function does.


  // Show the axis that corresponds to this scale
  svg.call(d3.axisBottom(x));

  // Add 3 dots for 0, 50 and 100%
  svg.append("circle")
    .attr("cx", x(10)).attr("cy", 100).attr("r", 40).style("fill", "blue");
  svg.append("circle")
    .attr("cx", x(50)).attr("cy", 100).attr("r", 40).style("fill", "red");
  svg.append("circle")
    .attr("cx", x(100)).attr("cy", 100).attr("r", 40).style("fill", "green");


  // set the dimensions and margins of the graph
  var margin = { top: 10, right: 40, bottom: 30, left: 30 },
    width = 450 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var sVg = d3.select("#Area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    // translate this svg element to leave some margin.
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // X scale and Axis
  var x = d3.scaleLinear()
    .domain([0, 100])         // This is the min and the max of the data: 0 to 100 if percentages
    .range([0, width]);       // This is the corresponding value I want in Pixel
  sVg
    .append('g')
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // X scale and Axis
  var y = d3.scaleLinear()
    .domain([0, 100])         // This is the min and the max of the data: 0 to 100 if percentages
    .range([height, 0]);       // This is the corresponding value I want in Pixel
  sVg
    .append('g')
    .call(d3.axisLeft(y));


  var data = [{ x: 10, y: 20 }, { x: 40, y: 90 }, { x: 80, y: 50 }]


  // set the dimensions and margins of the graph
  var margin = { top: 10, right: 40, bottom: 30, left: 30 },
    width = 450 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svG = d3.select("#Area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");


  // X scale and Axis
  var x = d3.scaleLinear()
    .domain([0, 100])         // This is the min and the max of the data: 0 to 100 if percentages
    .range([0, width]);       // This is the corresponding value I want in Pixel
  svG
    .append('g')
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // X scale and Axis
  var y = d3.scaleLinear()
    .domain([0, 100])         // This is the min and the max of the data: 0 to 100 if percentages
    .range([height, 0]);       // This is the corresponding value I want in Pixel
  svG
    .append('g')
    .call(d3.axisLeft(y));

  // Add 3 dots for 0, 50 and 100%
  svG
    .selectAll("whatever")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return x(d.x) })
    .attr("cy", function (d) { return y(d.y) })
    .attr("r", 7)






  // set the dimensions and margins of the graph
  var margin = { top: 10, right: 30, bottom: 40, left: 50 },
    width = 520 - margin.left - margin.right,
    height = 520 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")")

  // Add the grey background that makes ggplot2 famous
  svg
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", height)
    .attr("width", height)
    .style("fill", "EBEBEB")

  //Read the data
  d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv", function (data) {


    /* console.log(data); */

    // Add X axis
    var x = d3.scaleLinear()
      .domain([4 * 0.95, 8 * 1.001])
      .range([0, width])
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickSize(-height * 1.3).ticks(10))
      .select(".domain").remove()

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([-0.001, 9 * 1.01])
      .range([height, 0])
      .nice()
    svg.append("g")
      .call(d3.axisLeft(y).tickSize(-width * 1.3).ticks(7))
      .select(".domain").remove()

    // Customization
    svg.selectAll(".tick line").attr("stroke", "white")

    // Add X axis label:
    svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width / 2 + margin.left)
      .attr("y", height + margin.top + 20)
      .text("Sepal Length");

    // Y axis label:
    svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -margin.top - height / 2 + 20)
      .text("Petal Length")

    // Color scale: give me a specie name, I return a color
    var color = d3.scaleOrdinal()
      .domain(["setosa", "versicolor", "virginica"])
      .range(["#F8766D", "#00BA38", "#619CFF"])

    // Add dots
    svg.append('g')
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function (d) { return x(d.Sepal_Length); })
      .attr("cy", function (d) { return y(d.Petal_Length); })
      .attr("r", 5)
      .style("fill", function (d) { return color(d.Species) })

  })




  // set the dimensions and margins of the graph
  var margin = { top: 10, right: 30, bottom: 40, left: 50 },
    width = 600 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var Svg = d3.select("#my_dataviz2")

    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("background-color", '#FF5733')
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")")




  //Read the data
  d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv", function (data) {


    // Add X axis
    var x = d3.scaleLinear()
      .domain([4 * 0.95, 8 * 1.001])
      .range([0, width])

    Svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickSize(-height * 1.3).ticks(10))
      .select(".domain").remove()

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([-0.001, 9 * 1.01])
      .range([height, 0])
      .nice()
    Svg.append("g")
      .call(d3.axisLeft(y).tickSize(-width * 1.3).ticks(7))
      .select(".domain").remove()

    // Customization
    Svg.selectAll(".tick line").attr("stroke", "#FFF")

    // Add X axis label:
    Svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height + margin.top + 20)
      .text("Sepal Length")
      .style("fill", "white");

    // Y axis label:
    Svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -margin.top)
      .text("Petal Length")
      .style("fill", "white");

    // Color scale: give me a specie name, I return a color
    var color = d3.scaleOrdinal()
      .domain(["setosa", "versicolor", "virginica"])
      .range(["#402D54", "#D18975", "#8FD175"])

    // Add dots
    Svg.append('g')
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function (d) { return x(d.Sepal_Length); })
      .attr("cy", function (d) { return y(d.Petal_Length); })
      .attr("r", 5)
      .style("fill", function (d) { return color(d.Species) })

  })





};
