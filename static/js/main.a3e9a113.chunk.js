(this["webpackJsonpforbidden-desert"]=this["webpackJsonpforbidden-desert"]||[]).push([[0],{55:function(e,t,s){},57:function(e,t,s){},93:function(e,t,s){"use strict";s.r(t);var r=s(1),i=s.n(r),a=s(48),n=s.n(a),l=s(3),o=s(4),c=s(5),p=s(6),h=s(49),u={setup:function(e){return{players:d(e.numPlayers),tiles:g(),equipmentDeck:y(),difficultyName:"",stormLevel:0,numDraws:0,lastDrawType:[],collectedParts:[],stormPicksUpProb:1,sunBeatsDownProb:1,turnEnded:!1,numMoves:0,isNavigating:!1,navigatingID:-1,navigatingNumMoves:0}},moves:{move:function(e,t,s){e.numMoves<4&&(e.players[t.currentPlayer].position=s,-1!==e.players[t.currentPlayer].carryingPlayer&&(e.players[e.players[t.currentPlayer].carryingPlayer].position=s),e.numMoves+=1)},dig:function(e,t,s){e.numMoves<4&&("Archeologist"===e.players[t.currentPlayer].role?(e.tiles[s].sandCount-=2,e.tiles[s].sandCount<0&&(e.tiles[s].sandCount=0)):e.tiles[s].sandCount--,e.numMoves+=1)},excavate:{move:function(e,t){if(e.numMoves<4){var s=e.players[t.currentPlayer].position;if(e.tiles[s].isRevealed=!0,"well"===e.tiles[s].type)for(var r=0;r<e.players.length;r++)e.players[r].position===s&&(e.players[r].water+=2),e.players[r].water>e.players[r].maxWater&&(e.players[r].water=e.players[r].maxWater);else if("clue"===e.tiles[s].type){var i=!1;for(r=0;r<e.tiles.length;r++)e.tiles[r].isRevealed&&"clue"===e.tiles[r].type&&r!==s&&e.tiles[r].part===e.tiles[s].part&&(i=!0);if(i){var a,n,l=e.tiles[s].part;for(r=0;r<e.tiles.length;r++)e.tiles[r].part===l&&"h"===e.tiles[r].pos&&(a=r),e.tiles[r].part===l&&"v"===e.tiles[r].pos&&(n=r);for(;a%5!==0&&a>=0;)a-=1;var o=a+n%5;e.tiles[o].finalParts.push(l)}}else"gear"!==e.tiles[s].type&&"tunnel"!==e.tiles[s].type||e.equipmentDeck.length>0&&e.players[t.currentPlayer].equipment.push(e.equipmentDeck.pop());e.numMoves+=1}},undoable:!1},giveWater:function(e,t,s,r){e.players[s].water-=1,e.players[r].water+=1},pickUpFinalPart:function(e,t){if(e.numMoves<4){var s=e.tiles[e.players[t.currentPlayer].position].finalParts[0];e.tiles[e.players[t.currentPlayer].position].finalParts.splice(0,1),e.collectedParts.push(s),e.numMoves+=1}},mitigate:function(e,t){e.numMoves<4&&(e.numDraws-=1,e.numMoves+=1)},collectWater:function(e,t){e.numMoves<4&&(e.players[t.currentPlayer].water+=2,e.players[t.currentPlayer].water>e.players[t.currentPlayer].maxWater&&(e.players[t.currentPlayer].water=e.players[t.currentPlayer].maxWater),e.numMoves+=1)},carry:function(e,t,s){e.players[t.currentPlayer].carryingPlayer=s},drop:function(e,t){e.players[t.currentPlayer].carryingPlayer=-1},navigate:function(e,t,s){e.numMoves<4&&(e.isNavigating=!0,e.navigatingID=s,t.events.setStage("navigating"),e.numMoves+=1)},giveEquipment:function(e,t,s,r,i){var a=e.players[s].equipment[r];e.players[i].equipment.push(a),e.players[s].equipment.splice(r,1)},duneBlaster:function(e,t,s,r,i){e.players[s].equipment.splice(r,1),e.tiles[i].sandCount=0},setPlayerInfo:{move:function(e,t,s,r){e.players[s].role=r,"Archeologist"===r||"Climber"===r?(e.players[s].maxWater=3,e.players[s].water=3):"Explorer"===r||"Meteorologist"===r||"Navigator"===r?(e.players[s].maxWater=4,e.players[s].water=4):(e.players[s].maxWater=5,e.players[s].water=5)},undoable:!1},setDifficulty:{move:function(e,t,s){e.stormLevel=s,0===s?(e.numDraws=2,e.difficultyName="Novice"):(1===s?e.difficultyName="Normal":2===s?e.difficultyName="Elite":3===s&&(e.difficultyName="Legendary"),e.numDraws=3)},undoable:!1},removeWater:function(e,t,s){e.players[s].water-=1},placeFinalPart:function(e,t,s){e.tiles[s].finalParts.push("Z")},addSand:function(e,t,s){e.tiles[s].sandCount+=1},magicFinalPart:function(e,t){e.collectedParts.push("Z")},giveDuneBlaster:function(e,t,s){e.players[s].equipment.push("Dune Blaster")}},turn:{stages:{navigating:{moves:{move:function(e,t,s){e.navigatingNumMoves<3&&(e.players[e.navigatingID].position=s,-1!==e.players[e.navigatingID].carryingPlayer&&(e.players[e.players[e.navigatingID].carryingPlayer].position=s),e.navigatingNumMoves+=1)},carry:function(e,t,s){e.players[e.navigatingID].carryingPlayer=s},drop:function(e,t){e.players[e.navigatingID].carryingPlayer=-1},stopNavigating:function(e,t,s){e.players[e.navigatingID].carryingPlayer=-1,e.isNavigating=!1,e.navigatingNumMoves=0,t.events.endStage()}}}},onBegin:function(e,t){e.numMoves=0,e.turnEnded=!1},onEnd:function(e,t){if(!e.turnEnded){e.players[t.currentPlayer].carryingPlayer=-1,e.lastDrawType=[];for(var s=0;s<e.numDraws;s++){var r=t.random.Die(100);if(r<=e.stormPicksUpProb||r<=e.sunBeatsDownProb){var i=!1,a=!1;if(r<=Math.min(e.stormPicksuPProb,e.sunBeatsDownProb)&&(i=!0,e.stormPicksUpProb>e.sunBeatsDownProb&&(a=!0)),!i&&r<=e.stormPicksUpProb||i&&a)e.stormLevel+=1,e.lastDrawType.push("Storm Picks Up"),e.stormPicksUpProb=1,e.sunBeatsDownProb+=2;else{for(var n=0;n<e.players.length;n++)"tunnel"===e.tiles[e.players[n].position].type&&e.tiles[e.players[n].position].isRevealed||(e.players[n].water-=1);e.lastDrawType.push("Sun Beats Down"),e.sunBeatsDownProb=1,e.stormPicksUpProb+=1}}else{e.stormPicksUpProb+=1,e.sunBeatsDownProb+=2;for(var l=0;l<e.tiles.length&&"storm"!==e.tiles[l].type;l++);var o,c=t.random.Die(4),p=t.random.Die(6);o=p<=3?1:p<=5?2:3;var h=[],u=l;if(1===c)for(;h.length<o&&(u+=5)>=0&&u<=24;)h.push(u);else if(2===c)for(;h.length<o&&(u+=1)>=0&&u<=24&&Math.floor(u/5)===Math.floor(l/5);)h.push(u);else if(3===c)for(;h.length<o&&(u-=5)>=0&&u<=24;)h.push(u);else if(4===c)for(;h.length<o&&(u-=1)>=0&&u<=24&&Math.floor(u/5)===Math.floor(l/5);)h.push(u);for(n=0;n<h.length;n++)e.tiles[h[n]].sandCount+=1;var d=e.tiles[l],v=l;if(h.length>0){for(n=0;n<e.tiles[l].finalParts.length;n++)e.tiles[h[0]].finalParts.push(e.tiles[l].finalParts[n]);e.tiles[l].finalParts=[]}for(n=0;n<h.length;n++)e.tiles[v]=e.tiles[h[n]],v=h[n];0!==h.length&&(e.tiles[h[h.length-1]]=d);var g,y=[];for(n=0;n<e.players.length;n++)for(var j=0;j<h.length;j++)e.players[n].position===h[j]&&y.push(n);for(n=0;n<y.length;n++)1===c?e.players[y[n]].position-=5:2===c?e.players[y[n]].position-=1:3===c?e.players[y[n]].position+=5:4===c&&(e.players[y[n]].position+=1);1===c?g="up":2===c?g="left":3===c?g="down":4===c&&(g="right"),e.lastDrawType.push("Wind: "+g+", strength "+o)}}0===e.stormLevel?e.numDraws=2:2===t.numPlayers?e.stormLevel<=3?e.numDraws=3:e.stormLevel<=7?e.numDraws=4:e.stormLevel<=10?e.numDraws=5:e.numDraws=6:3===t.numPlayers||4===t.numPlayers?e.stormLevel<=4?e.numDraws=3:e.stormLevel<=8?e.numDraws=4:e.stormLevel<=11?e.numDraws=5:e.numDraws=6:5===t.numPlayers&&(e.stormLevel<=5?e.numDraws=3:e.stormLevel<=9?e.numDraws=4:e.stormLevel<=12?e.numDraws=5:e.numDraws=6),e.turnEnded=!0}}},endIf:function(e,t){for(var s=0;s<e.players.length;s++)if(e.players[s].water<0)return{win:!1};if(2===t.numPlayers&&13===e.stormLevel||(3===t.numPlayers||4===t.numPlayers)&&14===e.stormLevel||5===t.numPlayers&&15===e.stormLevel)return{win:!1};if(4===e.collectedParts.length){var r;for(s=0;s<e.tiles.length;s++)if("launchpad"===e.tiles[s].type){r=s;break}var i=0;for(s=0;s<e.players.length;s++)e.players[s].position===r&&(i+=1);if(i===e.players.length)return{win:!0}}return!1}},d=function(e){for(var t=[],s=v(25);12===s;)s=v(25);for(var r=0;r<e;r++)t.push({role:"",position:s,water:0,maxWater:0,equipment:[],carryingPlayer:-1});return t};function v(e){return Math.floor(Math.random()*e)}var g=function(){for(var e=[],t=0;t<2;t++)e.push({isRevealed:!1,sandCount:0,type:"well",finalParts:[]});e.push({isRevealed:!1,sandCount:0,type:"mirage",finalParts:[]});for(t=0;t<9;t++)e.push({isRevealed:!1,sandCount:0,type:"gear",finalParts:[]});for(t=0;t<3;t++)e.push({isRevealed:!1,sandCount:0,type:"tunnel",finalParts:[]});for(t=0;t<4;t++)for(var s=0;s<2;s++){var r,i;0===t?r="A":1===t?r="B":2===t?r="C":3===t&&(r="D"),0===s?i="h":1===s&&(i="v"),e.push({isRevealed:!1,sandCount:0,type:"clue",part:r,pos:i,finalParts:[]})}e.push({isRevealed:!1,sandCount:0,type:"launchpad",finalParts:[]}),j(e),e.splice(12,0,{isRevealed:!1,sandCount:0,type:"storm",finalParts:[]});var a=[2,6,8,10,14,16,18,22];for(t=0;t<a.length;t++)e[a[t]].sandCount=1;return e},y=function(){for(var e=[],t=0;t<3;t++)e.push("Jet Pack");for(t=0;t<3;t++)e.push("Dune Blaster");for(t=0;t<2;t++)e.push("Terrascope");for(t=0;t<2;t++)e.push("Solar Shield");return e.push("Secret Water Reserve"),e.push("Time Throttle"),j(e),e};function j(e){for(var t,s=e.length;0!==s;){t=Math.floor(Math.random()*s),s--;var r=[e[t],e[s]];e[s]=r[0],e[t]=r[1]}return e}s(55);var f=s(0),m=function(e){Object(c.a)(s,e);var t=Object(p.a)(s);function s(){var e;Object(l.a)(this,s);for(var r=arguments.length,i=new Array(r),a=0;a<r;a++)i[a]=arguments[a];return(e=t.call.apply(t,[this].concat(i))).state={assignID:0,assignDifficulty:!1,digging:!1,chooseCarry:!1,chooseNavigate:!1,duneBlasting:!1,duneBlastingPlayerID:-1,duneBlastingInventoryID:-1,excavateErrorMsg:"",mitigateErrorMsg:"",carryErrorMsg:"",dropErrorMsg:""},e}return Object(o.a)(s,[{key:"assignRoleTo",value:function(e,t){this.props.moves.setPlayerInfo(e,t),this.setState({assignID:this.state.assignID+1})}},{key:"assignDifficultyTo",value:function(e){this.props.moves.setDifficulty(e),this.setState({assignDifficulty:!0})}},{key:"onClickTile",value:function(e){var t;this.state.duneBlasting?(t=this.state.duneBlastingPlayerID,this.isBuried()?this.isSameTile(e)&&(this.props.moves.duneBlaster(t,this.state.duneBlastingInventoryID,e),this.setState({duneBlasting:!1,duneBlastingPlayerID:-1,duneBlastingInventoryID:-1})):(this.isAdjacentTile(e)||this.isSameTile(e)||this.isDiagonalTile(e)&&"Explorer"===this.props.G.players[t].role)&&this.props.G.tiles[e].sandCount>0&&(this.props.moves.duneBlaster(t,this.state.duneBlastingInventoryID,e),this.setState({duneBlasting:!1,duneBlastingPlayerID:-1,duneBlastingInventoryID:-1}))):(t=this.props.G.isNavigating?this.props.G.navigatingID:this.props.ctx.currentPlayer,this.isBuried()?this.isSameTile(e)&&this.state.digging&&this.props.G.tiles[e].sandCount>0&&(this.props.moves.dig(e),this.setState({digging:!1})):this.isAdjacentTile(e)||this.isSameTile(e)||this.isDiagonalTile(e)&&"Explorer"===this.props.G.players[t].role?this.state.digging&&this.props.G.tiles[e].sandCount>0?(this.props.moves.dig(e),this.setState({digging:!1})):this.isSameTile(e)||!(this.props.G.tiles[e].sandCount<2||"Climber"===this.props.G.players[t].role)||this.state.digging||this.props.moves.move(e):"tunnel"===this.props.G.tiles[e].type&&this.props.G.tiles[e].isRevealed&&"tunnel"===this.props.G.tiles[this.props.G.players[t].position].type&&this.props.G.tiles[this.props.G.players[t].position].isRevealed&&this.props.G.tiles[e].sandCount<2&&!this.state.digging&&this.props.moves.move(e))}},{key:"excavate",value:function(){var e=this;!0===this.props.G.tiles[this.props.G.players[this.props.ctx.currentPlayer].position].isRevealed?(this.setState({excavateErrorMsg:"This tile is already excavated!"}),setTimeout((function(){return e.setState({excavateErrorMsg:""})}),3e3)):0!==this.props.G.tiles[this.props.G.players[this.props.ctx.currentPlayer].position].sandCount?(this.setState({excavateErrorMsg:"Remove all sand on this tile before excavating!"}),setTimeout((function(){return e.setState({excavateErrorMsg:""})}),3e3)):this.props.moves.excavate()}},{key:"giveWaterTo",value:function(e,t){var s=this;0===this.props.G.players[e].water?(this.setState({waterErrorMsg:"You don't have enough water!"}),setTimeout((function(){return s.setState({waterErrorMsg:""})}),3e3)):this.props.G.players[t].water===this.props.G.players[t].maxWater?(this.setState({waterErrorMsg:"Target has full water!"}),setTimeout((function(){return s.setState({waterErrorMsg:""})}),3e3)):this.props.moves.giveWater(e,t)}},{key:"giveEquipmentTo",value:function(e,t,s){this.props.moves.giveEquipment(e,t,s)}},{key:"pickUpFinalPart",value:function(){this.props.moves.pickUpFinalPart()}},{key:"mitigate",value:function(){var e=this;this.props.G.numDraws>0?this.props.moves.mitigate():(this.setState({mitigateErrorMsg:"All storm cards already mitigated!"}),setTimeout((function(){return e.setState({mitigateErrorMsg:""})}),3e3))}},{key:"navigate",value:function(e){this.setState({chooseNavigate:!1}),this.props.moves.navigate(e)}},{key:"collectWater",value:function(){this.props.moves.collectWater()}},{key:"carry",value:function(e){this.setState({chooseCarry:!1,carrying:!0}),this.props.moves.carry(e)}},{key:"drop",value:function(){var e,t=this;e=this.props.G.isNavigating?this.props.G.navigatingID:this.props.ctx.currentPlayer,this.setState({chooseCarry:!1,carrying:!1}),-1===this.props.G.players[e].carryingPlayer?(this.setState({dropErrorMsg:"Nobody to drop! Carry first."}),setTimeout((function(){return t.setState({dropErrorMsg:""})}),3e3)):this.props.moves.drop()}},{key:"useEquipment",value:function(e,t,s){"Dune Blaster"===s&&(e===this.state.duneBlastingPlayerID?this.setState({digging:!1,duneBlasting:!1,duneBlastingPlayerID:-1,duneBlastingInventoryID:-1}):this.setState({digging:!1,duneBlasting:!0,duneBlastingPlayerID:e,duneBlastingInventoryID:t}))}},{key:"isAdjacentTile",value:function(e){var t;t=this.props.G.isNavigating?this.props.G.navigatingID:this.props.ctx.currentPlayer,this.state.duneBlasting&&(t=this.state.duneBlastingPlayerID);var s=this.props.G.players[t].position,r=e>=0&&e<=24&&(e===s-1||e===s+1||e===s-5||e===s+5);return e===s-1||e===s+1?Math.floor(e/5)===Math.floor(s/5):r}},{key:"isAdjacentTile2",value:function(e,t){var s=this.props.G.players[e].position,r=this.props.G.players[t].position,i=s===r-1||s===r+1||s===r-5||s===r+5;return s===r-1||s===r+1?Math.floor(s/5)===Math.floor(r/5):i}},{key:"isSameTile",value:function(e){var t;return t=this.props.G.isNavigating?this.props.G.navigatingID:this.props.ctx.currentPlayer,this.state.duneBlasting&&(t=this.state.duneBlastingPlayerID),e===this.props.G.players[t].position}},{key:"isSameTile2",value:function(e,t){return this.props.G.players[e].position===this.props.G.players[t].position}},{key:"isDiagonalTile",value:function(e){var t;t=this.props.G.isNavigating?this.props.G.navigatingID:this.props.ctx.currentPlayer,this.state.duneBlasting&&(t=this.state.duneBlastingPlayerID);var s=this.props.G.players[t].position,r=e>=0&&e<=24&&(e===s-6||e===s-4||e===s+4||e===s+6),i=1===Math.abs(Math.floor(e/5)-Math.floor(s/5));return r&&i}},{key:"isDiagonalTile2",value:function(e,t){var s=this.props.G.players[e].position,r=(this.props.G.players[t].position,s===t-6||s===t-4||s===t+4||s===t+6),i=1===Math.abs(Math.floor(s/5)-Math.floor(t/5));return r&&i}},{key:"endTurn",value:function(){this.setState({digging:!1,duneBlasting:!1}),this.props.events.endTurn()}},{key:"tileIsMovable",value:function(e){var t;return t=this.props.G.isNavigating?this.props.G.navigatingID:this.props.ctx.currentPlayer,!this.isBuried()&&((this.isAdjacentTile(e)||"Explorer"===this.props.G.players[t].role&&this.isDiagonalTile(e)||"tunnel"===this.props.G.tiles[this.props.G.players[t].position].type&&this.props.G.tiles[this.props.G.players[t].position].isRevealed&&"tunnel"===this.props.G.tiles[e].type&&this.props.G.tiles[e].isRevealed)&&!this.isSameTile(e)&&(this.props.G.tiles[e].sandCount<2||"Climber"===this.props.G.players[t].role)&&!this.state.digging&&!this.isBuried())}},{key:"tileIsDiggable",value:function(e){return this.isBuried()?this.isSameTile(e)&&(this.state.digging||this.state.duneBlasting)&&this.props.G.tiles[e].sandCount>0:(this.isAdjacentTile(e)||this.isSameTile(e)||"Explorer"===this.props.G.players[this.state.duneBlasting?this.state.duneBlastingPlayerID:this.props.ctx.currentPlayer].role&&this.isDiagonalTile(e))&&(this.state.digging||this.state.duneBlasting)&&this.props.G.tiles[e].sandCount>0}},{key:"isBuried",value:function(){var e;e=this.props.G.isNavigating?this.props.G.navigatingID:this.props.ctx.currentPlayer,this.state.duneBlasting&&(e=this.state.duneBlastingPlayerID);for(var t=this.props.G.players[e].position,s=0;s<this.props.G.players.length;s++)if("Climber"===this.props.G.players[s].role&&this.props.G.players[s].position===t)return!1;return this.props.G.tiles[t].sandCount>1}},{key:"render",value:function(){var e,t=this;if(this.state.assignID<this.props.ctx.numPlayers)return Object(f.jsxs)("div",{className:"center",children:[Object(f.jsx)("div",{id:"title",children:"Role Selection"}),Object(f.jsxs)("div",{className:"header",children:["Choose role for Player ",this.state.assignID,":"]}),Object(f.jsx)("p",{}),Object(f.jsxs)("div",{children:[Object(f.jsx)("button",{onClick:function(){t.assignRoleTo(t.state.assignID,"Archeologist")},children:"Archeologist"}),Object(f.jsx)("button",{onClick:function(){t.assignRoleTo(t.state.assignID,"Climber")},children:"Climber"}),Object(f.jsx)("button",{onClick:function(){t.assignRoleTo(t.state.assignID,"Explorer")},children:"Explorer"}),Object(f.jsx)("button",{onClick:function(){t.assignRoleTo(t.state.assignID,"Meteorologist")},children:"Meteorologist"}),Object(f.jsx)("button",{onClick:function(){t.assignRoleTo(t.state.assignID,"Navigator")},children:"Navigator"}),Object(f.jsx)("button",{onClick:function(){t.assignRoleTo(t.state.assignID,"Water Carrier")},children:"Water Carrier"})]}),Object(f.jsx)("p",{}),Object(f.jsxs)("div",{children:[Object(f.jsxs)("div",{children:[Object(f.jsx)("p",{id:"header",children:"Archeologist (\ud83c\udf7c3)"}),Object(f.jsx)("ul",{children:Object(f.jsx)("li",{children:"Removes 2 sand when digging instead of 1."})})]}),Object(f.jsxs)("div",{children:[Object(f.jsx)("p",{id:"header",children:"Climber (\ud83c\udf7c3)"}),Object(f.jsxs)("ul",{children:[Object(f.jsx)("li",{children:"Carry: moves 1 other player along with Climber. (Cost: free)"}),Object(f.jsx)("li",{children:"Can move over tiles with 2 or more sand."}),Object(f.jsx)("li",{children:"Allows all players on Climber's current tile to leave even with 2 or more sand."})]})]}),Object(f.jsxs)("div",{children:[Object(f.jsx)("p",{id:"header",children:"Explorer (\ud83c\udf7c4)"}),Object(f.jsx)("ul",{children:Object(f.jsx)("li",{children:"Can move, dig, and use items diagonally."})})]}),Object(f.jsxs)("div",{children:[Object(f.jsx)("p",{id:"header",children:"Meteorologist (\ud83c\udf7c4)"}),Object(f.jsx)("ul",{children:Object(f.jsx)("li",{children:"Mitigate: draw 1 less Storm at the end of the turn. (Cost: 1 action)"})})]}),Object(f.jsxs)("div",{children:[Object(f.jsx)("p",{id:"header",children:"Navigator (\ud83c\udf7c4)"}),Object(f.jsx)("ul",{children:Object(f.jsx)("li",{children:"Navigate: move another player up to 3 tiles. Climber and Explorer keep their abilities. (Cost: 1 action)"})})]}),Object(f.jsxs)("div",{children:[Object(f.jsx)("p",{id:"header",children:"Water Carrier (\ud83c\udf7c5)"}),Object(f.jsxs)("ul",{children:[Object(f.jsx)("li",{children:"Collect Water: take 2 water from an excavated well. (Cost: 1 action)"}),Object(f.jsx)("li",{children:"Can give water to adjacent players (for free)."})]})]})]})]});if(!1===this.state.assignDifficulty)return Object(f.jsxs)("div",{className:"center",children:[Object(f.jsx)("div",{id:"title",children:"Difficulty Selection"}),Object(f.jsx)("p",{}),Object(f.jsxs)("div",{children:[Object(f.jsx)("button",{onClick:function(){t.assignDifficultyTo(0)},children:"Novice"}),Object(f.jsx)("button",{onClick:function(){t.assignDifficultyTo(1)},children:"Normal"}),Object(f.jsx)("button",{onClick:function(){t.assignDifficultyTo(2)},children:"Elite"}),Object(f.jsx)("button",{onClick:function(){t.assignDifficultyTo(3)},children:"Legendary"})]}),Object(f.jsx)("p",{}),Object(f.jsx)("div",{children:"(Difficulty sets the starting storm level.)"})]});e=this.props.G.isNavigating?this.props.G.navigatingID:this.props.ctx.currentPlayer;for(var s=new Array(25).fill(" ").map((function(e,s,r){return(t.state.digging||t.state.duneBlasting)&&t.tileIsDiggable(s)&&t.props.G.numMoves<4&&!t.props.ctx.gameover?"".concat(e," diggable"):"".concat(e)})).map((function(e,s,r){return t.state.digging||t.state.duneBlasting||!t.tileIsMovable(s)||!(!t.props.G.isNavigating&&t.props.G.numMoves<4||t.props.G.isNavigating&&t.props.G.navigatingNumMoves<3)||t.props.ctx.gameover?"".concat(e):"".concat(e," movable")})),r=[],i=0;i<5;i++){for(var a=[],n=function(){o=[];var e=5*i+l;if("storm"===t.props.G.tiles[e].type)t.props.G.tiles[e].finalParts.length>0&&o.push(Object(f.jsxs)("div",{className:"final-part",children:["Parts: ",t.props.G.tiles[e].finalParts]})),a.push(Object(f.jsx)("td",{className:"storm",children:o}));else{for(c=[],O=0;O<t.props.G.players.length;O++)t.props.G.players[O].position===e&&c.push(O);if(o.push(Object(f.jsx)("div",{className:"player",children:c})),0!==t.props.G.tiles[e].sandCount){for(p="",G=0;G<t.props.G.tiles[e].sandCount;G++)p=p.concat("l");o.push(Object(f.jsx)("div",{className:t.props.G.tiles[e].sandCount>1?"sand red":"sand",children:p}))}if(t.props.G.tiles[e].finalParts.length>0&&o.push(Object(f.jsxs)("div",{className:"final-part",children:["Parts: ",t.props.G.tiles[e].finalParts]})),!1===t.props.G.tiles[e].isRevealed)a.push(Object(f.jsx)("td",{className:("well"===t.props.G.tiles[e].type||"mirage"===t.props.G.tiles[e].type?"unrevealed-water":"unrevealed")+s[e],onClick:function(){return t.onClickTile(e)},children:o},e));else if("clue"===t.props.G.tiles[e].type){var r=t.props.G.tiles[e].part+t.props.G.tiles[e].pos+s[e];a.push(Object(f.jsx)("td",{className:r+s[e],onClick:function(){return t.onClickTile(e)},children:o},e))}else a.push(Object(f.jsx)("td",{className:t.props.G.tiles[e].type+s[e],onClick:function(){return t.onClickTile(e)},children:o},e))}},l=0;l<5;l++){var o,c,p;n()}r.push(Object(f.jsx)("tr",{children:a},i))}var h=[];this.props.ctx.gameover&&(this.props.ctx.gameover.win?h.push(Object(f.jsxs)("div",{children:["VICTORY (Difficulty: ",this.props.G.difficultyName,")"]})):h.push(Object(f.jsxs)("div",{children:["DEFEAT (Difficulty: ",this.props.G.difficultyName,")"]}))),this.props.G.isNavigating?h.push(Object(f.jsxs)("div",{children:[Object(f.jsxs)("div",{children:["Player ",this.props.ctx.currentPlayer," navigating Player ",this.props.G.navigatingID]}),Object(f.jsxs)("div",{children:["Actions left in navigation: ",3-this.props.G.navigatingNumMoves,", Actions left in turn: ",4-this.props.G.numMoves]})]})):h.push(Object(f.jsxs)("div",{children:[Object(f.jsxs)("div",{children:["Player ",this.props.ctx.currentPlayer,"'s turn"]}),Object(f.jsxs)("div",{children:["Actions left in turn: ",4-this.props.G.numMoves]})]}));var u=[];if(this.isBuried()&&u.push(Object(f.jsx)("div",{children:"You are buried!"})),this.props.G.isNavigating||(u.push(Object(f.jsxs)("div",{children:[Object(f.jsx)("button",{accessKey:"d",onClick:function(){t.setState({digging:!t.state.digging,duneBlasting:!1})},children:"Dig (1)"}),Object(f.jsx)("button",{accessKey:"x",onClick:function(){t.excavate()},children:"Excavate (1)"}),Object(f.jsx)("div",{children:this.state.digging?"Choose a tile to dig.":""})]})),u.push(Object(f.jsx)("div",{children:this.state.excavateErrorMsg})),"Meteorologist"===this.props.G.players[this.props.ctx.currentPlayer].role&&u.push(Object(f.jsx)("button",{onClick:function(){t.mitigate()},children:"Mitigate (1)"})),u.push(Object(f.jsx)("div",{children:this.state.mitigateErrorMsg})),"Water Carrier"===this.props.G.players[this.props.ctx.currentPlayer].role&&"well"===this.props.G.tiles[this.props.G.players[this.props.ctx.currentPlayer].position].type&&this.props.G.tiles[this.props.G.players[this.props.ctx.currentPlayer].position].isRevealed&&this.props.G.players[this.props.ctx.currentPlayer].water<this.props.G.players[this.props.ctx.currentPlayer].maxWater&&u.push(Object(f.jsx)("button",{onClick:function(){t.collectWater()},children:"Collect +2 water (1)"}))),"Climber"===this.props.G.players[e].role&&(u.push(Object(f.jsxs)("div",{children:[Object(f.jsx)("button",{onClick:function(){t.setState({chooseCarry:!t.state.chooseCarry})},children:"Carry (0):"}),Object(f.jsx)("button",{onClick:function(){t.drop()},children:"Drop (0)"})]})),this.state.chooseCarry)){var d=!1,v=function(){var s=i;s!=e&&t.isSameTile(t.props.G.players[s].position)&&(u.push(Object(f.jsxs)("button",{onClick:function(){t.carry(s)},children:["Player ",s]})),d=!0)};for(i=0;i<this.props.G.players.length;i++)v();d||(this.setState({chooseCarry:!1,carryErrorMsg:"Nobody to carry! (They must be on the same tile.)"}),setTimeout((function(){return t.setState({carryErrorMsg:""})}),3e3))}if(u.push(Object(f.jsx)("div",{children:this.state.carryErrorMsg})),u.push(Object(f.jsx)("div",{children:this.state.dropErrorMsg})),this.props.G.isNavigating||this.props.G.tiles[this.props.G.players[this.props.ctx.currentPlayer].position].isRevealed&&this.props.G.tiles[this.props.G.players[this.props.ctx.currentPlayer].position].finalParts.length>0&&u.push(Object(f.jsx)("button",{onClick:function(){t.pickUpFinalPart()},children:"Pick up part (1)"})),!this.props.G.isNavigating&&("Navigator"===this.props.G.players[this.props.ctx.currentPlayer].role&&u.push(Object(f.jsx)("button",{onClick:function(){t.setState({chooseNavigate:!t.state.chooseNavigate})},children:"Navigate (1):"})),this.state.chooseNavigate)){var g=function(){var e=i;e!=t.props.ctx.currentPlayer&&u.push(Object(f.jsxs)("button",{onClick:function(){t.navigate(e)},children:["Player ",e]}))};for(i=0;i<this.props.G.players.length;i++)g()}this.props.G.isNavigating?u.push(Object(f.jsxs)("div",{children:[Object(f.jsx)("button",{accessKey:"z",onClick:function(){t.props.undo()},children:"Undo"}),Object(f.jsx)("button",{accessKey:"e",onClick:function(){t.props.moves.stopNavigating()},children:"End navigation"})]})):u.push(Object(f.jsxs)("div",{children:[Object(f.jsx)("button",{accessKey:"z",onClick:function(){t.props.undo()},children:"Undo"}),Object(f.jsx)("button",{accessKey:"e",onClick:function(){t.endTurn()},children:"End turn"})]}));var y=[];y.push(Object(f.jsx)("div",{children:this.state.waterErrorMsg})),this.state.duneBlasting&&y.push(Object(f.jsx)("div",{children:"Choose a tile to use Dune Blast."})),y.push(Object(f.jsx)("div",{children:"Players:"}));var j=[];for(i=0;i<this.props.ctx.numPlayers;i++){var m=[],b=function(){var e=i,s=l;s!==e&&(t.isSameTile2(e,s)||"Water Carrier"===t.props.G.players[e].role&&t.isAdjacentTile2(e,s))&&m.push(Object(f.jsx)("button",{className:"small-button",onClick:function(){t.giveWaterTo(e,s)},children:s}))};for(l=0;l<this.props.ctx.numPlayers;l++)b();"Climber"===this.props.G.players[i].role&&-1!==this.props.G.players[i].carryingPlayer?j.push(Object(f.jsxs)("div",{children:[i," - ",this.props.G.players[i].role," \ud83c\udf7c ",this.props.G.players[i].water," / ",this.props.G.players[i].maxWater,"\xa0 - Carrying Player ",this.props.G.players[i].carryingPlayer,"\xa0 - Give water to: ",m]})):j.push(Object(f.jsxs)("div",{children:[i," - ",this.props.G.players[i].role," \ud83c\udf7c ",this.props.G.players[i].water," / ",this.props.G.players[i].maxWater,"\xa0 - Give water to: ",m]}));for(var x=function(){var e=i,s=O;P=[];var r=function(){var r=G;r!==e&&t.isSameTile2(e,r)&&P.push(Object(f.jsx)("button",{className:"small-button",onClick:function(){t.giveEquipmentTo(e,s,r)},children:r}))};for(G=0;G<t.props.ctx.numPlayers;G++)r();j.push(Object(f.jsxs)("div",{children:[t.props.G.players[e].equipment[s]," -\xa0",Object(f.jsx)("button",{className:"small-button",onClick:function(){t.useEquipment(e,s,t.props.G.players[e].equipment[s])},children:"Use"})," - Give to: ",P]}))},O=0;O<this.props.G.players[i].equipment.length;O++){var P,G;x()}}y.push(j),y.push(Object(f.jsxs)("div",{children:[Object(f.jsx)("p",{}),Object(f.jsxs)("div",{children:["Current storm level: ",this.props.G.stormLevel]}),Object(f.jsx)("p",{})]})),y.push(Object(f.jsxs)("div",{children:[Object(f.jsx)("p",{}),"End of last turn:"]}));for(i=0;i<this.props.G.lastDrawType.length;i++)y.push(Object(f.jsx)("div",{children:this.props.G.lastDrawType[i]}));y.push(Object(f.jsxs)("div",{children:[Object(f.jsx)("p",{}),Object(f.jsxs)("div",{children:["Chance of 1+ Sun Beats Down at end of turn:\xa0",(100*(1-Math.pow(1-this.props.G.sunBeatsDownProb/100,this.props.G.numDraws))).toFixed(2),"%"]}),Object(f.jsxs)("div",{children:["Chance of 1+ Storm Picks Up at end of turn:\xa0",(100*(1-Math.pow(1-this.props.G.stormPicksUpProb/100,this.props.G.numDraws))).toFixed(2),"%"]})]}));var D,C,w,k,M,T=[];for(i=0;i<this.props.G.collectedParts.length;i++){var N;"A"===this.props.G.collectedParts[i]?N="red":"B"===this.props.G.collectedParts[i]?N="green":"C"===this.props.G.collectedParts[i]?N="blue":"D"===this.props.G.collectedParts[i]&&(N="purple"),T.push(Object(f.jsx)("div",{className:N,children:this.props.G.collectedParts[i]}))}0===this.props.G.collectedParts.length?y.push(Object(f.jsxs)("div",{children:[Object(f.jsx)("p",{}),"Collected parts (4 total): none"]})):y.push(Object(f.jsxs)("div",{children:[Object(f.jsx)("p",{}),"Collected parts (4 total): ",T]})),2===this.props.ctx.numPlayers?(D="1 - 3",C="4 - 7",w="8 - 10",k="11 - 12",M="13"):3===this.props.ctx.numPlayers||4===this.props.ctx.numPlayers?(D="1 - 4",C="5 - 8",w="9 - 11",k="12 - 13",M="14"):5===this.props.ctx.numPlayers&&(D="1 - 5",C="6 - 9",w="10 - 12",k="13 - 14",M="15");var S=[];return S.push(Object(f.jsxs)("div",{className:"infobar",children:[Object(f.jsx)("p",{}),Object(f.jsx)("div",{children:"Draw 2 at storm level 0"}),Object(f.jsxs)("div",{children:["Draw 3 at levels ",D]}),Object(f.jsxs)("div",{children:["Draw 4 at levels ",C]}),Object(f.jsxs)("div",{children:["Draw 5 at levels ",w]}),Object(f.jsxs)("div",{children:["Draw 6 at levels ",k]}),Object(f.jsxs)("div",{children:["Game over at level ",M]}),Object(f.jsx)("p",{}),Object(f.jsx)("div",{children:"Archeologist - removes 2 sand when digging"}),Object(f.jsx)("div",{children:"Climber - can move over any tile; allows everyone on current tile to move."}),Object(f.jsx)("div",{children:"\u2003Carry (0): bring another player"}),Object(f.jsx)("div",{children:"Explorer - can move, dig, and use Dune Blaster diagonally"}),Object(f.jsx)("div",{children:"Meteorologist - Mitigate (1): draw 1 less storm card at end of turn"}),Object(f.jsx)("div",{children:"Navigator - Navigate (1): move any other player up to 3 tiles;"}),Object(f.jsx)("div",{children:"\u2003Climber and Explorer keep their abilities"}),Object(f.jsx)("div",{children:"Water Carrier - can give water to adjacent players."}),Object(f.jsx)("div",{children:"\u2003Collect Water (1): collect 2 water from a well"}),Object(f.jsx)("p",{}),Object(f.jsx)("div",{children:"Dune Blaster: dig all sand from a tile you can dig"}),Object(f.jsx)("div",{children:"Jet Pack: move to any unblocked tile. Can carry one player on ride"}),Object(f.jsx)("div",{children:"Secret Water Reserve: give 2 water to all players on current tile"}),Object(f.jsx)("div",{children:"Solar Shield: prevent Sun Beats Down to all players on"}),Object(f.jsx)("div",{children:"\u2003the tile this was used, until user's next turn"}),Object(f.jsx)("div",{children:"Terrascope: peek under an unexcavated tile"}),Object(f.jsx)("div",{children:"Time Throttle (owner's turn only): gain 2 extra actions this turn"}),Object(f.jsx)("p",{}),Object(f.jsx)("div",{children:"Starting equipment deck:"}),Object(f.jsx)("div",{children:"3x Dune Blaster, 3x Jet Pack,"}),Object(f.jsx)("div",{children:"2x Solar Shield, 2x Terrascope,"}),Object(f.jsx)("div",{children:"1x Secret Water Reserve, 1x Time Throttle"}),Object(f.jsx)("p",{}),Object(f.jsx)("div",{children:"Hotkeys:"}),Object(f.jsx)("div",{children:"Dig: shift + alt + d"}),Object(f.jsx)("div",{children:"Excavate: shift + alt + x"}),Object(f.jsx)("div",{children:"Undo: shift + alt + z"}),Object(f.jsx)("div",{children:"End turn / navigation: shift + alt + e"})]})),Object(f.jsxs)("div",{children:[Object(f.jsxs)("div",{className:"fl",children:[Object(f.jsx)("div",{className:"header center",children:h}),Object(f.jsx)("table",{children:Object(f.jsx)("tbody",{children:r})}),Object(f.jsx)("div",{className:"center",children:u})]}),Object(f.jsx)("div",{className:"fl",children:y}),Object(f.jsx)("div",{className:"fl",children:S})]})}}]),s}(i.a.Component),b=(s(57),function(e){Object(c.a)(s,e);var t=Object(p.a)(s);function s(){var e;Object(l.a)(this,s);for(var r=arguments.length,i=new Array(r),a=0;a<r;a++)i[a]=arguments[a];return(e=t.call.apply(t,[this].concat(i))).state={numPlayers:null},e}return Object(o.a)(s,[{key:"render",value:function(){var e=this;if(null===this.state.numPlayers)return Object(f.jsxs)("div",{className:"center",children:[Object(f.jsx)("div",{children:"!! THIS IS A WORK IN PROGRESS !!"}),Object(f.jsx)("div",{id:"title",children:"FORBIDDEN DESERT"}),Object(f.jsx)("div",{children:"Based off the original game by Gamewright, designed by Matt Leacock."}),Object(f.jsx)("div",{children:Object(f.jsx)("a",{href:"https://www.gamewright.com/gamewright/pdfs/Rules/ForbiddenDesertTM-RULES.pdf",target:"_blank",children:"Official rules manual"})}),Object(f.jsx)("div",{children:Object(f.jsx)("a",{href:"https://boardgamegeek.com/boardgame/136063/forbidden-desert",target:"_blank",children:"BoardGameGeek listing"})}),Object(f.jsx)("div",{children:Object(f.jsx)("a",{href:"https://github.com/hwabis/forbidden-desert",target:"_blank",children:"Source code"})}),Object(f.jsxs)("div",{id:"header",children:[Object(f.jsx)("p",{children:"Select number of players:"}),Object(f.jsx)("button",{onClick:function(){return e.setState({numPlayers:2})},children:"2"}),Object(f.jsx)("button",{onClick:function(){return e.setState({numPlayers:3})},children:"3"}),Object(f.jsx)("button",{onClick:function(){return e.setState({numPlayers:4})},children:"4"}),Object(f.jsx)("button",{onClick:function(){return e.setState({numPlayers:5})},children:"5"})]})]});var t=Object(h.a)({game:u,numPlayers:this.state.numPlayers,board:m});return Object(f.jsx)("div",{children:Object(f.jsx)(t,{})})}}]),s}(i.a.Component));n.a.render(Object(f.jsx)(i.a.StrictMode,{children:Object(f.jsx)(b,{})}),document.getElementById("root"))}},[[93,1,2]]]);
//# sourceMappingURL=main.a3e9a113.chunk.js.map