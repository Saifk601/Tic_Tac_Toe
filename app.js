let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX , playerO

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}
let moveCount = 0;
boxes.forEach((box) => {
    box.addEventListener("click" , () => {
        if(turnO){
             box.innerText = "O";
             box.style.color = "red";
             turnO = false;
             moveCount++;
        }else{
            box.innerText = "X";
            box.style.color = "green";
            turnO = true;
            moveCount++;
        }
       
        //console.log(moveCount);
        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
        box.innerText = "";
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations , Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    moveCount = 0;
}
const Draw = () => {
    msg.innerText = `No Result `;
    msgContainer.classList.remove("hide");
    //disableBoxes();
    moveCount = 0;
    turnO = false;
}

const checkWinner = () => {
    for(let pattern of winPattern){
           let pos1Val = boxes[pattern[0]].innerText;
           let pos2Val = boxes[pattern[1]].innerText;
           let pos3Val = boxes[pattern[2]].innerText;

          if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("winner" , pos1Val);
                showWinner(pos1Val);
            }
            else if(moveCount === 9){
                Draw();
            }
            
        }
    }
};


newGameBtn.addEventListener("click" , resetGame);
resetBtn.addEventListener("click" , resetGame);