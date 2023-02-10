let str = "";

let words = [];
let words_temp = [];

let selected = [];
let answer = [];

let correct_answer = [];

let answer_mode = false;
let answer_clicked = false;

$(".check_answer").hide();

$("#number_start").val(1);
$("#number_length").val(4);

$(".guide_of_set").on('input',function(){
	update_answer();
});

$("#btn_clear").click(function() {    
	$("#input").val('');
	str = "";
	convert();
	update_answer();
	$('#btn_answer_mode').prop('checked', false);
});

$("#btn_answer_mode").click(function() {
	answer_mode = !answer_mode;
	answer_clicked = false;

	if (answer_mode) {
		$(".guide_of_set").hide();
		$("#number_start").hide();
		$("#number_length").hide();
		$("#show_answer").hide();
	} else {
		$(".guide_of_set").show();
		$("#number_start").show();
		$("#number_length").show();
		$("#show_answer").show();
		$(".check_answer").hide();

		for (let i = 0; i < selected.length; ++i) {
			$('#' + selected[i]).css("color", "black");
		}
	}
})

$("#btn_check_answer").click(function(){
	if ($("#btn_check_answer").is(':checked')) {
		for (let i = 0; i < selected.length; ++i) {
			if (correct_answer[i] == $('#' + selected[i]).text().substring(4, 5)) {
				$('#' + selected[i]).css("color", "blue");
			} else {
				$('#' + selected[i]).css("color", "red");
			}
		}
	} else {
		for (let i = 0; i < selected.length; ++i) {
		   $('#' + selected[i]).css("color", "black");
		}
	}           
})

$("#input").on('input', function() {
	str = $("#input").val();
	convert();
});

function convert(){
	words = [];
	words_temp = [];
	selected = [];

	$(".check_answer").hide();
	$(".guide_of_set").show();
	$("#number_start").show();
	$("#number_length").show();
	$("#show_answer").show();

	answer_mode = false;
	answer_clicked = false
	$('#btn_answer_mode').prop('checked', false);

	words = str.split(" ");

    let count = 0;
    for (let i = 0; i < words.length; ++i) {
        words_temp[i + count] = words[i];
		words_temp[i + count + 1] = " ";
		count += 1;
    }
	words = words_temp;

	count = 0; words_temp = [];
    for (let i = 0; i < words.length; ++i) {   
		words_temp[i + count] = '';

		if (words[i] == ' ') {
			words_temp[i + count] = words[i];
		} else {
			for (let j = 0; j < words[i].length; ++j) {
				if (words[i].charCodeAt(j) < 65 || 
					words[i].charCodeAt(j) > 90 && words[i].charCodeAt(j) < 97 ||
					words[i].charCodeAt(j) > 122) {

					if (j == words[i].length - 1) {     // Char is at the end of the string.
						count += 1;
						words_temp[i + count] = String.fromCharCode(words[i].charCodeAt(j));
					} else if (words_temp[i + count] != '' && j != 0) {     // Char is at the middle of the string.
						count += 1;
						words_temp[i + count] = String.fromCharCode(words[i].charCodeAt(j));
						count += 1;
						words_temp[i + count] = '';
					} else {       // Char is at the beginning of the string.
						words_temp[i + count] = String.fromCharCode(words[i].charCodeAt(j));
						count += 1;
						words_temp[i + count] = '';
					}		

				} else {                            // Common Situation
					words_temp[i + count] += String.fromCharCode(words[i].charCodeAt(j));
				}
			}
		}
    }
    words = words_temp;

	$("#main").empty();
	for (let i = 0; i < words.length; ++i) {
		const id = i
		
		if (words[i].includes("\n\n")) {
			let temp = 0

			for (let j = 0; j < words[i].length; ++j) {
				if (words[i].charAt(j) == "\n") {
					temp += 1
				}
			}
			for (let j = 0; j < temp; ++j) {
				$("#main").append('<br />');
			}
		} else if (words[i].includes(" ") || 
			words[i].includes(".") || words[i].includes(",") || 
			words[i].includes("!") || words[i].includes("?") || 
			words[i].includes(";") || words[i].includes(":") || 
			words[i].includes("“") || words[i].includes("”") ||
			words[i].includes("'") || words[i].includes('"') ||
			words[i].includes("—") || words[i].includes("-") ||
			words[i].includes("(") || words[i].includes(")") || 
			words[i].includes("[") || words[i].includes("]") ||
			words[i].includes("{") || words[i].includes('}')) {
				$("#main").append('<span class="not_word" id="'+ id + '">');
				$('#'+ id).text(words[i]);			
		} else if (words[i].includes("\n")) {
			$("#main").append('<br />');
		} else {
			$("#main").append('<span class="word" id="'+ id + '">');
			$('#'+ id).text(words[i]);	
		}
	}
	$("#main").append('<br />');
}

