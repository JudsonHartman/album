const allLyrics = {
    'heavenorhell.mp3': [
        { time: 0, text: "Lyrics line 1 for Heaven or Hell" },
        { time: 10, text: "Lyrics line 2 for Heaven or Hell" }
        // ... add more lyrics as needed
    ],
    'euphoria.mp3': [
        { time: 0, text: "Lyrics line 1 for Another Song" },
        { time: 10, text: "Lyrics line 2 for Another Song" }
        // ... add more lyrics as needed
    ]
    // ... add more songs and their lyrics
};

// Function to handle each video container
document.querySelectorAll('.video-container').forEach(container => {
    const playButtonImage = container.querySelector('.play-button img');
    const videoFrame = container.querySelector('.video-frame');
    const musicPlayer = container.querySelector('.music-player');
    const audioElement = container.querySelector('.music-player audio');
    const lyricsContainer = container.querySelector('.lyrics-container');

    // Extract the audio file name
    const audioSrc = audioElement.querySelector('source').getAttribute('src');
    const audioFileName = audioSrc.split('/').pop();

    // Get the lyrics for this audio file
    const lyrics = allLyrics[audioFileName];

    audioElement.ontimeupdate = () => {
        const currentTime = audioElement.currentTime;
        const currentLyric = lyrics.find(lyric => currentTime >= lyric.time && (!lyrics[lyrics.indexOf(lyric) + 1] || currentTime < lyrics[lyrics.indexOf(lyric) + 1].time));
        if (currentLyric) {
            lyricsContainer.textContent = currentLyric.text;
        }
    };

    container.querySelector('.play-container').addEventListener('click', () => {
        if (videoFrame.style.display === 'none') {
            videoFrame.style.display = 'flex';
            musicPlayer.style.display = 'none';
            playButtonImage.src = './images/play.png';
            if (!audioElement.paused) {
                audioElement.pause();
                audioElement.currentTime = 0;
            }
        } else {
            videoFrame.style.display = 'none';
            musicPlayer.style.display = 'flex';
            playButtonImage.src = './images/pause.png';
            audioElement.play();
        }
    });
});