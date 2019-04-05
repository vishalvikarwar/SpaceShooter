cc.Class({
    extends: cc.Component,

    properties:
    {
        userNameEditBox: cc.EditBox
    },

    start: function () 
    {
        this.init();
    },

    init: function () 
    {
        //Login event listeners
        sfs.addEventListener(SFS2X.SFSEvent.LOGIN_ERROR, this.onLoginError, this);
        sfs.addEventListener(SFS2X.SFSEvent.LOGIN, this.onLogin, this);
        
        //Room event listeners
        sfs.addEventListener(SFS2X.SFSEvent.ROOM_JOIN_ERROR, this.onRoomJoinError, this);
        sfs.addEventListener(SFS2X.SFSEvent.ROOM_JOIN, this.onRoomJoin, this);
    },

    onLogin: function (event) {
        cc.log(this.userNameEditBox.string + " logged in.");

        var room = sfs.getRoomByName("SpaceRoom");
        sfs.send(new SFS2X.JoinRoomRequest(room));
    },

    onLoginError: function (event) {
        cc.log(this.userNameEditBox.string + " couldn't logged in: " + event.errorMessage);
    },

    onRoomJoin: function(event)
    {
        cc.log("Room Joined: " + event.room.name);
    },

    onRoomJoinError: function(event)
    {
        cc.log("Room join error: " + event.errorMessage + " (" + event.errorCode + ")");
    },

    onLoginBtClick: function () 
    {
        var userName = this.userNameEditBox.string;
        var isSent = sfs.send(new SFS2X.LoginRequest(userName));

        if (isSent) 
        {
            //TODO: Show lobby
        }
    },
});