$(document).on('click', '.word', function() {
	const id = $(this).attr('id');

	if (!answer_mode) {
		if (selected.includes(id)) {
			selected.splice(selected.indexOf(id), 1);
			$(this).text(words[id]);
		} else {
			selected.push(id);		
		}	
		selected.sort(function(a, b) {return a - b});

		update_answer();
	} else {
		if (answer_clicked) {
			if (selected.includes(id)) {
				$('#' + id).text('(' + (selected.indexOf(id) + 1) + ')' + '_' + previous_clicked + '__' + ' ');  

				$("#" + previous_clicked).css("color", "black");

				answer_clicked = false;
				previous_clicked = "";

				$(".check_answer").show();
			}
		}
	}
})

let previous_clicked = "";
$(document).on('click', '.answer', function() {
	$('#btn_check_answer').prop('checked', false);
	if (answer_mode) {
		if ($(this).attr('id') != previous_clicked) {              
			$(this).css("color", "purple");
			
			for (i = 0; i < selected.length; ++i) {
				const id = selected[i];
				$("#" + id).css("color", "#000000")
			}

			if (answer_clicked) {
				$("#" + previous_clicked).css("color", "black");
			}
			previous_clicked = $(this).attr('id');
			answer_clicked = true;
		} else {
			$(this).css("color", "black");
			previous_clicked = "";
			answer_clicked = false;              
		}
	}        
})

function update_answer() {
	answer = [];

	for (const id of selected) 
		answer.push(words[id]);
	answer.sort();

	for (let i = 0; i < selected.length; ++i) {
		const id = selected[i];
		const word = words[id];
		
		let add = parseInt($("#number_start").val());
		if (isNaN(add)) add = 1;

		let len = parseInt($("#number_length").val()) - 2;
		if (isNaN(len)) len = 1;
		const under = '_'.repeat(len);

		let ans = $("#show_answer").is(':checked')? String.fromCharCode(65 + answer.indexOf(word)) : '_';
		
		$('#' + id).text('(' + (i+add) + ')' + '_' + ans + under);
        correct_answer[i] = String.fromCharCode(65 + answer.indexOf(word));
	}

	$("#answer").empty();
	for (let i = 0; i < answer.length; ++i) {
		const ans_header = String.fromCharCode(65+i);
		$("#answer").append('<span class="answer" id="'+ ans_header + '">');

		if (answer[i].charCodeAt(0) >= 65 && answer[i].charCodeAt(0) <= 90)
			$('#'+ ans_header).text('(' + ans_header +')' + answer[i].charAt(0).toLowerCase() + answer[i].substring(1, answer[i].length) + ' ');
		else
			$('#'+ ans_header).text('(' + ans_header +')' + answer[i] + ' ');
	}
}

$("#btn_copy").click(function() {
	let copy_str = '';

	$("#main").children().each(function () {
		if ($(this).attr('class') == 'word' || $(this).attr('class') == 'not_word') {
			copy_str += $(this).text();
		} else {
			copy_str += "\n";
		}
	});

	copy_str += '\n\n';

	$("#answer").children().each(function () {
		copy_str += $(this).text();
	});

	copyToClipboard(copy_str);
});

function copyToClipboard(str) {
	  const element = document.createElement('textarea');
	  element.value = str;
	  document.body.appendChild(element);
	  element.select();
	  document.execCommand('copy');
	  document.body.removeChild(element);
};