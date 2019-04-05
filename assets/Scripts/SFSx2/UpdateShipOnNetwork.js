cc.Class({
    extends: cc.Component,

    start: function()
    {
		sfs.addEventListener(SFS2X.SFSEvent.PROXIMITY_LIST_UPDATE, onProximityListUpdate, this);
		sfs.addEventListener(SFS2X.SFSEvent.USER_VARIABLES_UPDATE, onUserVariablesUpdate, this);
    },

    updateServerPosition: function()
    {
        var pos = new SFS2X.Vec3D(this.node.x, this.node.y, 0);
        sfs.send(new SFS2X.SetUserPositionRequest(pos));
    },

    onProximityListUpdate: function(event)
    {

    },

    onUserVariablesUpdate: function(event)
    {

    },
});
