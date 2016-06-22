private var bx : float;
private var by : float;
private var bw : float;
private var bh : float;

private var useNAT : boolean;
private var refreshing : boolean = false;
private var refresh : String = "Refresh";
private var hostData : HostData[];

var nameOfGame : String = "A Sumo Game";
var maxPlayers : int = 8;
var port : int = 25555;

var playerPrefab : GameObject;
var spawnObject1 : Transform;
var spawnPoint : Transform;

function Start () {
	bx = Screen.width * 0.05;
	by = Screen.width * 0.05;
	bw = Screen.width * 0.2;
	bh = Screen.width * 0.05;

	useNAT = !Network.HavePublicAddress;
}

function startServer () {
	Debug.Log("Initializing server...");
	Network.InitializeServer(maxPlayers , port , false);
	Debug.Log("Registering host...");
	MasterServer.RegisterHost(nameOfGame , nameOfGame , "-Description-");
}

function OnMasterServerEvent (mse : MasterServerEvent) {
	if(mse == MasterServerEvent.RegistrationSucceeded) {
		Debug.Log("Registered! Ready to play.");
		refresh = "Refresh";
	}
}

function OnServerInitialized () {
	Debug.Log("Initialized!");
	spawnPlayer();
}

function refreshHostList() {
	Debug.Log("Refreshing game list...");
	MasterServer.RequestHostList(nameOfGame);
	refreshing = true;
	refresh = "Refreshing...";
}

function OnConnectedToServer () {
	Debug.Log("Connected!");
	spawnPlayer();
}

function Update () {
	if(refreshing) {
		if(MasterServer.PollHostList().length > 0) {
			refreshing = false;
			refresh = "Refresh";
			Debug.Log(MasterServer.PollHostList().length);
			hostData = MasterServer.PollHostList();
		}
	}
}

function spawnPlayer () {
	var spawnPos : Transform = spawnPoint.GetChild(Random.Range(0, spawnPoint.childCount));
	Network.Instantiate(playerPrefab , spawnPos.position , Quaternion.identity , 0);
}

///*

function OnGUI () {
	if(!Network.isClient && !Network.isServer) {
		if(GUI.Button(Rect(bx , by , bw , bh) , "Host Game")) {
			startServer();
		}
		if(GUI.Button(Rect(bx , by + bh , bw , bh) , refresh)) {
			refreshHostList();
		}
		if(hostData) {
			for(var i : int = 0; i < hostData.length; i++) {
				if(GUI.Button(Rect(bx , by*(4+i) , bw , bh) , hostData[i].gameName)) {
					Debug.Log("Connecting to " + hostData[i].gameName + "...");
					Network.Connect(hostData[i]);
				}
			}
		}
	}
}

//*/