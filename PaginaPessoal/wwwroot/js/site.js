 const projectsCarouselContainer = document.getElementById('projects-carousel-container');
        const apiUrl = '/api/projects';
        const prevButton = document.querySelector('.carousel-button.prev');
        const nextButton = document.querySelector('.carousel-button.next');

        let currentIndex = 0;
        let cardWidth;
        let totalCards;
        let isDragging = false;
        let startX = 0;
        let translateX = 0;
        let previousTranslateX = 0;

        async function loadProjects() {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`Erro na requisição: ${response.status}`);
                }
                const projects = await response.json();

                projects.forEach(project => {
                    const projectCard = createProjectCard(project);
                    projectsCarouselContainer.appendChild(projectCard);
                });

                // Calcula o número de cards e a largura de cada card
                totalCards = projects.length;
                updateCardWidth();
                // Atualiza a exibição inicial
                updateCarousel();

                // Adiciona os eventos de clique nos botões
                prevButton.addEventListener('click', () => {
                    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
                    updateCarousel();
                });

                nextButton.addEventListener('click', () => {
                    currentIndex = (currentIndex + 1) % totalCards;
                    updateCarousel();
                });

                // Adiciona eventos de mouse para arrastar
                projectsCarouselContainer.addEventListener('mousedown', (e) => {
                    isDragging = true;
                    startX = e.clientX;
                    translateX = previousTranslateX;
                    projectsCarouselContainer.style.transition = ''; // Remove a transição suave
                });

                projectsCarouselContainer.addEventListener('mousemove', (e) => {
                    if (!isDragging) return;
                    const deltaX = e.clientX - startX;
                    translateX = previousTranslateX + deltaX;
                    projectsCarouselContainer.style.transform = `translateX(${translateX}px)`;
                });

                projectsCarouselContainer.addEventListener('mouseup', () => {
                    isDragging = false;
                    previousTranslateX = translateX;
                    projectsCarouselContainer.style.transition = 'transform 0.5s ease-in-out'; // Adiciona a transição de volta
                    updateCarousel(); // Garante que o carrossel se alinhe corretamente
                });

                projectsCarouselContainer.addEventListener('mouseleave', () => {
                    isDragging = false;
                    previousTranslateX = translateX;
                    projectsCarouselContainer.style.transition = 'transform 0.5s ease-in-out';
                    updateCarousel();
                });

                window.addEventListener('resize', () => {
                    updateCardWidth();
                    updateCarousel();
                });

            } catch (error) {
                console.error('Erro ao carregar projetos:', error);
                projectsCarouselContainer.innerHTML = `<p>Erro ao carregar os projetos: ${error.message}</p>`;
            }
        }

        function createProjectCard(project) {
            const card = document.createElement('div');
            card.classList.add('project-card');

            const title = document.createElement('h3');
            title.textContent = project.name;

            const description = document.createElement('p');
            description.textContent = project.description;

            const link = document.createElement('a');
            link.href = project.htmlUrl;
            link.textContent = 'Ver no GitHub';
            link.target = '_blank';

            card.appendChild(title);
            card.appendChild(description);
            card.appendChild(link);

            return card;
        }

        function updateCardWidth() {
            const containerWidth = document.querySelector('.projects-container').offsetWidth;
            if (containerWidth > 900) {
                cardWidth = containerWidth / 3;
            } else if (containerWidth > 600) {
                cardWidth = containerWidth / 2;
            } else {
                cardWidth = containerWidth;
            }
            const cards = projectsCarouselContainer.querySelectorAll('.project-card');
            cards.forEach(card => {
                card.style.flexBasis = `${cardWidth}px`;
            });
        }

        function updateCarousel() {
            const containerWidth = document.querySelector('.projects-container').offsetWidth;
             if (containerWidth > 900) {
                translateX = -currentIndex * cardWidth;
             }
             else if(containerWidth > 600){
                translateX = -currentIndex * cardWidth;
             }
             else{
                translateX = -currentIndex * cardWidth;
             }
            previousTranslateX = translateX;
            projectsCarouselContainer.style.transform = `translateX(${translateX}px)`;
        }

        window.onload = loadProjects;