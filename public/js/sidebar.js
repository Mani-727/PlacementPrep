/* =========================================================
   PLACEMENT PREPARATION PORTAL
   SHARED SIDEBAR
   ========================================================= */

(function () {

    /*
        Get the current page path.

        This lets the sidebar automatically mark
        the current page as ACTIVE.
    */

    const currentPath =
        window.location.pathname.replace(/\\/g, "/");


    /* =====================================================
       DETERMINE ROOT PATH
       ===================================================== */

    const publicIndex =
        currentPath.indexOf("/public/");


    let relativeRoot = "";

    if (publicIndex !== -1) {

        const afterPublic =
            currentPath.substring(publicIndex + 8);

        const depth =
            afterPublic.split("/").length - 1;

        relativeRoot =
            "../".repeat(depth);

    }


    /* =====================================================
       SIDEBAR HTML
       ===================================================== */

    const sidebarHTML = `

        <aside class="sidebar" id="sidebar">


            <!-- SIDEBAR HEADER -->

            <div class="sidebar-header">

                <div class="sidebar-logo">

                   <div class="logo-image">
    <img
        src="${relativeRoot}assets/placementprep-logo.jpg"
        alt="PlacementPrep Logo">
</div>

                    <div class="logo-text">

                        <strong>
                            PlacementPrep
                        </strong>

                        <span>
                            Career Readiness Portal
                        </span>

                    </div>

                </div>


                <!-- CLOSE BUTTON -->

                <button
                    type="button"
                    class="sidebar-close"
                    id="sidebarClose"
                    aria-label="Close sidebar">

                    ✕

                </button>

            </div>


            <!-- NAVIGATION -->

            <nav class="sidebar-nav">


                <div class="sidebar-section-title">
                    Main Menu
                </div>


                <a
                    href="${relativeRoot}dashboard.html"
                    class="nav-link"
                    data-page="dashboard">

                    <span class="nav-icon">
                        ⌂
                    </span>

                    <span>
                        Dashboard
                    </span>

                </a>


                <a
                    href="${relativeRoot}preparation/preparation.html"
                    class="nav-link"
                    data-page="preparation">

                    <span class="nav-icon">
                        📚
                    </span>

                    <span>
                        Preparation
                    </span>

                </a>


                <a
                    href="${relativeRoot}tests/tests.html"
                    class="nav-link"
                    data-page="tests">

                    <span class="nav-icon">
                        📝
                    </span>

                    <span>
                        Mock Tests
                    </span>

                </a>


                <a
                    href="${relativeRoot}coding/coding.html"
                    class="nav-link"
                    data-page="coding">

                    <span class="nav-icon">
                        💻
                    </span>

                    <span>
                        Coding Practice
                    </span>

                </a>


                <div class="sidebar-section-title">
                    Career
                </div>


                <a
                    href="${relativeRoot}companies/companies.html"
                    class="nav-link"
                    data-page="companies">

                    <span class="nav-icon">
                        🏢
                    </span>

                    <span>
                        Companies
                    </span>

                </a>


                <a
                    href="${relativeRoot}interviews/interviews.html"
                    class="nav-link"
                    data-page="interviews">

                    <span class="nav-icon">
                        🎯
                    </span>

                    <span>
                        Interviews
                    </span>

                </a>


                <a
                    href="${relativeRoot}resume/resume-builder.html"
                    class="nav-link"
                    data-page="resume">

                    <span class="nav-icon">
                        📄
                    </span>

                    <span>
                        Resume Builder
                    </span>

                </a>


                <div class="sidebar-section-title">
                    Performance
                </div>


                <a
                    href="${relativeRoot}progress/progress.html"
                    class="nav-link"
                    data-page="progress">

                    <span class="nav-icon">
                        📊
                    </span>

                    <span>
                        My Progress
                    </span>

                </a>


                <a
                    href="${relativeRoot}progress/leaderboard.html"
                    class="nav-link"
                    data-page="leaderboard">

                    <span class="nav-icon">
                        🏆
                    </span>

                    <span>
                        Leaderboard
                    </span>

                </a>


            </nav>


            <!-- LOGOUT -->

            <div class="sidebar-bottom">

                <button
                    type="button"
                    class="logout-btn"
                    id="logoutBtn">

                    <span class="nav-icon">
                        ↪
                    </span>

                    <span>
                        Logout
                    </span>

                </button>

            </div>


        </aside>


        <!-- OPEN BUTTON -->

        <button
            type="button"
            class="sidebar-open"
            id="sidebarOpen"
            aria-label="Open sidebar">

            ☰

        </button>

    `;


    /* =====================================================
       INSERT SIDEBAR
       ===================================================== */

    document.body.insertAdjacentHTML(
        "afterbegin",
        sidebarHTML
    );


    /* =====================================================
       ELEMENTS
       ===================================================== */

    const sidebarClose =
        document.getElementById("sidebarClose");

    const sidebarOpen =
        document.getElementById("sidebarOpen");

    const logoutBtn =
        document.getElementById("logoutBtn");


    /* =====================================================
       CLOSE SIDEBAR
       ===================================================== */

    sidebarClose.addEventListener(
        "click",
        function () {

            document.body.classList.add(
                "sidebar-closed"
            );

            localStorage.setItem(
                "pppSidebarClosed",
                "true"
            );

        }
    );


    /* =====================================================
       OPEN SIDEBAR
       ===================================================== */

    sidebarOpen.addEventListener(
        "click",
        function () {

            document.body.classList.remove(
                "sidebar-closed"
            );

            localStorage.setItem(
                "pppSidebarClosed",
                "false"
            );

        }
    );


    /* =====================================================
       REMEMBER SIDEBAR STATE
       ===================================================== */

    const savedState =
        localStorage.getItem(
            "pppSidebarClosed"
        );


    if (savedState === "true") {

        document.body.classList.add(
            "sidebar-closed"
        );

    } else {

        /*
            Default:
            SIDEBAR OPEN
        */

        document.body.classList.remove(
            "sidebar-closed"
        );

    }


    /* =====================================================
       ACTIVE PAGE
       ===================================================== */

    const links =
        document.querySelectorAll(
            ".nav-link"
        );


    let activePage = "";


    if (
        currentPath.includes(
            "/preparation/"
        )
    ) {

        activePage = "preparation";

    } else if (
        currentPath.includes(
            "/tests/"
        )
    ) {

        activePage = "tests";

    } else if (
        currentPath.includes(
            "/coding/"
        )
    ) {

        activePage = "coding";

    } else if (
        currentPath.includes(
            "/companies/"
        )
    ) {

        activePage = "companies";

    } else if (
        currentPath.includes(
            "/interviews/"
        )
    ) {

        activePage = "interviews";

    } else if (
        currentPath.includes(
            "/resume/"
        )
    ) {

        activePage = "resume";

    } else if (
        currentPath.includes(
            "/progress/leaderboard"
        )
    ) {

        activePage = "leaderboard";

    } else if (
        currentPath.includes(
            "/progress/"
        )
    ) {

        activePage = "progress";

    } else if (
        currentPath.endsWith(
            "/dashboard.html"
        )
    ) {

        activePage = "dashboard";

    }


    links.forEach(function (link) {

        link.classList.remove("active");

        if (
            link.dataset.page === activePage
        ) {

            link.classList.add("active");

        }

    });


    /* =====================================================
       LOGOUT
       ===================================================== */

    logoutBtn.addEventListener(
        "click",
        async function () {

            try {

                const response =
                    await fetch(
                        "/api/auth/logout",
                        {
                            method: "POST",
                            credentials: "include"
                        }
                    );


                const data =
                    await response.json();


                if (data.success) {

                    localStorage.removeItem(
                        "pppSidebarClosed"
                    );

                    window.location.href =
                        `${relativeRoot}login.html`;

                } else {

                    alert(
                        data.message ||
                        "Logout failed."
                    );

                }

            } catch (error) {

                console.error(
                    "Logout error:",
                    error
                );

                alert(
                    "Unable to logout. Please try again."
                );

            }

        }
    );

})();