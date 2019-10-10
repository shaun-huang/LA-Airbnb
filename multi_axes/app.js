// Chart Params
var svgWidth = 960;
var svgHeight = 500;

var margin = { top: 20, right: 40, bottom: 60, left: 50 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import data from an external CSV file
d3.csv("multiaxes_df.csv", function(error, multiData) {
  if (error) throw error;

  console.log(multiData);
  console.log([multiData]);

  // Create a function to parse date and time
  //var parseTime = d3.timeParse("%d-%b-%Y");

  // Format the data
  multiData.forEach(function(data) {
    data.city = data.city;
    data.log_price = +data.log_price;
    data.number_of_reviews = +data.number_of_reviews;
  });

  // Create scaling functions
  var xBandScale = d3.scaleBand()
    .domain(d3.map(multiData, d => d.city))
    .range([0, width])
    .padding(0.1);

  var yLinearScale1 = d3.scaleLinear()
    .domain([0, d3.max(multiData, d => d.log_price)])
    .range([height, 0]);

  var yLinearScale2 = d3.scaleLinear()
    .domain([0, d3.max(multiData, d => d.number_of_reviews)])
    .range([height, 0]);

  // Create axis functions
  var bottomAxis = d3.axisBottom(xBandScale);
  var leftAxis = d3.axisLeft(yLinearScale1);
  var rightAxis = d3.axisRight(yLinearScale2);

  // Add x-axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // Add y1-axis to the left side of the display
  chartGroup.append("g")
    // Define the color of the axis text
    .classed("green", true)
    .call(leftAxis);

  // Add y2-axis to the right side of the display
  chartGroup.append("g")
    // Define the color of the axis text
    .classed("blue", true)
    .attr("transform", `translate(${width}, 0)`)
    .call(rightAxis);

  // Line generators for each line
  var line1 = d3.line()
    .x(d => xBandScale(d.city))
    .y(d => yLinearScale1(d.log_price));

  var line2 = d3.line()
    .x(d => xBandScale(d.city))
    .y(d => yLinearScale2(d.number_of_reviews));

  // Append a path for line1
  chartGroup.append("path")
    .data([multiData])
    .attr("d", line1)
    .classed("line green", true);

  // Append a path for line2
  chartGroup.append("path")
    .data([multiData])
    .attr("d", line2)
    .classed("line blue", true);

  // Append axes titles
  chartGroup.append("text")
  .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
    .classed("city-text text", true)
    .text("Index");

  chartGroup.append("text")
  .attr("transform", `translate(${width / 2}, ${height + margin.top + 37})`)
    .classed("review-text text", true)
    .text("Airbnb");
});
