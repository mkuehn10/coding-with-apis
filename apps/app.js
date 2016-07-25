$(function() {

    $('form').submit(function(event) {
        event.preventDefault();
        var search = $('#query').val();
        getRequest(search);
    });

    var Video = function(watchURL, thumbnailImg) {
        this.watchURL = 'https://www.youtube.com/watch?v=' + watchURL;
        this.thumbnailImg = thumbnailImg;
    };

    Video.prototype.getURL = function() {
        return this.watchURL;
    };

    Video.prototype.getImg = function() {
        return this.thumbnailImg;
    };

    var getRequest = function(search) {
        var youtubeAPIKey = 'AIzaSyCBXGeMEgZqdVC2M8Iag8obl-eQnN-bmN0';

        var params = {
            part: 'snippet',
            key: youtubeAPIKey,
            q: search,
            type: 'video',
            order: 'relevance'
        };

        $.ajax({
                url: 'https://www.googleapis.com/youtube/v3/search',
                data: params,
                dataType: 'json'
            })
            .done(function(data) {
                showResults(data.items);
            })
            .fail(function(jqXHR, error) {
                console.log('something went wrong');
            });
    };

    var showResults = function(results) {
        $('#search-results').html('');
        results.forEach(function(result) {
            var currentVideo = new Video(result.id.videoId, result.snippet.thumbnails.medium.url);
            var $currentResult = $('.templates .result').clone();
            $currentResult.find('a').attr('href', currentVideo.getURL());
            $currentResult.find('img').attr('src', currentVideo.getImg());
            $('#search-results').append($currentResult);
        });
    };
});
