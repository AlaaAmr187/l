let movieImg = document.getElementsByClassName("movieImg");
let title = document.getElementsByClassName("title");
let overView = document.getElementsByClassName("overView");
let rDate = document.getElementsByClassName('rDate');
let rate = document.getElementsByClassName("rate");
let row = document.getElementById('row');
let search = document.getElementById('search')
let nowlPaying = document.getElementById('now-playing')
let popular = document.getElementById('popular');
let topRe = document.getElementById('top-rated')
let trending = document.getElementById('trending')
let upcoming = document.getElementById('upcoming')


let sub = document.getElementById('sub')
let nameInput = document.getElementById('nameInput')
let emailInput = document.getElementById('emailInput')
let phoneInput = document.getElementById('phoneInput')
let passInput = document.getElementById('passInput')
let rePassInput = document.getElementById('rePassInput')
let ageInput = document.getElementById('ageInput')




$(document).ready(() => {
    $(".loading-screen").fadeOut(500);
})


//scroll

$(window).on("scroll", function () {
    if ($(window).scrollTop() > 600) {
        $(".scroll-to-top").fadeIn(500);

    } else {
        $(".scroll-to-top").fadeOut(500);

    }
})


$(".scroll-to-top").on("click", function () {
    $('html').animate({ scrollTop: 0 }, 2000);
})







let ageRegex = /^(1[6-9]|[2-9][0-9])$/;
let phoneRegex = /^01[0125][0-9]{8}$/;
let passRegex = /^[A-Za-z1-9 ]{8,}$/;
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



let isRight = false;

function showError(input, show) {
    if (show) {
        input.nextElementSibling.classList.remove("invisible");
        input.nextElementSibling.style.color = "rgb(214,46,51)";
        input.style.borderBottom = "2px solid rgb(214,46,51)";
    } else {
        input.nextElementSibling.classList.add("invisible");
        input.style.borderBottom = "2px solid white";
    }
}

function validate(input, regex) {
    let isValid = regex.test(input.value);
    showError(input, !isValid);
    updateSubmitButton();
    return isValid;
}

function validatePasswordField() {
    const validPass = passRegex.test(passInput.value);
    showError(passInput, !validPass);
    validateRepasswordField();
    updateSubmitButton();
    return validPass;
}

function validateRepasswordField() {
    const passOk = passRegex.test(passInput.value);
    const isMatch = passOk && (passInput.value === rePassInput.value);
    showError(rePassInput, !isMatch);
    updateSubmitButton();
    return isMatch;
}

function allFieldsValid() {
    return (
        emailRegex.test(emailInput.value) &&
        phoneRegex.test(phoneInput.value) &&
        ageRegex.test(ageInput.value) &&
        passRegex.test(passInput.value) &&
        passInput.value === rePassInput.value
    );
}

function updateSubmitButton() {
    if (
        emailInput.value === "" &&
        phoneInput.value === "" &&
        ageInput.value === "" &&
        passInput.value === "" &&
        rePassInput.value === ""
    ) {
        sub.style.backgroundColor = "black";
        sub.style.color = "white";
        sub.style.transform = "translateX(0px)";
        isRight = false;
    } else if (allFieldsValid()) {
        sub.style.backgroundColor = "black";
        sub.style.color = "white";
        sub.style.transform = "translateX(0px)";
        isRight = false;
    } else {
        sub.style.backgroundColor = "rgb(214,46,51)";
        sub.style.color = "white";
    }
}

sub.addEventListener("mouseenter", function () {
    if (!allFieldsValid() && !(emailInput.value === "" && phoneInput.value === "" && ageInput.value === "" &&
        passInput.value === "" && rePassInput.value === "")) {
        if (!isRight) {
            sub.style.transform = "translateX(100px)";
            isRight = true;
        } else {
            sub.style.transform = "translateX(0px)";
            isRight = false;
        }
    }
});

emailInput.addEventListener("input", () => validate(emailInput, emailRegex));
phoneInput.addEventListener("input", () => validate(phoneInput, phoneRegex));
ageInput.addEventListener("input", () => validate(ageInput, ageRegex));
passInput.addEventListener("input", validatePasswordField);
rePassInput.addEventListener("input", validateRepasswordField);

