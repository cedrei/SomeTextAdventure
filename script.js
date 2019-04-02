function writeParagraph(text) {
	$("#text-area").append("<p>"+text+"</p>")
}

var finishFunction;
var isCursorVisible = true
var writeMode = "off"
function blinkCursor() {
	if (isCursorVisible) {
		isCursorVisible = false
		$(".cursor").hide()
	} else {
		isCursorVisible = true
		$(".cursor").show()
	}
}
setInterval(blinkCursor, 500)

function waitForFinishTyping() {
	var deferred = $.Deffered()

	setInterval(function(){
		if (writeMode == "off") {
			deffered.resolve()
		}
	}, 20)

	return $.when(deffered).done(function() {
		console.log("Typing finished")
	}).promise()
}

function getInput(outputFunction) {
	writeMode = "on"
	$("#text-area").append(" <span class='pointer'>></span> <span id='inputText'></span><span class='cursor'>|</span> ")
	finishFunction = outputFunction;
}

$(document).keypress(function(event) {
	if (writeMode != "on") {
		return
	}
	$("#inputText").append(String.fromCharCode(event.which))
	console.log(event.which)
	if (event.which == 8) {
		$("#inputText").text($("#inputText").text().slice(0,-2))
	} else if (event.which == 13) {
		if (writeMode == "on") {
			writeMode = "off"
			let text = $("#inputText").text()
			$(".cursor").remove()
			$("#inputText").removeAttr("id")
			finishFunction(text)
		}
	}
})

writeParagraph('Many many years ago, In a country somewhat far away...') 
writeParagraph('In the far south')

getInput(part2)

function part2(text) {
	writeParagraph(text)
	getInput(part3)
}

function part3(text) {
	writeParagraph(text)
}
