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
};

function chart(){
  var svg = d3
  .select("#chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  // Append an SVG group
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

  // Initial Params
  var chosenXAxis = "number_of_reviews";

  // function used for updating x-scale var upon click on axis label
  function xScale(propData, chosenXAxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(propData, d => d[chosenXAxis]) * 0.1,
        d3.max(propData, d => d[chosenXAxis]) * 1.2
      ])
      .range([0, chartWidth]);

    return xLinearScale;

  }

  // function used for updating xAxis var upon click on axis label
  function renderAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);

    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);

    return xAxis;
  }

  // function used for updating circles group with a transition to
  // new circles
  function renderCircles(circlesGroup, newXScale, chosenXaxis) {

    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenXAxis]));

    return circlesGroup;
  }

  // function used for updating circles group with new tooltip
  function updateToolTip(chosenXAxis, circlesGroup) {

    if (chosenXAxis === "number_of_reviews") {
      var label = "Number of Reviews:";
    }
    else {
      var label = "#:";
    }

    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.property_type}<br>${label} ${d[chosenXAxis]}`);
      });

    circlesGroup.call(toolTip);

    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    return circlesGroup;
  }

  // Retrieve data from the CSV file and execute everything below
  d3.json("/chart", function(err, propData) {
    if (err) throw err;

    // parse data
    propData.forEach(function(data) {
      data.number_of_listings = +data.number_of_listings;
      data.review_scores = +data.review_scores_rating;
      data.price = +data.price;
    });

    // xLinearScale function above csv import
    var xLinearScale = xScale(propData, chosenXAxis);

    // Create y scale function
    var yLinearScale = d3.scaleLinear()
      .domain([88, d3.max(propData, d => d.review_scores_rating)])
      .range([chartHeight, 0]);

    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // append x axis
    var xAxis = chartGroup.append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(bottomAxis);

    // append y axis
    chartGroup.append("g")
      .call(leftAxis);

    // append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
      .data(propData)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d[chosenXAxis]))
      .attr("cy", d => yLinearScale(d.review_scores_rating))
      .attr("r", 20)
      .attr("fill", "pink")
      .attr("opacity", ".5");

    // Create group for  2 x- axis labels
    var labelsGroup = chartGroup.append("g")
      .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 20})`);

    var reviewLabel = labelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 20)
      .attr("value", "number_of_reviews") // value to grab for event listener
      .classed("active", true)
      .text("Number of Reviews");

    var priceLabel = labelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 40)
      .attr("value", "price") // value to grab for event listener
      .classed("inactive", true)
      .text("Price");

    // append y axis
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - chartMargin.left)
      .attr("x", 0 - (chartHeight / 2))
      .attr("dy", "1em")
      .classed("axis-text", true)
      .text("Rating Score");

    // updateToolTip function above csv import
    var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

    // x axis labels event listener
    labelsGroup.selectAll("text")
      .on("click", function() {
        // get value of selection
        var value = d3.select(this).attr("value");
        if (value !== chosenXAxis) {

          // replaces chosenXAxis with value
          chosenXAxis = value;

          // console.log(chosenXAxis)

          // functions here found above csv import
          // updates x scale for new data
          xLinearScale = xScale(propData, chosenXAxis);

          // updates x axis with transition
          xAxis = renderAxes(xLinearScale, xAxis);

          // updates circles with new x values
          circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

          // updates tooltips with new info
          circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

          // changes classes to change bold text
          if (chosenXAxis === "price") {
            priceLabel
              .classed("active", true)
              .classed("inactive", false);
            reviewLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          else {
            priceLabel
              .classed("active", false)
              .classed("inactive", true);
            reviewLabel
              .classed("active", true)
              .classed("inactive", false);
          }
        }
      });
  });
}
listing();
property();
citygraph();
citybar();
house();
chart();