function printHS(){
    var HS = JSON.parse(window.localStorage.getItem("high-scores")) || [];
console.log(HS)
    HS.sort(function(a, b){
        return b.score - a.score;
    });

    HS.forEach(function(score){

        var liTag = document.createElement("li");
        liTag.textContent = score.name + "-" + score.score;
        console.log(liTag)
        var olEL = document.getElementById("high-scores");
        olEL.appendChild(liTag);
    });
}

function clearHS(){
    window.localStorage.removeItem("high-scores");
    window.location.reload();
}

document.getElementById("clear").onclick = clearHS;

printHS();