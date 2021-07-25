export const ForbiddenDesert = {
    setup: () => ({
        currPlayerActions: 4,
        tiles: Array(25).fill(tile),
    }),

    moves: {
        move: (G, ctx, id) => {
            G.tiles[id].players.push(ctx.currentPlayer);
        },
    },

    turn: {
        onEnd: (G, ctx) => {
            G.currPlayerActions = 4;
        },
        onMove: (G, ctx) => {
            G.currPlayerActions--;
        },
        endIf: (G, ctx) => G.currPlayerActions == 0,
    },
}; 

var tile = {
    revealed: false,
    players: [],
}

var isAdjacentTile = (id) => {

}