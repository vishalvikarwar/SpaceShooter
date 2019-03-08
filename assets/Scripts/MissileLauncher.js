cc.Class({
    extends: cc.Component,

    onLoad: function()
    {
        this.isFireKeyUp = true
        this.missileManager = cc.find("Canvas/MissileManager").getComponent("MissileManager")
    },

    onEnable: function()
    {
        //Register keyboard events
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onDisable: function()
    {
        //Unregister keyboard events
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onKeyDown: function(event)
    {
        if(event.keyCode == cc.macro.KEY.space && this.isFireKeyUp)
        {  
            this.launchMissile()
            this.isFireKeyUp = false
        }
    },

    onKeyUp: function(event)
    {
        if(event.keyCode == cc.macro.KEY.space)
        {
            this.isFireKeyUp = true
        }
    },

    launchMissile()
    {
        var newMissile = this.missileManager.getMissile()
        var newPosition = this.node.convertToWorldSpace(this.node.getPosition())
        newMissile.setPosition(newPosition)
    }
});
