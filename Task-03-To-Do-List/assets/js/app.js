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

    //updating each child elements with value
    clone.children[0].innerText = Title.value;
    clone.children[1].innerText = Desc.value;
    clone.children[2].setAttribute("onclick",del)

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
        elem.style.backgroundColor = "rgba(255, 255, 255, 0.4)"
    }
    else {
        elem.style.textDecoration = "line-through"
        elem.style.backgroundColor = "rgba(179, 179, 179, 0.4)"
    }
}