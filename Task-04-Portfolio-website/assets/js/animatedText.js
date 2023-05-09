let text = [
    {value:'MCA Student', color: 'var(--features)'}, 
    {value:'Graphics Designer', color: 'deeppink'}, 
    {value:'Web Enthusiastic', color: 'var(--highlight)'}
];

window.onload = async function(){
    textEffect();
}
async function textEffect() {
    let i = 0;
    while(true){
        await colorScheme(text[i].color, "#feature-text");
        await typeSentence(text[i].value, "#feature-text");
        await waitForMs(1500);
        await deleteSentence("#feature-text");
        await waitForMs(500);
        i++;
        if(i >= text.length)
            i = 0;
    }
}
async function colorScheme(color, id){
    document.querySelector(id).style.color = color;
}
async function typeSentence(sen, elId, delay = 100){
    const letters = sen.split("");
    let i = 0;
    while(i < letters.length){
        await waitForMs(delay);
        document.querySelector(elId).append(letters[i]);
        i++;
    }
    return;
}
async function deleteSentence(eleRef) {
    const sentence = document.querySelector(eleRef).innerHTML;
    const letters = sentence.split("");
    //console.log(letters);
    let i = 0;
    while(letters.length > 0) {
      await waitForMs(100);
      letters.pop();
      document.querySelector(eleRef).innerHTML = letters.join("");
    }
}
function waitForMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }