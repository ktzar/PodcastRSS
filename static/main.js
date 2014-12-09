function time(in_secs) {
    var mins, secs;
    mins = Math.floor(in_secs / 60);
    secs = parseInt(in_secs - mins * 60);
    if (secs < 10) {
        secs = "0" + secs;
    }
    return mins + ":" + secs;

}

(function () {
    var audio_player, title;

    function updateInfo() {
        if (audio_player) {
            $('.info .playing').html(
                'Playing: ' + title + "<br/>" +
                time(audio_player.currentTime) + "/" + time(audio_player.duration)
            );
            percentage = 100 * (audio_player.currentTime / audio_player.duration);
            $('.info .progress-bar').css('width', percentage+ "%");
        }
    }

    $(function () {
        $('.podcasts li button').click(function () {
            var mp3_url = $(this).closest('li').attr('data-mp3');

            title = $(this).closest('li').find('span').text();
            if(!audio_player) {
                audio_player = new Audio();
            }
            audio_player.setAttribute('src', mp3_url);
            audio_player.load();
            audio_player.play();
        });
        $('.js-play').click(function (){
            audio_player.play();
        });
        $('.js-pause').click(function (){
            audio_player.pause();
        });
        setInterval(updateInfo, 500);
    });
})();
