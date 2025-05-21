"use strict"

const gameover = () => {
    document.getElementById("gameover").style.display = "grid";
    for (let tile of tiles) {
        tile.removeEventListener('click', PlayTurn);

        const ID = parseInt(tile.id.replace("tile-", ""));
        const y = Math.floor(ID / 4);
        const x = ID % 4;


        // Vertical Line
        let PlayerTile = 0;
        let EnemyTile = 0;
        for (let i = 0; i < 4; i++) {
            const pos = 4 * i + x;
            const className = tiles[pos].className;
            if (className == "player-tile") {
                PlayerTile++;
            }
            else if (className == "enemy-tile") {
                EnemyTile++;
            }
        }
        if (PlayerTile == 4 || EnemyTile == 4) {
            for (let i = 0; i < 4; i++) {
                const pos = 4 * i + x;
                tiles[pos].classList.add('dead')
            }
        }

        // Horizontal Line
        PlayerTile = 0;
        EnemyTile = 0;
        for (let i = 0; i < 4; i++) {
            const pos = 4 * y + i;
            const className = tiles[pos].className;
            if (className == "player-tile") {
                PlayerTile++;
            }
            else if (className == "enemy-tile") {
                EnemyTile++;
            }
        }
        if (PlayerTile == 4 || EnemyTile == 4) {
            for (let i = 0; i < 4; i++) {
                const pos = 4 * y + i;
                tiles[pos].classList.add('dead')
            }
        }

        // Diagonals
        if (x == y) {
            PlayerTile = 0;
            EnemyTile = 0;
            for (let i = 0; i < 4; i++) {
                const pos = 4 * i + i;
                const className = tiles[pos].className;
                if (className == "player-tile") {
                    PlayerTile++;
                }
                else if (className == "enemy-tile") {
                    EnemyTile++;
                }
            }
            if (PlayerTile == 4 || EnemyTile == 4) {
                for (let i = 0; i < 4; i++) {
                    const pos = 4 * i + i;
                    tiles[pos].classList.add('dead')
                }
            }
        }
        else if (x == 3 - y) {
            PlayerTile = 0;
            EnemyTile = 0;
            for (let i = 0; i < 4; i++) {
                const pos = 4 * (3 - i) + i;
                const className = tiles[pos].className;
                if (className == "player-tile") {
                    PlayerTile++;
                }
                else if (className == "enemy-tile") {
                    EnemyTile++;
                }
            }
            if (PlayerTile == 4 || EnemyTile == 4) {
                for (let i = 0; i < 4; i++) {
                    const pos = 4 * (3 - i) + i;
                    tiles[pos].classList.add('dead')
                }
            }
        }

    }
    document.getElementById("retry").style.display = "inline-block";
}
const victory = () => {
    document.getElementById("victory").style.display = "grid";
    document.getElementById("retry").style.display = "inline-block";
}

const PlayTurn = (e) => {
    const target = e.target;
    turn = 1 - turn;
    if (turn == 1) {
        target.className = "player-tile";
        if (target.dataset.dangerous) {
            gameover();
            return;
        }
        handOffToEnemy();
    }
    else {
        target.className = "enemy-tile";
        if (target.dataset.finalEnemy) {
            gameover();
            return;
        }
        else if (document.getElementsByClassName('empty-tile').length == 0) {
            victory();
            return;
        }
    }
    target.removeEventListener('click', PlayTurn);
}

