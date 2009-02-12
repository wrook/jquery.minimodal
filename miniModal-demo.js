
$(document).ready(function(){
	$(".poem").each(function(){
		$this = $(this);
		poemId = $("pre", $this)[0].id;
		$this.append($('<button id="btnEdit-' + poemId + '" class="editPoemButton {poemId:' + "'" + poemId + "'" + '}">Edit</button>'))
	});

	$(".editPoemButton").miniModal({
		overlay: 10,
		onBeforeShow: function($this) {
			var poem = $("#" + $this.metadata.poemId).html();
			$(".editPoem", $this).val(poem);
			return true;
		},
		onOk: function($this) {
			$("#" + $this.metadata.poemId).html( $(".editPoem", $this).val() )
			return true;
		},
		templateWindow: function($this) {
			// Returns a custom template taken from a hidden div in the dom
			var newModal = $("#editPoemModalTemplate").clone();
			newModal[0].id = "";
			return newModal;
		}
	});
})
