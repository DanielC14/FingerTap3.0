window.onload = function () {
    var canvas = document.getElementById('myCanvas');
    var videoEasy = document.getElementById("videoEasy");
    var videoMedium = document.getElementById("videoMedium");
    var videoHard = document.getElementById("videoHard");
    if (canvas.getContext) {


        var ctx = canvas.getContext('2d');

        //SOUNDS
        var sound_wrong = new Audio('sound/wrong.mp3');
        sound_wrong.loop = false;
        sound_wrong.volume = 0.15;

        var sound_correct = new Audio('sound/correct.mp3');
        sound_correct.loop = false;
        sound_correct.volume = 0.2;

        var sound_multup = new Audio('sound/multup.mp3');
        sound_multup.loop = false;
        sound_multup.volume = 0.2;

        var sound_multdown = new Audio('sound/multdown.mp3');
        sound_multdown.loop = false;
        sound_multdown.volume = 0.2;

        var sound_intro = new Audio('sound/8bitmusic.mp3');
        sound_intro.loop = true;
        sound_intro.volume = 0.15;

        //VIDEO VOLUME
        videoEasy.volume = 0.15;
        videoMedium.volume = 0.15;
        videoHard.volume = 0.15;


        //IMAGES
        var img_wrong = new Image();
        img_wrong.src = "img/wrong2.png";
        var img_sprite = new Image();
        img_sprite.src = "img/sprite.png";
        var img_wrongGirl = new Image();
        img_wrongGirl.src = "img/wrong.png";
        var img_soundON = new Image();
        img_soundON.src = "img/soundON.png";
        var img_soundOFF = new Image();
        img_soundOFF.src = "img/soundOFF.png";

        //POINTS
        var points = 0;
        var multiplier = 1;
        var upMultiplier = 0;
        ctx.textBaseline = 'middle';
        ctx.font = "30px Lucida Console";

        //FAIL
        var localFail = 0;
        var timeFail = 0;
        var fail = false;

        //SPRITE
        var frameIndex = 0;
        var spriteTime = 0;
        var spriteSpeed = 0;

        //LOGO
        var blink = true;
        var blinkTime = 0;
        var blinkAnimation = false;
        var numBlink = 0;

        var fingertap = ["F", "i", "n", "g", "e", "r", "T", "a", "p"];
        var numLetter = 0;
        var text = "";
        var add = true;

        //KEYS
        var keyID1 = 73;
        var keyID2 = 74;
        var keyID3 = 78;
        var keyID4 = 32;
        var keyChar1 = "I";
        var keyChar2 = "J";
        var keyChar3 = "N";
        var keyChar4 = "|__|";
        var keyChange = 0;

        //GRADIENT
        var rg = ctx.createLinearGradient(375, 100, 875, 100);
        rg.addColorStop(0.1, "purple");
        rg.addColorStop(0.2, "violet");
        rg.addColorStop(0.3, "pink");
        rg.addColorStop(0.4, "red");
        rg.addColorStop(0.5, "orange");
        rg.addColorStop(0.6, "yellow");
        rg.addColorStop(0.7, "lime");
        rg.addColorStop(0.8, "green");
        rg.addColorStop(0.9, "aqua");
        rg.addColorStop(1, "blue");

        //OTHER
        var keys = new Array();

        var speed = 0;
        var quantity = 0;

        var leave = false;

        var sound = true;

        var dificulty = "";


        //LAYOUT DRAW
        function layout() {

            ctx.strokeStyle = "black";
            ctx.lineWidth = 3;

            ctx.beginPath();
            ctx.fillStyle = "lightblue";
            ctx.fillRect(0, 444, 1280, 69);
            ctx.moveTo(0, 444);
            ctx.lineTo(1280, 444);
            ctx.moveTo(0, 513);
            ctx.lineTo(1280, 513);
            ctx.stroke();

            ctx.beginPath();
            ctx.fillRect(0, 513, 1280, 69);
            ctx.moveTo(0, 513);
            ctx.lineTo(1280, 513);
            ctx.stroke();

            ctx.beginPath();
            ctx.fillRect(0, 582, 1280, 69);
            ctx.moveTo(0, 582);
            ctx.lineTo(1280, 582);
            ctx.stroke();

            ctx.beginPath();
            ctx.fillRect(0, 651, 1280, 69);
            ctx.moveTo(0, 651);
            ctx.lineTo(1280, 651);
            ctx.stroke();

            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.strokeRect(0, 444, 1280, 276);

            ctx.strokeStyle = "red";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(1175, 446);
            ctx.lineTo(1175, 718);
            ctx.stroke();
            
            

        }

        //DRAW HOME MENU
        function homeMenu() {

            sound_intro.play();

            ctx.textAlign = "center";
            ctx.lineWidth = 5;
            ctx.fillStyle = "rgb(32,32,32)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);



            ctx.strokeStyle = "white";
            ctx.fillStyle = "green";
            ctx.fillRect(513, 270, 255, 89);
            ctx.strokeRect(513, 270, 255, 89);
            ctx.fillStyle = "orange";
            ctx.fillRect(513, 391, 255, 89);
            ctx.strokeRect(513, 391, 255, 89);
            ctx.fillStyle = "red";
            ctx.fillRect(513, 511, 255, 89);
            ctx.strokeRect(513, 511, 255, 89);

            ctx.fillStyle = "white";
            ctx.font = "30px Lucida Console";
            ctx.fillText("Choose a dificulty to begin:", canvas.width / 2, 210);
            ctx.fillText("Easy", canvas.width / 2, 314);
            ctx.fillText("Medium", canvas.width / 2, 435);
            ctx.fillText("Hard", canvas.width / 2, 555);


            ctx.fillStyle = rg;

            ctx.font = "italic bold 100px Century Gothic";
            ctx.fillText("FingerTap", canvas.width / 2, 100);

            ctx.lineWidth = 1;
            ctx.fillStyle = "black";
            ctx.strokeStyle = "white";
            ctx.fillRect(5, 665, 210, 50);
            ctx.strokeRect(5, 665, 210, 50);
            ctx.font = "20px Lucida Console";
            ctx.fillStyle = "white";

            ctx.fillText("How to play", 110, 690);

            if (blinkAnimation == false) {
                numBlink = 0;
                add = true;
                numLetter = 0;
                text = "";
                blinkAnimation = true;
                blinkTitle();
            }


            window.addEventListener('click', introSound);
            window.addEventListener('click', chooseDificulty);
            window.addEventListener('click', howToPlayEvent);

        }

        //TITLE ANIMATIONS
        function blinkTitle() {



            ctx.fillStyle = "rgb(32,32,32)";
            ctx.fillRect(0, 0, 1280, 170);

            if (sound == true) {
                ctx.drawImage(img_soundON, 1232, 0);
            }
            else {
                ctx.drawImage(img_soundOFF, 1232, 0);
            }


            if (numBlink == 3) {
                if (add == true) {
                    text += fingertap[numLetter];
                    add = false;
                }

                ctx.fillStyle = rg;
                ctx.textAlign = "left";
                ctx.font = "italic bold 100px Century Gothic";
                ctx.fillText(text, 396, 100);

                if (blinkTime == 15) {
                    blinkTime = 0;
                    numLetter++;
                    add = true;
                }
                blinkTime++;

                if (numLetter == fingertap.length) {
                    numBlink = 0;
                    numLetter = 0;
                    text = "";
                }

            }
            else {
                if (blink == true) {

                    ctx.fillStyle = rg;
                    ctx.textAlign = "left";
                    ctx.font = "italic bold 100px Century Gothic";
                    ctx.fillText("FingerTap", 396, 100);

                    if (blinkTime == 60) {
                        blink = false;
                        blinkTime = 0;
                    }

                }

                if (blink == false && blinkTime == 10) {
                    blink = true;
                    numBlink++;
                }
                blinkTime++;

            }


            if (blinkAnimation == true)
                window.requestAnimationFrame(blinkTitle);

        }

        //HOW TO PLAY
        function howToPlay() {


            ctx.textAlign = "center";
            ctx.fillStyle = "rgb(32,32,32)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = "30px Lucida Console";
            ctx.fillStyle = "white";
            ctx.fillText("How to Play:", canvas.width / 2, 210);
            ctx.font = "20px Lucida Console";
            ctx.fillText("Click the letter represented on the box", canvas.width / 2, 250);
            ctx.fillText("while it is touching the red line", canvas.width / 2, 280);
            ctx.fillText("near the end of the track.", canvas.width / 2, 310);
            ctx.fillText("|___| = Spacebar", canvas.width / 2, 350);

            ctx.font = "30px Lucida Console";
            ctx.fillText("Keys:", canvas.width / 2, 450);
            ctx.font = "20px Lucida Console";
            ctx.fillText("1º Line = " + keyChar1, canvas.width / 2, 490);
            ctx.fillText("2º Line = " + keyChar2, canvas.width / 2, 530);
            ctx.fillText("3º Line = " + keyChar3, canvas.width / 2, 570);
            ctx.fillText("4º Line = " + keyChar4, canvas.width / 2, 610);
            ctx.fillStyle = "black";
            ctx.fillRect(770, 475, 100, 30);
            ctx.fillRect(770, 515, 100, 30);
            ctx.fillRect(770, 555, 100, 30);
            ctx.fillRect(770, 595, 100, 30);
            ctx.fillRect(5, 665, 210, 50);
            ctx.strokeRect(5, 665, 210, 50);
            ctx.fillStyle = "white";
            ctx.fillText("CHANGE", 820, 490);
            ctx.fillText("CHANGE", 820, 530);
            ctx.fillText("CHANGE", 820, 570);
            ctx.fillText("CHANGE", 820, 610);
            ctx.fillText("Home Menu", 110, 690);

            window.addEventListener('click', backToMenu);
            window.addEventListener('click', changeKeyEvent);


        }

        //CREATE NOTES 
        function start(vel, quant) {
            if (dificulty == "easy") {
                videoEasy.currentTime = 0;
                videoEasy.play();
            }
            else if (dificulty == "medium") {
                videoMedium.currentTime = 0;
                videoMedium.play();
            }
            else if (dificulty == "hard") {
                videoHard.currentTime = 0;
                videoHard.play();
            }

            window.removeEventListener('click', introSound);
            window.removeEventListener('click', howToPlayEvent);
            window.addEventListener('keydown', pressKey);
            sound_intro.currentTime = 0;

            points = 0;
            multiplier = 1;
            upMultiplier = 0;
            fail = false;
            timer = 0;
            ctx.lineWidth = 3;
            leave = false;
            quantity = quant;
            speed = vel;
            frameIndex = 0;
            spriteTime = 0;

            keys.length = 0;

            //SIZE
            var tamX = 59;
            var tamY = 59;


            var localY = [449, 518, 587, 656];
            var timeIn = 0;

            for (var i = 0; i < quantity; i++) {
                var posY = localY[Math.floor(Math.random() * localY.length)];
                var tempKey = 0;
                switch (posY) {
                    case 449: tempKey = keyID1;
                        break;
                    case 518: tempKey = keyID2;
                        break;
                    case 587: tempKey = keyID3;
                        break;
                    case 656: tempKey = keyID4;
                        break;
                }
                timeIn = timeIn + (Math.floor((Math.random() * 100) + 40));
                keys.push(new Key(5, posY, timeIn, tempKey, tamX, tamY));
            }

            window.addEventListener('click', leaveGame);
            draw();

        }

        
        function Key(x, y, initial_time, key_Code, kX, kY) {
            this.x = x;
            this.y = y;
            this.initial_time = initial_time;
            this.key_Code = key_Code;
            this.kX = kX;
            this.kY = kY;

            this.drawKey = function () {
                if (initial_time < timer) {
                    //MAKE SQUARES
                    ctx.beginPath();
                    ctx.fillStyle = "black";
                    ctx.fillRect(this.x, this.y, this.kX, this.kY);
                    ctx.fillStyle = "white";
                    ctx.textAlign = 'center';
                    ctx.font = "30px Verdana";
                    //CHECK LETTER TO PUT
                    switch (key_Code) {
                        case keyID1: ctx.fillText(keyChar1, this.x + this.kX / 2, this.y + this.kY / 2);
                            break;
                        case keyID2: ctx.fillText(keyChar2, this.x + this.kX / 2, this.y + this.kY / 2);
                            break;
                        case keyID3: ctx.fillText(keyChar3, this.x + this.kX / 2, this.y + this.kY / 2);
                            break;
                        case keyID4: ctx.fillText(keyChar4, this.x + this.kX / 2, this.y + this.kY / 2);
                            break;
                    }

                }


            }

            this.updateKey = function (i) {
                //PUT NOTES IN SPECIFIC TIME
                if (initial_time <= timer) {
                    if (this.x >= 1175) {
                        sound_wrong.play();
                        if (multiplier > 1) {
                            sound_multdown.play();
                        }
                        multiplier = 1;
                        upMultiplier = 0;


                        //EXECUTE FAILURE
                        localFail = this.y;
                        fail = true;
                        failed();
                    }

                    //IF IT LEAVES THE CANVAS
                    if (this.x >= canvas.width) {

                        //REMOVE FROM ARRAY

                        keys.splice(i, 1);


                    }
                    else if (this.x < canvas.width) {
                        this.x += speed;

                    }


                }

            }
            this.press = function (evt, i) {

                if (evt.keyCode == key_Code) {

                    //REMOVE FROM ARRAY
                    keys.splice(i, 1);

                    //ADD POINTS
                    points = points + (1 * multiplier);
                    upMultiplier++;
                    sound_correct.play();
                    //ADD MULTIPLIER
                    if (upMultiplier == 5) {
                        multiplier++;
                        sound_multup.play();
                        upMultiplier = 0;
                    }


                }

                else {
                    multiplier = 1;
                    upMultiplier = 0;
                    sound_multdown.play();
                }



            }


        }

        //REFRESH OF THE VIDEO
        function refreshVideo() {
            if (dificulty == "easy") {
                var $videoEasy = videoEasy;
                if (!$videoEasy.paused && !$videoEasy.ended) {
                    ctx.drawImage($videoEasy, 0, 0);
                }
            }
            else if (dificulty == "medium") {
                var $videoMedium = videoMedium;
                if (!$videoMedium.paused && !$videoMedium.ended) {
                    ctx.drawImage($videoMedium, 0, 0);
                }
            }
            else if (dificulty == "hard") {
                var $videoHard = videoHard;
                if (!$videoHard.paused && !$videoHard.ended) {
                    ctx.drawImage($videoHard, 0, 0);
                }
            }


        }

        //REFRESH OF THE SPRITE
        function refreshSprite() {
            if (fail == false) {
                ctx.drawImage(img_sprite, frameIndex * 150, 0, 150, 109, 75, 320, 150, 109);
                ctx.drawImage(img_sprite, frameIndex * 150, 0, 150, 109, 1070, 320, 150, 109);
                spriteTime++;
                if (spriteTime == spriteSpeed) {
                    frameIndex++;
                    spriteTime = 0;
                }
                if (frameIndex == 8) {
                    frameIndex = 0;
                }
            } else {
                ctx.drawImage(img_wrongGirl, 75, 320);
                ctx.drawImage(img_wrongGirl, 1070, 320);
            }

        }

        //MAIN FUNCTION
        function draw() {

            if (leave == false) {
                layout();

                timer = timer + (speed / 2);

                for (var i = 0; i < keys.length; i++) {
                    keys[i].drawKey();
                }

                for (var i = 0; i < keys.length; i++) {
                    keys[i].updateKey(i);
                }

                refreshVideo();
                refreshSprite();
                failed();

                //UPDATE POINTS

                ctx.fillStyle = "black";
                ctx.fillRect(300, 380, 680, 64);
                ctx.fillStyle = "white";
                ctx.textAlign = 'left';
                ctx.font = "20px Lucida Console";
                ctx.fillText("Score: ", 400, 415);
                ctx.fillText("Multiplier(" + upMultiplier + "/5): ", 660, 415);
                ctx.font = "30px Lucida Console";
                ctx.fillText(points, 500, 415);
                ctx.fillText(multiplier + "x", 915, 415);
                ctx.fillStyle = "white";
                ctx.fillRect(640, 380, 1, 64);

                //LEAVE BUTTON
                ctx.lineWidth = 1;
                ctx.strokeStyle = "white";
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, 150, 70);
                ctx.strokeRect(0, 0, 150, 70);
                ctx.fillStyle = "white";
                ctx.textAlign = 'center';
                ctx.fillText("EXIT", 75, 33);

                //WHEN THERE'S NO MORE KEYS
                if (keys.length == 0) {
                    leave = true;
                    gameOver();
                }


                window.requestAnimationFrame(draw);
            }

        }

        //MISS A KEY
        function failed() {
            if (fail == true) {
                //PUT X FOR 0.5s
                ctx.drawImage(img_wrong, 1200, localFail);
                timeFail++;
                if (timeFail == 30) {
                    fail = false;
                    timeFail = 0;
                }
            }

        }

        //GAME OVER
        function gameOver() {

            if (dificulty == "easy") {
                videoEasy.pause();
            }
            else if (dificulty == "medium") {
                videoMedium.pause();
            }
            else if (dificulty == "hard") {
                videoHard.pause();
            }
            //WRITE GAME OVER
            ctx.fillStyle = "rgb(32,32,32)";
            ctx.strokeStyle = "white";
            ctx.fillRect(390, 170, 500, 350);
            ctx.strokeRect(390, 170, 500, 350);
            ctx.textAlign = 'center';
            ctx.fillStyle = "white";
            ctx.font = "70px Lucida Console";
            ctx.fillText("GAME OVER", 640, 222);
            //SCORE
            ctx.font = "50px Lucida Console";
            ctx.fillText(points, 640, 352);
            ctx.font = "25px Lucida Console";
            ctx.fillText("Final Score:", 640, 292);

            //HOME MENU BUTTON

            ctx.strokeStyle = "white";
            ctx.fillStyle = "black";
            ctx.lineWidth = 5;
            ctx.fillRect(493, 400, 300, 90);
            ctx.strokeRect(493, 400, 300, 90);
            ctx.fillStyle = "white";
            ctx.fillText("Home Menu", 640, 445);

            window.addEventListener('click', reset)

            window.removeEventListener('keydown', pressKey);
        }


        //EVENTS

        function reset(e) {
            var x = e.pageX - canvas.offsetLeft;
            var y = e.pageY - canvas.offsetTop;

            //CHECK CLICK POSITION
            if (x >= 493 && y >= 400 && x <= 793 && y <= 490) {

                if (dificulty == "easy") {
                    videoEasy.pause();
                }
                else if (dificulty == "medium") {
                    videoMedium.pause();
                }
                else if (dificulty == "hard") {
                    videoHard.pause();
                }

                //REMOVE EVENTLISTENER
                window.removeEventListener('click', reset)
                //START
                homeMenu();


            }

        }

        function leaveGame(e) {
            var x = e.pageX - canvas.offsetLeft;
            var y = e.pageY - canvas.offsetTop;


            //CHECK CLICK POSITION
            if (x >= 0 && y >= 0 && x <= 150 && y <= 70) {
                //REMOVE EVENTLISTENER
                window.removeEventListener('click', leaveGame);
                window.removeEventListener('keydown', pressKey);
                leave = true;

                if (dificulty == "easy") {
                    videoEasy.pause();
                }
                else if (dificulty == "medium") {
                    videoMedium.pause();
                }
                else if (dificulty == "hard") {
                    videoHard.pause();
                }

                //START
                homeMenu();


            }
        }

        function chooseDificulty(e) {
            var x = e.pageX - canvas.offsetLeft;
            var y = e.pageY - canvas.offsetTop;



            if (x >= 513 && y >= 270 && x <= 768 && y <= 359) {
                dificulty = "easy";
                spriteSpeed = 20;
                blinkAnimation = false;
                sound_intro.pause();
                start(3, 25);
                window.removeEventListener('click', chooseDificulty);
            }
            else if (x >= 513 && y >= 391 && x <= 768 && y <= 480) {
                dificulty = "medium";
                spriteSpeed = 15;
                blinkAnimation = false;
                sound_intro.pause();
                start(5, 50);
                window.removeEventListener('click', chooseDificulty);

            }
            else if (x >= 513 && y >= 511 && x <= 768 && y <= 600) {
                dificulty = "hard";
                spriteSpeed = 10;
                blinkAnimation = false;
                sound_intro.pause();
                start(7, 75);
                window.removeEventListener('click', chooseDificulty);
            }
        }

        function pressKey(evt) {
            //DETECT KEY PRESS
            for (var i = 0; i < keys.length; i++) {
                if (keys[i].x <= 1175 && keys[i].x + 59 >= 1175) {
                    keys[i].press(evt, i);
                }

            }

        }

        function introSound(e) {
            var x = e.pageX - canvas.offsetLeft;
            var y = e.pageY - canvas.offsetTop;

            if (x >= 1232 && y >= 0 && x <= canvas.width && y <= 48) {
                if (sound_intro.volume == 0.15) {
                    sound_intro.volume = 0;
                    sound = false;
                }
                else if (sound_intro.volume == 0) {
                    sound_intro.volume = 0.15;
                    sound = true;
                }
            }
        }

        function backToMenu(e) {
            var x = e.pageX - canvas.offsetLeft;
            var y = e.pageY - canvas.offsetTop;

            if (x >= 5 && y >= 665 && x <= 215 && y <= 715) {
                window.removeEventListener('click', backToMenu);
                homeMenu();
            }
        }

        function changeKey(evt) {
            if (keyChange == 1) {

                keyID1 = evt.keyCode;
                if (evt.keyCode == 32) {
                    keyChar1 = "|__|";
                }
                else {
                    keyChar1 = String.fromCharCode(evt.keyCode);
                }


            } else if (keyChange == 2) {

                keyID2 = evt.keyCode;
                if (evt.keyCode == 32) {
                    keyChar2 = "|__|";
                }
                else {
                    keyChar2 = String.fromCharCode(evt.keyCode);
                }

            } else if (keyChange == 3) {

                keyID3 = evt.keyCode;
                if (evt.keyCode == 32) {
                    keyChar3 = "|__|";
                }
                else {
                    keyChar3 = String.fromCharCode(evt.keyCode);
                }

            } else if (keyChange == 4) {

                keyID4 = evt.keyCode;
                if (evt.keyCode == 32) {
                    keyChar4 = "|__|";
                }
                else {
                    keyChar4 = String.fromCharCode(evt.keyCode);
                }

            }
            window.removeEventListener('keydown', changeKey);
            howToPlay();
        }

        function changeKeyEvent(e) {

            var x = e.pageX - canvas.offsetLeft;
            var y = e.pageY - canvas.offsetTop;



            if (x >= 770 && y >= 475 && x <= 870 && y <= 505) {

                ctx.fillStyle = "black";
                ctx.fillRect(440, 350, 400, 70);
                ctx.font = "30px Lucida Console";
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.fillText("Press a key", canvas.width / 2, 385);
                keyChange = 1;
                window.removeEventListener('click', backToMenu);
                window.removeEventListener('click', changeKeyEvent);
                window.addEventListener('keydown', changeKey);


            } else if (x >= 770 && y >= 515 && x <= 870 && y <= 545) {

                ctx.fillStyle = "black";
                ctx.fillRect(440, 350, 400, 70);
                ctx.font = "30px Lucida Console";
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.fillText("Press a key", canvas.width / 2, 385);
                keyChange = 2;
                window.removeEventListener('click', backToMenu);
                window.removeEventListener('click', changeKeyEvent);
                window.addEventListener('keydown', changeKey);


            } else if (x >= 770 && y >= 555 && x <= 870 && y <= 585) {

                ctx.fillStyle = "black";
                ctx.fillRect(440, 350, 400, 70);
                ctx.font = "30px Lucida Console";
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.fillText("Press a key", canvas.width / 2, 385);
                keyChange = 3;
                window.removeEventListener('click', backToMenu);
                window.removeEventListener('click', changeKeyEvent);
                window.addEventListener('keydown', changeKey);


            } else if (x >= 770 && y >= 595 && x <= 870 && y <= 625) {

                ctx.fillStyle = "black";
                ctx.fillRect(440, 350, 400, 70);
                ctx.font = "30px Lucida Console";
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.fillText("Press a key", canvas.width / 2, 385);
                keyChange = 4;
                window.removeEventListener('click', backToMenu);
                window.removeEventListener('click', changeKeyEvent);
                window.addEventListener('keydown', changeKey);


            }

        }

        function howToPlayEvent(e) {
            var x = e.pageX - canvas.offsetLeft;
            var y = e.pageY - canvas.offsetTop;

            if (x >= 5 && y >= 665 && x <= 215 && y <= 715) {

                window.removeEventListener('click', chooseDificulty);
                window.removeEventListener('click', howToPlayEvent);
                howToPlay();
            }
        }


        homeMenu();




    }
}