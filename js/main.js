const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

const showView = (view) => {
    $$(".view").forEach((view) => view.classList.add("visually-hidden"));
    $(`#${view}`).classList.remove("visually-hidden")
};

renderJobs = (jobs) => {
    $("#cards-container").innerHTML = "";
    if (jobs) {
        showView("cards-container");
        for (let { name, image, description, location, category, seniority, id} of jobs) {
            $("#cards-container").innerHTML += `
                <div class="card" style="width: 14rem;">
                    <img src="${image}" class="card-img-top" alt="..."></img>
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text">${description}</p>
                    </div>
                    <div class="d-flex justify-content-around flex-wrap" style="margin: 6px;">
                    <p class="card-text badge text-wrap text-center" style="width: 6rem;">${location}</p>
                    <p class="card-text badge text-wrap text-center" style="width: 6rem;">${category}</p>
                    <p class="card-text badge text-wrap text-center" style="width: 6rem;">${seniority}</p>
                    </div>
                    <button class="btn-details rounded text-white" style="margin: 8px;" onclick=getDescriptionById(${id})>See Details</button>
                </div>`
        }
    } else {
        showView("")
    }
    console.log(jobs)  
};
getJobs()

let aux=getJobs();

// initialize function
const initialize = (data) => {
    renderJobs(data)
    getLocation(data);
    getSeniority(data);
    getCategory(data);
    $("#btn-search").addEventListener("click",()=>renderJobs(applyFilters(data)))
    $("#btn-clear").addEventListener("click",()=> renderJobs(data))   
};


// Get filters from API

const getLocation = (data) => {
    $("#select-location").innerHTML = "";
    $("#select-location").innerHTML = 
    `<option value="" selected disabled>Location</option>`;
    const locations = [];
    data.forEach((job) => {
        if (!locations.includes(job.location)) {
            locations.push(job.location);
        }
    }) 
    locations.forEach((location) => {
        $("#select-location").innerHTML += `<option value="${location}">${location}</option>`
    })
};

const getSeniority = (data) => {
    $("#select-seniority").innerHTML = "";
    $("#select-seniority").innerHTML = 
    `<option value="" selected disabled>Seniority</option>`;
    let seniority = [];
    data.forEach((job) => {
        if (!seniority.includes(job.seniority)) {
            seniority.push(job.seniority);
        }
    }) 
    seniority.forEach((seniority) => {
        $("#select-seniority").innerHTML += `<option value="${seniority}">${seniority}</option>`
    })
};

const getCategory = (data) => {
    $("#select-category").innerHTML = "";
    $("#select-category").innerHTML = 
    `<option value="" selected disabled>Category</option>`;
    let category = [];
    data.forEach((job) => {
        if (!category.includes(job.category)) {
            category.push(job.category);
        };
    }) 
    category.forEach((category) => {
        $("#select-category").innerHTML += `<option value="${category}">${category}</option>`
    })
};


// Filter search bar
const filterLocation = (data, country) => {
    const countries = [];
    data.forEach((element) => {
        if(element.location.includes(country)) {
            countries.push(element)
        }
    });
    return countries
};

const filterSeniority = (data, range) => {
    const ranges = [];
    data.forEach((element) => {
        if(element.seniority.includes(range)) {
            ranges.push(element)
        }
    });
    return ranges
};

const filterCategory = (data, category) => {
    const categories = [];
    data.forEach((element) => {
        if(element.category.includes(category)) {
            categories.push(element)
        }
    });
    return categories
};

const applyFilters = (data) => {
    const location = $("#select-location").value;
    console.log(location)
    const seniority = $("#select-seniority").value;
    console.log(seniority)
    const category = $("#select-category").value;
    console.log(category)
    let filteredJobs = data
    

    if (location !== "") {
        console.log("1")
        filteredJobs = filterLocation(filteredJobs, location)
    } 
    if (seniority !== "") {
        console.log("2")
        filteredJobs = filterSeniority(filteredJobs, seniority)
    }
    if (category !== "") {
        console.log("3")
        filteredJobs = filterCategory(filteredJobs, category)
    }
    return filteredJobs
};

// form view
const showForms = (formView) => {
    showView(formView);
};

// create new job function
const createJob = () => {
    let newJob = {
        name: $("#job-title").value,
        image: $("#job-image").value,
        description: $("#job-description").value,
        location: $("#job-location").value,
        category: $("#job-category").value,
        seniority: $("#job-seniority").value,
        benefits: {
            vacations: $("#job-vacations").value,
            health_ensurance: $("#job-health").value,
            internet_paid: $("#job-internet").checked,
        },
        salary: $("#job-salary").value,
        long_term: $("#job-long_term").checked,
        languages: $("#job-languages").value,
    }
    createPost(newJob)
    console.log(newJob)
    // return newJob
};

// Events
$("#btn-home").addEventListener("click", () => getJobs());
$("#submit-btn").addEventListener("click", () => createJob());
$("#btn-create-job").addEventListener("click", () => showForms("create-job"));


window.onload = initialize(data)