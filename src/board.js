import React from 'react';
import './board.css';

export class ForbiddenDesertBoard extends React.Component {
    state = {
        assignID: 0,
        assignDifficulty: false,
        digging: false,
        givingWater: false,
    }

    assignRoleTo(id, role) {
        this.props.moves.setPlayerInfo(id, role);
        this.setState({ assignID: this.state.assignID + 1 });
    }
    assignDifficultyTo(diff) {
        this.props.moves.setDifficulty(diff);
        this.setState({ assignDifficulty: true })
    }
    onClickTile(id) {
        if (this.isAdjacentTile(id) || this.isSameTile(id)) {
            if (this.state.digging && this.props.G.tiles[id].sandCount > 0) {
                this.props.moves.dig(id);
                this.setState({ digging: false });
            }
            else if (!this.isSameTile(id) &&
                this.props.G.tiles[id].sandCount < 2 &&
                !this.state.digging &&
                !this.isBuried()) {
                this.props.moves.move(id);
            }
        }
    }
    excavate() {
        if (this.props.G.tiles[this.props.G.players[this.props.ctx.currentPlayer].position].isRevealed === false
            && this.props.G.tiles[this.props.G.players[this.props.ctx.currentPlayer].position].sandCount === 0) {
            //holy cow what a long sentence lol
            this.props.moves.excavate();
        }
    }
    giveWaterTo(id) {
        if (this.props.G.players[id].position === this.props.G.players[this.props.ctx.currentPlayer].position
            && this.props.G.players[id].water < this.props.G.players[id].maxWater
            && this.props.G.players[this.props.ctx.currentPlayer].water > 0) {
            this.props.moves.giveWater(id);
            this.setState({ givingWater: false });
        }
    }
    isAdjacentTile(id) {
        const currentPlayerPos = this.props.G.players[this.props.ctx.currentPlayer].position;
        return (id >= 0 && id <= 24 &&
            (id === currentPlayerPos - 1 || id === currentPlayerPos + 1 ||
                id === currentPlayerPos - 5 || id === currentPlayerPos + 5));
    }
    isSameTile(id) {
        return (id === this.props.G.players[this.props.ctx.currentPlayer].position);
    }
    //returns whether current player is buried
    isBuried() {
        return this.props.G.tiles[this.props.G.players[this.props.ctx.currentPlayer].position].sandCount > 1;
    }

