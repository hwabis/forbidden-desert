import React from 'react';
import './board.css'

export class ForbiddenDesertBoard extends React.Component {
    state = {
        assignID: 0,
        assignDifficulty: false,
        digging: false,
        givingWater: false,
        chooseCarry: false,
        excavateErrorMsg: '',
        waterErrorMsg: '',
        mitigateErrorMsg: '',
        carryErrorMsg: '',
        dropErrorMsg: '',
    }

    assignRoleTo(playerID, role) {
        this.props.moves.setPlayerInfo(playerID, role);
        this.setState({ assignID: this.state.assignID + 1 });
    }
    assignDifficultyTo(diff) {
        this.props.moves.setDifficulty(diff);
        this.setState({ assignDifficulty: true })
    }
    //move, or dig if this.state.digging
    onClickTile(id) {
        if (this.isBuried()) {
            //you can only dig when buried
            if (this.isSameTile(id) && this.state.digging && this.props.G.tiles[id].sandCount > 0) {
                this.props.moves.dig(id);
                this.setState({ digging: false });
            }
        }
        else if (this.isAdjacentTile(id) || this.isSameTile(id) ||
            (this.isDiagonalTile(id) && this.props.G.players[this.props.ctx.currentPlayer].role === "Explorer")) {
            if (this.state.digging && this.props.G.tiles[id].sandCount > 0) {
                this.props.moves.dig(id);
                this.setState({ digging: false });
            }
            else if (!this.isSameTile(id) &&
                (this.props.G.tiles[id].sandCount < 2 || this.props.G.players[this.props.ctx.currentPlayer].role === "Climber")
                && !this.state.digging) {
                this.props.moves.move(id);
            }
        }
        //move through tunnel
        else if (this.props.G.tiles[id].type === "tunnel" && this.props.G.tiles[id].isRevealed &&
            this.props.G.tiles[this.props.G.players[this.props.ctx.currentPlayer].position].type === "tunnel" &&
            this.props.G.tiles[this.props.G.players[this.props.ctx.currentPlayer].position].isRevealed &&
            this.props.G.tiles[id].sandCount < 2 && !this.state.digging) {
            this.props.moves.move(id);
        }
    }
    excavate() {
        if (this.props.G.tiles[this.props.G.players[this.props.ctx.currentPlayer].position].isRevealed === true) {
            this.setState({ excavateErrorMsg: "This tile is already revealed!" })
            setTimeout(() => this.setState({ excavateErrorMsg: '' }), 3000);
        }
        else if (this.props.G.tiles[this.props.G.players[this.props.ctx.currentPlayer].position].sandCount !== 0) {
            this.setState({ excavateErrorMsg: "Remove all sand on this tile before excavating!" })
            setTimeout(() => this.setState({ excavateErrorMsg: '' }), 3000);
        }
        else {
            this.props.moves.excavate();
        }
    }
    giveWaterTo(playerID) {
        if (this.props.G.players[this.props.ctx.currentPlayer].water === 0) {
            this.setState({ givingWater: false, waterErrorMsg: "You don't have enough water!" });
            setTimeout(() => this.setState({ waterErrorMsg: '' }), 3000);
        }
        else if (this.props.G.players[playerID].water === this.props.G.players[playerID].maxWater) {
            this.setState({ givingWater: false, waterErrorMsg: "Target has full water!" });
            setTimeout(() => this.setState({ waterErrorMsg: '' }), 3000);
        }
        else {
            this.props.moves.giveWater(playerID);
            this.setState({ givingWater: false });
        }
    }
    pickUpFinalPart() {
        //no need to check condition; button won't show up if it's not met
        this.props.moves.pickUpFinalPart();
    }
    mitigate() {
        if (this.props.G.numDraws > 0) {
            this.props.moves.mitigate();
        }
        else {
            this.setState({ mitigateErrorMsg: "All storm cards already mitigated!" })
            setTimeout(() => this.setState({ mitigateErrorMsg: '' }), 3000);
        }
    }
    collectWater() {
        this.props.moves.collectWater();
    }
    carry(playerID) {
        this.setState({ chooseCarry: false, carrying: true });
        this.props.moves.carry(playerID);
    }
    drop() {
        this.setState({ chooseCarry: false, carrying: false });
        if (this.props.G.players[this.props.ctx.currentPlayer].carryingPlayer === -1) {
            this.setState({ dropErrorMsg: "Nobody to drop! Carry first." });
            setTimeout(() => this.setState({ dropErrorMsg: '' }), 3000);
        }
        else {
            this.props.moves.drop();
        }
    }
    isAdjacentTile(id) {
        const currentPlayerPos = this.props.G.players[this.props.ctx.currentPlayer].position;
        var check1 = id >= 0 && id <= 24 &&
            (id === currentPlayerPos - 1 || id === currentPlayerPos + 1 ||
                id === currentPlayerPos - 5 || id === currentPlayerPos + 5);
        if (id === currentPlayerPos - 1 || id === currentPlayerPos + 1) {
            //check2 is to prevent moving across the entire board, e.g. between 4-5, 9-10, etc.
            var check2 = (Math.floor(id / 5) === Math.floor(currentPlayerPos / 5));
            return check2;
        }
        else {
            return check1;
        }
    }
    isSameTile(id) {
        return (id === this.props.G.players[this.props.ctx.currentPlayer].position);
    }
    isDiagonalTile(id) {
        const currentPlayerPos = this.props.G.players[this.props.ctx.currentPlayer].position;
        var check1 = id >= 0 && id <= 24 &&
            (id === currentPlayerPos - 6 || id === currentPlayerPos - 4 ||
                id === currentPlayerPos + 4 || id === currentPlayerPos + 6);
        //check2 is to make sure id is exactly one row away from the current tile
        var check2 = Math.abs(Math.floor(id / 5) - Math.floor(currentPlayerPos / 5)) === 1;
        return check1 && check2;
    }

