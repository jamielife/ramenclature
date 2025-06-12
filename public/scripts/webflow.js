// Global object to store DOM elements
const domElements = {
    root: 		document.querySelector('[data-rc="card-container"]'),
    cardTemplate: document.querySelector('[data-rc="card"]'),
    notFound: 	document.querySelector('[data-rc="not-found"]'),
  };
  
  const API_URL = 'https://ramen-api.dev/shops?pretty&page=3&perPage=3';
  
  const categories = [ "Tonkotsu", "Shoyu", "Miso", "Shio", "Tsukemen", "Curry", "Vegiterian", "Vegan", "Instant", "Soup", "Soba", "Udon", "Yakisoba", "Miso Butter Corn", "Kitakata", "Black Garlic", "Spicy", "Kimchi" ];
  
  const getRandomCategory = () => {
      const randomIndex = Math.floor(Math.random() * categories.length);
      return categories[randomIndex];
  };
  
  // Delay for testing
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  async function getRamen(url){
      try {
          await sleep(300); // delay for testing
          const response = await fetch(url);
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
      } catch (error) {
          console.error('Fetch failed:', error.name === 'AbortError' ? 'Request timed out' : error.message);
          return null;
      }	
  }
  
  (async () => {
      const data = await getRamen(API_URL);
      
      if(data?.shops?.length > 0){
          domElements.root.querySelectorAll('.ramen-card').forEach(el => el.remove());
          const fragment = document.createDocumentFragment();
  
          for(let i=0; i < data.shops.length; i++){
              const clonedCard = domElements.cardTemplate.cloneNode(true);
              let link = clonedCard.querySelector('[data-rc="link"]'); 
  
              clonedCard.querySelector('[data-rc="title"]').innerText 	= data.shops[i].name;
              clonedCard.querySelector('[data-rc="sub-title"]').innerText = data.shops[i].id;
              clonedCard.querySelector('[data-rc="category"]').innerText  = getRandomCategory();
              clonedCard.querySelector('[data-rc="image"]').src 			= data.shops[i].photos[0].url;
              link.href = `/#${data.shops[i].name}`;			
  
              // Enable whole card linking
              clonedCard.addEventListener('click', (e) => {
                  e.preventDefault();
                  link.click();
              });
  
              clonedCard.classList.remove('hidden');
              fragment.appendChild(clonedCard);
          }
          domElements.root.appendChild(fragment);
      } else {
          domElements.root.innerHTML = '';
          domElements.notFound.classList.remove('w-condition-invisible');
      }
  
  })();