    render() {
        //role selection screen
        if (this.state.assignID < this.props.ctx.numPlayers) {
            return (
                <div className="center">
                    <div id="title">
                        Role Selection
                    </div>
                    <div className="header">
                        Choose role for Player {this.state.assignID}:
                    </div>
                    <p></p>
                    <div>
                        <button onClick={() => { this.assignRoleTo(this.state.assignID, "Archeologist"); }}>
                            Archeologist
                        </button>
                        <button onClick={() => { this.assignRoleTo(this.state.assignID, "Climber"); }}>
                            Climber
                        </button>
                        <button onClick={() => { this.assignRoleTo(this.state.assignID, "Explorer"); }}>
                            Explorer
                        </button>
                        <button onClick={() => { this.assignRoleTo(this.state.assignID, "Meteorologist"); }}>
                            Meteorologist
                        </button>
                        <button onClick={() => { this.assignRoleTo(this.state.assignID, "Navigator"); }}>
                            Navigator
                        </button>
                        <button onClick={() => { this.assignRoleTo(this.state.assignID, "Water Carrier"); }}>
                            Water Carrier
                        </button>
                    </div>
                    <p></p>
                    <div>
                        <div>
                            <p id="header">Archeologist</p>
                            <ul>
                                <li>Removes 2 sand when digging instead of 1.</li>
                                <li>Water capacity: 3</li>
                            </ul>
                        </div>
                        <div>
                            <p id="header">Climber</p>
                            <ul>
                                <li>Carry: moves other players along with Climber. (Cost: free)</li>
                                <li>Can move over tiles with 2 or more sand.</li>
                                <li>Allows all players on Climber's current tile to leave even with 2 or more sand.</li>
                                <li>Water capacity: 3</li>
                            </ul>
                        </div>
                        <div>
                            <p id="header">Explorer</p>
                            <ul>
                                <li>Can move, dig, and use items diagonally.</li>
                                <li>Water capacity: 4</li>
                            </ul>
                        </div>
                        <div>
                            <p id="header">Meteorologist</p>
                            <ul>
                                <li>Mitigate: draw 1 less Storm at the end of the turn. (Cost: 1 action)</li>
                                <li>Water capacity: 4</li>
                            </ul>
                        </div>
                        <div>
                            <p id="header">Navigator</p>
                            <ul>
                                <li>Direct: move another player up to 3 tiles. Climber and Explorer keep their abilities. (Cost: 1 action)</li>
                                <li>Water capacity: 4</li>
                            </ul>
                        </div>
                        <div>
                            <p id="header">Water Carrier</p>
                            <ul>
                                <li>Gather Water: take 2 water from an excavated well. (Cost: 1 action)</li>
                                <li>Give Water: give 1 water to an adjacent player. (Cost: free)</li>
                                <li>Water capacity: 5</li>
                            </ul>
                        </div>
                    </div>
                </div>
            );
        }
        //difficulty selection screen
        if (this.state.assignDifficulty === false) {
            return (
                <div className="center">
                    <div id="title">
                        Difficulty Selection
                    </div>
                    <p></p>
                    <div>
                        <button onClick={() => { this.assignDifficultyTo(0); }}>
                            Novice
                        </button>
                        <button onClick={() => { this.assignDifficultyTo(1); }}>
                            Normal
                        </button>
                        <button onClick={() => { this.assignDifficultyTo(2); }}>
                            Elite
                        </button>
                        <button onClick={() => { this.assignDifficultyTo(3); }}>
                            Legendary
                        </button>
                    </div>
                    <p></p>
                    <div>
                        (Difficulty sets the starting storm level.)
                    </div>
                </div>
            );
        }
        var tiles = [];
        for (var i = 0; i < 5; i++) {
            var row = [];
            for (var j = 0; j < 5; j++) {
                var tile = [];
                const id = 5 * i + j;
                if (this.props.G.tiles[id].type === "storm") {
                    row.push(<td key={id} id="storm"></td>);
                }
                else {
                    var playersOnThisTile = [];
                    //render players on current tile
                    for (var k = 0; k < this.props.G.players.length; k++) {
                        if (this.props.G.players[k].position === id) {
                            playersOnThisTile.push(k);
                        }
                    }
                    tile.push(<div className="player">{playersOnThisTile}</div>);
                    //render sandCount
                    if (this.props.G.tiles[id].sandCount !== 0) {
                        var sandIndicator = "";
                        for (var l = 0; l < this.props.G.tiles[id].sandCount; l++) {
                            sandIndicator = sandIndicator.concat("l");
                        }
                        tile.push(<div className={this.props.G.tiles[id].sandCount > 1 ? "sand red" : "sand"}>
                            {sandIndicator}</div>);
                    }
                    if (this.props.G.tiles[id].isRevealed === false) {
                        row.push(<td key={id} className={this.props.G.tiles[id].type === "well" || this.props.G.tiles[id].type === "mirage" ?
                            "unrevealed-water" : "unrevealed"} onClick={() => this.onClickTile(id)}>{tile}</td>);
                    }
                    else if (this.props.G.tiles[id].type === "clue") {
                        const className = this.props.G.tiles[id].part + this.props.G.tiles[id].pos;
                        row.push(<td key={id} className={className}
                            onClick={() => this.onClickTile(id)}>{tile}</td>);
                    }
                    else {
                        row.push(<td key={id} className={this.props.G.tiles[id].type}
                            onClick={() => this.onClickTile(id)}>{tile}</td>);
                    }
                }
            }
            tiles.push(<tr key={i}>{row}</tr>);
        }

        var actionButtons = [];
        actionButtons.push(
            <div>
                <button onClick={() => { this.setState({ digging: !this.state.digging }); }}>
                    Dig
                </button>
                <div>
                    {this.state.digging ? "Choose a tile to dig." : ""}
                </div>
                <button onClick={() => { this.excavate(); }}>
                    Excavate
                </button>
                <button onClick={() => { this.setState({ givingWater: !this.state.givingWater }); }}>
                    Give water to...
                </button>
            </div>
        );
        //give water to popup buttons
        if (this.state.givingWater) {
            for (var i = 0; i < this.props.G.players.length; i++) {
                //this took me hours to fix.. if you don't assign i to a constant,
                //and use i for giveWaterTo parameter, then the value is going 
                //to be, like, different every time you call it. or something.
                const index = i;
                actionButtons.push(
                    <div>
                        <button onClick={() => { this.giveWaterTo(index); }}>
                            Player {i}
                        </button>
                    </div>
                );
            }
        }
        actionButtons.push(
            <div>
                <button onClick={() => { this.props.undo(); }}>
                    Undo
                </button>
                <button onClick={() => { this.props.moves.doNothing(); }}>
                    Do nothing
                </button>
            </div>
        )

        var rightbar = [];
        rightbar.push(<div>Players:</div>)
        var playerInfoList = [];
        for (var i = 0; i < this.props.ctx.numPlayers; i++) {
            playerInfoList.push(
                <div>
                    {i} - {this.props.G.players[i].role} 🍼 {this.props.G.players[i].water} / {this.props.G.players[i].maxWater}
                </div>
            );
        }
        rightbar.push(playerInfoList);

        var draw3, draw4, draw5, draw6, death;
        if (this.props.ctx.numPlayers === 2) {
            draw3 = "1 - 3";
            draw4 = "4 - 7";
            draw5 = "8 - 10";
            draw6 = "11 - 12";
            death = "13";
        }
        else if (this.props.ctx.numPlayers === 3 || this.props.ctx.numPlayers === 4) {
            draw3 = "1 - 4";
            draw4 = "5 - 8";
            draw5 = "9 - 11";
            draw6 = "12 - 13";
            death = "14";
        }
        else if (this.props.ctx.numPlayers === 5) {
            draw3 = "1 - 5";
            draw4 = "6 - 9";
            draw5 = "10 - 12";
            draw6 = "13 - 14";
            death = "15";
        }
        rightbar.push(
            <div>
                <p></p>
                <div>Current storm level: {this.props.G.stormLevel}</div>
                <p></p>
                <div>Info:</div>
                <div>
                    Draw 2 at level 0
                </div>
                <div>
                    Draw 3 at levels {draw3}
                </div>
                <div>
                    Draw 4 at levels {draw4}
                </div>
                <div>
                    Draw 5 at levels {draw5}
                </div>
                <div>
                    Draw 6 at levels {draw6}
                </div>
                <div>
                    Game over at level {death}
                </div>
                <div>
                    Probability of Sun Beats Down: 12.9%
                </div>
                <div>
                    Probability of Storm Picks Up: 9.7%
                </div>
            </div>
        );

        rightbar.push(
            <div>
                <p></p>
                End of last turn:
            </div>
        );
        for (var i = 0; i < this.props.G.lastDrawType.length; i++) {
            rightbar.push(
                <div>
                    {this.props.G.lastDrawType[i]}
                </div>
            );
        }

        return (
            <div>
                <div className="fl">
                    <div className="header center">
                        <div>
                            Player {this.props.ctx.currentPlayer}'s turn
                        </div>
                        <div>
                            Actions left in turn: {4 - this.props.ctx.numMoves}
                        </div>
                    </div>
                    <table>
                        <tbody>{tiles}</tbody>
                    </table>
                    <div className="center">
                        {actionButtons}
                    </div>
                </div>
                <div className="fl">
                    {rightbar}
                </div>
            </div>
        );
    }
}
