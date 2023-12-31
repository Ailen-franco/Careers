const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

// Show/Hide view function
const showView = (view) => {
    $$(".view").forEach((view) => view.classList.add("visually-hidden"));
    $(`#${view}`).classList.remove("visually-hidden")
};

const hideView = (view) => {
    $(`#${view}`).classList.add("visually-hidden");
};

const showSearch = (view) => {
    $(`#${view}`).classList.remove("visually-hidden");
};

// Render cards jobs
renderJobs = (jobs) => {
    $("#cards-container").innerHTML = "";
    if (jobs) {
        showView("cards-container");
        for (let { name, image, description, location, category, seniority, id} of jobs) {
            $("#cards-container").innerHTML += `
                <div class="card" style="width: 14rem;">
                    <img src="${image}" class="card-img-top img-fluid" alt="cards jobs" style="width: 14 rem; height: 10rem;"></img>
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text">${description}</p>
                    </div>
                    <div class="d-flex justify-content-around flex-wrap" style="margin: 6px;">
                    <p class="card-text badge text-wrap text-center" style="width: 6rem;">${location}</p>
                    <p class="card-text badge text-wrap text-center" style="width: 6rem;">${category}</p>
                    <p class="card-text badge text-wrap text-center" style="width: 6rem;">${seniority}</p>
                    </div>
                    <button id="btn-detail" class="btn-details rounded text-white" style="margin: 8px;" onclick=jobDetail(${id})>See Details</button>
                </div>`
        }
    } else {
        showView("")
    } 
};
getJobs()

