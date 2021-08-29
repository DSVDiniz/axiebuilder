
import Player from "../../src/game/player.js";
let player;
beforeEach(() => {
	player = new Player();
});

test('Energy should start as 0 and 0 <= x <= 10', () => {
  expect(player.energy).toBe(0);
  player.setEnergy(-1)
  expect(player.energy).not.toBe(-1);
  player.setEnergy(11)
  expect(player.energy).not.toBe(11);
  player.setEnergy(5)
  expect(player.energy).toBe(5);
});

test('Adding energy should respect the energy maximum and minimum (0 <= x <= 10)', () => {
	expect(player.energy).toBe(0);
	player.addEnergy(-1)
	expect(player.energy).not.toBe(-1);
	player.addEnergy(11)
	expect(player.energy).not.toBe(11);
	player.addEnergy(5)
	expect(player.energy).toBe(5);
	player.addEnergy(-2)
	expect(player.energy).toBe(3);
});