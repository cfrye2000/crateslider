function parseNode(node) { // takes a node object and turns it into a <li>
    var li = document.createElement("LI");
    li.innerHTML = node.doc.name;
    li.className = "category";
    li.id = node.doc.id;
    return li;
}


function parseNodes(nodes, idString) { // takes a nodes array and turns it into a <ol>
    var ul = document.createElement("ul");
    ul.id = idString;
    ul.className="slider1";
    for(var i=0; i<nodes.length; i++) {
        ul.appendChild(parseNode(nodes[i]));
    }
    return ul;
}



function getRootCategories(){
	$.getJSON("http://crateandbarrel.couchone.com/category_categories/_all_docs?startkey=%220:0%22&endkey=%220:%5cu9999%22&include_docs=true&&callback=?",
		function(data) {
			alert(data.total_rows);
			myJSONObject = data;
		}
	);
}

function addSlider(categoryId, sliderName, depth){
    $.getJSON("http://crateandbarrel.couchone.com/category_categories/_all_docs?startkey=%22" + categoryId + ":0%22&endkey=%22"+ categoryId +":%5cu9999%22&include_docs=true&&callback=?",
        function(data) {
            if ($("#"+sliderName).length === 0) {
                $('body').append(parseNodes(data.rows, sliderName));
            } else {
                $("bx-wrapper").remove();
                $("#"+sliderName).replaceWith(parseNodes(data.rows, sliderName));
            }
            var slider =  $('#' + sliderName).bxSlider({
                infiniteLoop: false,
                hideControlOnEnd: true,
                onNextSlide: function(currentSlide, totalSlides, currentSlideHTML){
                    if (depth > 0){
                        addSlider($(currentSlideHTML).attr("id"), sliderName + '1', depth-1);
                    }
                },
                onPrevSlide: function(currentSlide, totalSlides, currentSlideHTML){
                    if (depth > 0) {
                        addSlider($(currentSlideHTML).attr("id"), sliderName + '1', depth-1);
                    }
                }
            });
            
            
        }
    );       
}
