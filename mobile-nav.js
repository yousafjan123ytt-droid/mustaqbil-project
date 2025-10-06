document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMenuButton = document.getElementById('close-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu && closeMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.add('is-open');
        });

        closeMenuButton.addEventListener('click', () => {
            mobileMenu.classList.remove('is-open');
        });
    }
});
