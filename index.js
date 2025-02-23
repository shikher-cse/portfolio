document.addEventListener("DOMContentLoaded", function () {
    // Dark Mode Toggle
    const toggleButton = document.createElement("button");
    toggleButton.classList.add("toggle-btn");
    toggleButton.textContent = "Dark Mode";
    document.body.appendChild(toggleButton);
    
    toggleButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
        toggleButton.textContent = document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
    });
    
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
        toggleButton.textContent = "Light Mode";
    }

    // Expandable sections
    document.querySelectorAll(".expand-btn").forEach(button => {
        button.addEventListener("click", function () {
            const target = document.getElementById(this.getAttribute("onclick").replace("toggleContent('", "").replace("')", ""));
            target.classList.toggle("hidden");
            this.textContent = target.classList.contains("hidden") ? "Read More" : "Read Less";
        });
    });

    // Fetch and display GitHub projects dynamically from API
    async function fetchGitHubProjects() {
        const username = "shikher-cse"; // Your GitHub username
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const repositories = await response.json();
        
        const projectsList = document.getElementById("projects-list");
        projectsList.innerHTML = "";
        
        repositories.forEach(async (repo) => {
            const projectDiv = document.createElement("div");
            projectDiv.classList.add("project-item");
            
            // Fetch Unsplash Image for the project based on repo name
            const imageUrl = await fetchUnsplashImage(repo.name);
            
            projectDiv.innerHTML = `
                <img src="${imageUrl}" alt="${repo.name}" class="project-image">
                <h3>${repo.name}</h3>
                <p>${repo.description ? repo.description : "No description available."}</p>
                <a href="${repo.html_url}" target="_blank">View Project</a>
            `;
            
            projectsList.appendChild(projectDiv);
        });
    }
    
    // Fetch image from Unsplash API using project name as query
    async function fetchUnsplashImage(query) {
        const accessKey = "bBi0NxvTme1WXVWAeoFfX93p4AX4KPqXT2F4OM9NNBM"; // Replace with your Unsplash API key
        try {
            const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${accessKey}&per_page=1`);
            const data = await response.json();
            return data.results.length > 0 ? data.results[0].urls.small : "https://placehold.co/300x200?text=No+Image";
        } catch (error) {
            console.error("Error fetching image from Unsplash:", error);
            return "https://placehold.co/300x200?text=No+Image";
        }
    }
    
    fetchGitHubProjects();

    // Implement horizontal scroll effect for project slider
    const projectContainer = document.getElementById("projects-container");
    projectContainer.addEventListener("mousemove", (e) => {
        if (e.movementX > 0) {
            projectContainer.scrollLeft += 20;
        } else {
            projectContainer.scrollLeft -= 20;
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll("nav ul li a").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    // Dark Mode Toggle
    const toggleButton = document.createElement("button");
    toggleButton.classList.add("toggle-btn");
    toggleButton.textContent = "Dark Mode";
    document.body.appendChild(toggleButton);

    toggleButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        const isDarkMode = document.body.classList.contains("dark-mode");
        localStorage.setItem("darkMode", isDarkMode);
        toggleButton.textContent = isDarkMode ? "Light Mode" : "Dark Mode";

        // Enable snow effect when dark mode is ON
        if (isDarkMode) {
            startSnowfall();
        } else {
            stopSnowfall();
        }
    });

    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
        toggleButton.textContent = "Light Mode";
        startSnowfall();
    }

    function startSnowfall() {
        if (document.getElementById("snow-container")) return; // Prevent multiple instances

        const snowContainer = document.createElement("div");
        snowContainer.id = "snow-container";
        document.body.appendChild(snowContainer);

        for (let i = 0; i < 50; i++) {
            let snowflake = document.createElement("div");
            snowflake.classList.add("snowflake");
            snowflake.style.left = `${Math.random() * 100}vw`;
            snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
            snowflake.style.opacity = Math.random();
            snowflake.style.fontSize = `${Math.random() * 10 + 10}px`;
            snowflake.innerHTML = "❄";
            snowContainer.appendChild(snowflake);
        }
    }

    function stopSnowfall() {
        const snowContainer = document.getElementById("snow-container");
        if (snowContainer) {
            snowContainer.remove();
        }
    }
});

