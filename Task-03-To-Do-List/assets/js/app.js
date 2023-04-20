let descCountLabel = document.getElementById("desc-count")
let Title = document.getElementById("title")
let Desc = document.getElementById("desc")

//METHOD TO ADD ITEM
const addItem = ()=>{
    //if the varification if true than add the list item
    if(varify()==false){
        return
    }

    //getting the parant div which contain all the items
    let list = document.getElementById("displayBox").children

    //getting the item blue print to make new item list
    let elem = document.querySelector("#item-blue-print")

    //cloneing the element
    let clone = elem.cloneNode(true);

    //setting the clone element with its unique id
    clone.id = "item" + list.length;

    //removing the display none class to show the item
    clone.classList.remove("display-none");

    //defining the delete function for each item with its id
    let del = "delItem("+clone.id+")"
    let update = "updateItem("+clone.id+")"

    //updating each child elements with value
    clone.children[0].children[0].innerText = Title.value;
    clone.children[0].children[1].innerText = Desc.value;
    //setting the edit icon with functionn
    clone.children[0].children[2].children[0].setAttribute("onclick",update)
    //setting the delete icon with function
    clone.children[0].children[2].children[1].setAttribute("onclick",del)

    //adding the newly created item before the blue print item
    elem.before(clone)

    //empty the text-box fields for to input new item
    Title.value = ""
    Desc.value = ""

    //erase the previously counted desc letters
    descCountLabel.innerText = ""
}

//METHOD TO DELETE THE PARTICULAR ITEM
const delItem = (id)=>{
    console.log(id)
    //removing the onclick attribute so that it will not
    // toggle to checked mode
    id.removeAttribute("onclick")
    id.remove()
}

//METHOD TO VARIFY THE FORM FIELDS
const varify = ()=>{
    if(Title.value != ""){
        document.getElementById("title-warning").classList.add("display-none")
        Title.classList.remove("wrong")

        if(Desc.value.length <= 50){
            document.getElementById("desc-warning").classList.add("display-none")
            Desc.classList.remove("wrong")
            return true
        }
        else{
            document.getElementById("desc-warning").classList.remove("display-none")
            Desc.classList.add("wrong")
            return false
        }

    }else{
        document.getElementById("title-warning").classList.remove("display-none")
        Title.classList.add("wrong")
        return false
    }
}

//METHOD TO COUNT THE LETTERS IN DESCRIPTION INPUT
const countLetter = (id)=>{
    let desc = document.getElementById("desc")
    if(desc.value.length == 0){
        descCountLabel.innerText = ""
    }else{
        descCountLabel.innerText ="letter count :"+ desc.value.length
    }
}

//METHOD TO TOGGLE THE CHECKED TASK OR UNCHECKED TASK
const toggleCheck = (id)=>{
    let elem = document.getElementById(id)
    if(elem.style.textDecoration == "line-through"){
        elem.style.textDecoration = "none"
        elem.style.backgroundColor = "rgba(255, 255, 255, 0)"
        //adding the edit buttonn
        elem.children[0].children[2].children[0].classList.remove("display-none")
    }
    else {
        elem.style.textDecoration = "line-through"
        elem.style.backgroundColor = "#42c819"
        //removing the edit button
        elem.children[0].children[2].children[0].classList.add("display-none")

        elem.children[0].children[2].style.textDecoration = "none"
    }
}

//METHOD TO UPDATE THE TASK
const updateItem = (id)=>{
    //removing the onclick attribute so that it will not
    // toggle to checked mode
    id.removeAttribute("onclick")
    //toggleCheck(id.id)
    const child_1 = id.children[0]
    const child_2 = id.children[1]

    child_1.classList.add("display-none")
    child_2.classList.remove("display-none")

    //initialize the input fields with item data
    child_2.children[0].children[0].value = child_1.children[0].innerText 

    child_2.children[0].children[1].value = child_1.children[1].innerText 

    //initialize the function
    let Back = "goBack("+ id.id +")"
    let confirm = "confirmUpdate("+id.id+")"

    //setting the update forms buttons event
    child_2.children[1].children[0].setAttribute("onclick",confirm)

    child_2.children[1].children[1].setAttribute("onclick",Back)
}

//METHOD TO GO BACK FORM UPDATE FORM TO ORIGINAL TASK VIEW
const goBack = (id)=>{
    console.log(id)
    //setting toggle function
    let att = "toggleCheck(this.id)"
    //getting the first child which is item display
    id.children[0].classList.remove("display-none")
    //getting the second child which is update form
    id.children[1].classList.add("display-none")
    //resettimg the toggle function to work again
    id.setAttribute("onclick",att)
    //toggle the checked to uncheked
    toggleCheck(id.id)
}

//CONFIRMING THE FORM DATA AND UPDATE IT
const confirmUpdate = (id)=>{
    //getting the first child which is item display
    const child_1 = id.children[0]
    //getting the second child which is update form
    const child_2 = id.children[1]

    //now update the first childs data with respect 
    //to second child if update form is empty than 
    //do no change

    //retriving updated info from child 2
    //this is input field under upate form under input div
    let title = child_2.children[0].children[0].value
    let desc = child_2.children[0].children[1].value

    //update the child 1 data if Title is not empty
    if(title != ""){
        child_1.children[0].innerText = title
        child_1.children[1].innerText = desc
    }
    //go back after changes
    goBack(id)
}