    //for idToStateClass purposes, not onClickTile
    tileIsMovable(id) {
        if (this.isBuried()) {
            return false;
        }
        else {
            return (this.isAdjacentTile(id)
                || (this.props.G.players[this.props.ctx.currentPlayer].role === "Explorer" && this.isDiagonalTile(id))
                || (this.props.G.tiles[this.props.G.players[this.props.ctx.currentPlayer].position].type === "tunnel"
                    && this.props.G.tiles[this.props.G.players[this.props.ctx.currentPlayer].position].isRevealed
                    && this.props.G.tiles[id].type === "tunnel" && this.props.G.tiles[id].isRevealed))
                && !this.isSameTile(id)
                && (this.props.G.tiles[id].sandCount < 2 || this.props.G.players[this.props.ctx.currentPlayer].role === "Climber")
                && !this.state.digging && !this.isBuried();
        }
    }
    //for idToStateClass purposes, not onClickTile
    tileIsDiggable(id) {
        if (this.isBuried()) {
            return this.isSameTile(id) && this.state.digging && this.props.G.tiles[id].sandCount > 0;
            //last condition here should always be true lol
        }
        else {
            return (this.isAdjacentTile(id) || this.isSameTile(id)
                || (this.props.G.players[this.props.ctx.currentPlayer].role === "Explorer" && this.isDiagonalTile(id)))
                && (this.state.digging && this.props.G.tiles[id].sandCount > 0);
        }
    }
    //returns whether current player is buried
    isBuried() {
        //check if current tile has a climber on it;
        //iterate through all players, and check if a climber's position is current position
        const currPos = this.props.G.players[this.props.ctx.currentPlayer].position;
        for (var i = 0; i < this.props.G.players.length; i++) {
            if (this.props.G.players[i].role === "Climber" && this.props.G.players[i].position === currPos) {
                return false;
            }
        }
        return this.props.G.tiles[currPos].sandCount > 1;
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
                            <p id="header">Archeologist (🍼3)</p>
                            <ul>
                                <li>Removes 2 sand when digging instead of 1.</li>
                            </ul>
                        </div>
                        <div>
                            <p id="header">Climber (🍼3)</p>
                            <ul>
                                <li>Carry: moves 1 other player along with Climber. (Cost: free)</li>
                                <li>Can move over tiles with 2 or more sand.</li>
                                <li>Allows all players on Climber's current tile to leave even with 2 or more sand.</li>
                            </ul>
                        </div>
                        <div>
                            <p id="header">Explorer (🍼4)</p>
                            <ul>
                                <li>Can move, dig, and use items diagonally.</li>
                            </ul>
                        </div>
                        <div>
                            <p id="header">Meteorologist (🍼4)</p>
                            <ul>
                                <li>Mitigate: draw 1 less Storm at the end of the turn. (Cost: 1 action)</li>
                            </ul>
                        </div>
                        <div>
                            <p id="header">Navigator (🍼4)</p>
                            <ul>
                                <li>Navigate: move another player up to 3 tiles. Climber and Explorer keep their abilities. (Cost: 1 action)</li>
                            </ul>
                        </div>
                        <div>
                            <p id="header">Water Carrier (🍼5)</p>
                            <ul>
                                <li>Collect Water: take 2 water from an excavated well. (Cost: 1 action)</li>
                                <li>Can give water to adjacent players (for free).</li>
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

        //adds class to render borders on appropriate tiles when this.state.digging
        //or when moving (!this.state.digging)
        let idToStateClass =
            new Array(25).fill(" ")
                .map((currentClass, tileID, _) => {
                    if (this.state.digging && this.tileIsDiggable(tileID) && this.props.G.numMoves < 4) {
                        return `${currentClass} diggable` // Add the `diggable` class to this
                    } else {
                        return `${currentClass}`; // Do not add any more classes
                    }
                }) // You can chain additional `map` function calls if you need to add more classes to a tile based on the current state of your program
                .map((currentClass, tileID, _) => {
                    if (!this.state.digging && this.tileIsMovable(tileID) && this.props.G.numMoves < 4) {
                        return `${currentClass} movable`
                    } else {
                        return `${currentClass}`;
                    }
                }) // May be problematic if you somehow add multiple classes that have conflicting properties

        var tiles = [];
        for (var i = 0; i < 5; i++) {
            var row = [];
            for (var j = 0; j < 5; j++) {
                var tile = [];
                const id = 5 * i + j;
                if (this.props.G.tiles[id].type === "storm") {
                    //render finalParts if it has at least one
                    if (this.props.G.tiles[id].finalParts.length > 0) {
                        tile.push(<div className="final-part">Parts: {this.props.G.tiles[id].finalParts}</div>)
                    }
                    row.push(<td className="storm">{tile}</td>);
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
                    //render finalParts if it has at least one
                    if (this.props.G.tiles[id].finalParts.length > 0) {
                        tile.push(<div className="final-part">Parts: {this.props.G.tiles[id].finalParts}</div>)
                    }
                    //render unrevealed backgrounds (set by className CSS)
                    if (this.props.G.tiles[id].isRevealed === false) {
                        row.push(<td key={id} className={(this.props.G.tiles[id].type === "well" || this.props.G.tiles[id].type === "mirage" ?
                            "unrevealed-water" : "unrevealed") + idToStateClass[id]} onClick={() => this.onClickTile(id)}>{tile}</td>);
                    }
                    //render clue tile (assign the right className)
                    else if (this.props.G.tiles[id].type === "clue") {
                        const className = this.props.G.tiles[id].part + this.props.G.tiles[id].pos + idToStateClass[id];
                        row.push(<td key={id} className={className + idToStateClass[id]}
                            onClick={() => this.onClickTile(id)}>{tile}</td>);
                    }
                    else {
                        row.push(<td key={id} className={this.props.G.tiles[id].type + idToStateClass[id]}
                            onClick={() => this.onClickTile(id)}>{tile}</td>);
                    }
                }
            }
            tiles.push(<tr key={i}>{row}</tr>);
        }

        var actionButtons = [];
        if (this.isBuried()) {
            actionButtons.push(
                <div>
                    You are buried!
                </div>
            )
        }
        actionButtons.push(
            <div>
                <button onClick={() => { this.setState({ digging: !this.state.digging }); }}>
                    Dig
                </button>
                <button onClick={() => { this.excavate(); }}>
                    Excavate
                </button>
                <div>
                    {this.state.digging ? "Choose a tile to dig." : ""}
                </div>
            </div>
        );
        actionButtons.push(
            <div>
                {this.state.excavateErrorMsg}
            </div>
        )
        actionButtons.push(
            <button onClick={() => { this.setState({ givingWater: !this.state.givingWater }); }}>
                Give water to:
            </button>
        );
        //give water to popup buttons
        if (this.state.givingWater) {
            var someoneFound = false;
            for (var i = 0; i < this.props.G.players.length; i++) {
                //this took me hours to fix.. if you don't assign i to a constant,
                //and use i for giveWaterTo parameter, then the value is going 
                //to be, like, different every time you call it. or something.
                const index = i;
                if (index != this.props.ctx.currentPlayer
                    && (this.isSameTile(this.props.G.players[index].position)
                        || (this.props.G.players[this.props.ctx.currentPlayer].role === "Water Carrier" &&
                            this.isAdjacentTile(this.props.G.players[index].position)))) {
                    actionButtons.push(
                        <button onClick={() => { this.giveWaterTo(index); }}>
                            Player {index}
                        </button>
                    );
                    someoneFound = true;
                }
            }
            //spawned no buttons?
            if (!someoneFound) {
                if (this.props.G.players[this.props.ctx.currentPlayer].role === "Water Carrier") {
                    this.setState({ givingWater: false, waterErrorMsg: "No players to give water to! (They must be on the same or an adjacent tile.)" });
                }
                else {
                    this.setState({ givingWater: false, waterErrorMsg: "No players to give water to! (They must be on the same tile.)" });
                }
                setTimeout(() => this.setState({ waterErrorMsg: '' }), 3000);
            }
        }
        actionButtons.push(
            <div>
                {this.state.waterErrorMsg}
            </div>
        )
        //Mitigate for meteorologist only
        if (this.props.G.players[this.props.ctx.currentPlayer].role === "Meteorologist") {
            actionButtons.push(
                <button onClick={() => { this.mitigate(); }}>
                    Mitigate
                </button>
            )
        }
        actionButtons.push(
            <div>
                {this.state.mitigateErrorMsg}
            </div>
        )
        //collectWater for water carrier only
        if (this.props.G.players[this.props.ctx.currentPlayer].role === "Water Carrier"
            && this.props.G.tiles[this.props.G.players[this.props.ctx.currentPlayer].position].type === "well"
            && this.props.G.tiles[this.props.G.players[this.props.ctx.currentPlayer].position].isRevealed
            && this.props.G.players[this.props.ctx.currentPlayer].water < this.props.G.players[this.props.ctx.currentPlayer].maxWater) {
            actionButtons.push(
                <button onClick={() => { this.collectWater(); }}>
                    Collect water
                </button>
            )
        }
        //carry for climber only
        if (this.props.G.players[this.props.ctx.currentPlayer].role === "Climber") {
            actionButtons.push(
                <div>
                    <button onClick={() => { this.setState({ chooseCarry: !this.state.chooseCarry }) }}>
                        Carry:
                    </button>
                    <button onClick={() => { this.drop(); }}>
                        Drop
                    </button>
                </div>
            )
            //spawn choose player buttons
            if (this.state.chooseCarry) {
                //find if there are any players on current tile
                var playersFound = false;
                for (var i = 0; i < this.props.G.players.length; i++) {
                    const index = i;
                    if (index != this.props.ctx.currentPlayer &&
                        this.isSameTile(this.props.G.players[index].position)) {
                        actionButtons.push(
                            <button onClick={() => { this.carry(index); }}>
                                Player {index}
                            </button>
                        );
                        playersFound = true;
                    }
                }
                //spawned no buttons?
                if (!playersFound) {
                    this.setState({ chooseCarry: false, carryErrorMsg: "Nobody to carry! (They must be on the same tile.)" });
                    setTimeout(() => this.setState({ carryErrorMsg: '' }), 3000);
                }
            }
        }
        actionButtons.push(
            <div>
                {this.state.carryErrorMsg}
            </div>
        )
        actionButtons.push(
            <div>
                {this.state.dropErrorMsg}
            </div>
        )
        //only show pickup part button when the tile of the current player position
        //has at least 1 finalPart, and the tile is revealed
        if (this.props.G.tiles[this.props.G.players[this.props.ctx.currentPlayer].position].isRevealed &&
            this.props.G.tiles[this.props.G.players[this.props.ctx.currentPlayer].position].finalParts.length > 0) {
            actionButtons.push(
                <button onClick={() => { this.pickUpFinalPart(); }}>
                    Pick up part
                </button>
            )
        }
        actionButtons.push(
            <div>
                <button onClick={() => { this.props.undo(); }}>
                    Undo
                </button>
                <button onClick={() => { this.props.events.endTurn(); }}>
                    End turn
                </button>
            </div>
        )

        var rightbar = [];
        //player info
        rightbar.push(<div>Players:</div>)
        var playerInfoList = [];
        for (var i = 0; i < this.props.ctx.numPlayers; i++) {
            if (this.props.G.players[i].role === "Climber" && this.props.G.players[i].carryingPlayer !== -1) {
                playerInfoList.push(
                    <div>
                        {i} - {this.props.G.players[i].role} 🍼 {this.props.G.players[i].water} / {this.props.G.players[i].maxWater}
                        - Carrying Player {this.props.G.players[i].carryingPlayer}
                    </div>
                );
            }
            else {
                playerInfoList.push(
                    <div>
                        {i} - {this.props.G.players[i].role} 🍼 {this.props.G.players[i].water} / {this.props.G.players[i].maxWater}
                    </div>
                );
            }
        }
        rightbar.push(playerInfoList);

        rightbar.push(
            <div>
                <p></p>
                <div>Current storm level: {this.props.G.stormLevel}</div>
                <p></p>
            </div>
        );

        //storm deck last turn
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
        //probabilities
        rightbar.push(
            <div>
                <p></p>
                <div>
                    Chance of 1+ Sun Beats Down at end of turn:&nbsp;
                    {((1 - (1 - this.props.G.sunBeatsDownProb / 100) ** (this.props.G.numDraws)) * 100).toFixed(2)}%
                </div>
                <div>
                    Chance of 1+ Storm Picks Up at end of turn:&nbsp;
                    {((1 - (1 - this.props.G.stormPicksUpProb / 100) ** (this.props.G.numDraws)) * 100).toFixed(2)}%
                </div>
            </div>
        );
        //currently collected parts
        var partList = [];
        for (var i = 0; i < this.props.G.collectedParts.length; i++) {
            var color;
            if (this.props.G.collectedParts[i] === "A") {
                color = "red";
            }
            else if (this.props.G.collectedParts[i] === "B") {
                color = "green";
            }
            else if (this.props.G.collectedParts[i] === "C") {
                color = "blue";
            }
            else if (this.props.G.collectedParts[i] === "D") {
                color = "purple";
            }
            partList.push(
                <div className={color}>
                    {this.props.G.collectedParts[i]}
                </div>
            );
        }
        if (this.props.G.collectedParts.length === 0) {
            rightbar.push(
                <div>
                    <p></p>
                    Collected parts (4 total): none
                </div>
            );
        }
        else {
            rightbar.push(
                <div>
                    <p></p>
                    Collected parts (4 total): {partList}
                </div>
            );
        }

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
            <div className="small">
                <p></p>
                <div>
                    Draw 2 at storm level 0
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
                <p></p>
                <div>
                    Archeologist: removes 2 sand when digging
                </div>
                <div>
                    Climber: move over any tile; allows everyone on current tile to move. Ability: Carry (free)
                </div>
                <div>
                    Explorer: move, dig, and use items diagonally
                </div>
                <div>
                    Meteorologist: Ability: Mitigate (cost: 1 action)
                </div>
                <div>
                    Navigator: Ability: Navigate (cost: 1 action)
                </div>
                <div>
                    Water Carrier: give water to adjacent players. Ability: Collect 2 Water from well (free)
                </div>
            </div>
        )

        return (
            <div>
                <div className="fl">
                    <div className="header center">
                        <div>
                            Player {this.props.ctx.currentPlayer}'s turn
                        </div>
                        <div>
                            Actions left in turn: {4 - this.props.G.numMoves}
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
