// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from hours-of-tv-watched.csv
d3.csv("score_df.csv", function(error, scoreData) {
  if (error) throw error;

  console.log(scoreData);

  // Cast the hours value to a number for each piece of tvData
  scoreData.forEach(function(d) {
    d.review_scores_rating = +d.review_scores_rating;
  });

  // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
  var xLinearScale = d3.scaleLinear()
    .domain([0,110000])
    .range([0, chartWidth])
  

  // Create a linear scale for the vertical axis.
  var yLinearScale = d3.scaleLinear()
    .domain([90, d3.max(scoreData, d => d.review_scores_rating)])
    .range([chartHeight, 0]);

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale).ticks();

  // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them
  chartGroup.append("g")
    .call(leftAxis);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  // Create one SVG rectangle per piece of tvData
  // Use the linear and band scales to position each rectangle within the chart
//   chartGroup.selectAll(".bar")
//     .data(scoreData)
//     .enter()
//     .append("rect")
//     .attr("class", "bar")
//     .attr("x", d => xBandScale(d.city_y))
//     .attr("y", d => yLinearScale(d.review_scores_rating))
//     .attr("width", xBandScale.bandwidth())
//     .attr("height", d => chartHeight - yLinearScale(d.review_scores_rating));

// });
var tooltip = d3.select("body").append("div")
.attr("class", "tooltip")
.style("opacity", 0);

// tooltip mouseover event handler
var tipMouseover = function(d) {
var html  = "<span>" + d.neighbourhood + "</span><br/>"
tooltip.html(html)
  .style("left", (d3.event.pageX - 34) + "px")
  .style("top", (d3.event.pageY - 12) + "px")
.transition()
    .duration(200) // ms
    .style("opacity", .9) // started as 0!
};
// tooltip mouseout event handler
var tipMouseout = function(d) {
tooltip.transition()
    .duration(300) // ms
    .style("opacity", 0); // don't care about position!
};


  chartGroup.selectAll("scatter-dots")
    .data(scoreData)
    .enter()
    .append("circle")
    .attr("r", d => d.number_of_reviews / 10)
    .attr("cx", d => xLinearScale(d.population))
    .attr("cy", d => yLinearScale(d.review_scores_rating))
    .on("mouseover", tipMouseover)
    .on("mouseout", tipMouseout);


});

