let cells = document.querySelectorAll('.cell');
let resetButton = document.querySelector('.reset');

let turnX = true; // player X first

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];

function handleCellClick(event) { // event is the click event
    // console.log(event);
    const cell = event.target; // reference to the clicked cell

    if (cell.textContent === '') {
        cell.textContent = turnX ? 'X' : 'O';
        turnX = !turnX;
        cell.classList.add('occ');
        cell.classList.remove('btns');
        checkWinner();
        // To remove the event:
        cell.removeEventListener('click', handleCellClick);
    }
}

cells.forEach((cell) => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', () => {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('occ');
        cell.classList.add('btns');
        cell.addEventListener('click', handleCellClick); // Re-adding the event listener
    });
    turnX = true; // Reset turn to X
    document.getElementById('game-message').textContent = ''; // Clear game message
});

// cells.forEach((cell, idx)=> {
//   cell.addEventListener('click', () => {
//     if (cell.textContent === '') {
//       cell.textContent = turnX ? 'X' : 'O';
//       turnX = !turnX;
//       document.querySelector(`[data-index="${idx}"]`).classList.add('occ');
//       document.querySelector(`[data-index="${idx}"]`).classList.remove('btns');
//       checkWinner();
//     }
//   });
// });

const checkWinner = () => {
    for (combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a].innerHTML && cells[a].innerHTML === cells[b].innerHTML && cells[a].innerHTML === cells[c].innerHTML) {
        alert(`Player ${cells[a].innerHTML} wins!!`);
        // document.body.innerHTML += `<h2>Player ${cells[a].innerHTML} wins!</h2>`; // Changes properties of the body element entirely
        document.getElementById('game-message').textContent = `Player ${cells[a].textContent} wins!!`;
        finished();
        return;
        }
    }
    
    if ([...cells].every(cell => cell.textContent !== '')) {
        alert('It\'s a draw!');
        document.getElementById('game-message').textContent = "It's a draw!";
        finished();
        return;
    }
}

const finished = () => { 
    cells.forEach(cell => {
    cell.removeEventListener('click', handleCellClick);
    cell.classList.add('occ');
    });
}


