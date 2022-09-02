const loadData = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`

    try {
        const res = await fetch (url);
        const resData = await res.json ();
        // console.log(resData.data.news_category);
        const data = resData.data.news_category;
        return data;
    }
    catch (error) {
        console.log(error);
    }
}

const category = async () => {
    const dataRecv = await loadData ();

    const categoryContainer = document.getElementById ('category-container');
    categoryContainer.innerHTML = ``;

    dataRecv.forEach(category => {
        // console.log(category);
        const {category_name} = category // destructuring
        // console.log(category_name);
        const li = document.createElement ('li');
        li.innerHTML = `
        <a>${category_name}</a>
        `
        categoryContainer.appendChild (li);
    });
    // console.log(dataRecv);
}

category ();


// loadData ();