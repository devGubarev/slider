<html>
<head>
	<title>slider.js by dev</title>
	<link rel="stylesheet" href="style.css" type="text/css" media="all">
	<script type="text/javascript" src="slider.js"></script>
</head>
<body>
	<div id="header">JavaScript Images Slider</div>
	<div id="slider">
		<div id="slide">
			<a href="#"><img src="slides/1.jpg" alt=""></a>
		</div>
		<div id="slide">
			<a href="#"><img src="slides/2.jpg" alt=""></a>
		</div>
		<div id="slide">
			<a href="#"><img src="slides/3.jpg" alt=""></a>
		</div>
		<div id="slide">
			<a href="#"><img src="slides/4.jpg" alt=""></a>
		</div>
		<div id="slide">
			<a href="#"><img src="slides/5.jpg" alt=""></a>
		</div>
		<div id="slide">
			<a href="#"><img src="slides/6.jpg" alt=""></a>
		</div>
		<div id="slide">
			<a href="#"><img src="slides/7.jpg" alt=""></a>
		</div>
		<div id="slide">
			<a href="#"><img src="slides/8.jpg" alt=""></a>
		</div>
	</div>
	<div id="header">2016 &#0169 dev</div>
<script type="text/JavaScript">
	window.addEventListener('load', slider.init({
		slideSpeed : 4000,
		animationSpeed : 40,
		randomAnimation : true
	}), false);
</script>	
</body>
</html>