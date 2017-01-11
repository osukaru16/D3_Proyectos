var datos = [];

function cargarDatos() {
    d3.json('json/datos.json', function(err, data) {
        datos = data;
        dibujar();
    });
}

function dibujar() {
    var width = 800;
    var height = 500;


	//alert(datos.description);


    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(40,0)");

    var cluster = d3.layout.cluster()
        .size([height, width - 160]);

    var diagonal = d3.svg.diagonal()
        .projection(function(d) {
            return [d.y, d.x];
        });

    var nodes = cluster.nodes(datos);

    var links = cluster.links(nodes);
	
	
	var div = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);
	
	
	
	
	


 var link = svg.selectAll(".link")
        .data(links)
        .enter().append("path")
        .attr("class", "link")
        .attr("d", diagonal);

 var node = svg.selectAll(".node")
        .data(nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
            return "translate(" + d.y + "," + d.x + ")";
        });
		
		

    node.append("circle")
        .attr("r", 5.5)
		.on("mouseover", function(d) {
			div.transition()        
                .duration(200)      
                .style("opacity", .9);      
            div .html(d.description + "<br/>")  
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY - 28) + "px")
				.style("width", ((d.description).length)*8 + "px");    
            })                  
        .on("mouseout", function(d) {       
            div.transition()        
                .duration(500)      
                .style("opacity", 0);   
        });
		
		
		
		
		
		
		
		
		
		
		
		

	node.append("text")
        .attr("dx", function(d) {
            return d.children ? 40 : 8;
        })
        .attr("dy", function(d) {
            return d.children ? -8 : 3;
        })
        .style("text-anchor", function(d) {
            return d.children ? "end" : "start";
        })
        .text(function(d) {
            return d.name;
        });
		
		


}
