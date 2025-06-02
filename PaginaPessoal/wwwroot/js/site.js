const API_URL = "api/projects";



window.onload = loadProjects;

async function loadProjects() {

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Algo deu errado na request");

        const data = await response.json();
        buildCarousel(data);
    } catch (error) {
        console.error(error);
    }

}

function buildCarousel(data) {
    console.log("dados:", data);

    const container = document.getElementById("owl-carousel");
    container.innerHTML = "";

    data.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("item");

        card.innerHTML = `<h4>${item.name}</h4><p>${item.description}</p><div class="card-links"><a href="${item.htmlUrl
            }"> <h5>Github</h5></div>`


        container.appendChild(card);


    }

    )
    $(document).ready(function () {
        $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 10,
            merge: true,
            autoHeight: true,
            nav: false,
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 5
                }
            }
        })
    })

}

