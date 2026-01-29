const id = new URLSearchParams(location.search).get("id");

async function initWatch() {
    if (!id) {
        document.getElementById("title").innerText = "No Video ID Provided";
        return;
    }

    // Try finding the video across all JSON files
    // NOTE: Ensure these paths match your folder structure
    const SOURCES = [
        "data/fuckmaza.json",
        "data/bhojpuri.json",
        "data/lol49.json"
    ];

    let foundVideo = null;
    let allVideos = [];

    for (const url of SOURCES) {
        try {
            const res = await fetch(url);
            const data = await res.json();
            allVideos = [...allVideos, ...data]; // Collect for suggestions
            
            const v = data.find(x => x.id === id);
            if (v) foundVideo = v;
        } catch (e) {
            console.error("Error loading JSON:", url);
        }
    }

    if (foundVideo) {
        // Setup Player
        const player = document.getElementById("player");
        player.src = foundVideo.embedUrl;
        player.poster = foundVideo.thumbnailUrl; // Show thumb before play

        // Setup Info
        document.getElementById("title").innerText = foundVideo.title;
        document.getElementById("description").innerText = foundVideo.description || "No description available.";

        // Setup Tags
        const tagsContainer = document.getElementById("tags");
        tagsContainer.innerHTML = "";
        if (foundVideo.tags) {
            foundVideo.tags.forEach(t => {
                const s = document.createElement("span");
                s.className = "tag-pill";
                s.innerText = `#${t}`;
                tagsContainer.appendChild(s);
            });
        }

        // Render Related Videos
        renderRelated(foundVideo, allVideos);
    } else {
        document.getElementById("title").innerText = "Video Not Found";
    }
}

function renderRelated(current, all) {
    const relatedList = document.getElementById("related");
    relatedList.innerHTML = "";

    // Simple suggestion algorithm: 
    // Filter out current video -> Shuffle -> Pick 8
    const suggestions = all
        .filter(v => v.id !== current.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 8); // Show 8 suggestions

    suggestions.forEach(v => {
        const d = document.createElement("div");
        d.className = "card";
        
        // SAME HTML AS APP.JS FOR CONSISTENCY
        d.innerHTML = `
            <div style="position:relative;">
                <img src="${v.thumbnailUrl}" class="card-thumb" loading="lazy">
                <span class="duration-badge">${v.duration || '00:00'}</span>
            </div>
            <div class="card-info">
                <div class="card-title">${v.title}</div>
                <div class="card-meta">
                    <span>${v.views ? v.views + ' views' : 'New'}</span>
                </div>
            </div>
        `;
        
        d.onclick = () => window.location.href = `watch.html?id=${v.id}`;
        relatedList.appendChild(d);
    });
}

document.addEventListener("DOMContentLoaded", initWatch);
