const apiUrl = "http://localhost:3000/Categories";
const categories = ["Python", "Excel", "WebDevelopment", "JavaScript", "DataScience", "Aws", "Drawing"];
let cateObj;
let selectedCate = "";
const fetchFun = async (url) => {
    let response = await fetch(url);
    let jsonn = await response.json();
    return jsonn;
}

function read_data (){
    let myjsonn;
    fetchFun(apiUrl).then((jsonn) =>{
        //localStorage.setItem(title, JSON.stringify(jsonn));
        myjsonn = JSON.stringify(jsonn);
    }).then(() => {
        store_data(myjsonn);
    })
}

function store_data(myjsonn){
    cateObj = JSON.parse(myjsonn);
    console.log(cateObj["Drawing"]);
    display(categories[0]);
}

function display(category){
    console.log(category);
    console.log(selectedCate);
    if (selectedCate === category){
        return 0;
    }
    if (selectedCate.length !== 0){
        let curTab = document.querySelector(`#${selectedCate}`);
        curTab.style.color = "grey";
        
    }
    selectedCate = category;
    let obj = cateObj[category];
    console.log(obj["title"]);
    let tab = document.querySelector(`#${category}`);
    tab.style.color = "black";
    restoreDesc();
    let selectedCourses = document.querySelector("#selectedCourses").children;
    const header = selectedCourses[0];
    console.log(header.innerHTML);
    header.innerHTML = obj["header"];
    const para = selectedCourses[1];
    para.innerHTML = obj["description"];
    const btn = selectedCourses[2];
    btn.innerHTML = `Explore ${category}`;
    const cards = selectedCourses[3].children[0];
    console.log(selectedCourses[3]);
    let parent = document.createElement("div");
    parent.className = "carousel-item active";
    let cnt = 0;
    removeCards(cards);
    let courses = obj["courses"];
    courses.forEach(course => {
        createCard(parent, course);
        cnt++;
        if (cnt === 5) {
            cards.appendChild(parent);
            parent = document.createElement("div");
            parent.className = "carousel-item";
            cnt = 0;
        }

    });
    if (cnt > 0) cards.appendChild(parent);
    

}


function removeCards(cards){
    while (cards.lastElementChild) {
        cards.removeChild(cards.lastElementChild);
    }
}

function removeDesc(){
    let curTab = document.querySelector(`#${selectedCate}`);
    curTab.style.color = "grey";
    let selectedCourses = document.querySelector("#selectedCourses").children;
    for (let i = 0; i < 3; i++){
        selectedCourses[i].style.display = "none";
    }
}

function restoreDesc(){
    let selectedCourses = document.querySelector("#selectedCourses").children;
    selectedCourses[0].style.display = "block";
    selectedCourses[1].style.display = "block";
    selectedCourses[2].style.display = "inline-block";
}

function createCard(parent, course){


        let mycard = document.createElement("div");
        mycard.className = "mycard";

        let img = document.createElement("img");
        img.setAttribute("src", course["image"]);
        img.setAttribute("alt", "python");
        mycard.appendChild(img);

        let header4 = document.createElement("h4");
        header4.innerHTML = course["title"];
        mycard.appendChild(header4);

        let author = document.createElement("span");
        let lst_of_authors = "";
        let seperator = "";
        const instructors = course["instructors"];
        instructors.forEach (instructor => {
            lst_of_authors = lst_of_authors.concat(seperator.concat(instructor["name"]));
            seperator = ",";
        });
        author.innerHTML = lst_of_authors;
        author.className = "author";
        mycard.appendChild(author);

        let price = document.createElement("section");
        price.className = "price";
        let cur = document.createElement("span");
        cur.innerHTML = course["price"];
        cur.innerHTML = cur.innerHTML.concat("$");
        cur.className = "current";
        price.appendChild(cur);
        mycard.appendChild(price);

        parent.appendChild(mycard);

    

}

let submit = document.querySelector('.search-icn');
submit.addEventListener("click", search);

function search(){
    const keyword = document.querySelector(".search-txt").value;
    console.log(keyword);
    if (keyword.length === 0){
        console.log("sad");
    }
    else {

        let cards = document.querySelector("#selectedCourses").children[3].children[0];
        removeDesc();
        removeCards(cards);
        let parent = document.createElement("div");
        parent.className = "carousel-item active";
        let cnt = 0;
        categories.forEach(category => {
            let obj = cateObj[category];
            const courses = obj["courses"];
            courses.forEach(course => {
                console.log(course["title"]);
                if (course["title"].search(keyword) !== -1){
                    createCard(cards, course);
                    cnt++;
                    if (cnt === 5){
                        cards.appendChild(parent);
                        parent = document.createElement("div");
                        parent.className = "carousel-item";
                        cnt = 0;
                    }
                    console.log("hii"); 
                }
    
            });
        });
        if (cnt > 0) cards.appendChild(parent);
    }
    
}

read_data();