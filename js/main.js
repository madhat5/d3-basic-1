/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

// console.log('sim sim salabim');


// CANVAS + MARGINS
// =================

var margin, width, height, g;

margin = {
    left: 100,
    right: 10,
    top: 40,
    bottom: 150
};

width = 600 - margin.left - margin.right,
height = 450 - margin.top - margin.bottom;

// append canvas + main group
g = d3.select('#chart-area')
    .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.bottom + margin.top)
    .append('g')
        .attr('transform', 'translate(' + margin.left + margin.top + ")");


// LABELS
// =======

// X
g.append('text')
    .attr('class', 'x axis-label')
    .attr('x', width / 2)
    .attr('y', height + 75)
    .attr('font-size', '21px')
    .attr('text-anchor', 'middle')
    .text('Month');

// Y
g.append('text')
    .attr('class', 'y axis-label')
    .attr('x', -(height / 2))
    .attr('y', -75)
    .attr('font-size', '21px')
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .text('Revenue ($)');


// DATA
// =====

d3.json('data/revenues.json').then( data => {
    console.log(data);

    data.forEach( d => {
        d.revenue = +d.revenue;
        d.profit = +d.profit;
    });

    var x, y, xAxisCall, yAxisCall, rects;

    x = d3.scaleBand()
        .domain(data.map(d => {
            return d.month;
        }))
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3);

    y = d3.scaleLinear()
        .domain([0, d3.max(data, d => {
            return d.revenue;
        })])
        .range([height, 0]);

    xAxisCall = d3.axisBottom(x);
    g.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxisCall);
        // .selectAll('text')
        // .attr('y', '10')
        // .attr('x', '-5')
        // .attr('text-anchor', 'end')
        // .attr('transform', 'rotate(-40)');
    
    yAxisCall = d3.axisLeft(y)
        // .ticks(3)
        .tickFormat(d => {
            return '$' + d;
        })
    g.append('g')
        .attr('class', 'y-axis')
        .call(yAxisCall);

    rects = g.selectAll('rect')
        .data(data);

    rects.enter()
        .append('rect')
        .attr('y', d => {
            return y(d.revenue);
        })
        .attr('x', d => {
            return x(d.month);
        })
        .attr('height', d => {
            return height - y(d.revenue);
        })
        .attr('width', x.bandwidth)
        .attr('fill', '#007041');
    
})