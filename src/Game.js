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
            if (G.players[i].water == 0){
                return true;
            }
        }
        return false;
    },
};

var setupPlayers = (numPlayers) => {
    var players = [];
    for (var i = 0; i < numPlayers; i++) {
        players.push({
            role: "",
            //TODO: REPLACE WITH HELICOPTER CRASH TILE POSITION
            position: 3,
            water: -1,
            maxWater: -1,
        });
    }
    return players;
}

var setupTiles = () => {
    var tiles = [];
    for (var i = 0; i < 25; i++) {
        var tile = {
            isStorm: false,
            isRevealed: false,
            sandCount: 0,
        }
        tiles.push(tile);
    }
    tiles[12].isStorm = true;
    const sandTiles = [2, 6, 8, 10, 14, 16, 18, 22];
    for (var i = 0; i < sandTiles.length; i++) {
        tiles[sandTiles[i]].sandCount = 1;
    }
    return tiles;
}