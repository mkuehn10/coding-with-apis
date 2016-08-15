$(function() {
    /**
     * XHR wrapped in a promise
     * @param  {String} url - The URL to fetch.
     * @return {Promise}    - A Promise that resolves when the XHR succeeds and fails otherwise.
     */
    function get(url) {
        return fetch(url, {
            method: 'get'
        });
    }

    /**
     * Performs an XHR for a JSON and returns a parsed JSON response.
     * @param  {String} url - The JSON URL to fetch.
     * @return {Promise}    - A promise that passes the parsed JSON response.
     */
    function getJSON(url) {
        return get(url).then(function(response) {
            return response.json();
        });
    }

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

        var url = 'https://www.googleapis.com/youtube/v3/search?' + $.param(params);

        getJSON(url).then(function(response) {
            showResults(response.items);
        });

        // $.ajax({
        //         url: 'https://www.googleapis.com/youtube/v3/search',
        //         data: params,
        //         dataType: 'json'
        //     })
        //     .done(function(data) {
        //         showResults(data.items);
        //     })
        //     .fail(function(jqXHR, error) {
        //         console.log('something went wrong');
        //     });
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
