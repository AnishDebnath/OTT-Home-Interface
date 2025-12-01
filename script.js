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
    const bgVideo = document.getElementById('bg-video');
    if (bgVideo && movie.trailer) {
        // YouTube embed URL with autoplay, mute, loop, and controls hidden
        const videoUrl = `https://www.youtube.com/embed/${movie.trailer}?autoplay=1&mute=1&loop=1&playlist=${movie.trailer}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`;
        bgVideo.src = videoUrl;
    }

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
        // Reset to collapsed state
        content.classList.add('line-clamp-3');
        content.classList.remove('w-[800px]');
        if (toggleButton) toggleButton.textContent = 'Show more';
    }
};

if (typeof movies !== 'undefined' && cardContainer) {
    movies.forEach((movie, index) => {
        const card = document.createElement('div');
        const isActive = index === 0; // Default first one active

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

// const prevButton = document.getElementById('prev-button');
// const nextButton = document.getElementById('next-button');

// if (prevButton && nextButton && cardContainer) {
//     prevButton.addEventListener('click', () => {
//         cardContainer.scrollBy({ left: -208, behavior: 'smooth' });
//     });

//     nextButton.addEventListener('click', () => {
//         cardContainer.scrollBy({ left: 208, behavior: 'smooth' });
//     });
// }

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
        const walk = (x - startX) * 0.8; // Scroll-slow/natural
        cardContainer.scrollLeft = scrollLeft - walk;
    });
}