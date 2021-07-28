export const ForbiddenDesert = {
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
        removeWater: (G, ctx, id) => {
            G.players[id].water -= 1;
        },
    },

    turn: {
        moveLimit: 4,
    },

    endIf: (G, ctx) => {
        for (var i = 0; i < G.players.length; i++) {
            if (G.players[i].water == 0) {
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
            isStorm: false,
            isWell: true,
            isMirage: false,
            isGear: false,
            isTunnel: false,
            isClue: false,
            part: -1,
            type: -1,
            isLaunchPad: false
        });
    }
    tiles.push({
        isRevealed: false,
        sandCount: 0,
        isStorm: false,
        isWell: false,
        isMirage: true,
        isGear: false,
        isTunnel: false,
        isClue: false,
        part: -1,
        type: -1,
        isLaunchPad: false
    });
    for (var i = 0; i < 9; i++) {
        tiles.push({
            isRevealed: false,
            sandCount: 0,
            isStorm: false,
            isWell: false,
            isMirage: false,
            isGear: true,
            isTunnel: false,
            isClue: false,
            part: -1,
            type: -1,
            isLaunchPad: false
        });
    }
    for (var i = 0; i < 3; i++) {
        tiles.push({
            isRevealed: false,
            sandCount: 0,
            isStorm: false,
            isWell: false,
            isMirage: false,
            isGear: true,
            isTunnel: true,
            isClue: false,
            part: -1,
            type: -1,
            isLaunchPad: false
        })
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 2; j++) {
            //parts: 0, 1, 2, 3
            //type: 0 --> vertical, 1 --> horizontal
            tiles.push({
                isRevealed: false,
                sandCount: 0,
                isStorm: false,
                isWell: false,
                isMirage: false,
                isGear: false,
                isTunnel: false,
                isClue: true,
                part: i,
                type: j,
                isLaunchPad: false
            });
        }
    }
    tiles.push({
        isRevealed: false,
        sandCount: 0,
        isStorm: false,
        isWell: false,
        isMirage: false,
        isGear: false,
        isTunnel: false,
        isClue: true,
        part: i,
        type: j,
        isLaunchPad: true
    })
    shuffle(tiles);
    tiles.splice(12, 0, {
        isRevealed: false,
        sandCount: 0,
        isStorm: true,
        isWell: false,
        isMirage: false,
        isGear: false,
        isTunnel: false,
        isClue: false,
        part: -1,
        type: -1,
    });
    console.log(tiles.length);

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
