const rs = document.getElementById("rs");
const eqs = document.getElementById("eq");

//function to check if the string or character contain number or not
function isNumbers(str){
    return /^\d+$/.test(str);
}

//function to construct the equation.
const constEq = (id)=>{
    //if the input is number
    if(isNumbers(id)){
        //if the value of the input field is only 0 which is also length of 1.
        //then just replace the value with id
        if(rs.innerText == "0"){
            rs.innerText = id;
        }
        else{
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
            //checking if the last character of the equation is number or not
            if(isNumbers(last)){
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

const clearEq = ()=>{
    rs.innerText = "0";
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
        default:
            return -1;
    }
}

//function to calculate and return basic arithmetic operation
function calcf(num2, num1, operator){
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

const calcEq = ()=>{
    //creating empty character and operator array
    let cStack = [];
    let opStack = [];
    //making the end of sequence by putting "$" at the end of the string.
    let eq = rs.innerText+"$";
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
            
            //filter the values without any null entry
            cStack = cStack.filter(elements => {
                return elements;
            }); 

            if(opStack.length > 0){
                //for each operator in the stack
                for(let j = 0; j<= opStack.length-1; j++){
                    if(checkPrecedence(opStack[opStack.length-1]) >= checkPrecedence(eq[i])){
                        //calculating the result
                        let result = calcf(cStack.pop(), cStack.pop(), opStack.pop());
                        //pushing the new result onto stack
                        cStack.push(result);
                    }
                }
                //if the input sequence is $ which is end of sequence
                //then it will not insert it to the stack
                if(eq[i] != "$")
                    opStack.push(eq[i]);
            }
            else{
                //if the stack of operator is empty.
                opStack.push(eq[i]);
            }
        }

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
    eqs.innerText = rs.innerText +" =";
    //the result lies in the stack top of cStack / character array.
    rs.innerText = cStack.pop();
}