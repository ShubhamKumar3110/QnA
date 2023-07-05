fetch("Set_Questions.json").then((data)=>{
    return data.json();
}).then((completedata)=>{
    let data1="";
    completedata.map((values)=>{
        data1+=`
        <article class="set">
            <a href=Questions.html?p=${values.title}></a>
            <h3>${values.title}</h3>
            <p>${values.desc}</p>
            <h2>${values.questions}</h2>
            <h4>questions</h4>
        </article>`
    })
    document.getElementById("sets").innerHTML=data1;


}).catch((err)=>{
    console.log(err);
})