updateSubmitButton();





sub.addEventListener("click", function (e) {
    e.preventDefault();

    if (allFieldsValid()) {
        emailInput.value = "";
        phoneInput.value = "";
        ageInput.value = "";
        passInput.value = "";
        rePassInput.value = "";
        nameInput.value = "";

        const inputs = [emailInput, phoneInput, ageInput, passInput, rePassInput, nameInput];
        inputs.forEach(input => {
            input.style.borderBottom = "2px solid white";
            if (input.nextElementSibling) input.nextElementSibling.classList.add("invisible");
        });

        updateSubmitButton();

        window.scrollTo({ top: 0, behavior: "smooth" });

        alert("Form submitted successfully!");
    } else {
        alert("Please fill all fields correctly!");
    }
});









let imgUrl = "https://image.tmdb.org/t/p/w500"


// api fetch
async function getApi() {
    myHttp = await fetch('https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44')
    myResponse = await myHttp.json()
    console.log(myResponse)

}
async function getApiPopular() {
    myHttp = await fetch('https://api.themoviedb.org/3/discover/tv?api_key=cc683b658b3603389ea796f1d9677810&include_adult=false&language=en-US&page=1&sort_by=popularity.desc')
    myResponse = await myHttp.json()
    console.log(myResponse)
}

async function getApiupcoming() {
    myHttp = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=cc683b658b3603389ea796f1d9677810&include_adult=false&language=en-US&page=1&sort_by=popularity.desc')
    myResponse = await myHttp.json()
    console.log(myResponse)
}

async function getApiTopRated() {
    myHttp = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=cc683b658b3603389ea796f1d9677810&language=en-US&page=1')
    myResponse = await myHttp.json()
    console.log(myResponse)
}

async function getApiNowPlaying() {
    myHttp = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=cc683b658b3603389ea796f1d9677810&language=en-US&page=1')
    myResponse = await myHttp.json()
    console.log(myResponse)
}

async function getApitrending() {
    myHttp = await fetch('https://api.themoviedb.org/3/trending/all/day?api_key=cc683b658b3603389ea796f1d9677810&language=en-US')
    myResponse = await myHttp.json()
    console.log(myResponse)
}

// key= cc683b658b3603389ea796f1d9677810


// functions

let arr = []
async function getMovies(ApiFun) {
    await ApiFun()
    for (let i = 0; i < myResponse.results.length; i++) {
        let movie = {
            Imag: myResponse.results[i].poster_path,
            name: (myResponse.results[i].original_name === undefined) ? myResponse.results[i].original_title : myResponse.results[i].original_name,
            desc: myResponse.results[i].overview,
            rDate: (myResponse.results[i].release_date === undefined) ? myResponse.results[i].first_air_date : myResponse.results[i].release_date,
            vote: myResponse.results[i].vote_average,
            star: myResponse.results[i].genre_ids
        }
        arr.push(movie)
        console.log(arr[i].star.length)
    }
    display()
    addHoverEffects()
}

console.log(arr[0])



function display() {
    row.innerHTML = ''
    for (let i = 0; i < arr.length; i++) {
        row.innerHTML += `<div class="col">
                    <div class="inner overflow-hidden rounded-2 position-relative">
                        <div class="movieImage">
                            <img src="${imgUrl + arr[i].Imag}" alt=""
                                class="w-100 movieImg">
                            <div class="layer">
                                <h1 class="title animate__animated animate__slideOutLeft title">${arr[i].name}</h1>
                                <p class="overView animate__animated animate__slideOutLeft">${arr[i].desc}</p>
                                <p class="rDate animate__animated animate__slideOutLeft">realse date:${arr[i].rDate}
                                </p class="stars animate__animated animate__slideOutLeft">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <div class="rate animate__animated animate__slideOutLeft">
                                    ${arr[i].vote}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`}

    addHoverEffects()

}




