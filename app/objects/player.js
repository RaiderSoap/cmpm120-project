'use strict';

const Character = require('./character.js');
const logger = require('../logger.js');

class Player extends Character {
  constructor(world, x, y, id) {
    super(world, x, y);
    this.type = 'player';

    this.id = id;

    /**
     * Initialized to zero.
     * @type {Array.<Number>} Key: Tiles Enum. Value: item count.
     */
    this.inventory = Array(...Array(4)).map(Number.prototype.valueOf, 0);
  }

  /**
   * @param tileId {Number}
   * @param count {Number=}
   */
  gainItem(tileId, count = 1) {
    if (isValidItem(tileId)) {
      this.inventory[tileId] = Math.min(64, this.inventory[tileId] + count);
    }
  }

  /**
   * @param tileId {Number}
   * @param count {Number=}
   */
  loseItem(tileId, count = 1) {
    if (isValidItem(tileId)) {
      this.inventory[tileId] = Math.max(0, this.inventory[tileId] - count);
    }
  }

  /**
   * @param tileId {Number}
   * @return {boolean}
   */
  hasItem(tileId) {
    return isValidItem(tileId) && this.inventory[tileId];
  }

  /**
   * @override
   * @param player
   */
  onInteraction(player) {
    let x2 = Character.roundXWithDirection(this._x, this._direction);
    let y2 = Character.roundYWithDirection(this._y, this._direction);

    let chest = this.world.objectContainer.colliding(x2, y2);
    if (chest) {
      chest.onInteraction(this);
    }
  }
}

/**
 * @param tileId
 * @return {boolean}
 */
function isValidItem(tileId) {
  return 0 <= tileId && tileId <= 4;
}

module.exports = Player;