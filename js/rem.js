function recalc() {
	var clientWidth = document.documentElement.clientWidth;
	if (!clientWidth) return;
	document.documentElement.style.fontSize = 40 * (clientWidth / 750) + 'px';
}

function initRecalc() {
	recalc();
	var resizeEvt = 'osrientationchange' in window ? 'osrientationchange' : 'resize';
	if (!document.addEventListener) return;
	window.addEventListener(resizeEvt, recalc, false);
	document.addEventListener('DOMContentLoaded', recalc, false);
}
initRecalc();