function addHoverEffects() {
    var inners = document.querySelectorAll('.inner');

    for (let i = 0; i < inners.length; i++) {
        let inner = inners[i];

        inner.addEventListener('mouseenter', function () {
            inner.querySelector('.layer').style.opacity = '1';
            inner.querySelector('.title').classList.replace(
                'animate__slideOutLeft', 'animate__slideInDown');
            inner.querySelector('.overView').classList.replace(
                'animate__slideOutLeft', 'animate__flipInX');
            inner.querySelector('.rDate').classList.replace(
                'animate__slideOutLeft', 'animate__slideInUp');
            inner.querySelector('.rate').classList.replace(
                'animate__slideOutLeft', 'animate__slideInUp');
        });

        inner.addEventListener('mouseleave', function () {
            inner.querySelector('.layer').style.opacity = '0';
            inner.querySelector('.title').classList.replace(
                'animate__slideInDown', 'animate__slideOutLeft');
            inner.querySelector('.overView').classList.replace(
                'animate__flipInX', 'animate__slideOutLeft');
            inner.querySelector('.rDate').classList.replace(
                'animate__slideInUp', 'animate__slideOutLeft');
            inner.querySelector('.rate').classList.replace(
                'animate__slideInUp', 'animate__slideOutLeft');
        });
    }
}



function clearMovies() {
    row.innerHTML = "";
    arr = [];
}


getMovies(getApi)

// events

popular.addEventListener('click', function (e) {
    e.preventDefault();
    clearMovies();
    getMovies(getApiPopular);
});



topRe.addEventListener('click', function (e) {
    e.preventDefault();
    clearMovies();
    getMovies(getApiTopRated);
});




trending.addEventListener('click', function (e) {
    e.preventDefault();
    clearMovies();
    getMovies(getApitrending);
});



upcoming.addEventListener('click', function (e) {
    e.preventDefault();
    clearMovies();
    getMovies(getApiupcoming);
});



nowlPaying.addEventListener('click', function (e) {
    e.preventDefault();
    clearMovies();
    getMovies(getApiNowPlaying);
});







async function GetSearchApi(query) {
    let myHttp = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=feba6e1407c4bcd1f5fb887189f3422b&query=${query}`);
    let myResponse = await myHttp.json();
    return myResponse.results;
}

search.addEventListener("focus", async function () {
    clearMovies();
    await getMovies(getApi);
});

search.addEventListener('input', async function () {
    const query = search.value.trim();

    if (query === '') {
        clearMovies();
        await getMovies(getApi);
        return;
    }

    const results = await GetSearchApi(query);
    row.innerHTML = '';

    results.forEach(movie => {
        const movName = (movie.original_title || "").toLowerCase();
        if (movName.includes(query.toLowerCase())) {
            row.innerHTML += `
                <div class="col">
                    <div class="inner p-2">
                        <div class="position-relative overflow-hidden">
                            <img src="${imgUrl + movie.poster_path}" alt="" class="w-100 movieImg">
                            <div class="layer position-absolute top-0 end-0 start-0 bottom-0">
                                <h1 class="text-center title">${movie.original_title}</h1>
                                <p class="overView">${movie.overview}</p>
                                <p class="rDate">release date: ${movie.first_air_date}</p>
                                <div class="rate">${movie.vote_average}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    });
});





function openSideNav() {
    $(".side-nav-menu").animate({ left: 0 }, 500);
    $(".icon-open-close").removeClass("fa-align-justify").addClass("fa-x");

    for (let i = 0; i < 6; i++) {
        $(".link li").eq(i).animate({ top: 0 }, (i + 5) * 180);
    }
}

function closeSideNav() {
    let widthNavTap = $(".side-nav-menu .nav-tap").outerWidth();

    $(".side-nav-menu").animate({ left: -widthNavTap }, 500);
    $(".icon-open-close").addClass("fa-align-justify").removeClass("fa-x");

    for (let i = 0; i < 6; i++) {
        $(".link li").eq(i).animate({ top: 300 }, (i + 5) * 100);
    }
}

closeSideNav();

$(".icon-open-close").on("click", function () {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav();
    } else {
        openSideNav();
    }
});

