let param = new URLSearchParams(window.location.search);
let q = param.get('p');
let currentScore = 0;

function togglebutton(button){
    if (button.classList.contains('button_1')){
        button.classList.add('buttonCorrect');
        currentScore++;
        document.getElementById("current").innerHTML = currentScore;
        setTimeout(function(){
            button.classList.remove('buttonCorrect');},1000); 
    }else{
        button.classList.add('buttonWrong');
        setTimeout(function(){
            button.classList.remove('buttonWrong');},1000);
    }
    setTimeout(function(){
    question = generator.next();
        if(!question.done){
            loadQuestion(question.value);
        }
    },1000);
}

function* arrayGenerator(array){
    for (let i=0; i< array.length; i++){
        yield array[i];
    }
}

function shuffleArray(array){
    for( let i = array.length -1;i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

async function loadJson(URL){
    try{
        const response = await fetch(URL);
        const data = await response.json();
        return data;
    } catch(error){
        console.error(error);
    }
}

function loadQuestion(values){
    loadJson(`AnswerSets/${values.ansSet}.json`) 
    .then(array => {
        shuffleArray(array);
        finalArray = array.filter(element => element !== values.answer);
        ansArray = [[values.answer,'button_1'],[finalArray[0],'button_0'],[finalArray[1],'button_0'],[finalArray[2],'button_0']];
        shuffleArray(ansArray);


        data = `
            <article>
                <h2>${values.question}</h2>
                <div class="options">
                    <button class=${ansArray[0][1]} onclick=togglebutton(this)>${ansArray[0][0]}</button>
                    <button class=${ansArray[1][1]} onclick=togglebutton(this)>${ansArray[1][0]}</button>
                    <button class=${ansArray[2][1]} onclick=togglebutton(this)>${ansArray[2][0]}</button>
                    <button class=${ansArray[3][1]} onclick=togglebutton(this)>${ansArray[3][0]}</button>
                </div>
            </article>
            `;
        document.getElementById("question_space").innerHTML=data;

    })
    
}



loadJson(`QuestionSets/${q}.json`)
.then(array => {
    //shuffle array
    shuffleArray(array);
    generator = arrayGenerator(array);
    let question = generator.next();

    if(!question.done){
        loadQuestion(question.value);
    }
})