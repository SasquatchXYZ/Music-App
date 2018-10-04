// Query Functions =====================================================================================================
function queryBandsintownAPI(artist) {

    let apiKey = '';
    let queryURL = `https://rest.bandsintown.com/artists/${artist}?app_id=${apiKey}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
            // console.log(response);

            let artistSearch = response;

            let artistCard = $(`<div class="card text-center border-light" id="artist-card">`);
            let artistImage = $(`<img class="card-img-top" src=${artistSearch.thumb_url} alt=${artistSearch.name}>`);
            let artistCardBody = $(`<div class="card-body">
                                        <h5 class="card-title text-primary">${artistSearch.name}</h5>
                                        <p class="card-text text-primary">Fans Tracking: ${artistSearch.tracker_count}</p>
                                        <p class="card-text text-primary">Upcoming Events: ${artistSearch.upcoming_event_count}</p>
                                    </div>`);
            let artistContactCard = $(`<div class="card text-center border-light" id="artist-contact-card">`);
            let artistContactCardBody = $(`<div class="card-body">
                                                <h5 class="card-title text-primary">External Links:</h5>
                                                <p class="card-text text-primary"><a href="${artistSearch.facebook_page_url}" target="_blank">Facebook Page</a></p>
                                                <p class="card-text text-primary"><a href="${artistSearch.url}" target="_blank">Bands In Town Page</a></p>
                                           </div>`);

            artistCard.append(artistImage, artistCardBody);
            $("#second-column").append(artistCard);

            artistContactCard.append(artistContactCardBody);
            $("#third-column").append(artistContactCard);

        }).catch(console.log);
}

// =====================================================================================================================
function queryYoutubeAPI(band) {

    let resultsNum = "6";
    let searchBand = `${band} band`;
    let apiKey = '';
    let queryURL = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&maxResults=${resultsNum}&part=snippet&q=${searchBand}&type=video`;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
            let snippets = response.items;
            let videos = [];
            console.log(snippets);

            /*let videotest = snippets[0].id.videoId;
            console.log(videotest);

            let videoPlayer = $(`<div class="embed-responsive embed-responsive-16by9">
                                <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${videotest}" allowfullscreen></iframe>
                                    </div>`);

            $("#video-display").append(videoPlayer);*/

            for (var k = 0; k < snippets.length; k++) {
                console.log(snippets[k].id.videoId);
                videos.push(`https://www.youtube.com/embed/${snippets[k].id.videoId}`);
            }
            console.log(videos);

            for (var v = 0; v < snippets.length; v++) {
                let videoPlayer = $(`<div class="embed-responsive embed-responsive-16by9">
                                <iframe class="embed-responsive-item" src=${videos[v]} allowfullscreen></iframe>
                                    </div>`);
                console.log(videoPlayer);

                $(`#video-${v + 1}`).append(videoPlayer);
            }


        }).catch(console.log);
}

// Button Functions ====================================================================================================
$("#submit-band-name").on('click', function(event) {
    event.preventDefault();
    console.log("Search for Band");

    let searchBand = $("#inputBand").val().trim();
    console.log(`Search Band: ${searchBand}`);

    queryYoutubeAPI(searchBand);
    queryBandsintownAPI(searchBand);

    $("#inputBand").val("");

    $("#band-search-card").appendTo($("#first-column"));
    $("#second-column, #third-column, #video-1, #video-2, #video-3, #video-4, #video-5, #video-6").empty();

});