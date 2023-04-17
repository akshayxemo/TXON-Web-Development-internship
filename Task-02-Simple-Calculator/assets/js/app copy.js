const rs = document.getElementById("rs");
const eqs = document.getElementById("eq");
let ans = 0;

//METHOD TO CHECK WHEATHER THE STRING IS NUMBER OR NOT
function isNumbers(str){
    return /^\d+$/.test(str);
}

//METHOD TO CONSTRUCT THE EQUATION
const constEq = (id)=>{
    //if the input is number or ans or "(" or ")"
    if(isNumbers(id) || id == "Ans" || id == "(" || id == "√"){
        //if the value of the input field is only 0 which is also length of 1.
        //then just replace the value with id
        if(rs.innerText == "0"){
            rs.innerText = id;
        }
        else{
            let last = rs.innerText.slice(rs.innerText.length-1, rs.innerText.length);
            //if the input is "(" and last of the equation is a Number then
            if(id == "(" && isNumbers(last) || last == ")"){
                rs.innerText += "*"+id;
            }
            //if the input is number but last of equationn is ")" then
            else if(isNumbers(id) && last == ")"){
                rs.innerText += "*"+id;
            }
            //if the input is not "√" and last is number
            else if(id == "√" && isNumbers(last)){
                rs.innerText += "*"+id;
            }
            //else if its length 1 but value is not zero then 
            else
                rs.innerText += id;
        }
    }
    else{
        //if the input is not number and the equation length is 1 and value is 0
        if(rs.innerText.length == 1 && rs.innerText == "0"){
            //then if input is + - or . then concatinate the value else do nothing
            if(id == "+" || id == "-" || id == "."){
                rs.innerText += id;
            }
        }
        else{
            let text = rs.innerText;
            let last = text.slice(text.length-1, text.length);
            //checking if the last char of equation is number or ")" or "s" [if input Ans then last char is "s"]
            // or input is ")" then
            if(isNumbers(last) || last == "s" || id == ")" || last == ")"){
                    rs.innerText += id;
            }
            else if(id == "."){
                //else if input is dot then concatinate 0.[input value]
                rs.innerText += "0"+id;
            }
        }
    }
}

//METHOD TO DELETE THE EQUATION
const delEq = ()=>{
    // if the length of the input is greater than 1
    if(rs.innerText.length > 1){
        if(rs.innerText == "Syntax Error" || rs.innerText == "Expression Error" || rs.innerText == "Ans" ){
            rs.innerText = "0";
        }
        //if the input has the substring "Ans" and its the last variable then delete "Ans" as a whole
        else if(rs.innerText.slice(rs.innerText.length-1, rs.innerText.length) == "s"){
            rs.innerText = rs.innerText.slice(0, rs.innerText.length-1);
            delEq();
            delEq();
        }
        else{
            //removing the last character form the input and show the remaining
            rs.innerText = rs.innerText.slice(0, rs.innerText.length-1);
        }
    }
    else{
        //if the length is 1 then simply convert it to zero
        rs.innerText = "0";
    }
}

//  CLEAR FUNCTION
const clearEq = ()=>{
    rs.innerText = "0";
    eqs.innerText = "0";
}

//METHOD TO RETURN PRECEDENCE
function checkPrecedence(sp){
    switch(sp){
        case "+":
            return 1;
        case "-":
            return 1;
        case "*":
            return 2;
        case "/":
            return 2;
        case "%":
            return 2;
        case "$":
            return 0;
        case "(":
            return 4;
        case ")":
            return 4;
        case "√":
            return 3;
        default:
            return -1;
    }
}

//METHOD TO CALCULATE TWO NUMBERS WITH GIVEN OPERATOR
function calcf(num2, num1, operator){
    if(!isNumbers(num1.split(".").join("")) || !isNumbers(num2.split(".").join("")) && operator != "√"){
        if(operator != "(" || num1 == "Syntax Error"){
            return "Syntax Error";
        }
    }
    switch(operator){
        case "+":
            console.log(num1+" + "+num2+" = "+(parseFloat(num1) + parseFloat(num2)));
            return parseFloat(num1) + parseFloat(num2);
        case "-":
            console.log(num1+" - "+num2+" = "+(parseFloat(num1) - parseFloat(num2)));
            return parseFloat(num1) - parseFloat(num2);
        case "*":
            console.log(num1+" * "+num2+" = "+(parseFloat(num1) * parseFloat(num2)));
            return parseFloat(num1) * parseFloat(num2);
        case "/":
            console.log(num1+" / "+num2+" = "+(parseFloat(num1) / parseFloat(num2)));
            return parseFloat(num1) / parseFloat(num2);
        case "%":
            console.log(num1+" % "+num2+" = "+(parseFloat(num1) % parseFloat(num2)));
            return parseFloat(num1) % parseFloat(num2);
        case "(":
            console.log("( "+num1+" )");
            return parseFloat(num1);
        case "√":
            console.log("√"+num1+" = "+Math.sqrt(parseFloat(num1)));
            return Math.sqrt(parseFloat(num1));
        default:
            return -1;
    }
}

