cc.Class({
    extends: cc.Component,

    onLoad () 
    {
        this.init();
    },

    init:function()
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
        
        // Add event listeners
        sfs.addEventListener(SFS2X.SFSEvent.CONNECTION, this.onConnection, this);
        sfs.addEventListener(SFS2X.SFSEvent.CONNECTION_LOST, this.onConnectionLost, this);

        // Attempt connection
        sfs.connect();
    },

    onConnection: function(event)
    {
        if(event.success)
        {
            cc.log("Connected to Smartfox server " + sfs.version)
        }
        else
        {
            cc.log("Connection failed: " + event.errorMessage ? event.errorMessage + 
            " (" + event.errorCode + ")" : "Is the server running at all?")
        }
    },

    onConnectionLost: function(event)
    {
        cc.log("Connection Lost: " + event.message)
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
    }

});
