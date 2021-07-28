export const ForbiddenDesert = {
    //tile types: "well", "mirage", "gear", "geartunnel", "clue", "launchpad", "storm"
    //tile: "part" and "pos" only for type "clue"
    //parts are "0", "1", "2", "3"; pos are "0" (vertical) and "1" (horizontal)
    setup: (ctx) => ({
        players: setupPlayers(ctx.numPlayers),
        tiles: setupTiles(),
    }),

    moves: {
        move: (G, ctx, pos) => {
            G.players[ctx.currentPlayer].position = pos;
        },
        dig: (G, ctx, pos) => {
            G.tiles[pos].sandCount--;
        },
        doNothing: (G, ctx) => {
            ctx.events.endTurn();
        },
        setPlayerInfo: {
            move: (G, ctx, id, role) => {
                G.players[id].role = role;
                if (role === "Archeologist" || role === "Climber") {
                    G.players[id].maxWater = 3;
                    G.players[id].water = 3;
                }
                else if (role === "Explorer" || role === "Meteorologist" || role === "Navigator") {
                    G.players[id].maxWater = 4;
                    G.players[id].water = 4;
                }
                else {
                    G.players[id].maxWater = 5;
                    G.players[id].water = 5;
                }
            },
            undoable: false,
            noLimit: true
        },
        //DEBUG ONLY
        removeWater: {
            move: (G, ctx, id) => {
                G.players[id].water -= 1;
            },
            noLimit: true
        },
    },

    turn: {
        moveLimit: 4,
    },

    endIf: (G, ctx) => {
        for (var i = 0; i < G.players.length; i++) {
            if (G.players[i].water === 0) {
                return true;
            }
        }
        return false;
    },
};

var setupPlayers = (numPlayers) => {
    var players = [];
    var pos = getRandomInt(25);
    for (var i = 0; i < numPlayers; i++) {
        players.push({
            role: "",
            position: pos,
            water: -1,
            maxWater: -1,
        });
    }
    return players;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

var setupTiles = () => {
    var tiles = [];
    for (var i = 0; i < 2; i++) {
        tiles.push({
            isRevealed: false,
            sandCount: 0,
            type: "well",
        });
    }
    tiles.push({
        isRevealed: false,
        sandCount: 0,
        type: "mirage",
    });
    for (var i = 0; i < 9; i++) {
        tiles.push({
            isRevealed: false,
            sandCount: 0,
            type: "gear",
        });
    }
    for (var i = 0; i < 3; i++) {
        tiles.push({
            isRevealed: false,
            sandCount: 0,
            type: "geartunnel",
        })
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 2; j++) {
            //parts: 0, 1, 2, 3
            //pos: 0 --> vertical, 1 --> horizontal
            tiles.push({
                isRevealed: false,
                sandCount: 0,
                type: "clue",
                part: i,
                pos: j,
            });
        }
    }
    tiles.push({
        isRevealed: false,
        sandCount: 0,
        type: "launchpad",
    })
    shuffle(tiles);
    tiles.splice(12, 0, {
        isRevealed: false,
        sandCount: 0,
        type: "storm",
    });

    //setup sand
    const sandTiles = [2, 6, 8, 10, 14, 16, 18, 22];
    for (var i = 0; i < sandTiles.length; i++) {
        tiles[sandTiles[i]].sandCount = 1;
    }
    return tiles;
}

//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array lol sorry :(
function shuffle(array) {
    var currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}
