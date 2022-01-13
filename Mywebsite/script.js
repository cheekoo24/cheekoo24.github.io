$(document).ready(function () {
    var typed = new Typed("#typing", {
        strings: ["Software Developer", "Web Developer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    })


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
})

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const date = new Date();
document.getElementById("month").innerHTML = months[date.getMonth()];
document.getElementById("date").innerHTML = date.getDate();
document.getElementById("year").innerHTML = date.getFullYear();
document.getElementById("day").innerHTML = days[date.getDay()];


setInterval(showTime, 1000);

function showTime() {
    const date2 = new Date();
    document.getElementById("time").innerHTML = date2.toLocaleTimeString();
}
