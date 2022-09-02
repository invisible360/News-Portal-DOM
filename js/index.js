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
    console.log(dataRecv);
}

category ();


// loadData ();