(this["webpackJsonpforbidden-desert"]=this["webpackJsonpforbidden-desert"]||[]).push([[0],{55:function(e,t,s){},57:function(e,t,s){},93:function(e,t,s){"use strict";s.r(t);var r=s(1),i=s.n(r),a=s(48),n=s.n(a),o=s(3),l=s(4),p=s(5),c=s(6),h=s(49),u=void 0,d={setup:function(e){return{players:v(e.numPlayers),tiles:y(),stormLevel:0,numDraws:0,lastDrawType:[],collectedParts:[],stormPicksUpProb:1,sunBeatsDownProb:1,turnEnded:!1,numMoves:0,isNavigating:!1,navigatingID:-1,navigatingNumMoves:0}},moves:{move:function(e,t,s){e.numMoves<4&&(e.players[t.currentPlayer].position=s,-1!==e.players[t.currentPlayer].carryingPlayer&&(e.players[e.players[t.currentPlayer].carryingPlayer].position=s),e.numMoves+=1)},dig:function(e,t,s){e.numMoves<4&&("Archeologist"===e.players[t.currentPlayer].role?(e.tiles[s].sandCount-=2,e.tiles[s].sandCount<0&&(e.tiles[s].sandCount=0)):e.tiles[s].sandCount--,e.numMoves+=1)},excavate:{move:function(e,t){if(e.numMoves<4){var s=e.players[t.currentPlayer].position;if(e.tiles[s].isRevealed=!0,"well"===e.tiles[s].type)for(var r=0;r<e.players.length;r++)e.players[r].position===s&&(e.players[r].water+=2),e.players[r].water>e.players[r].maxWater&&(e.players[r].water=e.players[r].maxWater);else if("clue"===e.tiles[s].type){var i=!1;for(r=0;r<e.tiles.length;r++)e.tiles[r].isRevealed&&"clue"===e.tiles[r].type&&r!==s&&e.tiles[r].part===e.tiles[s].part&&(i=!0);if(i){var a,n,o=e.tiles[s].part;for(r=0;r<e.tiles.length;r++)e.tiles[r].part===o&&"h"===e.tiles[r].pos&&(a=r),e.tiles[r].part===o&&"v"===e.tiles[r].pos&&(n=r);for(;a%5!==0&&a>=0;)a-=1;var l=a+n%5;e.tiles[l].finalParts.push(o)}}e.numMoves+=1}},undoable:!1},giveWater:function(e,t,s){e.players[t.currentPlayer].water-=1,e.players[s].water+=1},pickUpFinalPart:function(e,t){if(e.numMoves<4){var s=e.tiles[e.players[t.currentPlayer].position].finalParts[0];e.tiles[e.players[t.currentPlayer].position].finalParts.splice(0,1),e.collectedParts.push(s),e.numMoves+=1}},mitigate:function(e,t){e.numMoves<4&&(e.numDraws-=1,e.numMoves+=1)},collectWater:function(e,t){e.numMoves<4&&(e.players[t.currentPlayer].water+=2,e.players[t.currentPlayer].water>e.players[t.currentPlayer].maxWater&&(e.players[t.currentPlayer].water=e.players[t.currentPlayer].maxWater),e.numMoves+=1)},carry:function(e,t,s){e.players[t.currentPlayer].carryingPlayer=s},drop:function(e,t){var s;s=u.props.G.isNavigating?u.props.G.navigatingID:u.props.ctx.currentPlayer,e.players[s].carryingPlayer=-1},navigate:function(e,t,s){e.numMoves<4&&(e.isNavigating=!0,e.navigatingID=s,t.events.setStage("navigating"),e.numMoves+=1)},setPlayerInfo:{move:function(e,t,s,r){e.players[s].role=r,"Archeologist"===r||"Climber"===r?(e.players[s].maxWater=3,e.players[s].water=3):"Explorer"===r||"Meteorologist"===r||"Navigator"===r?(e.players[s].maxWater=4,e.players[s].water=4):(e.players[s].maxWater=5,e.players[s].water=5)},undoable:!1},setDifficulty:{move:function(e,t,s){e.stormLevel=s,e.numDraws=0===s?2:3},undoable:!1},removeWater:function(e,t,s){e.players[s].water-=1},placeFinalPart:function(e,t,s){e.tiles[s].finalParts.push("Z")},addSand:function(e,t,s){e.tiles[s].sandCount+=1}},turn:{stages:{navigating:{moves:{move:function(e,t,s){e.navigatingNumMoves<3&&(e.players[e.navigatingID].position=s,-1!==e.players[e.navigatingID].carryingPlayer&&(e.players[e.players[e.navigatingID].carryingPlayer].position=s),e.navigatingNumMoves+=1)},carry:function(e,t,s){e.players[e.navigatingID].carryingPlayer=s},drop:function(e,t){e.players[e.navigatingID].carryingPlayer=-1},stopNavigating:function(e,t,s){e.players[e.navigatingID].carryingPlayer=-1,e.isNavigating=!1,e.navigatingNumMoves=0,t.events.endStage()}}}},onBegin:function(e,t){e.numMoves=0,e.turnEnded=!1},onEnd:function(e,t){if(!e.turnEnded){e.players[t.currentPlayer].carryingPlayer=-1,e.lastDrawType=[];for(var s=0;s<e.numDraws;s++){var r=t.random.Die(100);if(r<=e.stormPicksUpProb||r<=e.sunBeatsDownProb){var i=!1,a=!1;if(r<=Math.min(e.stormPicksuPProb,e.sunBeatsDownProb)&&(i=!0,e.stormPicksUpProb>e.sunBeatsDownProb&&(a=!0)),!i&&r<=e.stormPicksUpProb||i&&a)e.stormLevel+=1,e.lastDrawType.push("Storm Picks Up"),e.stormPicksUpProb=1,e.sunBeatsDownProb+=2;else{for(var n=0;n<e.players.length;n++)"tunnel"===e.tiles[e.players[n].position].type&&e.tiles[e.players[n].position].isRevealed||(e.players[n].water-=1);e.lastDrawType.push("Sun Beats Down"),e.sunBeatsDownProb=1,e.stormPicksUpProb+=1}}else{e.stormPicksUpProb+=1,e.sunBeatsDownProb+=2;for(var o=0;o<e.tiles.length&&"storm"!==e.tiles[o].type;o++);var l,p=t.random.Die(4),c=t.random.Die(6);l=c<=3?1:c<=5?2:3;var h=[],u=o;if(1===p)for(;h.length<l&&(u+=5)>=0&&u<=24;)h.push(u);else if(2===p)for(;h.length<l&&(u+=1)>=0&&u<=24&&Math.floor(u/5)===Math.floor(o/5);)h.push(u);else if(3===p)for(;h.length<l&&(u-=5)>=0&&u<=24;)h.push(u);else if(4===p)for(;h.length<l&&(u-=1)>=0&&u<=24&&Math.floor(u/5)===Math.floor(o/5);)h.push(u);for(n=0;n<h.length;n++)e.tiles[h[n]].sandCount+=1;var d=e.tiles[o],v=o;if(h.length>0){for(n=0;n<e.tiles[o].finalParts.length;n++)e.tiles[h[0]].finalParts.push(e.tiles[o].finalParts[n]);e.tiles[o].finalParts=[]}for(n=0;n<h.length;n++)e.tiles[v]=e.tiles[h[n]],v=h[n];0!==h.length&&(e.tiles[h[h.length-1]]=d);var g,y=[];for(n=0;n<e.players.length;n++)for(var j=0;j<h.length;j++)e.players[n].position===h[j]&&y.push(n);for(n=0;n<y.length;n++)1===p?e.players[y[n]].position-=5:2===p?e.players[y[n]].position-=1:3===p?e.players[y[n]].position+=5:4===p&&(e.players[y[n]].position+=1);1===p?g="up":2===p?g="left":3===p?g="down":4===p&&(g="right"),e.lastDrawType.push("Wind: "+g+", strength "+l)}}0===e.stormLevel?e.numDraws=2:2===t.numPlayers?e.stormLevel<=3?e.numDraws=3:e.stormLevel<=7?e.numDraws=4:e.stormLevel<=10?e.numDraws=5:e.numDraws=6:3===t.numPlayers||4===t.numPlayers?e.stormLevel<=4?e.numDraws=3:e.stormLevel<=8?e.numDraws=4:e.stormLevel<=11?e.numDraws=5:e.numDraws=6:5===t.numPlayers&&(e.stormLevel<=5?e.numDraws=3:e.stormLevel<=9?e.numDraws=4:e.stormLevel<=12?e.numDraws=5:e.numDraws=6),e.turnEnded=!0}}},endIf:function(e,t){for(var s=0;s<e.players.length;s++)if(e.players[s].water<0)return!0;return 2===t.numPlayers&&13===e.stormLevel||(3===t.numPlayers||4===t.numPlayers)&&14===e.stormLevel||5===t.numPlayers&&15===e.stormLevel}},v=function(e){for(var t=[],s=g(25);12===s;)s=g(25);for(var r=0;r<e;r++)t.push({role:"",position:s,water:0,maxWater:0,carryingPlayer:-1});return t};function g(e){return Math.floor(Math.random()*e)}var y=function(){for(var e=[],t=0;t<2;t++)e.push({isRevealed:!1,sandCount:0,type:"well",finalParts:[]});e.push({isRevealed:!1,sandCount:0,type:"mirage",finalParts:[]});for(t=0;t<9;t++)e.push({isRevealed:!1,sandCount:0,type:"gear",finalParts:[]});for(t=0;t<3;t++)e.push({isRevealed:!1,sandCount:0,type:"tunnel",finalParts:[]});for(t=0;t<4;t++)for(var s=0;s<2;s++){var r,i;0===t?r="A":1===t?r="B":2===t?r="C":3===t&&(r="D"),0===s?i="h":1===s&&(i="v"),e.push({isRevealed:!1,sandCount:0,type:"clue",part:r,pos:i,finalParts:[]})}e.push({isRevealed:!1,sandCount:0,type:"launchpad",finalParts:[]}),function(e){var t,s=e.length;for(;0!==s;){t=Math.floor(Math.random()*s),s--;var r=[e[t],e[s]];e[s]=r[0],e[t]=r[1]}}(e),e.splice(12,0,{isRevealed:!1,sandCount:0,type:"storm",finalParts:[]});var a=[2,6,8,10,14,16,18,22];for(t=0;t<a.length;t++)e[a[t]].sandCount=1;return e};s(55);var j=s(0),f=function(e){Object(p.a)(s,e);var t=Object(c.a)(s);function s(){var e;Object(o.a)(this,s);for(var r=arguments.length,i=new Array(r),a=0;a<r;a++)i[a]=arguments[a];return(e=t.call.apply(t,[this].concat(i))).state={assignID:0,assignDifficulty:!1,digging:!1,givingWater:!1,chooseCarry:!1,chooseNavigate:!1,excavateErrorMsg:"",waterErrorMsg:"",mitigateErrorMsg:"",carryErrorMsg:"",dropErrorMsg:""},e}return Object(l.a)(s,[{key:"assignRoleTo",value:function(e,t){this.props.moves.setPlayerInfo(e,t),this.setState({assignID:this.state.assignID+1})}},{key:"assignDifficultyTo",value:function(e){this.props.moves.setDifficulty(e),this.setState({assignDifficulty:!0})}},{key:"onClickTile",value:function(e){var t;t=this.props.G.isNavigating?this.props.G.navigatingID:this.props.ctx.currentPlayer,this.isBuried()?this.isSameTile(e)&&this.state.digging&&this.props.G.tiles[e].sandCount>0&&(this.props.moves.dig(e),this.setState({digging:!1})):this.isAdjacentTile(e)||this.isSameTile(e)||this.isDiagonalTile(e)&&"Explorer"===this.props.G.players[t].role?this.state.digging&&this.props.G.tiles[e].sandCount>0?(this.props.moves.dig(e),this.setState({digging:!1})):this.isSameTile(e)||!(this.props.G.tiles[e].sandCount<2||"Climber"===this.props.G.players[t].role)||this.state.digging||this.props.moves.move(e):"tunnel"===this.props.G.tiles[e].type&&this.props.G.tiles[e].isRevealed&&"tunnel"===this.props.G.tiles[this.props.G.players[t].position].type&&this.props.G.tiles[this.props.G.players[t].position].isRevealed&&this.props.G.tiles[e].sandCount<2&&!this.state.digging&&this.props.moves.move(e)}},{key:"excavate",value:function(){var e=this;!0===this.props.G.tiles[this.props.G.players[this.props.ctx.currentPlayer].position].isRevealed?(this.setState({excavateErrorMsg:"This tile is already revealed!"}),setTimeout((function(){return e.setState({excavateErrorMsg:""})}),3e3)):0!==this.props.G.tiles[this.props.G.players[this.props.ctx.currentPlayer].position].sandCount?(this.setState({excavateErrorMsg:"Remove all sand on this tile before excavating!"}),setTimeout((function(){return e.setState({excavateErrorMsg:""})}),3e3)):this.props.moves.excavate()}},{key:"giveWaterTo",value:function(e){var t=this;0===this.props.G.players[this.props.ctx.currentPlayer].water?(this.setState({givingWater:!1,waterErrorMsg:"You don't have enough water!"}),setTimeout((function(){return t.setState({waterErrorMsg:""})}),3e3)):this.props.G.players[e].water===this.props.G.players[e].maxWater?(this.setState({givingWater:!1,waterErrorMsg:"Target has full water!"}),setTimeout((function(){return t.setState({waterErrorMsg:""})}),3e3)):(this.props.moves.giveWater(e),this.setState({givingWater:!1}))}},{key:"pickUpFinalPart",value:function(){this.props.moves.pickUpFinalPart()}},{key:"mitigate",value:function(){var e=this;this.props.G.numDraws>0?this.props.moves.mitigate():(this.setState({mitigateErrorMsg:"All storm cards already mitigated!"}),setTimeout((function(){return e.setState({mitigateErrorMsg:""})}),3e3))}},{key:"navigate",value:function(e){this.setState({chooseNavigate:!1}),this.props.moves.navigate(e)}},{key:"collectWater",value:function(){this.props.moves.collectWater()}},{key:"carry",value:function(e){this.setState({chooseCarry:!1,carrying:!0}),this.props.moves.carry(e)}},{key:"drop",value:function(){var e,t=this;e=this.props.G.isNavigating?this.props.G.navigatingID:this.props.ctx.currentPlayer,this.setState({chooseCarry:!1,carrying:!1}),-1===this.props.G.players[e].carryingPlayer?(this.setState({dropErrorMsg:"Nobody to drop! Carry first."}),setTimeout((function(){return t.setState({dropErrorMsg:""})}),3e3)):this.props.moves.drop()}},{key:"isAdjacentTile",value:function(e){var t;t=this.props.G.isNavigating?this.props.G.navigatingID:this.props.ctx.currentPlayer;var s=this.props.G.players[t].position,r=e>=0&&e<=24&&(e===s-1||e===s+1||e===s-5||e===s+5);return e===s-1||e===s+1?Math.floor(e/5)===Math.floor(s/5):r}},{key:"isSameTile",value:function(e){var t;return t=this.props.G.isNavigating?this.props.G.navigatingID:this.props.ctx.currentPlayer,e===this.props.G.players[t].position}},{key:"isDiagonalTile",value:function(e){var t;t=this.props.G.isNavigating?this.props.G.navigatingID:this.props.ctx.currentPlayer;var s=this.props.G.players[t].position,r=e>=0&&e<=24&&(e===s-6||e===s-4||e===s+4||e===s+6),i=1===Math.abs(Math.floor(e/5)-Math.floor(s/5));return r&&i}},{key:"endTurn",value:function(){this.setState({digging:!1}),this.props.events.endTurn()}},{key:"tileIsMovable",value:function(e){var t;return t=this.props.G.isNavigating?this.props.G.navigatingID:this.props.ctx.currentPlayer,!this.isBuried()&&((this.isAdjacentTile(e)||"Explorer"===this.props.G.players[t].role&&this.isDiagonalTile(e)||"tunnel"===this.props.G.tiles[this.props.G.players[t].position].type&&this.props.G.tiles[this.props.G.players[t].position].isRevealed&&"tunnel"===this.props.G.tiles[e].type&&this.props.G.tiles[e].isRevealed)&&!this.isSameTile(e)&&(this.props.G.tiles[e].sandCount<2||"Climber"===this.props.G.players[t].role)&&!this.state.digging&&!this.isBuried())}},{key:"tileIsDiggable",value:function(e){return this.isBuried()?this.isSameTile(e)&&this.state.digging&&this.props.G.tiles[e].sandCount>0:(this.isAdjacentTile(e)||this.isSameTile(e)||"Explorer"===this.props.G.players[this.props.ctx.currentPlayer].role&&this.isDiagonalTile(e))&&this.state.digging&&this.props.G.tiles[e].sandCount>0}},{key:"isBuried",value:function(){var e;e=this.props.G.isNavigating?this.props.G.navigatingID:this.props.ctx.currentPlayer;for(var t=this.props.G.players[e].position,s=0;s<this.props.G.players.length;s++)if("Climber"===this.props.G.players[s].role&&this.props.G.players[s].position===t)return!1;return this.props.G.tiles[t].sandCount>1}},{key:"render",value:function(){var e,t=this;if(this.state.assignID<this.props.ctx.numPlayers)return Object(j.jsxs)("div",{className:"center",children:[Object(j.jsx)("div",{id:"title",children:"Role Selection"}),Object(j.jsxs)("div",{className:"header",children:["Choose role for Player ",this.state.assignID,":"]}),Object(j.jsx)("p",{}),Object(j.jsxs)("div",{children:[Object(j.jsx)("button",{onClick:function(){t.assignRoleTo(t.state.assignID,"Archeologist")},children:"Archeologist"}),Object(j.jsx)("button",{onClick:function(){t.assignRoleTo(t.state.assignID,"Climber")},children:"Climber"}),Object(j.jsx)("button",{onClick:function(){t.assignRoleTo(t.state.assignID,"Explorer")},children:"Explorer"}),Object(j.jsx)("button",{onClick:function(){t.assignRoleTo(t.state.assignID,"Meteorologist")},children:"Meteorologist"}),Object(j.jsx)("button",{onClick:function(){t.assignRoleTo(t.state.assignID,"Navigator")},children:"Navigator"}),Object(j.jsx)("button",{onClick:function(){t.assignRoleTo(t.state.assignID,"Water Carrier")},children:"Water Carrier"})]}),Object(j.jsx)("p",{}),Object(j.jsxs)("div",{children:[Object(j.jsxs)("div",{children:[Object(j.jsx)("p",{id:"header",children:"Archeologist (\ud83c\udf7c3)"}),Object(j.jsx)("ul",{children:Object(j.jsx)("li",{children:"Removes 2 sand when digging instead of 1."})})]}),Object(j.jsxs)("div",{children:[Object(j.jsx)("p",{id:"header",children:"Climber (\ud83c\udf7c3)"}),Object(j.jsxs)("ul",{children:[Object(j.jsx)("li",{children:"Carry: moves 1 other player along with Climber. (Cost: free)"}),Object(j.jsx)("li",{children:"Can move over tiles with 2 or more sand."}),Object(j.jsx)("li",{children:"Allows all players on Climber's current tile to leave even with 2 or more sand."})]})]}),Object(j.jsxs)("div",{children:[Object(j.jsx)("p",{id:"header",children:"Explorer (\ud83c\udf7c4)"}),Object(j.jsx)("ul",{children:Object(j.jsx)("li",{children:"Can move, dig, and use items diagonally."})})]}),Object(j.jsxs)("div",{children:[Object(j.jsx)("p",{id:"header",children:"Meteorologist (\ud83c\udf7c4)"}),Object(j.jsx)("ul",{children:Object(j.jsx)("li",{children:"Mitigate: draw 1 less Storm at the end of the turn. (Cost: 1 action)"})})]}),Object(j.jsxs)("div",{children:[Object(j.jsx)("p",{id:"header",children:"Navigator (\ud83c\udf7c4)"}),Object(j.jsx)("ul",{children:Object(j.jsx)("li",{children:"Navigate: move another player up to 3 tiles. Climber and Explorer keep their abilities. (Cost: 1 action)"})})]}),Object(j.jsxs)("div",{children:[Object(j.jsx)("p",{id:"header",children:"Water Carrier (\ud83c\udf7c5)"}),Object(j.jsxs)("ul",{children:[Object(j.jsx)("li",{children:"Collect Water: take 2 water from an excavated well. (Cost: 1 action)"}),Object(j.jsx)("li",{children:"Can give water to adjacent players (for free)."})]})]})]})]});if(!1===this.state.assignDifficulty)return Object(j.jsxs)("div",{className:"center",children:[Object(j.jsx)("div",{id:"title",children:"Difficulty Selection"}),Object(j.jsx)("p",{}),Object(j.jsxs)("div",{children:[Object(j.jsx)("button",{onClick:function(){t.assignDifficultyTo(0)},children:"Novice"}),Object(j.jsx)("button",{onClick:function(){t.assignDifficultyTo(1)},children:"Normal"}),Object(j.jsx)("button",{onClick:function(){t.assignDifficultyTo(2)},children:"Elite"}),Object(j.jsx)("button",{onClick:function(){t.assignDifficultyTo(3)},children:"Legendary"})]}),Object(j.jsx)("p",{}),Object(j.jsx)("div",{children:"(Difficulty sets the starting storm level.)"})]});e=this.props.G.isNavigating?this.props.G.navigatingID:this.props.ctx.currentPlayer;for(var s=new Array(25).fill(" ").map((function(e,s,r){return t.state.digging&&t.tileIsDiggable(s)&&t.props.G.numMoves<4?"".concat(e," diggable"):"".concat(e)})).map((function(e,s,r){return!t.state.digging&&t.tileIsMovable(s)&&(!t.props.G.isNavigating&&t.props.G.numMoves<4||t.props.G.isNavigating&&t.props.G.navigatingNumMoves<3)?"".concat(e," movable"):"".concat(e)})),r=[],i=0;i<5;i++){for(var a=[],n=function(){l=[];var e=5*i+o;if("storm"===t.props.G.tiles[e].type)t.props.G.tiles[e].finalParts.length>0&&l.push(Object(j.jsxs)("div",{className:"final-part",children:["Parts: ",t.props.G.tiles[e].finalParts]})),a.push(Object(j.jsx)("td",{className:"storm",children:l}));else{for(p=[],c=0;c<t.props.G.players.length;c++)t.props.G.players[c].position===e&&p.push(c);if(l.push(Object(j.jsx)("div",{className:"player",children:p})),0!==t.props.G.tiles[e].sandCount){for(h="",u=0;u<t.props.G.tiles[e].sandCount;u++)h=h.concat("l");l.push(Object(j.jsx)("div",{className:t.props.G.tiles[e].sandCount>1?"sand red":"sand",children:h}))}if(t.props.G.tiles[e].finalParts.length>0&&l.push(Object(j.jsxs)("div",{className:"final-part",children:["Parts: ",t.props.G.tiles[e].finalParts]})),!1===t.props.G.tiles[e].isRevealed)a.push(Object(j.jsx)("td",{className:("well"===t.props.G.tiles[e].type||"mirage"===t.props.G.tiles[e].type?"unrevealed-water":"unrevealed")+s[e],onClick:function(){return t.onClickTile(e)},children:l},e));else if("clue"===t.props.G.tiles[e].type){var r=t.props.G.tiles[e].part+t.props.G.tiles[e].pos+s[e];a.push(Object(j.jsx)("td",{className:r+s[e],onClick:function(){return t.onClickTile(e)},children:l},e))}else a.push(Object(j.jsx)("td",{className:t.props.G.tiles[e].type+s[e],onClick:function(){return t.onClickTile(e)},children:l},e))}},o=0;o<5;o++){var l,p,c,h,u;n()}r.push(Object(j.jsx)("tr",{children:a},i))}var d=[];this.props.G.isNavigating?d.push(Object(j.jsxs)("div",{children:[Object(j.jsxs)("div",{children:["Player ",this.props.ctx.currentPlayer," navigating Player ",this.props.G.navigatingID]}),Object(j.jsxs)("div",{children:["Actions left in navigation: ",3-this.props.G.navigatingNumMoves,", Actions left in turn: ",4-this.props.G.numMoves]})]})):d.push(Object(j.jsxs)("div",{children:[Object(j.jsxs)("div",{children:["Player ",this.props.ctx.currentPlayer,"'s turn"]}),Object(j.jsxs)("div",{children:["Actions left in turn: ",4-this.props.G.numMoves]})]}));var v=[];if(this.isBuried()&&v.push(Object(j.jsx)("div",{children:"You are buried!"})),!this.props.G.isNavigating){if(v.push(Object(j.jsxs)("div",{children:[Object(j.jsx)("button",{onClick:function(){t.setState({digging:!t.state.digging})},children:"Dig (1)"}),Object(j.jsx)("button",{onClick:function(){t.excavate()},children:"Excavate (1)"}),Object(j.jsx)("div",{children:this.state.digging?"Choose a tile to dig.":""})]})),v.push(Object(j.jsx)("div",{children:this.state.excavateErrorMsg})),v.push(Object(j.jsx)("button",{onClick:function(){t.setState({givingWater:!t.state.givingWater})},children:"Give water to (0):"})),this.state.givingWater){var g=!1,y=function(){var e=i;e!=t.props.ctx.currentPlayer&&(t.isSameTile(t.props.G.players[e].position)||"Water Carrier"===t.props.G.players[t.props.ctx.currentPlayer].role&&t.isAdjacentTile(t.props.G.players[e].position))&&(v.push(Object(j.jsxs)("button",{onClick:function(){t.giveWaterTo(e)},children:["Player ",e]})),g=!0)};for(i=0;i<this.props.G.players.length;i++)y();g||("Water Carrier"===this.props.G.players[this.props.ctx.currentPlayer].role?this.setState({givingWater:!1,waterErrorMsg:"No players to give water to! (They must be on the same or an adjacent tile.)"}):this.setState({givingWater:!1,waterErrorMsg:"No players to give water to! (They must be on the same tile.)"}),setTimeout((function(){return t.setState({waterErrorMsg:""})}),3e3))}v.push(Object(j.jsx)("div",{children:this.state.waterErrorMsg})),"Meteorologist"===this.props.G.players[this.props.ctx.currentPlayer].role&&v.push(Object(j.jsx)("button",{onClick:function(){t.mitigate()},children:"Mitigate (1)"})),v.push(Object(j.jsx)("div",{children:this.state.mitigateErrorMsg})),"Water Carrier"===this.props.G.players[this.props.ctx.currentPlayer].role&&"well"===this.props.G.tiles[this.props.G.players[this.props.ctx.currentPlayer].position].type&&this.props.G.tiles[this.props.G.players[this.props.ctx.currentPlayer].position].isRevealed&&this.props.G.players[this.props.ctx.currentPlayer].water<this.props.G.players[this.props.ctx.currentPlayer].maxWater&&v.push(Object(j.jsx)("button",{onClick:function(){t.collectWater()},children:"Collect +2 water (1)"}))}if("Climber"===this.props.G.players[e].role&&(v.push(Object(j.jsxs)("div",{children:[Object(j.jsx)("button",{onClick:function(){t.setState({chooseCarry:!t.state.chooseCarry})},children:"Carry (0):"}),Object(j.jsx)("button",{onClick:function(){t.drop()},children:"Drop (0)"})]})),this.state.chooseCarry)){var f=!1,b=function(){var s=i;s!=e&&t.isSameTile(t.props.G.players[s].position)&&(v.push(Object(j.jsxs)("button",{onClick:function(){t.carry(s)},children:["Player ",s]})),f=!0)};for(i=0;i<this.props.G.players.length;i++)b();f||(this.setState({chooseCarry:!1,carryErrorMsg:"Nobody to carry! (They must be on the same tile.)"}),setTimeout((function(){return t.setState({carryErrorMsg:""})}),3e3))}if(v.push(Object(j.jsx)("div",{children:this.state.carryErrorMsg})),v.push(Object(j.jsx)("div",{children:this.state.dropErrorMsg})),this.props.G.isNavigating||this.props.G.tiles[this.props.G.players[this.props.ctx.currentPlayer].position].isRevealed&&this.props.G.tiles[this.props.G.players[this.props.ctx.currentPlayer].position].finalParts.length>0&&v.push(Object(j.jsx)("button",{onClick:function(){t.pickUpFinalPart()},children:"Pick up part (1)"})),!this.props.G.isNavigating&&("Navigator"===this.props.G.players[this.props.ctx.currentPlayer].role&&v.push(Object(j.jsx)("button",{onClick:function(){t.setState({chooseNavigate:!t.state.chooseNavigate})},children:"Navigate (1):"})),this.state.chooseNavigate)){var m=function(){var e=i;e!=t.props.ctx.currentPlayer&&v.push(Object(j.jsxs)("button",{onClick:function(){t.navigate(e)},children:["Player ",e]}))};for(i=0;i<this.props.G.players.length;i++)m()}this.props.G.isNavigating?v.push(Object(j.jsxs)("div",{children:[Object(j.jsx)("button",{onClick:function(){t.props.undo()},children:"Undo"}),Object(j.jsx)("button",{onClick:function(){t.props.moves.stopNavigating()},children:"End navigation"})]})):v.push(Object(j.jsxs)("div",{children:[Object(j.jsx)("button",{onClick:function(){t.props.undo()},children:"Undo"}),Object(j.jsx)("button",{onClick:function(){t.endTurn()},children:"End turn"})]}));var x=[];x.push(Object(j.jsx)("div",{children:"Players:"}));var O=[];for(i=0;i<this.props.ctx.numPlayers;i++)"Climber"===this.props.G.players[i].role&&-1!==this.props.G.players[i].carryingPlayer?O.push(Object(j.jsxs)("div",{children:[i," - ",this.props.G.players[i].role," \ud83c\udf7c ",this.props.G.players[i].water," / ",this.props.G.players[i].maxWater,"- Carrying Player ",this.props.G.players[i].carryingPlayer]})):O.push(Object(j.jsxs)("div",{children:[i," - ",this.props.G.players[i].role," \ud83c\udf7c ",this.props.G.players[i].water," / ",this.props.G.players[i].maxWater]}));x.push(O),x.push(Object(j.jsxs)("div",{children:[Object(j.jsx)("p",{}),Object(j.jsxs)("div",{children:["Current storm level: ",this.props.G.stormLevel]}),Object(j.jsx)("p",{})]})),x.push(Object(j.jsxs)("div",{children:[Object(j.jsx)("p",{}),"End of last turn:"]}));for(i=0;i<this.props.G.lastDrawType.length;i++)x.push(Object(j.jsx)("div",{children:this.props.G.lastDrawType[i]}));x.push(Object(j.jsxs)("div",{children:[Object(j.jsx)("p",{}),Object(j.jsxs)("div",{children:["Chance of 1+ Sun Beats Down at end of turn:\xa0",(100*(1-Math.pow(1-this.props.G.sunBeatsDownProb/100,this.props.G.numDraws))).toFixed(2),"%"]}),Object(j.jsxs)("div",{children:["Chance of 1+ Storm Picks Up at end of turn:\xa0",(100*(1-Math.pow(1-this.props.G.stormPicksUpProb/100,this.props.G.numDraws))).toFixed(2),"%"]})]}));var P,G,C,w,D,M=[];for(i=0;i<this.props.G.collectedParts.length;i++){var k;"A"===this.props.G.collectedParts[i]?k="red":"B"===this.props.G.collectedParts[i]?k="green":"C"===this.props.G.collectedParts[i]?k="blue":"D"===this.props.G.collectedParts[i]&&(k="purple"),M.push(Object(j.jsx)("div",{className:k,children:this.props.G.collectedParts[i]}))}return 0===this.props.G.collectedParts.length?x.push(Object(j.jsxs)("div",{children:[Object(j.jsx)("p",{}),"Collected parts (4 total): none"]})):x.push(Object(j.jsxs)("div",{children:[Object(j.jsx)("p",{}),"Collected parts (4 total): ",M]})),2===this.props.ctx.numPlayers?(P="1 - 3",G="4 - 7",C="8 - 10",w="11 - 12",D="13"):3===this.props.ctx.numPlayers||4===this.props.ctx.numPlayers?(P="1 - 4",G="5 - 8",C="9 - 11",w="12 - 13",D="14"):5===this.props.ctx.numPlayers&&(P="1 - 5",G="6 - 9",C="10 - 12",w="13 - 14",D="15"),x.push(Object(j.jsxs)("div",{className:"small",children:[Object(j.jsx)("p",{}),Object(j.jsx)("div",{children:"Draw 2 at storm level 0"}),Object(j.jsxs)("div",{children:["Draw 3 at levels ",P]}),Object(j.jsxs)("div",{children:["Draw 4 at levels ",G]}),Object(j.jsxs)("div",{children:["Draw 5 at levels ",C]}),Object(j.jsxs)("div",{children:["Draw 6 at levels ",w]}),Object(j.jsxs)("div",{children:["Game over at level ",D]}),Object(j.jsx)("p",{}),Object(j.jsx)("div",{children:"Archeologist: removes 2 sand when digging"}),Object(j.jsx)("div",{children:"Climber: can move over any tile; allows everyone on current tile to move. Carry (0): bring another player"}),Object(j.jsx)("div",{children:"Explorer: can move, dig, and use items diagonally"}),Object(j.jsx)("div",{children:"Meteorologist: Mitigate (1): draw 1 less storm card at end of turn"}),Object(j.jsx)("div",{children:"Navigator: Navigate (1): move any other player up to 3 tiles; Climber and Explorer keep their abilities"}),Object(j.jsx)("div",{children:"Water Carrier: can give water to adjacent players. Collect Water (1): collect 2 water from a well"})]})),Object(j.jsxs)("div",{children:[Object(j.jsxs)("div",{className:"fl",children:[Object(j.jsx)("div",{className:"header center",children:d}),Object(j.jsx)("table",{children:Object(j.jsx)("tbody",{children:r})}),Object(j.jsx)("div",{className:"center",children:v})]}),Object(j.jsx)("div",{className:"fl",children:x})]})}}]),s}(i.a.Component),b=(s(57),function(e){Object(p.a)(s,e);var t=Object(c.a)(s);function s(){var e;Object(o.a)(this,s);for(var r=arguments.length,i=new Array(r),a=0;a<r;a++)i[a]=arguments[a];return(e=t.call.apply(t,[this].concat(i))).state={numPlayers:null},e}return Object(l.a)(s,[{key:"render",value:function(){var e=this;if(null===this.state.numPlayers)return Object(j.jsxs)("div",{className:"center",children:[Object(j.jsx)("div",{children:"!! THIS IS A WORK IN PROGRESS !!"}),Object(j.jsx)("div",{id:"title",children:"FORBIDDEN DESERT"}),Object(j.jsx)("div",{children:"Based off the original game designed by Gamewright."}),Object(j.jsx)("div",{children:Object(j.jsx)("a",{href:"https://www.gamewright.com/gamewright/pdfs/Rules/ForbiddenDesertTM-RULES.pdf",children:"Official rules manual"})}),Object(j.jsx)("div",{children:Object(j.jsx)("a",{href:"https://boardgamegeek.com/boardgame/136063/forbidden-desert",children:"BoardGameGeek listing"})}),Object(j.jsx)("div",{children:Object(j.jsx)("a",{href:"https://github.com/hwabis/forbidden-desert",children:"Source code"})}),Object(j.jsxs)("div",{id:"header",children:[Object(j.jsx)("p",{children:"Select number of players:"}),Object(j.jsx)("button",{onClick:function(){return e.setState({numPlayers:2})},children:"2"}),Object(j.jsx)("button",{onClick:function(){return e.setState({numPlayers:3})},children:"3"}),Object(j.jsx)("button",{onClick:function(){return e.setState({numPlayers:4})},children:"4"}),Object(j.jsx)("button",{onClick:function(){return e.setState({numPlayers:5})},children:"5"})]})]});var t=Object(h.a)({game:d,numPlayers:this.state.numPlayers,board:f});return Object(j.jsx)("div",{children:Object(j.jsx)(t,{})})}}]),s}(i.a.Component));n.a.render(Object(j.jsx)(i.a.StrictMode,{children:Object(j.jsx)(b,{})}),document.getElementById("root"))}},[[93,1,2]]]);
//# sourceMappingURL=main.2b26aeaa.chunk.js.map