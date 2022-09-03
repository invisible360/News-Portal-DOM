// category name and id fetching
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
// news fetching accoording to id
const loadIndividualCategoryNews = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data.data;
    }
    catch (error) {
        console.log(error);//function add korte hobe
    }
}

//display at first time
const category = async () => {

    document.getElementById('spinner').classList.remove('hidden');//spinner starts at the time of catergory loading
    const dataRecv = await loadCategoryData();
    display();

    const categoryContainer = document.getElementById('category-container');
    dataRecv.forEach(category => {
        const { category_name, category_id } = category // destructuring
        const li = document.createElement('li');
        li.setAttribute(`onclick`, `clickedCategory('${category_id}', '${category_name}', '${dataRecv.length}')`);
        li.setAttribute(`id`, `news-${category_id}`);
        li.innerHTML = `
        <a>${category_name}</a>
        `
        categoryContainer.appendChild(li);
    });

    //By default Showing 'Breaking News'
    const defDesign = document.getElementById('news-' + dataRecv[0].category_id);
    defDesign.classList.add('font-semibold', 'border', 'bg-primary', 'text-white');

    const defaultId = await loadIndividualCategoryNews(dataRecv[0].category_id);
    findingMsg(defaultId.length, dataRecv[0].category_name);

    display();

    dynamicCard(defaultId);

    document.getElementById('spinner').classList.add('hidden'); //spinner stops at the time of catergory loading
}



const clickedCategory = async (id, catName, catNumbers) => {
    document.getElementById('news-container').classList.add('hidden');//at first hidden

    //removing default active category
    for (let i = 1; i <= catNumbers; i++) {
        document.getElementById('news-0' + i).classList.remove('font-semibold', 'border', 'bg-primary', 'text-white')
    }
    // current active category
    const clickedDesign = document.getElementById('news-' + id);
    clickedDesign.classList.add('font-semibold', 'border', 'bg-primary', 'text-white');


    document.getElementById('spinner').classList.remove('hidden');//spinner starts

    const individualCategory = await loadIndividualCategoryNews(id);

    const newsLength = individualCategory.length;
    findingMsg(newsLength, catName);

    document.getElementById('news-container').classList.remove('hidden');

    dynamicCard(individualCategory);

    document.getElementById('spinner').classList.add('hidden'); // spinener stops
    
    // footer position fixed for no news in any category
    if (newsLength === 0) {
        document.getElementById('footer').classList.add('fixed', 'bottom-0', 'left-0', 'right-0');
    }
    else {
        document.getElementById('footer').classList.remove('fixed', 'bottom-0', 'left-0', 'right-0');
    }

}

category();
