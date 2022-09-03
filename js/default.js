const defaultView = async () => {
    const data = await loadCategoryData ();
    console.log(data);


    
    const defaultCategory_name = data[0].category_name;
    const defaultCategory_id = data[1].category_id;
    // console.log(category_name, category_id);

    passingCatAndId (defaultCategory_name, defaultCategory_id);
}

const passingCatAndId = (name, id) => {
    console.log(name, id);
}

defaultView ();