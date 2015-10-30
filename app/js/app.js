angular.module('app',[])
    .controller('MyController', ['$scope', '$http',function($scope, H){

        $scope.currentStage = 0;
        $scope.showFlag = false;

        var fullHeight = window.innerHeight+60,
            fullWidth = window.innerWidth;


        var canvas = document.getElementById("canvas");
        canvas.style.height = fullHeight+"px";
        canvas.style.width = fullWidth + "px";
        canvas.width = fullWidth;
        canvas.height = fullHeight;


        // var ctx = canvas.getContext('2d'),
            // opacity
        var alpha = 0,   // current alpha value
            delta = 0.1, // delta = speed

            // flag
            readyFlag = false,
            // wp = new WaterRipple(ctx, fullWidth, fullHeight)

            $canvas = $('#canvas')
        ;


        // background

        try {
            $canvas.ripples({
                resolution: 1024,
                dropRadius: 4, //px
                perturbance: 0.001,
            });
        }
        catch (e) {
            console.log(e);
        }
        
        setTimeout(function() {
            $scope.currentStage += 1;
            $scope.$apply();
            writeLog("begin");
        }, 1000);
    

        $scope.panelClick = function(evt) {

            var x = evt.offsetLeft || evt.layerX,
                y = evt.offsetTop || evt.layerY
            ;

            $canvas.ripples("drop", x, y, 12, 0.13);
            // wp.disturb(fullWidth - Math.floor(x),fullHeight - Math.floor(y), 15000);
        }

        $scope.$watch("currentStage", function(stage) {
            
            if(stage === 2) {
                writeLog(stage);
                $scope.showFlag = false;

                setTimeout(function() {
                    addClass(canvas, "show");
                    setTimeout(function() {
                        $scope.showFlag = true;
                        $scope.$apply();
                    }, 1000);
                }, 1000);
            }else if(stage >= 3 && stage < 6) {
                writeLog(stage);
                $scope.showFlag = false;
                setTimeout(function() {
                    $scope.showFlag = true;
                    $scope.$apply();
                }, 1000);
            }else if(stage === 6) {
                writeLog("finish");
                $scope.showFlag = false;
                setTimeout(function() {
                    $scope.showFlag = true;
                    removeClass(canvas, "show");
                    $scope.$apply();
                }, 1000);
            }
        });

        window.onbeforeunload = function() {
            writeLog("close at stage "+$scope.currentStage);
        };

        $scope.pageOnload = function() {
            // vertical center of every container
            var els = document.getElementsByClassName("container");
            for (var i = 0; i < els.length; i++) {
                els[i].style.top = ((window.innerHeight - els[i].clientHeight) / 2 ) + "px";
            }
        }


        document.body.onclick= function() {
            if(readyFlag || $scope.currentStage >= 6) {
                return;
            }
            readyFlag = true;

            // do Action here
            $scope.currentStage += 1;
            $scope.$apply();

            var delay = 3000;
            if($scope.currentStage === 3) {
                delay = 1500;
            }

            setTimeout(function() {
                readyFlag = false; 
            },delay);
        };

        function writeLog(stage) {
            H({
                url: '/writelog.php?q='+stage,
                method: 'GET',
                async: false,
            });
        }

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

    }]);

