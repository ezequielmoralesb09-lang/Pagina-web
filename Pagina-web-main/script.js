/* =========================================================
   GTA VI - VICE CITY
   JavaScript de la página
   Nicolás Krul & Ezequiel Morales
   Scuola Italiana
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       AÑO AUTOMÁTICO
    ===================================================== */

    const yearElements = document.querySelectorAll(".current-year");

    yearElements.forEach(element => {
        element.textContent = new Date().getFullYear();
    });


    /* =====================================================
       NAVEGACIÓN SUAVE
    ===================================================== */

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       NAVBAR AL HACER SCROLL
    ===================================================== */

    const nav = document.querySelector("nav");

    function updateNavbar() {

        if (!nav) return;

        if (window.scrollY > 80) {

            nav.style.background =
                "rgba(9, 6, 17, 0.96)";

            nav.style.boxShadow =
                "0 10px 40px rgba(0, 0, 0, 0.40)";

        } else {

            nav.style.background =
                "rgba(9, 6, 17, 0.80)";

            nav.style.boxShadow =
                "none";
        }

    }

    window.addEventListener("scroll", updateNavbar);

    updateNavbar();


    /* =====================================================
       MENÚ MÓVIL
    ===================================================== */

    const navList = document.querySelector("nav ul");

    if (nav && navList) {

        const menuButton = document.createElement("button");

        menuButton.className = "mobile-menu-button";

        menuButton.innerHTML = "☰";

        menuButton.setAttribute(
            "aria-label",
            "Abrir menú"
        );

        menuButton.style.display = "none";

        nav.appendChild(menuButton);


        /* Estilos del botón móvil */

        const mobileStyle =
            document.createElement("style");

        mobileStyle.textContent = `

            .mobile-menu-button {
                border: none;
                background: transparent;
                color: white;
                font-size: 28px;
                cursor: pointer;
                padding: 5px 10px;
                z-index: 1001;
            }

            @media (max-width: 700px) {

                .mobile-menu-button {
                    display: block !important;
                }

                nav {
                    position: fixed;
                }

                nav ul.mobile-open {
                    display: flex !important;

                    position: absolute;

                    top: 70px;
                    left: 5%;
                    right: 5%;

                    flex-direction: column;

                    align-items: center;

                    gap: 20px;

                    padding: 25px;

                    background:
                        rgba(12, 7, 20, 0.98);

                    border:
                        1px solid rgba(255,47,168,0.25);

                    border-radius: 20px;

                    box-shadow:
                        0 20px 50px
                        rgba(0,0,0,0.5);

                    backdrop-filter: blur(20px);
                }

            }

        `;

        document.head.appendChild(mobileStyle);


        menuButton.addEventListener("click", () => {

            navList.classList.toggle("mobile-open");

            if (
                navList.classList.contains(
                    "mobile-open"
                )
            ) {

                menuButton.innerHTML = "✕";

            } else {

                menuButton.innerHTML = "☰";

            }

        });


        /* Cerrar menú al elegir una sección */

        navList
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener("click", () => {

                    navList.classList.remove(
                        "mobile-open"
                    );

                    menuButton.innerHTML = "☰";

                });

            });

    }


    /* =====================================================
       ANIMACIONES AL APARECER
    ===================================================== */

    const animatedElements =
        document.querySelectorAll(
            ".info-card, .character, .hack, .location, .world-image"
        );


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    animatedElements.forEach(element => {

        element.classList.add(
            "scroll-animation"
        );

        observer.observe(element);

    });


    /* CSS de las animaciones */

    const animationStyle =
        document.createElement("style");

    animationStyle.textContent = `

        .scroll-animation {
            opacity: 0;

            transform:
                translateY(35px);

            transition:
                opacity 0.8s ease,
                transform 0.8s ease;
        }

        .scroll-animation.visible {
            opacity: 1;

            transform:
                translateY(0);
        }

    `;

    document.head.appendChild(animationStyle);


    /* =====================================================
       CONTADOR PARA GTA VI
    ===================================================== */

    /*
       Fecha anunciada:
       19 de noviembre de 2026
    */

    const releaseDate =
        new Date(
            "2026-11-19T00:00:00"
        );


    const countdownContainer =
        document.querySelector(".release");


    if (countdownContainer) {

        const countdown =
            document.createElement("div");

        countdown.className =
            "gta-countdown";

        countdown.innerHTML = `

            <div class="countdown-box">

                <span id="days">0</span>
                <small>DÍAS</small>

            </div>

            <div class="countdown-box">

                <span id="hours">0</span>
                <small>HORAS</small>

            </div>

            <div class="countdown-box">

                <span id="minutes">0</span>
                <small>MINUTOS</small>

            </div>

            <div class="countdown-box">

                <span id="seconds">0</span>
                <small>SEGUNDOS</small>

            </div>

        `;


        const releaseDateElement =
            countdownContainer.querySelector(
                ".release-date"
            );


        if (releaseDateElement) {

            releaseDateElement.insertAdjacentElement(
                "afterend",
                countdown
            );

        } else {

            countdownContainer.appendChild(
                countdown
            );

        }


        /* CSS del contador */

        const countdownStyle =
            document.createElement("style");

        countdownStyle.textContent = `

            .gta-countdown {

                display: flex;

                justify-content: center;

                gap: 15px;

                flex-wrap: wrap;

                margin: 30px auto;

            }

            .countdown-box {

                min-width: 100px;

                padding: 18px 15px;

                border-radius: 18px;

                background:
                    rgba(255,255,255,0.06);

                border:
                    1px solid
                    rgba(255,47,168,0.25);

                backdrop-filter: blur(10px);

                box-shadow:
                    0 10px 30px
                    rgba(0,0,0,0.2);

            }

            .countdown-box span {

                display: block;

                font-size: 32px;

                font-weight: 900;

                color: #ff72c7;

            }

            .countdown-box small {

                display: block;

                margin-top: 3px;

                font-size: 10px;

                font-weight: 800;

                letter-spacing: 1px;

                color: #91899d;

            }

            @media (max-width: 600px) {

                .countdown-box {

                    min-width: 75px;

                    padding: 14px 10px;

                }

                .countdown-box span {

                    font-size: 25px;

                }

            }

        `;

        document.head.appendChild(
            countdownStyle
        );


        /* Actualizar contador */

        function updateCountdown() {

            const now =
                new Date();

            const difference =
                releaseDate - now;


            const days =
                Math.floor(
                    difference /
                    (1000 * 60 * 60 * 24)
                );


            const hours =
                Math.floor(
                    (difference /
                        (1000 * 60 * 60)) %
                    24
                );


            const minutes =
                Math.floor(
                    (difference /
                        (1000 * 60)) %
                    60
                );


            const seconds =
                Math.floor(
                    (difference / 1000) %
                    60
                );


            const daysElement =
                document.getElementById(
                    "days"
                );

            const hoursElement =
                document.getElementById(
                    "hours"
                );

            const minutesElement =
                document.getElementById(
                    "minutes"
                );

            const secondsElement =
                document.getElementById(
                    "seconds"
                );


            if (difference > 0) {

                daysElement.textContent =
                    days;

                hoursElement.textContent =
                    String(hours)
                        .padStart(2, "0");

                minutesElement.textContent =
                    String(minutes)
                        .padStart(2, "0");

                secondsElement.textContent =
                    String(seconds)
                        .padStart(2, "0");

            } else {

                daysElement.textContent =
                    "0";

                hoursElement.textContent =
                    "00";

                minutesElement.textContent =
                    "00";

                secondsElement.textContent =
                    "00";

                countdown.innerHTML = `

                    <div class="countdown-box"
                         style="min-width:280px">

                        <span>🎮</span>

                        <small>
                            ¡GTA VI YA ESTÁ DISPONIBLE!
                        </small>

                    </div>

                `;

            }

        }


        updateCountdown();

        setInterval(
            updateCountdown,
            1000
        );

    }


    /* =====================================================
       BOTÓN "VOLVER ARRIBA"
    ===================================================== */

    const topButton =
        document.createElement("button");

    topButton.className =
        "back-to-top";

    topButton.innerHTML = "↑";

    topButton.setAttribute(
        "aria-label",
        "Volver arriba"
    );


    const topButtonStyle =
        document.createElement("style");

    topButtonStyle.textContent = `

        .back-to-top {

            position: fixed;

            right: 25px;
            bottom: 25px;

            width: 48px;
            height: 48px;

            border: none;

            border-radius: 50%;

            background:
                linear-gradient(
                    135deg,
                    #ff2fa8,
                    #8b3dff
                );

            color: white;

            font-size: 23px;

            font-weight: 900;

            cursor: pointer;

            z-index: 900;

            opacity: 0;

            visibility: hidden;

            transform:
                translateY(20px);

            transition:
                opacity 0.3s ease,
                transform 0.3s ease,
                visibility 0.3s ease;

            box-shadow:
                0 10px 30px
                rgba(255,47,168,0.30);

        }

        .back-to-top.show {

            opacity: 1;

            visibility: visible;

            transform:
                translateY(0);

        }

        .back-to-top:hover {

            transform:
                translateY(-5px);

            box-shadow:
                0 15px 35px
                rgba(255,47,168,0.45);

        }

    `;

    document.head.appendChild(
        topButtonStyle
    );

    document.body.appendChild(
        topButton
    );


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {

                topButton.classList.add(
                    "show"
                );

            } else {

                topButton.classList.remove(
                    "show"
                );

            }

        }
    );


    topButton.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =====================================================
       EFECTO PARALLAX SUAVE EN EL HERO
    ===================================================== */

    const hero =
        document.querySelector(".hero");


    if (hero) {

        window.addEventListener(
            "scroll",
            () => {

                const scroll =
                    window.scrollY;

                if (scroll < window.innerHeight) {

                    hero.style.backgroundPosition =
                        `center ${scroll * 0.25}px`;

                }

            }
        );

    }


    /* =====================================================
       EFECTO DE HOVER EN TARJETAS
    ===================================================== */

    const cards =
        document.querySelectorAll(
            ".info-card, .hack"
        );


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    ((y - centerY) /
                        centerY) *
                    -2;

                const rotateY =
                    ((x - centerX) /
                        centerX) *
                    2;

                card.style.transform =
                    `perspective(700px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });


    /* =====================================================
       MENSAJE DE CONSOLA
    ===================================================== */

    console.log(
        "%c GTA VI FAN PAGE ",
        `
        background: linear-gradient(
            90deg,
            #ff2fa8,
            #8b3dff
        );
        color: white;
        font-size: 20px;
        font-weight: bold;
        padding: 10px;
        border-radius: 8px;
        `
    );

    console.log(
        "Página realizada con ayuda de IA por Nicolás Krul y Ezequiel Morales - Scuola Italiana."
    );

});
