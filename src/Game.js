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
        setPlayerRole: {
            move: (G, ctx, id, role) => {G.players[id].role = role},
            undoable: false,
            noLimit: true
        }
    },

    turn: {
        moveLimit: 4,
    },
}; 

var setupPlayers = (numPlayers) => {
    var players = [];
    for (var i = 0; i < numPlayers; i++) {
        players.push({
            role: "", 
            //TODO: REPLACE WITH HELICOPTER CRASH TILE POSITION
            position: 3,
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