const handOffToEnemy = () => {
    const PlayableTiles = Array.from(document.getElementsByClassName('empty-tile'));
    for (let tile of PlayableTiles) {
        tile.dataset.weight = 0;
        const ID = parseInt(tile.id.replace("tile-", ""));
        const y = Math.floor(ID / 4);
        const x = ID % 4;


        // Vertical Line
        let PlayerTile = 0;
        let EnemyTile = 0;
        for (let i = 0; i < 4; i++) {
            if (i == y) continue;
            const pos = 4 * i + x;
            const className = tiles[pos].className;
            if (className == "player-tile") {
                PlayerTile++;
            }
            else if (className == "enemy-tile") {
                EnemyTile++;
            }
        }
        if (PlayerTile == 0 || EnemyTile == 0) {
            tile.dataset.weight = parseInt(tile.dataset.weight) + (EnemyTile - PlayerTile);
            if (PlayerTile == 3) {
                tile.dataset.dangerous = true;
            }
            else if (EnemyTile == 3) {
                tile.dataset.weight = 100;
                tile.dataset.finalEnemy = true;
            }
        }

        // Horizontal Line
        PlayerTile = 0;
        EnemyTile = 0;
        for (let i = 0; i < 4; i++) {
            if (i == x) continue;
            const pos = 4 * y + i;
            const className = tiles[pos].className;
            if (className == "player-tile") {
                PlayerTile++;
            }
            else if (className == "enemy-tile") {
                EnemyTile++;
            }
        }
        if (PlayerTile == 0 || EnemyTile == 0) {
            tile.dataset.weight = parseInt(tile.dataset.weight) + (EnemyTile - PlayerTile);
            if (PlayerTile == 3) {
                tile.dataset.dangerous = true;
            }
            else if (EnemyTile == 3) {
                tile.dataset.weight = 100;
                tile.dataset.finalEnemy = true;
            }
        }

        // Diagonals
        if (x == y) {
            PlayerTile = 0;
            EnemyTile = 0;
            for (let i = 0; i < 4; i++) {
                if (i == x) continue;
                const pos = 4 * i + i;
                const className = tiles[pos].className;
                if (className == "player-tile") {
                    PlayerTile++;
                }
                else if (className == "enemy-tile") {
                    EnemyTile++;
                }
            }
            if (PlayerTile == 0 || EnemyTile == 0) {
                tile.dataset.weight = parseInt(tile.dataset.weight) + (EnemyTile - PlayerTile);
                if (PlayerTile == 3) {
                    tile.dataset.dangerous = true;
                }
                else if (EnemyTile == 3) {
                    tile.dataset.weight = 100;
                    tile.dataset.finalEnemy = true;
                }
            }
        }
        else if (x == 3 - y) {
            PlayerTile = 0;
            EnemyTile = 0;
            for (let i = 0; i < 4; i++) {
                if (i == x) continue;
                const pos = 4 * (3 - i) + i;
                const className = tiles[pos].className;
                if (className == "player-tile") {
                    PlayerTile++;
                }
                else if (className == "enemy-tile") {
                    EnemyTile++;
                }
            }
            if (PlayerTile == 0 || EnemyTile == 0) {
                tile.dataset.weight = parseInt(tile.dataset.weight) + (EnemyTile - PlayerTile);
                if (PlayerTile == 3) {
                    tile.dataset.dangerous = true;
                }
                else if (EnemyTile == 3) {
                    tile.dataset.weight = 100;
                    tile.dataset.finalEnemy = true;
                }
            }
        }

    }
    if (PlayableTiles.length > 0) {
        if (easyMode) {
            PlayableTiles[Math.floor(Math.random() * PlayableTiles.length)].click()
        }
        else {
            for (let i = 0; i < PlayableTiles.length; i++) {
                const index = Math.floor(Math.random() * PlayableTiles.length);
                let a = PlayableTiles[i];
                PlayableTiles[i] = PlayableTiles[index];
                PlayableTiles[index] = a;
            }
            PlayableTiles.sort((a, b) => parseInt(b.dataset.weight) - parseInt(a.dataset.weight))
            PlayableTiles[0].click()
        }

    }
}

const container = document.querySelector('.container')
let tiles = []
let turn = 0;
let easyMode = false;

const init = (e) => {
    turn = 0;
    tiles = [];
    container.innerHTML = "";
    container.style.display = "grid"
    document.getElementById('level-select').style.display = "none";
    for (let i = 0; i < 16; i++) {
        let div = document.createElement('div')
        div.className = "empty-tile";
        div.id = `tile-${i}`;
        div.addEventListener('click', PlayTurn)
        container.appendChild(div)
        tiles.push(div)
    }
    easyMode = e.target.id == "easy-btn"
    document.getElementById("level-display").textContent = e.target.textContent;
    document.getElementById("level-display").scrollIntoView()
}

const btns = document.getElementsByClassName('btn');
for (let btn of btns) {
    btn.addEventListener('click', init);
}

document.getElementById("retry").addEventListener("click", () => {
    document.getElementById("level-display").textContent = "";
    container.style.display = "none";
    document.getElementById('level-select').style.display = "block";
    document.getElementById('level-select').scrollIntoView(false);
    document.getElementById("gameover").style.display = "none";
    document.getElementById("victory").style.display = "none";
    document.getElementById("retry").style.display = "none";
});