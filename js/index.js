const loadCategoryData = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`

    // try-catch error handling
    try {
        const res = await fetch(url);
        const resData = await res.json();
        // console.log(resData.data.news_category);
        const data = resData.data.news_category;
        return data;
    }
    catch (error) {
        console.log(error);
    }
}

const loadIndividualCategoryNews = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data.data;
    }
    catch (error) {
        console.log(error);
    }
}

const category = async () => {
    const dataRecv = await loadCategoryData();
    const categoryContainer = document.getElementById('category-container');
    dataRecv.forEach(category => {
        const { category_name, category_id } = category // destructuring
        const li = document.createElement('li');
        li.setAttribute(`onclick`, `clickedCategory('${category_id}', '${category_name}')`)
        li.innerHTML = `
        <a>${category_name}</a>
        `
        categoryContainer.appendChild(li);
    });
}

const findingMsg = (len, catName) => {
    const numberOfNewsfind = document.getElementById('find-news');
    numberOfNewsfind.innerHTML = `
    <div class="bg-slate-100 p-5">
        <p class="font-semibold"><span class = 'text-pink-600'>${len}</span> items found for category '${catName}'</p>
    </div>
    `
}

const clickedCategory = async (id, catName) => {
    const individualCategory = await loadIndividualCategoryNews(id);

    const newsLength = individualCategory.length;
    findingMsg(newsLength, catName);

    console.log(individualCategory);

    const newsContainer = document.getElementById('news-container');

    individualCategory.forEach(infoToDisplay => {
        // console.log(element);
        const { title, details, thumbnail_url, total_view, author } = infoToDisplay;
        const { name, published_date, img } = author;

        const div = document.createElement ('div');
        div.innerHTML = `
        <div class="card lg:card-side bg-base-100 drop-shadow-2xl">
        <figure><img class="p-5 object-contain h-full w-96"
                src="https://i.ibb.co/QnwC4sG/unsplash-Eh-Tc-C9s-YXsw-11.png" alt="Album"></figure>
        <div class="card-body">
            <h2 class="card-title">New album is released!</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga officia minus, ducimus voluptatibus
                magnam minima quaerat quisquam nostrum deserunt cum architecto obcaecati nihil, voluptatem ipsa
                consectetur accusamus? Esse alias distinctio necessitatibus sit deserunt quasi molestiae,
                explicabo
                impedit suscipit, vel ullam! Tempora inventore nihil corrupti, fugiat quo corporis in mollitia
                dolor.</p>

            <div class="flex-none lg:flex items-center justify-between mt-5 lg:mt-0">
                <div class="flex lg:flex-none items-center justify-between">
                    <div>
                        <div class="flex sm:flex-col lg:flex-row items-center justify-center">
                            <div class="avatar">
                                <div class="w-14 rounded-full">
                                    <img
                                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80" />
                                </div>
                            </div>
                            <div class="flex flex-col mx-3">
                                <p class="text-sm lg:text-base">Jane Cooper</p>
                                <p class="text-xs text-slate-500">Jan 10, 2022</p>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center ml-0 lg:ml-10">
                        <i class="fa-regular fa-eye"></i>
                        <p class="mx-1 font-bold">1.5M</p>
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
    });


}

category();
