getJobs = async() => {
    showView("spinner");
    let response = await fetch('https://6524bd60ea560a22a4ea0c28.mockapi.io/api/jobs');
    let data = await response.json()
    //Meter toda la parte html
    //renderJobs(data)
    
    setTimeout(() => {
        initialize(data);
    }, 2000);
    return await data
};

//Create Post
const createPost = async(newJob) => {
    showView("spinner");
    console.log(newJob)
    await fetch("https://6524bd60ea560a22a4ea0c28.mockapi.io/api/jobs/", {
        method: "POST",
        body: JSON.stringify(newJob),
        headers:{ "content-type": "application/json; charset=UTF-8"},
    });
    getJobs();
    clearForm();
};



