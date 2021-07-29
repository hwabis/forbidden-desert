export const ForbiddenDesert = {
    //tile: "isRevealed", "sandCount"
    //tile types: "well", "mirage", "gear", "tunnel", "clue", "launchpad", "storm"
    //tile: "part" and "pos" only for type "clue"
    //parts are "0", "1", "2", "3"; pos are "0" (vertical) and "1" (horizontal)
    setup: (ctx) => ({
        players: setupPlayers(ctx.numPlayers),
        tiles: setupTiles(),
        stormLevel: 0,
        lastDrawType: [],
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
        giveWater: {
            move: (G, ctx, id) => {
                G.players[ctx.currentPlayer].water -= 1;
                G.players[id].water += 1;
            },
            noLimit: true
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
            G.lastDrawType = [];
            //eventually check storm level + ctx.numPlayers, and draw according to that

            //val: 1-4=sunBeatsDown, 5-7=stormPicksUp, 8-31 wind
            var val = ctx.random.Die(31);
            if (val <= 4) {
                for (var i = 0; i < G.players.length; i++) {
                    if (!(G.tiles[G.players[i].position].type === "tunnel" && G.tiles[G.players[i].position].isRevealed)) {
                        G.players[i].water -= 1;
                    }
                }
                G.lastDrawType.push("Sun Beats Down");
            }
            else if (val <= 7) {
                G.stormLevel += 1;
                G.lastDrawType.push("Storm Picks Up")
            }
            else {
                var stormPos = 0;
                for (stormPos; stormPos < G.tiles.length; stormPos++) {
                    if (G.tiles[stormPos].type === "storm") {
                        break;
                    }
                }
                //1 = up, 2 = left, 3 = down, 4 = right
                var windDirection = ctx.random.Die(4);
                //1-3 = 1, 4-5 = 2, 6 = 3
                var windStrength = ctx.random.Die(6);
                var maxTilesAffected;
                if (windStrength <= 3) {
                    maxTilesAffected = 1;
                }
                else if (windStrength <= 5) {
                    maxTilesAffected = 2;
                }
                else {
                    maxTilesAffected = 3;
                }
                //identify positions of tiles that are moved
                var affectedPos = [];
                var candidatePos = stormPos;
                if (windDirection === 1) {
                    while (affectedPos.length < maxTilesAffected) {
                        candidatePos += 5;
                        if (candidatePos >= 0 && candidatePos <= 24) {
                            affectedPos.push(candidatePos);
                        }
                        else {
                            break;
                        }
                    }
                }
                else if (windDirection === 2) {
                    while (affectedPos.length < maxTilesAffected) {
                        candidatePos += 1;
                        //check whether on the same row
                        if (candidatePos >= 0 && candidatePos <= 24 &&
                            Math.floor(candidatePos / 5) === Math.floor(stormPos / 5)) {
                            affectedPos.push(candidatePos);
                        }
                        else {
                            break;
                        }
                    }
                }
                else if (windDirection === 3) {
                    while (affectedPos.length < maxTilesAffected) {
                        candidatePos -= 5;
                        if (candidatePos >= 0 && candidatePos <= 24) {
                            affectedPos.push(candidatePos);
                        }
                        else {
                            break;
                        }
                    }
                }
                else if (windDirection === 4) {
                    while (affectedPos.length < maxTilesAffected) {
                        candidatePos -= 1;
                        //check whether on the same row
                        if (candidatePos >= 0 && candidatePos <= 24 &&
                            Math.floor(candidatePos / 5) === Math.floor(stormPos / 5)) {
                            affectedPos.push(candidatePos);
                        }
                        else {
                            break;
                        }
                    }
                }
                //add 1 sand to affected tiles
                for (var i = 0; i < affectedPos.length; i++) {
                    G.tiles[affectedPos[i]].sandCount += 1;
                }

                //execute movements
                const tempStormTile = G.tiles[stormPos];
                var prevPos = stormPos;
                for (var i = 0; i < affectedPos.length; i++) {
                    G.tiles[prevPos] = G.tiles[affectedPos[i]];
                    prevPos = affectedPos[i];
                }
                if (affectedPos.length !== 0) {
                    G.tiles[affectedPos[affectedPos.length - 1]] = tempStormTile;
                }

                //move all affected players
                var affectedPlayers = [];
                for (var i = 0; i < G.players.length; i++) {
                    for (var j = 0; j < affectedPos.length; j++) {
                        if (G.players[i].position === affectedPos[j]) {
                            affectedPlayers.push(i);
                        }
                    }
                }
                for (var i = 0; i < affectedPlayers.length; i++) {
                    if (windDirection === 1) {
                        G.players[affectedPlayers[i]].position -= 5;
                    }
                    else if (windDirection === 2) {
                        G.players[affectedPlayers[i]].position -= 1;
                    }
                    else if (windDirection === 3) {
                        G.players[affectedPlayers[i]].position += 5;
                    }
                    else if (windDirection === 4) {
                        G.players[affectedPlayers[i]].position += 1;
                    }
                }

                var directionString;
                if (windDirection === 1) {
                    directionString = "up";
                }
                else if (windDirection === 2) {
                    directionString = "left";
                }
                else if (windDirection === 3) {
                    directionString = "down";
                }
                else if (windDirection === 4) {
                    directionString = "right";
                }
                G.lastDrawType.push("Wind: " + directionString + ", strength " + maxTilesAffected);
            }
        }
    },

    endIf: (G, ctx) => {
        for (var i = 0; i < G.players.length; i++) {
            if (G.players[i].water === -1) {
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
            water: 0,
            maxWater: 0,
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