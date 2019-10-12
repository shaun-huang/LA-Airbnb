console.log('in citygraph:')
// Define SVG area dimensions
var svgWidth = 1500;
var svgHeight = 800;

// Define the chart's margins as an object
var chartMargin = {
  top: 100,
  right: 100,
  bottom: 100,
  left: 100
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
function citygraph(){
  var svg = d3.select("#citygraph")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

  // Append a group to the SVG area and shift ('translate') it to the right and to the bottom
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

  // Load data from hours-of-tv-watched.csv
  d3.json("/city", function(error, tvData) {
    if (error) throw error;
    // Cast the hours value to a number for each piece of tvData
    tvData.forEach(function(d) {
      d.city_y = +d.city_y;
    });

    // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
    var xBandScale = d3.scaleBand()
      .domain(tvData.map(d => d.name))
      .range([0, chartWidth])
      .padding(0.1);

    // Create a linear scale for the vertical axis.
    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(tvData, d => d.city_y)])
      .range([chartHeight, 0]);

    // Create two new functions passing our scales in as arguments
    // These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(xBandScale);
    var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

    // Append two SVG group elements to the chartGroup area,
    // and create the bottom and left axes inside of them
    chartGroup.append("g")
      .call(leftAxis);

    chartGroup.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(bottomAxis);

    // Create one SVG rectangle per piece of tvData
    // Use the linear and band scales to position each rectangle within the chart
    chartGroup.selectAll(".bar")
      .data(tvData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => xBandScale(d.name))
      .attr("y", d => yLinearScale(d.city_y))
      .attr("width", xBandScale.bandwidth())
      .attr("height", d => chartHeight - yLinearScale(d.city_y));

  });
};
function citybar(){
  var svg = d3.select("#citybar")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

  // Append a group to the SVG area and shift ('translate') it to the right and to the bottom
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

  // Load data from hours-of-tv-watched.csv
  d3.json("/score", function(error, scoreData) {
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
  var tooltip = d3.select("#house").append("div")
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


    chartGroup.selectAll("dot")
      .data(scoreData)
      .enter()
      .append("circle")
      .attr("r", d => d.number_of_reviews / 10)
      .attr("cx", d => xLinearScale(d.population))
      .attr("cy", d => yLinearScale(d.review_scores_rating))
      .on("mouseover", tipMouseover)
      .on("mouseout", tipMouseout);


  });

};

function listing(){
  var svg = d3.select("#listing")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

  // Append a group to the SVG area and shift ('translate') it to the right and to the bottom
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

  // Load data from hours-of-tv-watched.csv
  d3.json("/listing", function(error, hostData) {
    if (error) throw error;

    console.log(hostData);

    // Cast the hours value to a number for each piece of tvData
    hostData.forEach(function(d) {
      d.host_since = +d.host_since;
    });

    // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
    var xBandScale = d3.scaleBand()
      .domain(hostData.map(d => d.year))
      .range([0, chartWidth])
      .padding(0.1);

    // Create a linear scale for the vertical axis.
    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(hostData, d => d.host_since)])
      .range([chartHeight, 0]);

    // Create two new functions passing our scales in as arguments
    // These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(xBandScale);
    var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

    // Append two SVG group elements to the chartGroup area,
    // and create the bottom and left axes inside of them
    chartGroup.append("g")
      .call(leftAxis);

    chartGroup.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(bottomAxis);

    // Create one SVG rectangle per piece of tvData
    // Use the linear and band scales to position each rectangle within the chart
    chartGroup.selectAll(".bar")
      .data(hostData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => xBandScale(d.year))
      .attr("y", d => yLinearScale(d.host_since))
      .attr("width", xBandScale.bandwidth())
      .attr("height", d => chartHeight - yLinearScale(d.host_since));

  });
};
function property(){
  var svg = d3.select("#property")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

  // Append a group to the SVG area and shift ('translate') it to the right and to the bottom
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

  // Load data from hours-of-tv-watched.csv
  d3.json("/property", function(error, propertyData) {
    if (error) throw error;

    console.log(propertyData);

    // Cast the hours value to a number for each piece of tvData
    propertyData.forEach(function(d) {
      d.property_type = +d.property_type;
    });

    // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
    var xBandScale = d3.scaleBand()
      .domain(propertyData.map(d => d.name))
      .range([0, chartWidth])
      .padding(0.1);

    // Create a linear scale for the vertical axis.
    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(propertyData, d => d.property_type)])
      .range([chartHeight, 0]);

    // Create two new functions passing our scales in as arguments
    // These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(xBandScale);
    var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

    // Append two SVG group elements to the chartGroup area,
    // and create the bottom and left axes inside of them
    chartGroup.append("g")
      .call(leftAxis);

    chartGroup.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(bottomAxis);

    // Create one SVG rectangle per piece of tvData
    // Use the linear and band scales to position each rectangle within the chart
    chartGroup.selectAll(".bar")
      .data(propertyData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => xBandScale(d.name))
      .attr("y", d => yLinearScale(d.property_type))
      .attr("width", xBandScale.bandwidth())
      .attr("height", d => chartHeight - yLinearScale(d.property_type));

  });

};

function house(){
  var svg = d3.select("#house")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

  // Append a group to the SVG area and shift ('translate') it to the right and to the bottom
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

  // Load data from hours-of-tv-watched.csv
  d3.json("/house", function(error, scoreData) {
    if (error) throw error;

    console.log(scoreData);

    // Cast the hours value to a number for each piece of tvData
    scoreData.forEach(function(d) {
      d.review_scores_rating = +d.review_scores_rating;
    });

    // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
    var xLinearScale = d3.scaleLinear()
      .domain([300000,4000000])
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
  var tooltip = d3.select("#house").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

  // tooltip mouseover event handler
  var tipMouseover = function(d) {
    console.log(d.neighbourhood)
  var html  = "<span>" + d.neighbourhood + "</span><br/>"
  tooltip.html(html)
      .style("left", (d3.event.pageX + 15) + "px")
      .style("top", (d3.event.pageY - 28) + "px")
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


    chartGroup.selectAll("dot")
      .data(scoreData)
      .enter()
      .append("circle")
      .attr("r", d => d.number_of_reviews / 10)
      .attr("cx", d => xLinearScale(d.house_price))
      .attr("cy", d => yLinearScale(d.review_scores_rating))
      .on("mouseover", tipMouseover)
      .on("mouseout", tipMouseout);


  });
}
listing();
property();
citygraph();
citybar();
house()