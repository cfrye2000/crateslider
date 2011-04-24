function parseNodes(nodes) { // takes a nodes array and turns it into a <ol>
    var ul = document.createElement("ul");
    ul.id = "slider1";
    ul.className="slider1";
    for(var i=0; i<nodes.length; i++) {
        ul.appendChild(parseNode(nodes[i]));
    }
    return ul;
}

function parseNode(node) { // takes a node object and turns it into a <li>
    var li = document.createElement("LI");
    li.innerHTML = node.doc.name;
    li.className = "category";
    li.id = node.doc.id;
    return li;
}

function getRootCategories(){
	$.getJSON("http://crateandbarrel.couchone.com/category_categories/_all_docs?startkey=%220:0%22&endkey=%220:%5cu9999%22&include_docs=true&&callback=?",
		function(data) {
			alert(data.total_rows);
			myJSONObject = data;
		}
	);
}
