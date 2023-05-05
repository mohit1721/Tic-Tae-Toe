const boxes =document.querySelectorAll(".box");
const gameInfo =document.querySelector(".game-info");
const newGameBtn =document.querySelector(".btn");//seee

let currentPlayer;//ki default value-X
let gameGrid;//array //aur iski default value--empty hogi//abhi game ka current status kya h...full h ya abhi baki h
const winningPositions = [ //will not change
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
    
//let's createa a function to initialise the game
function initGame() {
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];//all 9 cells are empty on starting
    // newGameBtn.classList.remove("active");//hide new-button initially
    //UI pr v empty krna padega sbko-->by boxes wale variable ko forEach loop lagake
    boxes.forEach((box,index)=>{
        box.innerText="";
        //cursor ko fir se poinetr kro
        boxes[index].style.pointerEvents="all";
        //one more thing is missing,-->           [not right statement[[[[[green color ko v remove krna h

        //wapas se css properties apply/initialize kr do
        //sari properties re-apply ho gyi

        box.classList=`box box-${index+1}`;//index->since it is 0 based indexing so +1 as our custumization

    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();
function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    //UI update to change cuurent player
    gameInfo.innerText=`Current Player-${currentPlayer}`;
}
function checkGameOver(){
    //to do
   // newGameBtn.classList.add("active");
    let answer="";
        winningPositions.forEach((position)=>{//position is variable
            //all 3 boxes should be non-empty and exactly same in value[X/O]
            //
            if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]]!== "" )
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]) ){

                //check if winner is X
                if(gameGrid[position[0]] ==="X")
                    answer="X";
                else
                answer="O";
                //winner milte hi ->disable pointer events   nhi to do winner ho jayenge
                boxes.forEach((box)=>{
                    box.style.pointerEvents = "none";
                })

                //now we know X/O is a winner-->setup green color
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");

            }

        });
        //answer empty nhi h ,it means we have a winner
if(answer !== ""){//winner mil gya
    gameInfo.innerText =  `Winner Player-${answer}`;//show winner player
    newGameBtn.classList.add("active");//winner milne k baad new btn activate kr dena h
    return;//ek baar jitne k baad return 
}
//when there is tie
//pura cells filled ..  //no winner
let fillCount=0;
gameGrid.forEach((box)=>{
    if(box !=="")
    fillCount++;
});
//board is filled ,game is TIE
if(fillCount===9){
    gameInfo.innerText="Game Tied !";
    newGameBtn.classList.add("active");

}

}
function handleClick(index){//index->
    if(gameGrid[index]===""){//agar empty h tbhi processing krunga nhi to nhi
        //make unclickable  //if se already bahar ho ja rha 
        //box value-X/O
        //player change
        //swap turn 
        //check koi jeeta to nhi
        boxes[index].innerHTML=currentPlayer;//box k andar update krne ka mtlb UI pe update krna h-- 
        //aur jb grid m update kr do tb-->js m[inner logic] ko update
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";//making/showing unclickable further
        //turn ka dhyan-->swap kro turn ko
        swapTurn();
        //check ->koi jeet to nhi gya
        checkGameOver();
    }
}

boxes.forEach((box,index)=>{//har ek box k liye ye code chlaunga
    box.addEventListener("click",()=>{//us  box k upar eventlistiener apply kro click wala,jb click hoga to ye e.l execute hoga
        handleClick(index);//to identify which box has been clicked[1-9]
        //handleClick wala fxn->current user k hisab se X/0 dalta hoga -->fir us box ko unclickable bna dega--taki dubara click n ho
        //turn bdal jayegi
        //usse phle check kr lena -->khin jeet to nhi gya koi
        //event.target-->isliye nhi liya qki index k dwara exact class bna skte h -->box-1 box-5 class bna skte h
    })
});
//handlefxn-->jis v box pe click kiya ho wo empty hona chahiye-->tbhi aage badhunga-->fir usko unclickable kr do-->fir us box k andal value daal do[0/X]-->player chanfe kr do-->turn swap--{takes care of current player}-->check koi jeeta to nhi

//new game button fir se initialise kr rha h
newGameBtn.addEventListener("click", initGame);
//




