#pragma strict

function Start() {
	if(GetComponent.<NetworkView>().isMine) {
		gameObject.GetComponent.<Renderer>().material.SetColor("_OutlineColor", Color.yellow);
	}
}

function Update () {
	if(GetComponent.<NetworkView>().isMine) {
		GetComponent.<Rigidbody>().AddForce(Input.acceleration.x, 0, Input.acceleration.y);
		GetComponent.<Rigidbody>().AddForce(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
		if(transform.position.y < -1) {
			transform.position = Vector3(0, 1, 0);
			GetComponent.<Rigidbody>().velocity = Vector3.zero;
		}
	}
}