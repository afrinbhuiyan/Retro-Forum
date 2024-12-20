const loadCard = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`)
    const data = await res.json();
    console.log(data)
    // const cards = data.posts;
    const allCards = data.posts; // Assign the array of posts to allCards
    // console.log(searchText)
    displayCard(allCards);
};
const displayCard = (cards) => {
    // console.log(cards)
   
    console.log(cards.length)
    const cardContainer = document.getElementById("card-container")
    cardContainer.textContent = '';
    cards.forEach(card => {
        console.log(card)
        // 2- create a div
        const discussCard = document.createElement("div")
        discussCard.classList = `card bg-[#797DFC1A] w-full shadow-xl lg:p-10 mb-10`;
        // 3 - set inner HTML
        discussCard.innerHTML = `
        <div class="flex gap-2 lg:gap-8">
        <div id="active" class="avatar online w-10 lg:w-16 h-10 lg:h-16">
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
                <button onclick="displayTitle()"  class="button-click"><img src="images/Vector (1).png" alt=""></button>
            </div>
         </div>
            </div>
        `;

        cardContainer.appendChild(discussCard);

        // const buttonClick = document.querySelectorAll(".button-click");
        // buttonClick.forEach((btn, length) => {
        //     btn.addEventListener('click', function () {
        //         displayTitle(cards[length]); // Pass the current card to displayTitle
        //     });
        // });
        // const cardContent = document.getElementById("card-content")
       
        // const scoreDisplay = document.getElementById("score")

        let score = 0;
        const buttonClick = document.querySelectorAll(".button-click");
        buttonClick.forEach((btn) => {
            btn.addEventListener('click', function(){
                // score++
                // scoreDisplay.innerText = score;
                document.getElementById("score").innerHTML = score++;
                displayTitle(cards[length])
            })

        });


        const act = discussCard.querySelector("#active");
        if (card.isActive === false) {
            act.classList.remove('online');
            act.classList.add("offline");
        } else {
            act.classList.add('online');
        }

    });

    appendLoadingSpinner(false);

}
const displayTitle = (card) => {  
    const cardContent = document.getElementById("card-content");
    const cardTitle = document.createElement("div"); 
    cardTitle.classList = 'flex gap-8 bg-[#ffff] shadow-xl p-8 rounded-3xl mt-5';
    cardTitle.innerHTML = `
        <h1 class="text-2xl">${card.title}</h1>  <!-- Use card data -->
        <p class="flex text-xl gap-4"><img src="images/tabler-icon-eye.svg" alt=""> ${card.view_count}</p>
    `;
    cardContent.appendChild(cardTitle);
};


const handleSearch = () => {
    // console.log('conected handleSearch')

    const searchField = document.getElementById("search-field");
    appendLoadingSpinner(true);
    const searchText = searchField.value;
    console.log(searchText)
    loadCard(searchText)
    // loadPhone(searchText, isShowAll);

}

const appendLoadingSpinner = (isLoding) => {
    const loadingSpinner = document.getElementById("loading-spinner");
    // loadingSpinner.classList.remove('hidden')
    if (isLoding) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden')
    }
}




const latestPost = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`)
    const data = await res.json();
    // console.log(data);
    displayPost(data);
}

const displayPost = (data) => {
    const postContainer = document.getElementById('post-container');
    data.forEach(dt => {
        // console.log(dt)
        const postedCard = document.createElement('div');
        postedCard.classList = 'rounded w-full border gap-16  rounded-2xl';
        postedCard.innerHTML = `
            <figure class="px-10 pt-10">
              <img
                src="${dt.cover_image}"
                alt=""
                class="rounded-xl" />
            </figure>
            <div class="card-body">
              <p class="flex"><img src="images/Frame (2).png" alt=""> ${dt?.author?.posted_date || 'No publish date'}</p>
              <h2 class="text-2xl roboto-bold">${dt.title}</h2>
              <p class="text-[#03030381]">${dt.description}</p>
              <div class="flex">
               <div class="avatar">
                  <div class="w-12 h-12 rounded-full mr-5">
                    <img src="${dt.profile_image}" />
              </div>
            </div>
            <div>
            <p class="roboto-bold">${dt.author.name}</p>
            <p>${dt?.author?.designation || 'unKown'}</p>
            </div>
            </div>
        `;
        postContainer.appendChild(postedCard);
    });

}

latestPost()

loadCard(" ");