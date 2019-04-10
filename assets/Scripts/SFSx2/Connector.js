cc.Class({
    extends: cc.Component,

    properties:
    {
        debugLabel: cc.Label,
        shipPrefab: cc.Prefab
    },

    onLoad: function()
    {
        this.initConnection();
    },

    initConnection: function()
    {
        // Create configuration object
	    var config = {};
	    config.host = "192.168.140.133";
	    config.port = 8080;
	    config.useSSL = false;
	    config.zone = "SpaceShooter";
	    config.debug = false;

	    // Create SmartFox client instance
        sfs = new SFS2X.SmartFox(config);

        // Set logging
        sfs.logger.level = SFS2X.LogLevel.DEBUG;
        sfs.logger.enableConsoleOutput = true;
        sfs.logger.enableEventDispatching = true;
 
        sfs.logger.addEventListener(SFS2X.LoggerEvent.DEBUG, this.onDebugLogged, this);
        sfs.logger.addEventListener(SFS2X.LoggerEvent.INFO, this.onInfoLogged, this);
        sfs.logger.addEventListener(SFS2X.LoggerEvent.WARNING, this.onWarningLogged, this);
        sfs.logger.addEventListener(SFS2X.LoggerEvent.ERROR, this.onErrorLogged, this);
        
        //Connection event listeners
        sfs.addEventListener(SFS2X.SFSEvent.CONNECTION, this.onConnection, this);
        sfs.addEventListener(SFS2X.SFSEvent.CONNECTION_LOST, this.onConnectionLost, this);

        //Login event listeners
        sfs.addEventListener(SFS2X.SFSEvent.LOGIN_ERROR, this.onLoginError, this);
        sfs.addEventListener(SFS2X.SFSEvent.LOGIN, this.onLogin, this);

        //Room event listeners
        sfs.addEventListener(SFS2X.SFSEvent.ROOM_JOIN_ERROR, this.onRoomJoinError, this);
        sfs.addEventListener(SFS2X.SFSEvent.ROOM_JOIN, this.onRoomJoin, this);

        // Attempt connection
        sfs.connect();
    },

    //#region connection callbacks
    onConnection: function(event)
    {
        if(event.success)
        {
            cc.log("Connected to Smartfox server " + sfs.version)

            this.assignUserAndLogin(sfs.userManager.getUserCount())
        }
        else
        {
            cc.log("Connection failed: " + event.errorMessage ? event.errorMessage + 
            " (" + event.errorCode + ")" : "Is the server running at all?")
        }
    },

    onConnectionLost: function(event)
    {
        cc.log("Connection Lost: " + event.reason)
    },

    onDebugLogged: function(event)
    {
        cc.log(event.message);
    },

    onInfoLogged: function(event)
    {
        cc.log(event.message);
    },

    onWarningLogged: function(event)
    {
        cc.log(event.message);
    },

    onErrorLogged: function(event)
    {
        cc.log(event.message);
    },
    //#endregion

    //#region login callbacks
    onLogin: function (event) 
    {
        cc.log(this.userName + " logged in");

        var room = sfs.getRoomByName("SpaceRoom");
        sfs.send(new SFS2X.JoinRoomRequest(room));
    },

    onLoginError: function (event) 
    {
        cc.log("Login Error: " + event.errorMessage);
    },

    onRoomJoin: function(event)
    {
        cc.log("Room Joined: " + event.room.name);
    },

    onRoomJoinError: function(event)
    {
        cc.log("Room join error: " + event.errorMessage + " (" + event.errorCode + ")");
    },
    //#endregion

    assignUserAndLogin: function(userCount)
    {
        if(userCount == 0)
        {
            this.userName = "Player1";
        }
        else if(userCount == 1)
        {
            this.userName ="Player2";
        }
        cc.log(userCount);

        sfs.send(new SFS2X.LoginRequest(this.userName));
    }

});
