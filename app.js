// const searchSongs = () => {
//     const searchText = document.getElementById('search-field').value;
//     const url = `https://api.lyrics.ovh/suggest/${searchText}`
//     fetch(url)
//         .then(res => res.json())
//         .then(data => displaySongs(data.data))

// }


//Search by Enter key functionalities
var searchBtn = document.getElementById("search-button");
document.getElementById("search-field")
    .addEventListener("keypress", function (event) {
       
        if (event.key == 'Enter'){
            searchBtn.click();


        }
    });

const searchSongs = async () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    toggleSpinner();
    try {
        const res = await fetch(url);
        const data = await res.json();
        displaySongs(data.data);

    } catch (error) {
        displayError("Sorry Something wrong!");

    }

}

const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = "single-result row align-items-center my-3 p-3";


        songDiv.innerHTML = `
        <div class="col-md-9">
             <h3 class="lyrics-name">${song.title}</h3>
             <p class="author lead">Album by <span>${song.artist.name}</span></p>
             <audio controls>
                <source src="${song.preview}" type="audio/ogg">
                
                
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
              <button onclick ="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `
        songContainer.appendChild(songDiv);
        toggleSpinner();
    })

}

const getLyric = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    const res = await fetch(url);
    const data = await res.json();
    displayLyrics(data.lyrics);
    // document.getElementById('song-lyrics').innerHTML = '';

}
const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');

    lyricsDiv.innerText = lyrics;
}

const displayError = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}

const toggleSpinner = () => {
    const spinner = document.getElementById('loading-spinner');
    // if (show) {
    //     spinner.classList.remove("d-none");
    // }
    spinner.classList.toggle('d-none');
    // else {
    //     spinner.classList.add('d-none');

    // }
}