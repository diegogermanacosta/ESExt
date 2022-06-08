var _dayInMilisecond = 1000 * 60 * 60 * 24;

var UTIL = {
	padLeft: function(nr, n, str){
	    return Array(n-String(nr).length+1).join(str) + nr;
	},
	padRight: function(nr, n, str){
	    return nr + Array(n-String(nr).length+1).join(str);
	},
	formatTime: function(s) {
		var ms = s % 1000;
		s = (s - ms) / 1000;
		var secs = s % 60;
		s = (s - secs) / 60;
		var mins = s % 60;
		var hrs = (s - mins) / 60;

		return UTIL.padLeft(hrs, 2, '0') + 'h:' + UTIL.padLeft(mins, 2, '0') + 'm';
	},
	injectCode: function(file) {
		var script = document.createElement('script');
		script.src = chrome.runtime.getURL(file);
		script.onload = function() {
			this.remove();
		};
		(document.head||document.documentElement).appendChild(script);
	}
}

Date.prototype.addHours = function(h) {
   this.setTime(this.getTime() + (h*60*60*1000));
   return this;
}

Date.prototype.addMinutes = function(h) {
   this.setTime(this.getTime() + (h*60*1000));
   return this;
}

Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + parseInt(days));
    return this;
};

Date.prototype.formatDate = function() {
	return UTIL.padLeft(this.getHours(), 2, '0') + ":" + UTIL.padLeft(this.getMinutes(), 2, '0') + "hs";
}

Date.prototype.timeElapsed = function() {
	return Math.abs(new Date() - this);
}
