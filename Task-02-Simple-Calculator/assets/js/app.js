const rs = document.getElementById("rs");
const eq = document.getElementById("eq");

function isNumbers(str){
    return /^\d+$/.test(str);
}

const constEq = (id)=>{
    console.log(isNumbers(id)+id);
    if(isNumbers(id)){
        if(rs.innerText == "0"){
            rs.innerText = id;
        }
        else{
            rs.innerText += id;
        }
    }
    else{
        if(rs.innerText.length == 1){
            if(id == "+" || id == "-" || id == "."){
                rs.innerText += id;
                console.log(true);
            }
        }
        else{
            let text = rs.innerText;
            let last = text.slice(text.length-1, text.length);
            console.log("let" + last);
            if(isNumbers(last)){
                rs.innerText += id;
            }
            else if(id == "."){
                rs.innerText += "0"+id;
            }
        }
    }
}


const delEq = ()=>{
    // alert("true");
    if(rs.innerText.length > 1){
        rs.innerText = rs.innerText.slice(0, rs.innerText.length-1);
    }
    else{
        rs.innerText = "0";
    }
}

const clearEq = ()=>{
    rs.innerText = "0";
}