const companies = [
    {
        name: "Google",
        logo: "../assets/companies/google.webp",
        type: "Product",
        category: "Technology"
    },

    {
        name: "Microsoft",
        logo: "../assets/companies/microsoft.webp",
        type: "Product",
        category: "Technology"
    },

    {
        name: "Amazon",
        logo: "../assets/companies/amazon.webp",
        type: "Product",
        category: "Technology"
    },

    {
        name: "Apple",
        logo: "../assets/companies/apple.webp",
        type: "Product",
        category: "Technology"
    },

    {
        name: "Meta",
        logo: "../assets/companies/meta.webp",
        type: "Product",
        category: "Technology"
    },

    {
        name: "NVIDIA",
        logo: "../assets/companies/nvidia.webp",
        type: "Product",
        category: "AI & Semiconductors"
    },

    {
        name: "AMD",
        logo: "../assets/companies/amd.webp",
        type: "Product",
        category: "Semiconductors"
    },

    {
        name: "Adobe",
        logo: "../assets/companies/adobe.webp",
        type: "Product",
        category: "Software"
    },

    {
        name: "IBM",
        logo: "../assets/companies/ibm.webp",
        type: "Product",
        category: "Technology"
    },

    {
        name: "Intel",
        logo: "../assets/companies/intel.webp",
        type: "Product",
        category: "Semiconductors"
    },

    {
        name: "OpenAI",
        logo: "../assets/companies/openai.webp",
        type: "Product",
        category: "Artificial Intelligence"
    },

    {
        name: "Infosys",
        logo: "../assets/companies/infosys.webp",
        type: "Service",
        category: "IT Services"
    },

    {
        name: "Wipro",
        logo: "../assets/companies/wipro.webp",
        type: "Service",
        category: "IT Services"
    },

    {
        name: "Accenture",
        logo: "../assets/companies/accenture.webp",
        type: "Service",
        category: "Consulting & IT Services"
    },

    {
        name: "Cognizant",
        logo: "../assets/companies/cognizantfoundation.webp",
        type: "Service",
        category: "IT Services"
    },

    {
        name: "Capgemini",
        logo: "../assets/companies/capgemini.webp",
        type: "Service",
        category: "IT Services"
    },

    {
        name: "HCLTech",
        logo: "../assets/companies/hcl-karriere.webp",
        type: "Service",
        category: "IT Services"
    },

    {
        name: "Hexaware",
        logo: "../assets/companies/hexaware.webp",
        type: "Service",
        category: "IT Services"
    },

    {
        name: "Tech Mahindra",
        logo: "../assets/companies/techmbs.webp",
        type: "Service",
        category: "IT Services"
    },

    {
        name: "QSpiders",
        logo: "../assets/companies/qspidersglobal.webp",
        type: "Training",
        category: "Placement Training"
    }
];

const companiesGrid = document.getElementById("companiesGrid");
const companySearch = document.getElementById("companySearch");
const companyCount = document.getElementById("companyCount");
const noCompanies = document.getElementById("noCompanies");

const filterButtons =
    document.querySelectorAll(".company-filter");

let currentFilter = "All";


function renderCompanies() {

    const searchText =
        companySearch.value.trim().toLowerCase();

    const filteredCompanies = companies.filter(company => {

        const matchesSearch =
            company.name.toLowerCase().includes(searchText);

        const matchesFilter =
            currentFilter === "All" ||
            company.type === currentFilter;

        return matchesSearch && matchesFilter;
    });


    companiesGrid.innerHTML = "";

    companyCount.textContent =
        filteredCompanies.length;


    if (filteredCompanies.length === 0) {

        noCompanies.style.display = "block";

        return;
    }


    noCompanies.style.display = "none";


    filteredCompanies.forEach(company => {

        const card = document.createElement("div");

        card.className = "company";


        card.innerHTML = `
            
            <div class="company-logo">

                <img
                    src="${company.logo}"
                    alt="${company.name} logo"
                    loading="lazy"
                >

            </div>


            <div class="company-type">
                ${company.type}
            </div>


            <h2>
                ${company.name}
            </h2>


            <p>
                ${company.category}
            </p>


            <a
                href="company-details.html?company=${encodeURIComponent(company.name)}"
                class="btn"
            >

                <span>
                    View Preparation
                </span>

                <span>
                    →
                </span>

            </a>

        `;


        companiesGrid.appendChild(card);

    });

}


companySearch.addEventListener(
    "input",
    renderCompanies
);


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });


        button.classList.add("active");


        currentFilter =
            button.dataset.filter;


        renderCompanies();

    });

});


renderCompanies();