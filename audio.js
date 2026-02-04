// --- AUDIO DATA (Add your audio links here) ---
const audioStories = [
    {
        id: 1,
        title: "The Midnight Encounter",
        desc: "A romantic night that turned wild.",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Replace with your MP3 link
        image: "https://placehold.co/100x100/222/fff?text=Story+1"
    },
    {
        id: 2,
        title: "Office Secrets",
        desc: "What happens in the cabin stays in the cabin.",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", // Replace with your MP3 link
        image: "https://placehold.co/100x100/222/fff?text=Story+2"
    },
    {
        id: 3,
        title: "College Romance",
        desc: "First love and hidden desires.",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", // Replace with your MP3 link
        image: "https://placehold.co/100x100/222/fff?text=Story+3"
    },
    {
        id: 4,
        title: "The Neighbor",
        desc: "She was always watching from the window...",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", // Replace with your MP3 link
        image: "https://placehold.co/100x100/222/fff?text=Story+4"
    }
];

const container = document.getElementById('audioList');
const player = document.getElementById('globalAudioPlayer');
let currentPlayingId = null;

function initAudio() {
    container.innerHTML = "";
    
    audioStories.forEach(story => {
        const card = document.createElement('div');
        card.className = "audio-card";
        card.id = `card-${story.id}`;
        
        card.innerHTML = `
            <img src="${story.image}" class="audio-thumb">
            <div class="audio-info">
                <div class="audio-title">${story.title}</div>
                <div class="audio-desc">${story.desc}</div>
                
                <div class="audio-controls">
                    <button class="ctrl-btn" onclick="playAudio(${story.id}, '${story.src}')" id="btn-${story.id}">▶</button>
                    <button class="ctrl-btn secondary" onclick="skipTime(10)">+10s</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function playAudio(id, src) {
    const btn = document.getElementById(`btn-${id}`);
    
    // If clicking the same button that is currently playing
    if (currentPlayingId === id && !player.paused) {
        player.pause();
        btn.innerText = "▶";
        return;
    }

    // Reset all other buttons
    document.querySelectorAll('.ctrl-btn').forEach(b => {
        if(b.innerText === "⏸") b.innerText = "▶";
    });

    // Play new audio
    if (currentPlayingId !== id) {
        player.src = src;
        currentPlayingId = id;
    }
    
    player.play();
    btn.innerText = "⏸";
}

function skipTime(seconds) {
    if (!player.paused) {
        player.currentTime += seconds;
    }
}

// Ensure init runs
document.addEventListener("DOMContentLoaded", initAudio);
