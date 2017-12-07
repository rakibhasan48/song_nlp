    
    var songs = [{
            'name': 'Titanium',
            'artist': 'Sia, David Guetta',
            'album': 'Nothing but the Beat',
            'duration': '4:05',
           'fileName': 'song1.mp3',
            'image': 'song1.jpg'

        },
        {
            'name': 'Tujhe Bhula Diya',
            'artist': 'Mohit Chauhan, Shekhar Ravjiani, Shruti Pathak',
            'album': 'Anjaana Anjaani',
            'duration': '2:46',
            'fileName': 'song2.mp3',
            'image': 'song2.jpg'
        },
        {
            'name': 'Nashe Si Chad Gayi',
            'artist': 'Arijit Singh',
            'album': 'Befikre',
            'duration': '2:34',
            'fileName': 'song3.mp3',
            'image': 'song3.jpg'

        },
        {
            'name': 'Bleeding Out',
            'artist': 'Imagine Dragons',
            'album': 'Night Visions',
            'duration': '3:43',
            'fileName': 'song4.mp3',
            'image': 'song4.jpg'

        },
        {
            'name': 'Attention',
            'artist': 'Charlie Puth',
            'album': 'Attention',
            'duration': '3:31',
            'fileName': 'song5.mp3',
            'image': 'song5.jpg'

        },
        {
            'name': 'Hymn For The Weekend',
            'artist': 'Coldplay',
            'album': 'A Head Full of Dreams',
            'duration': '3:37',
            'fileName': 'song6.mp3',
            'image': 'song6.jpg'

        },
        {
            'name': 'Jugaadi Jatt',
            'artist': 'Mankirt Aulakh',
            'album': 'Jugaadi Jatt',
            'duration': '3:05',
            'fileName': 'song7.mp3',
            'image': 'song7.jpg'

        },
        {
            'name': 'Kabira',
            'artist': 'Arijit Singh, Harshdeep Kaur',
            'album': 'Yeh Jawaani Hai Deewani',
            'duration': '3:43',
            'fileName': 'song8.mp3',
            'image': 'song8.jpg'

        },
        {
            'name': "We Don't Talk Anymore ",
            'artist': 'Charlie Puth feat. Selena Gomez',
            'album': 'Nine Track Mind',
            'duration': '3:37',
            'fileName': 'song9.mp3',
            'image': 'song9.jpg'

        },
        {
            'name': 'If Today Was Your Last Day',
            'artist': 'Nickelback',
            'album': 'Dark Horse',
            'duration': '4:08',
            'fileName': 'song10.mp3',
            'image': 'song10.jpg'

        },
        {
            'name': 'Happy',
            'artist': 'Pharell',
            'album': 'Girl',
            'duration': '3:51',
            'fileName': 'song11.mp3',
            'image': 'song11.jpg'

        },
        {
            'name': 'Shape of You',
            'artist': 'Ed Sheeran',
            'album': 'Divide',
            'duration': '4:07',
            'fileName': 'song12.mp3',
            'image': 'song12.jpg'

        },
    ]

        $('.welcome-screen button').on('click', function() {
        var name = $('#name-input').val();
        if(name.length > 2) {
        var message = "Welcome, " +  name;
        $('.main .user-name').text(message);
        $('.welcome-screen').addClass('hidden');
        $('.main').removeClass('hidden');
        }
        else {
            $('#name-input').addClass('error');
        }
    });

    function toggleSong() {
        var song = document.querySelector('audio');
        if(song.paused == true) {
            //console.log('Playing');
            $('.play-icon').removeClass('fa-play').addClass('fa-pause');
            song.play();
        }
        else {
            //console.log('Pausing');
            $('.play-icon').removeClass('fa-pause').addClass('fa-play');
            song.pause();
        }
    }

        function prettifyTime(num) {
        if(num < 10) {
            num = '0' + num;
        }
        return num;
    }

    function updateCurrentTime() {
        var song = document.querySelector('audio');
        var currentTimeInMinutes = Math.floor(song.currentTime/60);
        currentTimeInMinutes = prettifyTime(currentTimeInMinutes)
        var durationInMinutes = Math.floor(song.duration/60);
        durationInMinutes = prettifyTime(durationInMinutes);
        var currentTimeInSeconds = Math.floor(song.currentTime%60);
        currentTimeInSeconds = prettifyTime(currentTimeInSeconds);
        var durationInSeconds = Math.floor(song.duration%60);
        durationInSeconds = prettifyTime(durationInSeconds);
        $('.time-elapsed').text(currentTimeInMinutes + ':' + currentTimeInSeconds);
        $('.song-duration').text(durationInMinutes + ':' + durationInSeconds);
    }


    function changeCurrentSongDetails(songObj) {
        $('.current-song-image').attr('src','img/' + songObj.image)
        $('.current-song-name').text(songObj.name)
        $('.current-song-album').text(songObj.album)
        $('.bg').css({'background-image': 'url("img/' + songObj.image + '")'});
    }

    function getSong(songName) {
        
        for (var i=0; i<songs.length; i++) {
            if (songs[i].fileName == songName) return songs[i];
        }
    }

    function triggerSongEvent(songName){
        var audio = document.querySelector('audio');
        var currentSong = audio.src;
        if(currentSong.search(songName) != -1)
        {
            toggleSong();
        }
        else {
            console.log(songName);
            audio.src = songName;
            toggleSong();
            changeCurrentSongDetails(getSong(songName));
       }    
    }

    function addSongNameClickEvent(songObj,position) {
        var songName = songObj.fileName;
        position = position + 1;
        var id = '#song' + position;
        $(id).click(function() {
            triggerSongEvent(songName);    
        });
    }    

    function voiceActivate(){
        if (!('webkitSpeechRecognition' in window)) {
            upgrade();
        } else {
            var recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = true
        }

        recognition.start();

        recognition.onstart = function(){
            $('#mic').attr('src', 'mic_activate.png');
            $('#mic').css({'width' : '80px', 'height' : '80px'});
            $('#vc_text').text("Listening...");
        }

        recognition.onresult = function(event) {
            var interim_text = '';
            var final_text = '';

            for (var i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                final_text += event.results[i][0].transcript;
              } else {
               interim_text += event.results[i][0].transcript;
              }
            }

            console.log('Final Text = ' + final_text);
            //console.log(interim_text);

            if(final_text.length > 0){
                $.ajax({
                  url: 'https://api.wit.ai/message',
                  data: {
                    'q': final_text,
                    'access_token' : '5CYTI7KTDTCGQH4PO3RKRPWRSPUZUO2T'
                  },
                  dataType: 'jsonp',
                  method: 'GET',
                  success: function(response) {
                    console.log("success!", response);

                    var option = response.entities.intent[0].value;

                    switch(option){
                        
                        case 'play' : 
                            var receivedName = '';
                            
                            if(response.entities.songName)
                                receivedName += response.entities.songName[0].value;

                            console.log("Intent : " + receivedName);

                            if(receivedName == 'next'){
                                var current_song = document.querySelector('audio').src;

                                var cur_song_array = current_song.match(/\d+/g);
                                var cur_song_num = parseInt(cur_song_array[1]);
                                console.log(cur_song_num);

                                var next_song_num = 0;

                                if(cur_song_num == songs.length){
                                    next_song_num = 1;
                                }else{
                                    next_song_num = cur_song_num + 1;
                                }
        
                                var next_song = 'song' + next_song_num + '.mp3';

                                triggerSongEvent(next_song);

                                console.log('Current song : ' + current_song);
                                console.log('Next Song : ' + next_song);

                            }else if(receivedName == 'current' || receivedName.length < 1){
                                toggleSong();
                                break;
                            }

                            console.log(receivedName);  
                            var regex = new RegExp(receivedName, "gi");
                            var songName = "";

                            for(var i=0; i<songs.length; i++){
                                var matched = "";
                                matched += songs[i].name.match(regex);
                                console.log("Count " + i + " : " + songs[i].name + " : " + matched);
                                if(matched != null);
                                {   
                                    if(matched.length > 4){
                                        songName += songs[i].fileName;
                                        break;
                                    }
                                }
                            }

                            console.log(songName);

                            if(songName.length > 1){
                                triggerSongEvent(songName);
                            }

                            break;

                        case 'pause' :

                            toggleSong();
                            break;

                    }

                  }
                });
            }
            
        };

        recognition.onend = function(){
            $('#mic').attr('src', 'mic.png');
            $('#mic').css({'width' : '80px', 'height' : '80px'});
            $('#vc_text').text("");
        }
    }


    $('#mic').on('click', function(){
        voiceActivate();
        
    });

    $('.play-icon').on('click', function() {
        toggleSong();
    });

    $('body').on('keypress',function(event) {
        // if (event.keyCode == 32)
        // {
        //     toggleSong();
        // }

        switch(event.keyCode){
            case 32:
                toggleSong();
                break;
            case 118:
                voiceActivate();
                break;    
        }
    });


    // for (var i = 0; i < fileNames.length ; i++) {
    //     addSongNameClickEvent(fileNames[i],i)
    // }

    window.onload = function() {

        changeCurrentSongDetails(songs[0]);
        for(var i =0; i < songs.length;i++) {

            var obj = songs[i];
            var id_count = i+1;
            var name = '#song' + id_count;
            var details = '<ul class="list clickable" id="song'+ id_count + '"><li class="song-name"></li><li><ul class="list"><li class="song-artist"></li><li class="song-album"></li></ul></li></ul><hr>';

            $('.song_list').append(details);

            var song = $(name);
            
            song.find('.song-name').text(obj.name);
            song.find('.song-album').text(obj.album);
            song.find('.song-artist').text(obj.artist);
            song.find('.song-length').text(obj.duration);
            addSongNameClickEvent(obj,i)
        }
        

        updateCurrentTime(); 
        setInterval(function() {
            updateCurrentTime();
        },1000);
        // $('#songs').DataTable({
        //     paging: false
        // });
    }