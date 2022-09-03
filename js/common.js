const dynamicCard = (catagory) => {

    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;
    
    catagory.forEach(infoToDisplay => {
        // console.log(element);
        const { title, details, thumbnail_url, total_view, author } = infoToDisplay;
        const { name: authorName, published_date, img } = author;
        // console.log(total_view);

        // const div = dynamiCard(title, details, thumbnail_url, total_view, author, authorName, published_date, img);

        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card lg:card-side bg-base-100 drop-shadow-2xl my-5">
        <figure><img class="p-5 object-contain h-full w-96"
                src=${thumbnail_url} alt="Album"></figure>
        <div class="card-body">
            <h2 class="card-title">${title}</h2>
            <p>${details.slice(0, 200) + '...'}</p>

            <div class="flex-none lg:flex items-center justify-between mt-5 lg:mt-0">
                <div class="flex lg:flex-none items-center justify-between">
                    <div>
                        <div class="flex sm:flex-col lg:flex-row items-center justify-center">
                            <div class="avatar">
                                <div class="w-14 rounded-full">
                                    <img
                                        src='${authorName === 'system' || authorName === '' || authorName === null ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png' : img}' />
                                </div>
                            </div>
                            <div class="flex flex-col mx-3">
                                <p class="text-sm lg:text-base">${authorName === 'system' || authorName === '' || authorName === null ? 'Not Available' : authorName}</p>
                                <p class="text-xs text-slate-500">${published_date}</p>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center ml-0 lg:ml-10">
                        <i class="fa-regular fa-eye"></i>
                        <p class="mx-1 font-bold">${total_view === null ? 'Not Available' : total_view}</p>
                    </div>
                </div>

                <div class="flex items-center justify-between mt-5 lg:mt-0">
                    <div class="ml-0 lg:-ml-44">
                        <i class="fa-regular fa-star-half-stroke"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>

                    <div>
                        <i class="fa-solid fa-arrow-right"></i>
                    </div>
                </div>
            </div>

        </div>
    </div>
        `
        newsContainer.appendChild(div)
    });
}