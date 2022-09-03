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
    console.log(dataRecv[0].category_id, dataRecv[0].category_name);
    const categoryContainer = document.getElementById('category-container');

    dataRecv.forEach(category => {
        const { category_name, category_id } = category // destructuring
        const li = document.createElement('li');
        li.setAttribute(`onclick`, `clickedCategory('${category_id}', '${category_name}')`);
        li.setAttribute(`id`, `news-${category_id}`);
        li.innerHTML = `
        <a>${category_name}</a>
        `
        categoryContainer.appendChild(li);
    });

    document.getElementById('news-' + dataRecv[0].category_id).classList.add('font-semibold');
    const defaultId = await loadIndividualCategoryNews(dataRecv[0].category_id);
    findingMsg(defaultId.length, dataRecv[0].category_name);

    dynamicCard (defaultId);

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

    // ekhane............

    // console.log(individualCategory);

    

    dynamicCard (individualCategory);


    if (newsLength === 0) {
        document.getElementById('footer').classList.add('fixed', 'bottom-0', 'left-0', 'right-0');
    }
    else {
        document.getElementById('footer').classList.remove('fixed', 'bottom-0', 'left-0', 'right-0');

    }




}


category();
