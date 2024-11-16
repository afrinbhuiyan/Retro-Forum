const loadCard = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`)
    const data = await res.json()
    const cards = data.posts
    // console.log(cards)
    displayCard(cards);
};

const displayCard = (cards) => {
    // console.log(cards)
    
    const cardContainer = document.getElementById("card-container")
    cards.forEach(card => {
        console.log(card)
        // 2- create a div
        const discussCard = document.createElement("div")
        discussCard.classList = `card bg-[#797DFC1A] w-full shadow-xl lg:p-10 mb-10`;
        // 3 - set inner HTML
        discussCard.innerHTML = `
        <div class="flex gap-2 lg:gap-8">
        <div class="avatar online w-10 lg:w-16 h-10 lg:h-16">
        <div class="w-10 lg:w-16 h-10 lg:h-16 rounded">
            <img src="${card.image}" />
            </div>
            </div>
            <div>
            <div class="flex gap-6">
                <h4 class="font-medium">#${card.category}</h4>
                <h4 class="font-medium">Author: ${card.author.name}</h4>
             </div>
            <h1 class="text-2xl roboto-bold my-3">${card.title}</h1>
            <p class="text-[#12132D99] mb-4 mr-40"> ${card.description} </p>
            <div class="flex justify-between pt-3  border-t border-dashed border-[#12132d40]">
            <ul class="flex gap-5">
                <li class="flex text-xl gap-4"><img src="images/tabler-icon-message-2.svg" alt="">${card.comment_count}</li>
                <li class="flex text-xl gap-4"><img src="images/tabler-icon-eye.svg" alt="">${card.view_count}</li>
                <li class="flex text-xl gap-4"><img src="images/Group 18.svg" alt="">${card.posted_time}</li>
            </ul>
            <div>
                <button onclick="addEventListener()" id="button-click"><img src="images/Vector (1).png" alt=""></button>
            </div>
         </div>
            </div>
        `;
        cardContainer.appendChild(discussCard);
        let score = 0;
        const buttonClick = document.getElementById("button-click")
        const scoreDisplay = document.getElementById("score")
        buttonClick.addEventListener('click', function(){
        score++;
        scoreDisplay.innerText = score;
        })
    });
}

const handleSearch = () => {
    // console.log('conected handleSearch')
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    console.log(searchText)
    loadCard(searchText)
}

loadCard()