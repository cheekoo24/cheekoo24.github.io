$(document).ready(function () {

    // Typing animation
    new Typed("#typing", {
        strings: ["Software Developer", "Web Developer"],
        typeSpeed: 100,
        backSpeed: 100,
        loop: true
    })


    // Carousel animation for projects
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    })

    // hire me button animation
    $('#hire').click(function() {
        $('.contact-title').toggleClass('contact-title-active');
    });

})


// Time and Calendar
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

setInterval(showTime, 1000);

function showTime() {
    const date = new Date();
    document.getElementById("time").innerHTML = date.toLocaleTimeString();

    document.getElementById("month").innerHTML = months[date.getMonth()];
    document.getElementById("date").innerHTML = date.getDate();
    document.getElementById("year").innerHTML = date.getFullYear();
    document.getElementById("day").innerHTML = days[date.getDay()];
}
