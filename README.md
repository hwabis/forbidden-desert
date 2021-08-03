# forbidden-desert
WIP:
* Equipment (from gear + tunnel tiles)
  * Giving/using items on other players' turns
* Giving water on other players' turns
* Display win/loss
* "Fog of war" 

Play here: https://hwabis.github.io/forbidden-desert/

Created with [boardgame.io](https://boardgame.io/) and React; based off of Gamewright's Forbidden Desert board game, designed by Matt Leacock.

Tile art source: various maps from https://maplestory.wiki/

## Rules
The official rules are [here](https://www.gamewright.com/gamewright/pdfs/Rules/ForbiddenDesertTM-RULES.pdf). This version has slight changes:

* Storm cards are randomly generated each turn (not drawn from a deck. The game is slightly easier and more predictable)
  * The probability of Sun Beats Down and Storm Picks Up depend on the history of storm deck draws
* Running out of sand markers is not a lose condition
* You may have duplicate roles across different players (Yes, a team of only Meteorologists would be a free win, but that wouldn't be very fun...)
* Players can spawn on any tile, not just a regular equipment tile
