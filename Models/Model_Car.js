module.exports = function(_colour, _topspeed){
	this.colour = _colour;
	this.topspeed = _topspeed;
	this.speed = 0;
	this.accelerate = function(){
		this.speed < this.topspeed ? this.speed++ : this.speed > 0 ? this.speed-- : this.speed += 0;
	}
	return this;
}