getJobs = async() => {
    showView("spinner");
    let response = await fetch('https://6524bd60ea560a22a4ea0c28.mockapi.io/api/jobs');
    let data = await response.json()
    setTimeout(() => {
        initialize(data);
    }, 2000);
    return await data
};

// POST function
const createPost = async(newJob) => {
    showView("spinner");
    await fetch("https://6524bd60ea560a22a4ea0c28.mockapi.io/api/jobs/", {
        method: "POST",
        body: JSON.stringify(newJob),
        headers:{ "content-type": "application/json; charset=UTF-8"},
    });
    getJobs();
};

//See Detail
const jobDetail = async(id) => {
    showView("spinner");
    let response = await fetch(`https://6524bd60ea560a22a4ea0c28.mockapi.io/api/jobs/${id}`)
    let data = await response.json();
    renderDetail(data); 
}

// PUT function
const createPut = async (data, id) => {
    showView("spinner");
    await fetch(`https://6524bd60ea560a22a4ea0c28.mockapi.io/api/jobs/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json; charset=utf-8" },
    });
    getJobs();
};

// DELETE function
const deleteJob = async(id) => {
     await fetch(`https://6524bd60ea560a22a4ea0c28.mockapi.io/api/jobs/${id}`, {
        method: 'DELETE',
    });
    getJobs()
};