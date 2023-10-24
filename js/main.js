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










window.onload = initialize(data)