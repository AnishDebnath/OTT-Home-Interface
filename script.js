// YouTube player instance
let player = null;
let isMuted = true; // Default state is muted

//  This function creates an <iframe> (and YouTube player)
function onYouTubeIframeAPIReady() {
    // Will be called automatically when API is ready
}

// Wait for everything to load
window.addEventListener('load', () => {
    const navItems = document.querySelectorAll('#nav-menu li');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });

    const toggleButton = document.getElementById('toggleButton');
    const content = document.getElementById('content');

    if (toggleButton && content) {
        toggleButton.addEventListener('click', () => {
            content.classList.toggle('line-clamp-3');
            content.classList.toggle('w-[800px]');

            if (content.classList.contains('line-clamp-3')) {
                toggleButton.textContent = 'Show more';
            } else {
                toggleButton.textContent = 'Show less';
            }
        });
    }

    const cardContainer = document.getElementById('card-container');
    const titleContainer = document.getElementById('title-container');
    const movieRating = document.getElementById('movie-rating');
    const movieVotes = document.getElementById('movie-votes');
    const movieYear = document.getElementById('movie-year');
    const movieDuration = document.getElementById('movie-duration');
    const movieGenre = document.getElementById('movie-genre');

    const updateMainView = (movie) => {
        if (titleContainer) {
            const parts = movie.title.split(':');
            titleContainer.innerHTML = '';
            parts.forEach(part => {
                const h1 = document.createElement('h1');
                h1.className = 'title';
                h1.textContent = part.trim();
                titleContainer.appendChild(h1);
            });
        }

        if (movieRating) movieRating.textContent = movie.rating;
        if (movieVotes) movieVotes.textContent = movie.votes;
        if (movieYear) movieYear.textContent = movie.year;
        if (movieDuration) movieDuration.textContent = movie.duration;
        if (movieGenre) movieGenre.textContent = movie.genre;
        if (content) {
            content.textContent = movie.description;
            content.classList.add('line-clamp-3');
            content.classList.remove('w-[800px]');
            if (toggleButton) toggleButton.textContent = 'Show more';
        }

        // Load new video
        if (movie.trailer) {
            if (player) {
                // If player exists, load new video
                player.loadVideoById({
                    videoId: movie.trailer,
                    startSeconds: 0
                });
                // Apply current mute state
                if (isMuted) {
                    player.mute();
                } else {
                    player.unMute();
                }
            } else {
                // Create new player
                player = new YT.Player('bg-video', {
                    videoId: movie.trailer,
                    playerVars: {
                        autoplay: 1,
                        controls: 0,
                        showinfo: 0,
                        rel: 0,
                        loop: 1,
                        playlist: movie.trailer,
                        modestbranding: 1,
                        playsinline: 1,
                        mute: isMuted ? 1 : 0
                    },
                    events: {
                        'onReady': (event) => {
                            event.target.playVideo();
                            if (isMuted) {
                                event.target.mute();
                            }
                        },
                        'onStateChange': (event) => {
                            // When video ends (state 0), restart it
                            if (event.data === YT.PlayerState.ENDED) {
                                event.target.playVideo();
                            }
                        }
                    }
                });
            }
        }
    };

    //Initialize cards
    if (typeof movies !== 'undefined' && cardContainer) {
        movies.forEach((movie, index) => {
            const card = document.createElement('div');
            const isActive = index === 0;

            card.className = isActive ? 'card-active' : 'card';

            const gradient = isActive
                ? 'linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%)'
                : 'linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%)';

            card.style.backgroundImage = `${gradient}, url('${movie.image}')`;
            card.dataset.image = movie.image;

            card.addEventListener('click', () => {
                Array.from(cardContainer.children).forEach(c => {
                    c.className = 'card';
                    c.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url('${c.dataset.image}')`;
                });

                card.className = 'card-active';
                card.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), url('${movie.image}')`;

                updateMainView(movie);
            });

            cardContainer.appendChild(card);

            if (isActive) {
                updateMainView(movie);
            }
        });
    }

    // Drag to scroll functionality
    if (cardContainer) {
        let isDown = false;
        let startX;
        let scrollLeft;

        cardContainer.style.cursor = 'grab';

        cardContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            cardContainer.style.cursor = 'grabbing';
            startX = e.pageX - cardContainer.offsetLeft;
            scrollLeft = cardContainer.scrollLeft;
        });

        cardContainer.addEventListener('mouseleave', () => {
            isDown = false;
            cardContainer.style.cursor = 'grab';
        });

        cardContainer.addEventListener('mouseup', () => {
            isDown = false;
            cardContainer.style.cursor = 'grab';
        });

        cardContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - cardContainer.offsetLeft;
            const walk = (x - startX) * 0.8;
            cardContainer.scrollLeft = scrollLeft - walk;
        });
    }

    // Mute/Unmute button functionality
    const muteButton = document.getElementById('mute-button');
    const mutedIcon = document.getElementById('muted-icon');
    const unmutedIcon = document.getElementById('unmuted-icon');

    if (muteButton && mutedIcon && unmutedIcon) {
        muteButton.addEventListener('click', () => {
            if (!player) return; // No player yet

            isMuted = !isMuted;

            // Toggle icon visibility
            if (isMuted) {
                mutedIcon.style.display = 'block';
                unmutedIcon.style.display = 'none';
                player.mute();
            } else {
                mutedIcon.style.display = 'none';
                unmutedIcon.style.display = 'block';
                player.unMute();
            }
        });
    }
});