let mainArea = document.querySelector('.main__area');
let count = 0;
let res = document.querySelector('.res'); 
let res1 = document.querySelector('.res1');
let btnGame = document.querySelector('.new-game');
let fields = document.querySelectorAll('.field');
let step = false;
let body = document.querySelector('body');
let Lannisters = `<img src="./img/248px-Lannsiter.png" alt="Lan" class="img">`;
let Starks = `<img src="./img/1486993233160937729.png" alt="Stark" class="img">`;
let arr = [];
////Ход ланистеров
function stepCross(target) {
    target.innerHTML = Lannisters;
    let audio = new Audio('./audio/mech.mp3');
    audio.play();
    target.classList.add('x');
    count++;
}
////Ход Старков
function stepZero(target) {
    target.innerHTML = Starks;
    let audio = new Audio('./audio/mech.mp3');
    audio.play();
    target.classList.add('o');
    count++;
}
function init(e) {
    if (!step) stepCross(e.target);
    else stepZero(e.target);
    step = !step;
    win();
}
function newGame() {
    step = false;
    count = 0;
    res.innerHTML = '';
    fields.forEach(item => {        
        item.innerHTML = '';
        res.innerHTML = 'There\'s a battle going on!';
        res1.innerText = '';
        item.classList.remove('x', 'o', 'active',);
        body.classList.remove('body_Stark', 'body_Lannister');
    })
    mainArea.addEventListener('click', init)
}
function win() {
    const comb = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    for (let i = 0; i < comb.length; i++) {
        if (fields[comb[i][0]].classList.contains('x') &&
            fields[comb[i][1]].classList.contains('x') && 
            fields[comb[i][2]].classList.contains('x')) {
            setTimeout(() => {
                fields[comb[i][0]].classList.add('active');
                fields[comb[i][1]].classList.add('active');
                fields[comb[i][2]].classList.add('active');
                res.innerHTML = 'Winner Lannisters!';
                res1.innerText = `Тumber of moves:${count}`;
            }, 500);
            body.classList.add('body_Lannister')
            mainArea.removeEventListener('click', init);
            localStorage.setItem('results1', 'Lannisters');
            return arr.unshift('Lannisters');
        }
        else if (fields[comb[i][0]].classList.contains('o') &&
            fields[comb[i][1]].classList.contains('o') && 
            fields[comb[i][2]].classList.contains('o')) {
            setTimeout(() => {
                fields[comb[i][0]].classList.add('active');
                fields[comb[i][1]].classList.add('active');
                fields[comb[i][2]].classList.add('active');
                res.innerHTML = 'Winner Starks!';
                res1.innerHTML = `Тumber of moves:${count}`;                
            }, 500);
            body.classList.add('body_Stark')
            mainArea.removeEventListener('click', init);
            localStorage.setItem('results2', 'Starks');
            return arr.unshift('Starks');
        }
        else if (count === 9) {
            res.innerText = 'Draw!';
            mainArea.removeEventListener('click', init);
            localStorage.setItem('results3', 'draw');
            let sort = arr.unshift('Draw');
        }        
    }    
}
btnGame.addEventListener('click', newGame);
mainArea.addEventListener('click', init);