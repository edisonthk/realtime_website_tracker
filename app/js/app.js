angular.module('app',[])
    .controller('MyController', ['$scope', function($scope){

        $scope.currentStage = 2;
        $scope.showFlag = false;

        var fullHeight = window.innerHeight+60,
            fullWidth = window.innerWidth;


        var canvas = document.getElementById("canvas");
        canvas.style.height = fullHeight+"px";
        canvas.style.width = fullWidth + "px";
        canvas.width = fullWidth;
        canvas.height = fullHeight;


        var ctx = canvas.getContext('2d'),
            // opacity
            alpha = 0,   // current alpha value
            delta = 0.1, // delta = speed

            // flag
            readyFlag = false,
            wp = new WaterRipple(ctx, fullWidth, fullHeight)
        ;


        // background
        var img = new Image();
        img.src="app/img/bg1.jpg";
        img.onload = function() {
            drawBackground();
            setTimeout(function() {
                $scope.currentStage += 1;
                $scope.$apply();

                wp.start();
            }, 1000);
        };

        $scope.panelClick = function(evt) {

            var x = evt.offsetLeft || evt.layerX,
                y = evt.offsetTop || evt.layerY
            ;

            wp.disturb(fullWidth - Math.floor(x),fullHeight - Math.floor(y), 15000);
        }

        $scope.$watch("currentStage", function(stage) {
            console.log(stage);
            if(stage === 2) {
                $scope.showFlag = false;

                setTimeout(function() {
                    addClass(canvas, "show");
                    setTimeout(function() {
                        $scope.showFlag = true;
                        $scope.$apply();
                    }, 1000);
                }, 1000);
            }else if(stage >= 3 && stage < 6) {
                $scope.showFlag = false;
                setTimeout(function() {
                    $scope.showFlag = true;
                    $scope.$apply();
                }, 1000);
            }else if(stage >= 6) {
                $scope.showFlag = false;
                setTimeout(function() {
                    removeClass(canvas, "show");
                }, 1000);
            }
        });

        $scope.pageOnload = function() {
            // vertical center of every container
            var els = document.getElementsByClassName("container");
            for (var i = 0; i < els.length; i++) {
                els[i].style.top = ((window.innerHeight - els[i].clientHeight) / 2 ) + "px";
            };
        };


        document.body.onclick= function() {
            if(readyFlag) {
                return;
            }
            readyFlag = true;

            // do Action here
            $scope.currentStage += 1;
            $scope.$apply();
            setTimeout(function() {
                readyFlag = false; 
            },3000);
        };

        function drawBackground() {
            ctx.drawImage(img, 0,0,canvas.width, canvas.height);

            // stackBoxBlurCanvasRGB("canvas",0,0,canvas.width, canvas.height, 118,2);
        }

        function addClass(el, className) {
            if(el.className.indexOf(className) < 0) {
                el.className += " "+className;
            }
        }

        function removeClass(el, className) {
            var regex = new RegExp("\s?"+className,"g");
            el.className = el.className.replace(regex,"");
        }

        function fadeIn() {
            if(alpha >= 1) {
                return;
            }

            alpha += delta;

            /// clear canvas, set alpha and re-draw image
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = alpha;
            
            drawBackground();

            setTimeout(fadeIn, 32);
        }

    }]);

