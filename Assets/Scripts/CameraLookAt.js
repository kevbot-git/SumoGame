var target : GameObject;

function Update () {
	//if (target.transform.GetComponent.<NetworkView>().isMine) {
		transform.LookAt(target.transform);
		//}
}