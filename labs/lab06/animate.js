/* global THREE, cube, scene, camera, renderer */

function animate() {
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animate);
}

//Define a raycaster from THREE to apply for intersected objects
var raycaster = new THREE.Raycaster();

//Define a selected object
var selectedobj = false;

//add event listener to the model and move the model with mouse-down position
function onDocumentMouseDown(event) {
    var mouse = new THREE.Vector2;

    mouse.x = (event.clientX/renderer.domElement.clientWidth)*2-1;
    mouse.y = -(event.clientY/renderer.domElement.clientHeight)*2+1;

    raycaster.setFromCamera(mouse,camera);

    var intersects = raycaster.intersectObjects(scene.children,false);

    if(intersects.length > 0 )
    {
        //if we selected the model
        if ((intersects[0].object.name === "loaded_mesh") && !selectedobj)
    {
        intersects[0].object.material.color = new THREE.Color(1,1.5,155);
        selectedobj = true;
    }
        //if model is not selected or dropped 
        if ((intersects[0].object.name !== "loaded_mesh") && selectedobj)
    {
        mesh.material.color = new THREE.Color(0.6,0.2,0.4);
        var pos = intersects[0].point;
        mesh.position.x = pos.x;
        mesh.position.y = pos.y;
        selectedobj = false;
    }

    }
    
}