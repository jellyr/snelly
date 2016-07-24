
function SphereScene(name, desc) 
{
	// no need for name? just use an internal unique id?
	Scene.call(this, name, desc);

	// defaults
	this._settings.radius = 1.0;
}

SphereScene.prototype = Object.create(Scene.prototype);


// This defines a solid body, whose interior
// defined by the points with SDF<0.0, with a constant refractive index.
SphereScene.prototype.sdf = function()
{
	return '\
		uniform float _radius;                \
		float SDF(vec3 X)                     \
		{                                     \
			return length(X) - _radius;       \
		}                                     \
	';
}


// Called whenever this scene UI was switched to, or changed while active,
// and syncs the params of the trace shader to the current UI settings
SphereScene.prototype.syncShader = function(traceProgram)
{
	// (The shader parameter names here must be consistent with the GLSL sdf code defined above)
	traceProgram.uniformF("_radius", this._settings.radius);
}

// Gives the raytracer some indication of (rough) scene size, so it
// can set tolerances appropriately.
SphereScene.prototype.getScale = function()
{
	return this._settings.radius;
}


// Initial cam position default for this scene
SphereScene.prototype.setCam = function(control, camera)
{
	camera.position.set(10.0, 10.0, 10.0)
	controls.target.set(0.0, 0.0, 0.0);
}


// Initial laser position and direction defaults for this scene
SphereScene.prototype.setLaser = function(laser)
{
	laser.setPosition(new THREE.Vector3(-5.0, 0.0, 0.0));
	laser.setDirection(new THREE.Vector3(1.0, 0.0, 0.0));
}


// set up gui and callbacks for this scene
SphereScene.prototype.initGui = function(parentFolder)
{
	
}











