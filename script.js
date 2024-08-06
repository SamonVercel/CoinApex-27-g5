function url() {
  fbq("track", "Purchase");
  fbq("track", "SubmitApplication");
  location.href = "https://chat.whatsapp.com/DEwTmeThw93BqGjowUxCfE";
}

var header = document.getElementById("header");
let allow = true;
window.addEventListener("scroll", function () {
  let y = window.scrollY;
  if (y > 80 && allow) {
    header.style.transition = "0.5s";
    header.style.top = "-180px";
    setTimeout(() => {
      header.classList.add("stick");
    }, 1);
    setTimeout(() => {
      header.style.position = "fixed";
      header.style.top = "0px";
      header.classList.remove("stick");
    }, 190);
    allow = false;
  }
  if (y == 0) {
    allow = true;
    header.style.position = "absolute";
    header.style.top = "0px";
  }
});

var closeBtn = document.getElementById("close-btn");
var menuBtn = document.getElementById("menu-btn");
var menu = document.getElementById("menu");

closeBtn.addEventListener("click", () => {
  menu.classList.remove("show");
});
menuBtn.addEventListener("click", () => {
  menu.classList.add("show");
});

var swiper = new Swiper(".mySwiper1", {
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // breakpoints: {
  //   640: {
  //     slidesPerView: 2,
  //   },
  //   768: {
  //     slidesPerView: 6,
  //   },
  // },
});

$(document).ready(function () {
  function coinapi() {
    $.ajax({
      type: "GET", // Use GET method for fetching data
      dataType: "json",
      url: "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,LTC,XRP,DASH,XMR,XEM,DOGE,ADA,BCH&tsyms=USD",
      success: function (data) {
        // Handle data here
        $bitcointPrice = data.DISPLAY.BTC.USD.PRICE;
        $bitcointpercent = data.DISPLAY.BTC.USD.CHANGEPCT24HOUR;
        // console.log("BitCoin:", data);
        $("#bitcoin-price").html($bitcointPrice);
        $("#bitcoin-percent").html($bitcointpercent);
        $("#ethcoin-price").html(data.DISPLAY.ETH.USD.PRICE);
        $("#ethcoin-percent").html(data.DISPLAY.ETH.USD.CHANGEPCT24HOUR);
        $("#dogcoin-price").html(data.DISPLAY.DOGE.USD.PRICE);
        $("#dogcoin-percent").html(data.DISPLAY.DOGE.USD.CHANGEPCT24HOUR);
        $("#canadocoin-price").html(data.DISPLAY.ADA.USD.PRICE);
        $("#canadocoin-percent").html(data.DISPLAY.ADA.USD.CHANGEPCT24HOUR);

        $redColor = $(".mkt");
        $upDown = $(".upDown");

        for (let i = 0; i < $redColor.length; i++) {
          if ($redColor[i].classList.contains("red")) {
            $redColor[i].classList.remove("red");
          }
          if ($upDown[i].classList.contains("rotate")) {
            $upDown[i].classList.remove("rotate");
          }
        }

        if ($bitcointpercent < 0) {
          $redColor[0].classList.add("red");
          $upDown[0].classList.add("rotate");
        }
        if (data.DISPLAY.ETH.USD.CHANGEPCT24HOUR < 0) {
          $redColor[1].classList.add("red");
          $upDown[1].classList.add("rotate");
        }
        if (data.DISPLAY.DOGE.USD.CHANGEPCT24HOUR < 0) {
          $redColor[2].classList.add("red");
          $upDown[2].classList.add("rotate");
        }
        if (data.DISPLAY.ADA.USD.CHANGEPCT24HOUR < 0) {
          $redColor[3].classList.add("red");
          $upDown[3].classList.add("rotate");
        }
      },
      error: function (status, error) {
        console.error("AJAX request failed:", status, error);
        // Handle error here
      },
    });
  }
  coinapi();
  setInterval(() => {
    coinapi();
  }, 10000);
});
