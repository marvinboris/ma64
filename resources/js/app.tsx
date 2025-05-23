/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

import "./bootstrap";

$(function () {
    $.getScript("/js/aos.js", function () {
        window.AOS.init();
    });

    $.getScript("/js/jquery.waypoints.min.js", function () {
        $.getScript("/js/jquery.countup.min.js", function () {
            $(".counter").countUp();
        });
    });

    $.getScript("/js/jquery.star-rating-svg.js", function () {
        $(".ranking-stars").starRating({
            totalStars: 5,
            starShape: "rounded",
            starSize: 16,
            emptyColor: "lightgray",
            hoverColor: "salmon",
            activeColor: "orange",
            useGradient: false,
            callback: function (currentRating: string) {
                $('input[name="mark"]').val(currentRating);
                console.log(currentRating);
            },
        });

        $(".read-only-stars").starRating({
            readOnly: true,
            starShape: "rounded",
            starSize: 16,
        });
    });

    const toolbar = $(".Frontend .Toolbar");
    if (window.scrollY > (toolbar.height() || 0)) toolbar.addClass("dark");
    document.addEventListener("scroll", function () {
        if (window.scrollY > (toolbar.height() || 0)) toolbar.addClass("dark");
        else toolbar.removeClass("dark");
    });

    $.getScript("https://kit.fontawesome.com/762c591422.js");

    window.CORS = "https://api.allorigins.win/get?url=";
    window.PREFIX = "/api/";

    if (
        localStorage.getItem("lang") == "undefined" ||
        !localStorage.getItem("lang")
    )
        localStorage.setItem("lang", import.meta.env.VITE_DEFAULT_LANG || "en");

    import("./src");
});

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
