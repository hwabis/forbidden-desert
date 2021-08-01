export const ForbiddenDesert = {
    //there's a bug where sometimes (particularly when people are at 0 water),
    //onEnd happens twice. i can't figure out the cause, but turnEnded should fix it
    setup: (ctx) => ({
        players: setupPlayers(ctx.numPlayers),
        tiles: setupTiles(),
        stormLevel: 0,
        numDraws: 0,
        lastDrawType: [],
        collectedParts: [],
        //for storm probability stuff (see sim.py)
        stormPicksUpProb: 1,
        sunBeatsDownProb: 1,
        //for turn onEnd
        turnEnded: false,
    }),

    moves: {
        move: (G, ctx, pos) => {
            G.players[ctx.currentPlayer].position = pos;
            //climber
            if (G.players[ctx.currentPlayer].carryingPlayer !== -1) {
                G.players[G.players[ctx.currentPlayer].carryingPlayer].position = pos;
            }
        },
        dig: (G, ctx, pos) => {
            if (G.players[ctx.currentPlayer].role === "Archeologist") {
                G.tiles[pos].sandCount -= 2;
                if (G.tiles[pos].sandCount < 0) {
                    G.tiles[pos].sandCount = 0;
                }
            }
            else {
                G.tiles[pos].sandCount--;
            }
        },
        excavate: {
            move: (G, ctx) => {
                const currPos = G.players[ctx.currentPlayer].position;
                G.tiles[currPos].isRevealed = true;
                if (G.tiles[currPos].type === "well") {
                    //everyone on currPos gets two water
                    for (var i = 0; i < G.players.length; i++) {
                        if (G.players[i].position === currPos) {
                            G.players[i].water += 2;
                        }
                        if (G.players[i].water > G.players[i].maxWater) {
                            G.players[i].water = G.players[i].maxWater;
                        }
                    }
                }
                else if (G.tiles[currPos].type === "clue") {
                    //check if the other clue has also been revealed
                    //if so, then generate finalPart on the appropriate tile
                    var found = false;
                    for (var i = 0; i < G.tiles.length; i++) {
                        if (G.tiles[i].isRevealed && G.tiles[i].type === "clue" &&
                            i !== currPos && G.tiles[i].part === G.tiles[currPos].part) {
                            found = true;
                        }
                    }
                    if (found) {
                        var hid;
                        var vid;
                        var partName = G.tiles[currPos].part;
                        for (var i = 0; i < G.tiles.length; i++) {
                            if (G.tiles[i].part === partName && G.tiles[i].pos === "h") {
                                hid = i;
                            }
                            if (G.tiles[i].part === partName && G.tiles[i].pos === "v") {
                                vid = i;
                            }
                        }
                        //index = (hid rounded down to the nearest multiple of 5) + (vid % 5)
                        while ((hid % 5) !== 0 && hid >= 0) {
                            hid -= 1;
                        }
                        const index = hid + (vid % 5);
                        G.tiles[index].finalParts.push(partName);
                    }
                }
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
        pickUpFinalPart: (G, ctx) => {
            const tempRemovedPart = G.tiles[G.players[ctx.currentPlayer].position].finalParts[0];
            //remove the first final part from tile
            G.tiles[G.players[ctx.currentPlayer].position].finalParts.splice(0, 1);
            //add to collected parts
            G.collectedParts.push(tempRemovedPart);
        },
        mitigate: (G, ctx) => {
            G.numDraws -= 1;
        },
        collectWater: (G, ctx) => {
            G.players[ctx.currentPlayer].water += 2;
            if (G.players[ctx.currentPlayer].water > G.players[ctx.currentPlayer].maxWater) {
                G.players[ctx.currentPlayer].water = G.players[ctx.currentPlayer].maxWater;
            }
        },
        //climber
        carry: {
            move: (G, ctx, id) => {
                G.players[ctx.currentPlayer].carryingPlayer = id;
            },
            noLimit: true
        },
        drop: {
            move: (G, ctx) => {
                G.players[ctx.currentPlayer].carryingPlayer = -1;
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
                if (diff === 0) {
                    G.numDraws = 2;
                }
                else {
                    G.numDraws = 3;
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
        placeFinalPart: {
            move: (G, ctx, id) => {
                G.tiles[id].finalParts.push("Z");
            },
            noLimit: true
        },
        addSand: {
            move: (G, ctx, id) => {
                G.tiles[id].sandCount += 1;
            },
            noLimit: true
        }
    },

    turn: {
        moveLimit: 4,
        onBegin: (G, ctx) => {
            G.turnEnded = false;
        },
        onEnd: (G, ctx) => {
            if (!G.turnEnded) {
                //climber drop
                G.players[ctx.currentPlayer].carryingPlayer = -1;

                G.lastDrawType = [];
                //numDraws should be set from end of last turn
                //(we set it at the end for meteorologist to be able to decrement it during turn)
                for (var draw = 0; draw < G.numDraws; draw++) {
                    var val = ctx.random.Die(100);
                    if (val <= (G.stormPicksUpProb) || val <= (G.sunBeatsDownProb)) {
                        var bothQualify = false;
                        var doStormPicksUp = false;
                        //if both qualify...
                        if (val <= Math.min((G.stormPicksuPProb), (G.sunBeatsDownProb))) {
                            bothQualify = true;
                            //...prioritize the one with higher probability.
                            if ((G.stormPicksUpProb) > (G.sunBeatsDownProb)) {
                                doStormPicksUp = true;
                            }
                        }
                        if ((!bothQualify && val <= (G.stormPicksUpProb)) || (bothQualify && doStormPicksUp)) {
                            G.stormLevel += 1;
                            G.lastDrawType.push("Storm Picks Up");
                            //reset stormPicksUp probability
                            G.stormPicksUpProb = 1;
                            //increment sunBeatsDown
                            G.sunBeatsDownProb += 2;
                        }
                        else {
                            for (var i = 0; i < G.players.length; i++) {
                                if (!(G.tiles[G.players[i].position].type === "tunnel" && G.tiles[G.players[i].position].isRevealed)) {
                                    G.players[i].water -= 1;
                                }
                            }
                            G.lastDrawType.push("Sun Beats Down");
                            //reset sunBeatsDown
                            G.sunBeatsDownProb = 1;
                            //increment stormPicksUp
                            G.stormPicksUpProb += 1;
                        }
                    }
                    else {
                        //increment both
                        G.stormPicksUpProb += 1;
                        G.sunBeatsDownProb += 2;

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
                        //edge case: first give all of stormPos's finalParts to the first affectedPos tile
                        if (affectedPos.length > 0) {
                            for (var i = 0; i < G.tiles[stormPos].finalParts.length; i++) {
                                G.tiles[affectedPos[0]].finalParts.push(G.tiles[stormPos].finalParts[i]);
                            }
                            //clear storm's finalParts
                            G.tiles[stormPos].finalParts = [];
                        }
                        //...now execute
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
                //check storm level + ctx.numPlayers, and draw according to that
                if (G.stormLevel === 0) {
                    G.numDraws = 2;
                }
                else if (ctx.numPlayers === 2) {
                    if (G.stormLevel <= 3) {
                        G.numDraws = 3;
                    }
                    else if (G.stormLevel <= 7) {
                        G.numDraws = 4;
                    }
                    else if (G.stormLevel <= 10) {
                        G.numDraws = 5;
                    }
                    else {
                        G.numDraws = 6;
                    }
                }
                else if (ctx.numPlayers === 3 || ctx.numPlayers === 4) {
                    if (G.stormLevel <= 4) {
                        G.numDraws = 3;
                    }
                    else if (G.stormLevel <= 8) {
                        G.numDraws = 4;
                    }
                    else if (G.stormLevel <= 11) {
                        G.numDraws = 5;
                    }
                    else {
                        G.numDraws = 6;
                    }
                }
                else if (ctx.numPlayers === 5) {
                    if (G.stormLevel <= 5) {
                        G.numDraws = 3;
                    }
                    else if (G.stormLevel <= 9) {
                        G.numDraws = 4;
                    }
                    else if (G.stormLevel <= 12) {
                        G.numDraws = 5;
                    }
                    else {
                        G.numDraws = 6;
                    }
                }
                G.turnEnded = true;
            }
        }
    },

    endIf: (G, ctx) => {
        for (var i = 0; i < G.players.length; i++) {
            if (G.players[i].water < 0) {
                return true;
            }
        }
        if ((ctx.numPlayers === 2 && G.stormLevel === 13) ||
            ((ctx.numPlayers === 3 || ctx.numPlayers === 4) && G.stormLevel === 14) ||
            (ctx.numPlayers === 5 && G.stormLevel === 15)) {
            return true;
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
            carryingPlayer: -1,
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
            finalParts: []
        });
    }
    tiles.push({
        isRevealed: false,
        sandCount: 0,
        type: "mirage",
        finalParts: []
    });
    for (var i = 0; i < 9; i++) {
        tiles.push({
            isRevealed: false,
            sandCount: 0,
            type: "gear",
            finalParts: []
        });
    }
    for (var i = 0; i < 3; i++) {
        tiles.push({
            isRevealed: false,
            sandCount: 0,
            type: "tunnel",
            finalParts: []
        })
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 2; j++) {
            //parts: A, B, C, D
            //pos: 0 --> vertical, 1 --> horizontal
            var part;
            var pos;
            if (i === 0) part = "A";
            else if (i === 1) part = "B";
            else if (i === 2) part = "C";
            else if (i === 3) part = "D";
            if (j === 0) pos = "h";
            else if (j === 1) pos = "v"
            tiles.push({
                isRevealed: false,
                sandCount: 0,
                type: "clue",
                part: part,
                pos: pos,
                finalParts: []
            });
        }
    }
    tiles.push({
        isRevealed: false,
        sandCount: 0,
        type: "launchpad",
        finalParts: []
    })
    shuffle(tiles);
    tiles.splice(12, 0, {
        isRevealed: false,
        sandCount: 0,
        type: "storm",
        finalParts: []
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