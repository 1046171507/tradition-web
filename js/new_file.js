$(function() {
	$('import').each(function() {
		var $this = $(this),
			$href = $this.attr('href');
		if($href) {
			var $hrefSrc = $href.substring(0, $href.search('html') + 4);
			var $hrefID = $href.substring($href.search('html') + 4);
			$.ajax({
				type: "get",
				url: $hrefSrc,
				async: false,
				success: function(data) {
					var content = $(data).filter($hrefID);
					$this.replaceWith(content);
					content = null
				},
				error: function() {
					console.error('文件' + $hrefSrc + '请求失败')
				}
			})
		}
	})
});