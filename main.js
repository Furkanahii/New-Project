// Timeline Animation
function revealTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (itemTop < windowHeight * 0.8) {
            item.classList.add('revealed');
        }
    });
}

// World Map Configuration
function initializeMap() {
    const map = L.map('worldMap').setView([20, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Story locations data
    const locations = [
        {
            lat: 34.0479,
            lng: 100.6197,
            title: "Malala's Story",
            type: "education",
            description: "Fighting for girls' education in Pakistan"
        },
        {
            lat: -33.9249,
            lng: 18.4241,
            title: "Mandela's Story",
            type: "human-rights",
            description: "Leading South Africa to democracy"
        },
        {
            lat: 59.3293,
            lng: 18.0686,
            title: "Greta's Story",
            type: "climate",
            description: "Youth climate activism movement"
        },
        {
            lat: 33.7490,
            lng: -84.3880,
            title: "MLK's Story",
            type: "human-rights",
            description: "Civil rights movement in America"
        }
    ];

    // Custom marker icons
    const markerIcons = {
        education: L.divIcon({
            className: 'custom-marker education',
            html: '<i class="fas fa-graduation-cap"></i>'
        }),
        'human-rights': L.divIcon({
            className: 'custom-marker human-rights',
            html: '<i class="fas fa-hands-helping"></i>'
        }),
        climate: L.divIcon({
            className: 'custom-marker climate',
            html: '<i class="fas fa-leaf"></i>'
        })
    };

    // Add markers to map
    locations.forEach(loc => {
        const marker = L.marker([loc.lat, loc.lng], {
            icon: markerIcons[loc.type]
        })
        .bindPopup(`
            <div class="map-popup">
                <h5>${loc.title}</h5>
                <p>${loc.description}</p>
                <a href="individual-stories/${loc.title.toLowerCase().replace("'s story", "")}.html" 
                   class="btn btn-sm btn-primary">Read More</a>
            </div>
        `)
        .addTo(map);
    });
}

// Search and Filter Functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-box input');
    const categorySelect = document.querySelector('.search-box select');
    const storyCards = document.querySelectorAll('.story-card');

    function filterStories() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categorySelect.value.toLowerCase();

        storyCards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const category = card.querySelector('.category-badge').textContent.toLowerCase();
            const text = card.querySelector('.card-text').textContent.toLowerCase();

            const matchesSearch = title.includes(searchTerm) || text.includes(searchTerm);
            const matchesCategory = selectedCategory === 'category' || category === selectedCategory;

            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
            }
        });
    }

    searchInput.addEventListener('input', filterStories);
    categorySelect.addEventListener('change', filterStories);
}

// Newsletter Form Handler
function initializeNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;

        if (validateEmail(email)) {
            // Here you would typically send this to your backend
            showToast('Thank you for subscribing!', 'success');
            emailInput.value = '';
        } else {
            showToast('Please enter a valid email address', 'error');
        }
    });
}

// Email Validation
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Toast Notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }, 100);
}

// Smooth Scroll
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    initializeSearch();
    initializeNewsletterForm();
    initializeSmoothScroll();
    
    // Add scroll event listener for timeline animation
    window.addEventListener('scroll', revealTimelineItems);
    window.addEventListener('load', revealTimelineItems);
});
