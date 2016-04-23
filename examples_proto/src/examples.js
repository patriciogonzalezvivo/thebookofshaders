var shaderList = {
	"02":[	"02/hello_world"],

	"03":[	"03/time", 
			"160319050916"],

	"05":["05/linear",
			"05/expo",
			"03/space",
			"05/smoothstep",
			"05/cubicpulse",
			"05/expstep",
			"05/expstep",
			"05/parabola",
			"05/expstep",
			"05/pcurve",
			"05/easing",
			"examples/05/stepwise",
			"160414041542",
			"160414041933",
			"160414041756"],

	"06":[	"06/mix",
			"06/gradient",
			"06/hsb",
			"06/hsb-colorwheel"],

	"07":[	"07/rect-making",
			"07/rect",
			"07/rect-df",
			"07/circle-making",
			"07/circle",
			"07/batman",
			"07/line",
			"07/cross",
			"07/polar",
			"07/shapes",
			"07/arrow",
			"160414041142",
			"160414040957",
			"160414040804"],

	"08":[	"08/cross",
			"08/cross-translate",
			"08/cross-rotate",
			"08/cross-scale"],

	"09":[	"09/grid-making",
			"09/grid",
			"09/grid-side",
			"09/cross",
			"09/lines",
			"09/lines-wave",
			"09/zigzag",
			"09/checks",
			"09/diamondtiles",
			"09/bricks",
			"09/dots",
			"09/dots1",
			"09/dots2",
			"09/dots3",
			"09/dots4",
			"09/dots5",
			"09/marching_dots",
			"09/rotatedtiles",
			"09/nuts",
			"09/mirrortiles",
			"09/truchet",
			"09/iching-01"],

	"10":[	"10/1d-random",
			"10/2d-random",
			"10/2d-random-mosaic",
			"10/2d-random-dots",
			"10/2d-random-truchet",
			"10/ikeda-00",
			"10/ikeda-01",
			"10/ikeda-02",
			"10/ikeda-03",
			"10/ikeda-04",
			"10/matrix",
			"10/ikeda-digits",
			"10/ikeda-simple-grid",
			"10/ikeda-numered-grid",
			"10/iching-02"],

	"11":[	"11/1d-noise",
			"11/2d-noise",
			"11/3d-noise",
			"11/2d-gnoise",
			"11/2d-pnoise",
			"11/3d-pnoise",
			"11/simplex-grid",
			"11/2d-snoise",
			"11/3d-snoise",
			"11/wood",
			"11/splatter",
			"11/lava-lamp",
			"11/iching-03"],

	"shared":[	"160423150559",
				"160423150752",
				"160423150810",
				"160423150825",
				"160423150844",
				"160423150901",
				"160423150919",
				"160423150935",
				"160423150954"],


	"advanced":[	"08/matrix",
					"160414040957",
					"160414040804",
					"10/iching-02",
					"11/2d-gnoise",
					"11/iching-03",
					"10/ikeda-00",
					"10/ikeda-03",
					"10/ikeda-04",
					"10/ikeda-digits",
					"10/ikeda-simple-grid",
					"10/ikeda-numered-grid"]
};

window.addEventListener("load", function () {
    var elms = document.getElementsByClassName('glslChapterGallery');
console.log(elms);
	for (var i = 0; i < elms.length; i++) {
		var elm = elms[i];
		if (elm.hasAttribute('log')) {
			var options = {clickRun: 'editor'};
            var d = elm.getAttribute('log').split(',');
            if (d[1]) {
            	options.logs = concatList(shaderList[d[0]], Number(d[1]));
            } else {
            	options.logs = concatList(shaderList[d[0]]);
            }
			var gallery = new GlslGallery(elm, options);
        }
    }
    function concatList(list, n) {
    	var str = "";
    	if (n) {
    		list = list.slice(0, n);
    	}
    	for (var i = 0; i < list.length; i ++) {
    		str += list[i];
    		if (i != list.length - 1) { str += ","}
    	}
    	return str;
    }
});


