export const ForbiddenDesert = {
    setup: (ctx) => ({
        players: setupPlayers(ctx.numPlayers),
        tiles: setupTiles(),
    }),

    moves: {
        move: (G, ctx, pos) => {
            G.players[ctx.currentPlayer].position = pos;
        },
    },

    turn: {
        moveLimit: 4,
    },
}; 

var setupPlayers = (numPlayers) => {
    var players = [];
    for (var i = 0; i < numPlayers; i++) {
        players.push({
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
        }
        tiles.push(tile);
    }
    tiles[12].isStorm = true;
    return tiles;
}