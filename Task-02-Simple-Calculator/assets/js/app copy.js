const rs = document.getElementById("rs");
const eqs = document.getElementById("eq");
let ans = 0;

//function to check if the string or character contain number or not
function isNumbers(str){
    return /^\d+$/.test(str);
}

//function to construct the equation.
const constEq = (id)=>{
    // if(id == "A"){
    //     id = ans;
    // }
    //if the input is number
    if(isNumbers(id) || id == "Ans" || id == "("){
        //if the value of the input field is only 0 which is also length of 1.
        //then just replace the value with id
        if(rs.innerText == "0"){
            rs.innerText = id;
        }
        else{
            if(id == "(" && isNumbers(rs.innerText.slice(rs.innerText.length-1, rs.innerText.length))){
                console.log("yes")
                rs.innerText += "*"+id;
            }
            else
            //else if its length 1 but value is not zero then 
            //concatinate with previous value
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
            //checking if the last character of the equation is number or "Ans"
            if(isNumbers(last) || last == "s" || id == ")"){
                //if number then concatinate
                    rs.innerText += id;
            }
            else if(id == "."){
                //else if input is dot then concatinate 0.[input value]
                rs.innerText += "0"+id;
            }
            // this part is here to make sure no operator comes next to another operator
        }
    }
}

//function to delete the last char
const delEq = ()=>{
    // if the length of the input is greater than 1
    if(rs.innerText.length > 1){
        //removing the last character form the input and show the remaining
        rs.innerText = rs.innerText.slice(0, rs.innerText.length-1);
    }
    else{
        //if the length is 1 then simply convert it to zero
        rs.innerText = "0";
    }
}

//clear function
const clearEq = ()=>{
    rs.innerText = "0";
    eqs.innerText = "0";
}

//function to return precedence of the operator
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
            return 3;
        case ")":
            return 3;
        default:
            return -1;
    }
}

//function to calculate and return basic arithmetic operation
function calcf(num2, num1, operator){
    console.log(num1)
    console.log(num2)
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
        default:
            return -1;
    }
}

// replace the value of ans with stored value
const Eq = (eq)=>{
    eq = eq.replaceAll("Ans","#");
    console.log(eq);
    let seq = eq.split("");
    for(let i=1; i<=seq.length-1; i++){
        let j = seq[i-1];
        let k = seq[i];
        if(isNumbers(j) && k == "#"){
            seq[i] = "*#";
        }
        else if(isNumbers(k) && j == "#"){
            seq[i-1] = "#*";
        }
        else if(k == "#" && j == "#"){
            seq[i] = "*#";
        }
    }
    console.log(seq);
    eq = seq.join("");
    //replace "Ans" with value
    eq = eq.replaceAll("#",ans);
    console.log(eq);
    return eq;
}

//paranthisis check
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

const calcEq = ()=>{
    let eq = rs.innerText;
    //replace "Ans" with value if yes than replace the value of ans
    if(eq.search("Ans")!= -1){
        eq = Eq(eq);
    }
    //check valid syntax or not
    if(countString(eq,"(") != countString(eq,")")){
        console.log("count ( "+countString(eq,"("))
        console.log("Count ) " +countString(eq,")"))
        rs.innerText = "Syntax Error";
        return
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
                //console.log("eval"+ eval(eq.replace("$","")))
                //if the operator is ) then calculate all until ( reached;
                if(eq[i] == ")"){
                    console.log("enter")
                    let c = 0
                    let top = opStack.pop();
                    while(true){
                        if(top != "("){
                            result = calcf(cStack.pop(), cStack.pop(), top);
                            cStack.push(result.toString());
                        }
                        console.log("in "+cStack)
                        console.log("in "+opStack)
                        top = opStack.pop();
                        if(top == "(")
                            break;
                    }
                    console.log("out "+cStack)
                    console.log("out "+opStack)
                }
                else{
                    //for each operator in the stack
                    for(let j = 0; j<= opStack.length-1; j++){
                        if(checkPrecedence(opStack[opStack.length-1]) >= checkPrecedence(eq[i]) && opStack[opStack.length-1] != "("){
                            //calculating the result
                            console.log(opStack)
                            console.log(cStack)
                            console.log("logic")
                            result = calcf(cStack.pop().toString(), cStack.pop(), opStack.pop());
                            //pushing the new result onto stack
                            cStack.push(result.toString());
                        }
                    }
                    //if the input sequence is $ which is end of sequence
                    //then it will not insert it to the stack
                    if(eq[i] != "$")
                        opStack.push(eq[i]);
                }
            }
            else{
                //if the stack of operator is empty.
                opStack.push(eq[i]);
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