(function(jQuery) {
	/*监控通过加jQuery添加节点元素*/
	var watchHtml = function(value) {
		console.log(value)
	};

	jQuery.fn.extend({
		append: function() {
			return this.domManip(arguments, function(elem) {
				if(this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var target = manipulationTarget(this, elem);
					target.appendChild(elem);
					watchHtml && watchHtml(elem);
				}
			});
		},
		html: function(value) {
			return jQuery.access(this, function(value) {
				var elem = this[0] || {},
					i = 0,
					l = this.length;
				if(value === undefined && elem.nodeType === 1) {
					return elem.innerHTML;
				}
				if(typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
					value = value.replace(rxhtmlTag, "<$1></$2>");
					try {
						for(; i < l; i++) {
							elem = this[i] || {};
							if(elem.nodeType === 1) {
								jQuery.cleanData(getAll(elem, false));
								elem.innerHTML = value;
							}
						}
						elem = 0;
					} catch(e) {}
				}
				if(elem) {
					this.empty().append(value);
				}
			}, null, value, arguments.length);
		},
		prepend: function() {
			return this.domManip(arguments, function(elem) {
				if(this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var target = manipulationTarget(this, elem);
					target.insertBefore(elem, target.firstChild);
				};
				watchHtml && watchHtml(elem);
			});
		},
		before: function() {
			return this.domManip(arguments, function(elem) {
				if(this.parentNode) {
					this.parentNode.insertBefore(elem, this);
				};
				watchHtml && watchHtml(elem);
			});
		},
		after: function() {
			return this.domManip(arguments, function(elem) {
				if(this.parentNode) {
					this.parentNode.insertBefore(elem, this.nextSibling);
				};
				watchHtml && watchHtml(elem);
			});
		},
		replaceWith: function() {
			var args = jQuery.map(this, function(elem) {
					return [elem.nextSibling, elem.parentNode];
				}),
				i = 0;
			this.domManip(arguments, function(elem) {
				var next = args[i++],
					parent = args[i++];
				if(parent) {
					jQuery(this).remove();
					parent.insertBefore(elem, next);
					watchHtml && watchHtml(elem);
				}
			}, true);
			return i ? this : this.remove();
		}
	});
	var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		rtagName = /<([\w:]+)/,
		rhtml = /<|&#?\w+;/,
		rnoInnerhtml = /<(?:script|style|link)/i,
		manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptType = /^$|\/(?:java|ecma)script/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
		wrapMap = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			thead: [1, "<table>", "</table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			_default: [0, "", ""]
		};

	function manipulationTarget(elem, content) {
		return jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType === 1 ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
	}
})(window.jQuery);