// METHOD TO REPLACE THE VALUE OF "Ans" INPUT WITH ITS STORED VALUE
const Eq = (eq)=>{
    //replace "Ans" with "#"
    eq = eq.replaceAll("Ans","#");
    let seq = eq.split("");
    for(let i=1; i<=seq.length-1; i++){
        let j = seq[i-1];
        let k = seq[i];
        //if "Ans" occurs direct after Number then insert "*" operator between them
        if(isNumbers(j) && k == "#"){
            seq[i] = "*#";
        }
        //if "Ans" occurs direct before Number then insert "*" operator between them
        else if(isNumbers(k) && j == "#"){
            seq[i-1] = "#*";
        }
        //if "Ans" occurs direct after "Ans" then add "*" operator between them
        else if(k == "#" && j == "#"){
            seq[i] = "*#";
        }
    }
    //reconstruct the equation
    eq = seq.join("");
    //replace "#" with value
    eq = eq.replaceAll("#",ans);
    console.log(eq);
    return eq;
}

//CHECK THE NUMBER OF OCCURANCE OF PERTICULAR CHAR IN A STRING
function countString(str, letter) {

    let count = 0;

    // looping through the items
    for (let i = 0; i < str.length; i++) {

        // check if the character is at that position
        if (str.charAt(i) == letter) {
            count += 1;
        }
    }
    return count;
}

// MAIN CALCULATION METHOD
const calcEq = ()=>{
    let eq = rs.innerText;
    //replace "Ans" with value if yes than replace the value of ans
    if(eq.search("Ans")!= -1){
        eq = Eq(eq);
    }
    //check valid syntax or not
    if(countString(eq,"(") != countString(eq,")")){
        console.log("count ( "+countString(eq,"("));
        console.log("Count ) " +countString(eq,")"));
        eqs.innerText = "Syntax Error";
        return;
    }
    if(eq.includes("()")){
        eqs.innerText = "Expression Error";
        return;
    }
    console.log(eq);
    //creating empty character and operator array
    let cStack = [];
    let opStack = [];
    //if the last character of the equation is not a number but
    // operator then remove it
    if(!isNumbers(eq.slice(eq.length-1, eq.length)) && eq.slice(eq.length-1, eq.length) != ")"){
        eq = eq.slice(0, eq.length-1);
    }

    //if input is only number
    if(isNumbers(eq) || isNumbers(eq.split(".").join(""))){
        eqs.innerText = eq;
        rs.innerText = eq;
        ans = eq;
        return;
    }

    //making the end of sequence by putting "$" at the end of the string.
    eq += "$";
    //initialisation of used variables
    let str = "";
    let i = 0;
    
    //do while loop to calculate the equation
    do{
        if(isNumbers(eq[i]) || eq[i]=="."){
            // generating the operend
            str += eq[i];
        }
        else{
            // pushing to operand stack and reset str
            cStack.push(str);
            str = "";
            console.log("build " + opStack)
            console.log("build "+cStack)
            //filter the values without any null entry
            cStack = cStack.filter(elements => {
                return elements;
            }); 

            console.log("build2 " + opStack)
            console.log("build2 "+cStack)

            if(opStack.length > 0){
                let result = 0;
                let top = 0;
                //if the operator is ) then calculate all until ( reached;
                if(eq[i] == ")"){
                    console.log("enter")
                    do{
                        top = opStack.pop();
                        if(top == "("){
                            result = calcf("", cStack.pop(), top);
                            cStack.push(result.toString());
                            break;
                        }
                        result = calcf(cStack.pop(), cStack.pop(), top);
                        cStack.push(result.toString());
                        console.log("in "+cStack)
                        console.log("in "+opStack)
                    }while(true)
                    console.log("out "+cStack)
                    console.log("out "+opStack)
                }
                else{
                    //for each operator in the stack
                    for(let j = opStack.length-1; j>= 0; j--){
                        if(checkPrecedence(opStack[opStack.length-1]) >= checkPrecedence(eq[i]) && opStack[opStack.length-1] != "("){
                            //calculating the result
                            console.log("eqi "+eq[i]);
                            console.log(opStack)
                            console.log(cStack)
                            console.log("logic")
                            top = opStack.pop();
                            if(top == "√"){
                                result = calcf("", cStack.pop(), top);
                            }
                            else{
                                let num2 = cStack.pop();
                                console.log("n2 "+num2);
                                let num1 = cStack.pop();
                                console.log("n1 "+num1);
                                console.log("top "+top);
                                result = calcf(num2.toString(), num1, top);
                            }
                            console.log("end")
                            //pushing the new result onto stack
                            cStack.push(result.toString());
                        }
                        console.log("loop "+opStack)
                    }
                    //if the input sequence is $ which is end of sequence or ")"
                    //then it will not insert it to the stack
                    if(eq[i] != "$")
                        opStack.push(eq[i]);
                }
            }
            else{
                console.log("empty")
                if(eq[i] != "$"){
                    console.log("empty2")
                    //if the stack of operator is empty.
                    opStack.push(eq[i]);
                }
            }
        }
        console.log("final " + opStack)
        console.log("final "+cStack)

        //i will increment up until the second last character
        //because we need last character "$" to represent end of sequence
        // and to calculate the remaining equation.
        if(i < eq.length-1){
            i++;
        }
        else{
            //loop breaking condition if the operator stack goes empty then
            // the loop will break
            if(opStack.length == 0){
                break;
            }
        }
    }while(true);

    //printing the equation.
    eqs.innerText = eq.replace("$","");
    //the result lies in the stack top of cStack / character array.
    rs.innerText = cStack.pop();
    ans = rs.innerText;
}
function constE(id){
    console.log(id);
    if(id == "√"){
        console.log("true");
    }
    else{
        console.log("false")
    }
}