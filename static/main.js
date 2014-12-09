function time(in_secs) {
    var mins, secs;
    mins = Math.floor(in_secs / 60);
    secs = parseInt(secs - mins * 60);
    return mins + ":" + secs;

}

(function () {
    var audio_player, title;

    function updateInfo() {
        if (audio_player) {
            $('.info').html(
                'Playing: ' + title + "<br/>" +
                time(audio_player.currentTime) + "/" + time(audio_player.duration)
            );
        }
    }

    $(function () {
        $('.podcasts li button').click(function () {
            var mp3_url = $(this).closest('li').attr('data-mp3'),
            title = $(this).closest('li').find('span').text();
            if(!audio_player) {
                audio_player = new Audio();
                audio_player.addEventListener('progress', updateInfo);
            }
            audio_player.setAttribute('src', mp3_url);
            audio_player.load();
            audio_player.play();
        });
    });
})();
