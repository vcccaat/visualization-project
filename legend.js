 function drawLegend(countArr, legend, legendColorScale) {
			const legendWidth = legend.attr('width');
			const legendHeight = legend.attr('height');
			const legendMinMax = d3.extent(legendColorScale.domain());
			const barHeight = 25;
			const stepSize = 4;

			// Extend the minmax by 1 in either direction to expose more features
			// create pixel and bar scale
			const pixelScale = d3
				.scaleLinear()
				.domain([0, legendWidth - 40])
				.range([legendMinMax[0] - 1, legendMinMax[1] + 1]);
			const barScale = d3
				.scaleLinear()
				.domain([legendMinMax[0] - 1, legendMinMax[1] + 1])
				.range([0, legendWidth - 40]);
			const barAxis = d3.axisBottom(barScale);

			// Check if we're using a quantile scale
			if (legendColorScale.hasOwnProperty('quantiles')) {

				// Use the quantile breakpoints plus the min and max of the scale as tick values
				barAxis.tickValues(legendColorScale.quantiles().concat(legendMinMax));
			}
			legend
				.append('g')
				.attr('class', 'colorbar axis')
				.attr('transform', 'translate(' + 20 + ',' + (barHeight + 5) + ')')
				.call(barAxis);

			// Draw rects of color down the bar
			let bar = legend.append('g').attr('transform', 'translate(' + 20 + ',' + 0 + ')');
			for (let i = 0; i < legendWidth - 40; i = i + stepSize) {
				bar
					.append('rect')
					.attr('x', i)
					.attr('y', 0)
					.attr('width', stepSize)
					.attr('height', barHeight)
					.style('fill', legendColorScale(pixelScale(i))); // pixels => countData => color
			}
			// Put lines in to mark actual min and max of our data
			// bar
			// 	.append('line')
			// 	.attr('stroke', 'white')
			// 	.attr('stroke-width', 3)
			// 	.attr('x1', barScale(legendMinMax[0]))
			// 	.attr('x2', barScale(legendMinMax[0]))
			// 	.attr('y1', 0)
			// 	.attr('y1', barHeight + 4).
			
			// bar
			// 	.append('line')
			// 	.attr('stroke', 'white')
			// 	.attr('stroke-width', 3)
			// 	.attr('x1', barScale(legendMinMax[1]))
			// 	.attr('x2', barScale(legendMinMax[1]))
			// 	.attr('y1', 0)
			// 	.attr('y1', barHeight + 4);
		}