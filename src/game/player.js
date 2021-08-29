export default class Player {
  energy = 0;
  axies = [];
  deck = [];
  hand = [];
  cemetery = [];
  played = [];
  name = "";
  teamName = "";
  constructor() {}

  setEnergy(energy){
	if(energy <= 10 && energy >= 0)
		this.energy = energy;
  }
  addEnergy(energy){
	let aux = this.energy + energy;
	this.setEnergy(aux);
  }
}
