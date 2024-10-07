const createDoughnutChart = (id, value, backgroundColor) => {
    const ctx = document.getElementById(id).getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Value', 'Remaining'],
            datasets: [{
                data: [value, 100 - value],
                backgroundColor: [backgroundColor, '#343b36'],
                borderColor: '#343b36',
                borderWidth: 1
            }]
        },
        options: {
            cutout: '70%',
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#00FFFFFF'
                    }
                }
            }
        }
    });
};
// document.addEventListener('DOMContentLoaded', function() {
//     const analyticsSection = document.getElementById('analytics');
//     const chartWrappers = document.querySelectorAll('.chart-wrapper');

//     function isElementInViewport(el) {
//         const rect = el.getBoundingClientRect();
//         return (
//             rect.top >= 0 &&
//             rect.left >= 0 &&
//             rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
//             rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//         );
//     }

//     function animateChartsIfVisible() {
//         if (isElementInViewport(analyticsSection)) {
//             chartWrappers.forEach(wrapper => wrapper.classList.add('animate'));
//             window.removeEventListener('scroll', animateChartsIfVisible);
//         }
//     }

//     window.addEventListener('scroll', animateChartsIfVisible);
//     animateChartsIfVisible(); // Check initially in case the section is already in view
// });
// Intersection Observer for Animations
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('swoop-in');
            observer.unobserve(entry.target); // Stop observing once the animation is triggered
        }
    });
});

// Observe each chart-wrapper element
document.querySelectorAll('.chart-wrapper').forEach(wrapper => {
    observer.observe(wrapper);
});


// Example data for each doughnut
createDoughnutChart('doughnut1', 30, '#00ffcc'); // 30% of something
createDoughnutChart('doughnut2', 50, '#00ffcc'); // 50% of something
createDoughnutChart('doughnut3', 80, '#00ffcc'); // 80% of something
createDoughnutChart('doughnut4', 40, '#00ffcc'); // 40% of something
createDoughnutChart('doughnut5', 70, '#00ffcc'); // 70% of something


// Example of dynamically updating stats (optional)
document.getElementById('stat1').textContent = 150;  // New value for Users
document.getElementById('stat2').textContent = 400;  // New value for Campaigns
document.getElementById('stat3').textContent = 1200; // New value for Emails Sent

// Example of adding a new activity (optional)
const activityContainer = document.querySelector('.activity-container');
const newActivity = document.createElement('div');
newActivity.classList.add('activity-item');
newActivity.innerHTML = `
    <div class="activity-timestamp">2024-10-04 02:00 PM</div>
    <div class="activity-description">User Jane Smith updated profile.</div>
`;
activityContainer.prepend(newActivity); // Adds new activity at the top

const videos = document.querySelectorAll('.video-container video');
        let currentVideoIndex = 0;

        function playNextVideo() {
            videos[currentVideoIndex].classList.remove('active');
            currentVideoIndex = (currentVideoIndex + 1) % videos.length;
            videos[currentVideoIndex].classList.add('active');
        }

        // Initialize the first video
        videos[currentVideoIndex].classList.add('active');
        videos[currentVideoIndex].play();

        // Set up the video transition
        setInterval(() => {
            playNextVideo();
            videos[currentVideoIndex].play();
        }, 7000); // Change video every 5 seconds