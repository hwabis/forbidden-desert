export const ForbiddenDesert = {
    //tile: "isRevealed", "sandCount"
    //tile types: "well", "mirage", "gear", "tunnel", "clue", "launchpad", "storm"
    //tile: "part" and "pos" only for type "clue"
    //parts are "0", "1", "2", "3"; pos are "0" (vertical) and "1" (horizontal)
    setup: (ctx) => ({
        players: setupPlayers(ctx.numPlayers),
        tiles: setupTiles(),
        stormLevel: 0,
    }),

    moves: {
        move: (G, ctx, pos) => {
            G.players[ctx.currentPlayer].position = pos;
        },
        dig: (G, ctx, pos) => {
            G.tiles[pos].sandCount--;
        },
        excavate: {
            move: (G, ctx) => {
                G.tiles[G.players[ctx.currentPlayer].position].isRevealed = true;
            },
            undoable: false
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
        setDifficulty: {
            move: (G, ctx, diff) => {
                G.stormLevel = diff;
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
        onEnd: (G, ctx) => {
            //eventually check storm level + ctx.numPlayers, and draw according to that

            //val: 1-4=sunBeatsDown, 5-7=stormPicksUp, 8-31 wind
            const val = ctx.random.Die(31);
            if (val <= 4) {
                for (var i = 0; i < G.players.length; i++) {
                    if (G.tiles[G.players[i].position].type !== "tunnel" && !G.tiles[G.players[i].position].isRevealed){
                        G.players[i].water -= 1;
                    }
                }
            }
            else if (val <= 7) {
                G.stormLevel += 1;
            }
            else {
                //TODO: finish this ... 
                var stormPos = 0;
                for (stormPos; stormPos < G.tiles.length; stormPos++) {
                    if (G.tiles[stormPos].type === "storm") {
                        break;
                    }
                }
                //change this to array later..
                var affectedPos = stormPos + 1;
                var tempStormTile = G.tiles[stormPos];
                G.tiles[stormPos] = G.tiles[affectedPos];
                G.tiles[affectedPos] = tempStormTile;

                //move all affected players
                var affectedPlayers = []
                for (var i = 0; i < G.players.length; i++) {
                    if (G.players[i].position === affectedPos) {
                        affectedPlayers.push(i);
                    }
                }
                for (var i = 0; i < affectedPlayers.length; i++) {
                    G.players[affectedPlayers[i]].position -= 1;
                }
            }
        }
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
    while (pos === 12) {
        pos = getRandomInt(25);
    }
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
            type: "tunnel",
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