// Render card detail
const renderDetail = (data) => {
    if (data) {
        $("#card-detail").innerHTML = `
            <div class="card" style="width: 30rem;">
                <img src="${data.image}" class="card-img-top" alt="cards job" style="width: 30rem rem; max-height: 20rem;"></img>
                <div class="card-body">
                    <h5 class="card-title">${data.name}</h5>
                    <p class="card-description">${data.description}</p>
                </div>
                <div class="d-flex justify-content-around flex-wrap" style="margin: 6px;">
                    <p class="card-text badge text-wrap text-center" style="width: 6rem;">${data.location}</p>
                    <p class="card-text badge text-wrap text-center" style="width: 6rem;">${data.category}</p>
                    <p class="card-text badge text-wrap text-center" style="width: 6rem;">${data.seniority}</p>
                </div>
                <div class="d-flex justify-content-center">
                    <button id="btn-edit-job" class="btn-edit rounded text-white" style="margin: 8px; width: 10rem">Edit job</button>
                    <button id="btn-delete-job" class="btn-delete rounded text-white" style="margin: 8px; width: 10rem">Delete job</button>
                </div>            
            </div>` 
    }
    showView("card-detail") 
    hideView("search-bar")
    $("#btn-edit-job").addEventListener("click", () => {
        showView("edit-job");
        fillEditForm(data);
    })
    
    if((!editButtonListenerAdded)) {
        $("#edit-btn").addEventListener("click", () => {
            createEditJob(data.id)
            editButtonListenerAdded = true;
        })
        $("#btn-delete-job").addEventListener("click", () => {
            showView("delete-card-msg");
        })
        $("#btn-delete-card").addEventListener("click", () => {
            deleteJob(data.id);
        })
    }
    $("#btn-delete-job").addEventListener("click", () => {
        showView("delete-card-msg");
    })
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

//Filter integrator function
const applyFilters = (data) => {
    const location = $("#select-location").value;
    const seniority = $("#select-seniority").value;
    const category = $("#select-category").value;  
    let filteredJobs = data
    
    if (location !== "") {
        filteredJobs = filterLocation(filteredJobs, location)
    } 
    if (seniority !== "") {
        filteredJobs = filterSeniority(filteredJobs, seniority)
    }
    if (category !== "") {
        filteredJobs = filterCategory(filteredJobs, category)
    }
    return filteredJobs
};

// create new job function
const createJob = () => {
    let img 
    if($("#job-image").value===""){
        img = "https://static.vecteezy.com/system/resources/previews/017/113/346/non_2x/employment-job-news-icon-vector.jpg"
    } else{
        img = $("#job-image").value
    }

    let newJob = {
        name: $("#job-title").value,
        image: img,
        description: $("#job-description").value,
        location: $("#job-location").value,
        category: $("#job-category").value,
        seniority: $("#job-seniority").value,
        benefits: {
            vacations: $("#job-vacations").value,
            health_ensurance: $("#job-health").value,
            internet_paid: $("#job-internet").value,
        },
        salary: $("#job-salary").value,
        long_term: $("#job-long_term").value,
        languages: $("#job-languages").value,
    }
    createPost(newJob)
    clearForm()
};

// Function to fill the inputs with the data of the selected card
const fillEditForm = (data) => {
    $("#edit-title").value = data.name; 
    $("#edit-image").value = data.image; 
    $("#image-edit").src = data.image;
    $("#edit-description").value = data.description; 
    $("#edit-location").value = data.location; 
    $("#edit-category").value = data.category; 
    $("#edit-seniority").value = data.seniority;
    $("#edit-vacations").value = data.benefits.vacations;
    $("#edit-health").value = data.benefits.health_ensurance;
    $("#edit-internet").value = data.benefits.internet_paid;
    $("#edit-salary").value = data.salary;
    $("#edit-long_term").value = data.long_term;
    $("#edit-languages").value = data.languages;
};

// Create edit job function
const createEditJob = (id) => {
    let img 
    if($("#edit-image").value===""){
        img = "https://static.vecteezy.com/system/resources/previews/017/113/346/non_2x/employment-job-news-icon-vector.jpg"
    } else{
        img = $("#edit-image").value
    }
    let newEditJob = {
        name: $("#edit-title").value,
        image: img,
        description: $("#edit-description").value,
        location: $("#edit-location").value,
        category: $("#edit-category").value,
        seniority: $("#edit-seniority").value,
        benefits: {
            vacations: $("#edit-vacations").value,
            health_ensurance: $("#edit-health").value,
            internet_paid: $("#edit-internet").value,
        },
        salary: $("#edit-salary").value,
        long_term: $("#edit-long_term").value,
        languages: $("#edit-languages").value,
    }
    createPut(newEditJob, id)
};

// Clear form inputs
const clearForm = () => {
    $("#job-title").value = "",
    $("#job-image").value = "",
    $("#job-description").value = "",
    $("#job-location").value = "",
    $("#job-category").value = "",
    $("#job-seniority").value = "",
    $("#job-vacations").value = "",
    $("#job-health").value = "",
    $("#job-internet").value = "",
    $("#job-salary").value = "",
    $("#job-long_term").value = "",
    $("#job-languages").value = "";
}; 

/// Events
let editButtonListenerAdded = false;
$("#btn-home").addEventListener("click", () => getJobs());
$("#submit-btn").addEventListener("click", () => createJob());
$("#btn-create-job").addEventListener("click", () => {
    showView("create-job");
    hideView("search-bar");
});
$("#btn-cancel-card").addEventListener("click", () => getJobs());

//Event that shows the image from the url
$("#job-image").addEventListener("keyup", () => {
    const imageUrlInput = $("#job-image");
    const imageElement = $("#image");
    if (imageUrlInput.value === "") {
        imageElement.src="img/icon-image-png-0.jpg"
    } else {
        imageElement.src = imageUrlInput.value
    }
});

//Event that shows the image edit from the url
$("#edit-image").addEventListener("keyup", () => {
    const imageUrlInput = $("#edit-image");
    const imageElement = $("#image-edit");
    if (imageUrlInput.value === "") {
        imageElement.src="img/icon-image-png-0.jpg"
    } else {
        imageElement.src = imageUrlInput.value
    }
});


// Initialize function
const initialize = (data) => {
    renderJobs(data);
    getLocation(data);
    getSeniority(data);
    getCategory(data);
    showSearch("search-bar");
    $("#btn-search").addEventListener("click", () => renderJobs(applyFilters(data)));
    $("#btn-clear").addEventListener("click", () => {
        renderJobs(data)
        $("#select-location").selectedIndex = 0;
        $("#select-seniority").selectedIndex = 0;
        $("#select-category").selectedIndex = 0;
    });
};


window.onload = initialize(data)