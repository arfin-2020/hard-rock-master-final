document.getElementById("search-btn").addEventListener("click", function() {
    const inputTex = document.getElementById("input-box").value;
    const url = `https://api.lyrics.ovh/suggest/${inputTex}`

    // try {
    //     fetch(url)
    //         .then(res => res.json())
    //         .then(data => displaySongs(data.data));
    // } catch (err) {
    //     catchError("sorry Cound't fine. Try again later");
    // }

    fetch(url)
        .then(res => res.json())
        .then(data => displaySongs(data.data))
        .catch(error => catchError("Can't find any songs. please try again later"));

});

const displaySongs = songs => {
    console.log(songs);
    const songList = document.getElementById("song-list");
    songList.innerText = "";
    document.getElementById("input-box").value = "";
    songs.forEach(song => {
        const songDiv = document.createElement("div");
        songDiv.className = "single-result row align-items-center my-3 p-3"
        songDiv.innerHTML = `
        <div class="col-md-9">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span>${song.artist.name}</span></p>
        </div>

        <audio
            controls
             src = "${song.preview}"> 
        </audio>

        <div class="col-md-3 text-md-right text-center">
        <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `
        songList.appendChild(songDiv);

    });
};

const getLyric = (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
        // console.log(url);
        // try {
        //     fetch(url)
        //         .then(res => res.json())
        //         .then(data => displayLyric(data.lyrics))
        // } catch (err) {
        //     catchError("Try again later");
        // }


    fetch(url)
        .then(res => res.json())
        .then(data => displayLyric(data.lyrics))
        .catch(error => catchError("Try again later"));


}

const displayLyric = lyrics => {
    // console.log(lyrics);
    const songLyric = document.getElementById("song-lyric");
    songLyric.innerText = lyrics;
}

const catchError = error => {
    const errorControl = document.getElementById("error-control")
        // console.log(error);
    const errorhandle = document.getElementById("error")
    errorhandle.innerText = error;
    errorControl.appendChild(errorhandle);
}