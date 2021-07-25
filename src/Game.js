import { INVALID_MOVE } from 'boardgame.io/core';

export const ForbiddenDesert = {
    setup: (ctx) => ({
        players: setupPlayers(ctx.numPlayers),
        tiles: Array(25).fill(tile),
    }),

    moves: {
        move: (G, ctx, id) => {
            if (id >= 0 && id <= 24 && 
                (id === G.players[ctx.currentPlayer].position - 1 || id === G.players[ctx.currentPlayer].position + 1 || 
                id === G.players[ctx.currentPlayer].position - 5 || id === G.players[ctx.currentPlayer].position + 5)) {
                G.players[ctx.currentPlayer].position = id;
            }
            else {
                return INVALID_MOVE;
            }
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
            //REPLACE WITH HELICOPTER CRASH TILE POSITION
            position: 3,
        });
    }
    return players;
}

var tile = {
    isRevealed: false,
}