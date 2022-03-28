//https://www.movable-type.co.uk/scripts/latlong.html


class LatLong{
	Lat: number;
	Lon: number;
	static EarthRadius: number = 6371e3; // metres
	static EarthCircumference:number = Math.PI*this.EarthRadius*this.EarthRadius;// πrr i.e. (πr^2)
	constructor(lat:number, lon:number){
		this.Lat=lat;
		this.Lon=lon;
	}
	DistanceTo(pos:LatLong){
		var φ1:number = this.Lat * Math.PI/180; // φ, λ in radians
		var φ2:number = pos.Lat * Math.PI/180;
		var Δφ = (pos.Lat-this.Lat) * Math.PI/180;
		var Δλ = (pos.Lon-this.Lon) * Math.PI/180;

		var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
			Math.cos(φ1) * Math.cos(φ2) *
			Math.sin(Δλ/2) * Math.sin(Δλ/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

		return LatLong.EarthRadius * c; // in metres
	}
}
