// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBOFZxWUm7q9DRsBH8hn7McRPIM0IbJonA",
//   authDomain: "akshai-ui.firebaseapp.com",
//   projectId: "akshai-ui",
//   storageBucket: "akshai-ui.appspot.com",
//   messagingSenderId: "355938465039",
//   appId: "1:355938465039:web:7e87c2ed7d8ddcfa34fa7a",
//   measurementId: "G-PE3VZV4GDH",
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

("use strict");
var accessToken =
  "178c93e018c0b2feedc9811c33b69876139c6a16f5db6e1b3d182130e7e3e42f";

// Call Dribble v2 API
$.ajax({
  url: "https://api.dribbble.com/v2/user/shots?access_token=" + accessToken,
  dataType: "json",
  type: "GET",
  success: function (data) {
    if (data.length > 0) {
      $.each(data.reverse(), function (i, val) {
        $("#portfolio-grid").prepend(
          '<div class="portfolio-item photo">' +
            '<a class="popup-link" target="_blank" href="' +
            val.images.hidpi +
            '" title="' +
            val.title +
            '">' +
            '<img src="' +
            val.images.hidpi +
            '"/> <div class="portfolio-caption"> <h3 class="portfolio-title">' +
            val.title +
            '</h3><div class="portfolio-descr">Photo / Web</div></a></div>'
        );
      });
      $(function () {
        var worksgrid = $("#portfolio-grid");
        $("a", filters).on("click", function () {
          var selector = $(this).attr("data-filter");
          $(".current", filters).removeClass("current");
          $(this).addClass("current");
          worksgrid.isotope({
            filter: selector,
          });
          return false;
        });
        $(window)
          .on("resize", function () {
            var windowWidth = Math.max($(window).width(), window.innerWidth),
              itemWidht = $(".grid-sizer").width(),
              itemHeight = Math.floor(itemWidht * 0.95),
              itemTallHeight = itemHeight * 2;
            if (windowWidth > 500) {
              $(".portfolio-item", worksgrid).each(function () {
                if ($(this).hasClass("tall")) {
                  $(this).css({
                    height: itemTallHeight,
                  });
                } else if ($(this).hasClass("wide")) {
                  $(this).css({
                    height: itemHeight,
                  });
                } else if ($(this).hasClass("wide-tall")) {
                  $(this).css({
                    height: itemTallHeight,
                  });
                } else {
                  $(this).css({
                    height: itemHeight,
                  });
                }
              });
            } else {
              $(".portfolio-item", worksgrid).each(function () {
                if ($(this).hasClass("tall")) {
                  $(this).css({
                    height: itemTallHeight,
                  });
                } else if ($(this).hasClass("wide")) {
                  $(this).css({
                    height: itemHeight / 2,
                  });
                } else if ($(this).hasClass("wide-tall")) {
                  $(this).css({
                    height: itemHeight,
                  });
                } else {
                  $(this).css({
                    height: itemHeight,
                  });
                }
              });
            }
            worksgrid.isotope();
          })
          .resize();
        $(".popup-link").magnificPopup({
          type: "image",
          gallery: {
            enabled: true,
          },
          image: {
            titleSrc: function (item) {
              return item.el.attr("title") + "<small>by Scribble Panda</small>";
            },
          },
        });
      });
    } else {
      $("#shots").append("<p>No shots yet!</p>");
    }
  },
});
function GetHeightCss() {
  var h =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  var w =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  var css = "";
  var $window = $(window);
  var windowsize = $window.width();
  if (windowsize > 767) {
    var pad = 0;
  } else {
    var pad = 0;
  }
  var availableheight = h - pad;
  css = ".height-one{ height: " + availableheight + "px;}";
  var cssEle = document.getElementById("heightStyle");
  if (cssEle == null) {
    var head = document.head || document.getElementsByTagName("head")[0],
      style = document.createElement("style");
    style.type = "text/css";
    style.setAttribute("id", "heightStyle");
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);
  } else {
    cssEle.innerHTML = css;
  }
}
GetHeightCss();
$(window).on("resize", function () {
  GetHeightCss();
  equalheight(".equal-height > div");
});
var equalheight = function (container) {
  var currentTallest = 0,
    currentRowStart = 0,
    rowDivs = new Array(),
    $el,
    topPosition = 0;
  $(container).each(function () {
    $el = $(this);
    $($el).height("auto");
    topPosition = $el.position().top;
    if (currentRowStart != topPosition) {
      for (var currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
        rowDivs[currentDiv].height(currentTallest);
      }
      rowDivs.length = 0; // empty the array
      currentRowStart = topPosition;
      currentTallest = $el.height();
      rowDivs.push($el);
    } else {
      rowDivs.push($el);
      currentTallest =
        currentTallest < $el.height() ? $el.height() : currentTallest;
    }
    for (var currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
      rowDivs[currentDiv].height(currentTallest);
    }
  });
};
$(window).on("load", function () {
  equalheight(".equal-height > div");
  $("#loading").hide();
});

//dribble
// const URL = "https://api.dribbble.com/v2/shots?access_token=";
// 5c3e531d36533b6602dbfb92d9aad8b00e5d258e748057234d423a374161df5f

// {
//     "access_token": "178c93e018c0b2feedc9811c33b69876139c6a16f5db6e1b3d182130e7e3e42f",
//     "token_type": "Bearer",
//     "scope": "public",
//     "created_at": 1630298356
// }
