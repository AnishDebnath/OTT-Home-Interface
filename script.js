const navItems = document.querySelectorAll('#nav-menu li');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
    });
});

const toggleButton = document.getElementById('toggleButton');
const content = document.getElementById('content');

toggleButton.addEventListener('click', () => {
    content.classList.toggle('line-clamp-3');
    content.classList.toggle('w-[800px]');

    if (content.classList.contains('line-clamp-3')) {
        toggleButton.textContent = 'Show more';
    } else {
        toggleButton.textContent = 'Show less';
    }
});