$(window).load(function() {
	
	var startHex 		= 0x00FF5B;
	var endHex 			= 0xFF00BD;
	
	var mGroundWidth	= 2000;// in pixles
	var mGroundHeight	= 450;// in pixles

	
	function hex2rgb(hex){
			var r = (hex & 0xff0000) >> 16;
			var g = (hex & 0x00ff00) >> 8;
			var b = hex & 0x0000ff ;
	return {R:r, G:g, B:b};
	}
	
	$('#midground img').each(function(index) {
		numLeft = Math.floor(Math.random()*mGroundWidth);
		numTop = Math.floor(Math.random()*mGroundHeight);
		$(this).css('left', numLeft+'px');
		$(this).css('top', numTop+'px');
	  });


	var startRed 	= hex2rgb(startHex).R;
	var endRed 		= hex2rgb(endHex).R;
	var redTween	= startRed - endRed;
	
	var startGreen 	= hex2rgb(startHex).G;
	var endGreen 	= hex2rgb(endHex).G;
	var greenTween	= startGreen - endGreen;

	var startBlue 	= hex2rgb(startHex).B;
	var endBlue 	= hex2rgb(endHex).B;
	var blueTween	= startBlue - endBlue;
		
	$("body").css('background-color', "rgb("+startRed+","+ startGreen+","+ startBlue+")");

	
	var marginRight			= $("div.item").css('margin-right');
	var marginRightArray	= new Array();
	marginRightArray 		= marginRight.split('p');
	marginRight				= marginRightArray[0];
	
	
	var itemWidth			= $("div.item").outerWidth(true);
	var itemCount 			= $('.item').size();	
	var tContentWidth 		= (itemWidth*itemCount)-marginRight;
	
	
	$("#customScrollBox .container").css('width', tContentWidth+'px')
	
	
	
		$_body=$("body");
		$customScrollBox=$("#customScrollBox"); 										// wrapper with overflow hidden
		
		$customScrollBox_container=$("#customScrollBox .container"); 					// content to scroll
		$customScrollBox_content=$("#customScrollBox .content");
		
		$dragger_container=$("#dragger_container"); 									// slider track
		$dragger=$("#dragger");															//slider handle



		visibleWidth=$customScrollBox.width();											// visable content
		totalContent=$customScrollBox_content.width(); 								// Actual content Width
		minDraggerWidth=$dragger.width(); 											//slider handle Width
		draggerContainerWidth=$dragger_container.width();							//slider track Width
		adjDraggerWidth=totalContent-((totalContent-visibleWidth)*1.3); 			//adjust dragger Width analogous to content
		
		
		animSpeed=400; //animation speed
		easeType="easeOutCirc"; //easing type
		bottomSpace=1.05; //bottom scrolling space
		targY=0;
		draggerWidth=$dragger.width();
		
		$dragger.draggable({ 
			axis: "x", 
			containment: "parent", 
			drag: function(event, ui) {
				Scroll();
			}, 
			stop: function(event, ui) {
			}
		});
		
		
		//mousewheel
		$(function($) {
			$_body.bind("mousewheel", function(event, delta) {
				vel = Math.abs(delta*10);
				$dragger.css("left", $dragger.position().left-(delta*vel));
				Scroll();
				if($dragger.position().left<0){
					$dragger.css("left", 0);
					$customScrollBox_container.stop();
					Scroll();
				}
				if($dragger.position().left>$dragger_container.width()-$dragger.width()){
					$dragger.css("left", $dragger_container.width()-$dragger.width());
					$customScrollBox_container.stop();
					Scroll();
				}
				return false;
			});
		});
		
		

		//scroll
		function Scroll(){
			var scrollAmount=(totalContent-(visibleWidth/bottomSpace))/(draggerContainerWidth-draggerWidth);
			var draggerY=$dragger.position().left;
			targY=-draggerY*scrollAmount;
			var thePos=$customScrollBox_container.position().left-targY;
			
			$customScrollBox_container.stop().animate({left: "-="+thePos}, animSpeed, easeType); //with easing
			//$customScrollBox_container.css("top",$customScrollBox_container.position().top-thePos+"px"); //no easing
			
			draggerPercent = (draggerY / (draggerContainerWidth-draggerWidth))*100;
			changeColor();
			moveBg();
			
			//$("#output").html( '<br />scrollAmount = '+ scrollAmount + '<br />draggerY = '+ draggerY + '<br />targY = '+ targY + '<br />thePos = '+ thePos  );
			
		}
		//change bg colour
		function changeColor(){
				red 	= (draggerPercent / 100) *redTween;
				red 	= startRed - red;
				red 	= Math.round(red);
				
				green 	= (draggerPercent / 100) *greenTween;
				green 	= startGreen - green;
				green 	= Math.round(green);
				
				blue 	= (draggerPercent / 100) *blueTween;
				blue 	= startBlue - blue;
				blue 	= Math.round(blue);
				
				//$("body").css('background-color', "rgb("+red+","+ green+","+ blue+")");
				$("body").stop().animate({ backgroundColor: "rgb("+red+","+green+","+blue+")" }, animSpeed, easeType)
		}
		
		function moveBg(){
			
			var paralaxBg	= draggerPercent/2;
			var paralaxMid	= draggerPercent;
			$("#midground").stop().animate({left: "-"+paralaxMid}, animSpeed, easeType); //with easing
			$("#backgound").stop().animate({left: "-"+paralaxBg}, animSpeed, easeType); //with easing
			//$("#backgound").css("left", "-"+paralaxBg+"px");
			
		}
		
		
		
});
