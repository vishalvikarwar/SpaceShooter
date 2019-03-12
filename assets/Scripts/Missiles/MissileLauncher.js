var MissileType = require('MissileType')

cc.Class({
    extends: cc.Component,

    properties:
    {
        //Current selected missile
        selectedMissile:
        {
            default: MissileType.SIMPLE,
            type: MissileType,
        }
    },

    onLoad: function()
    {
        this.selectedMissile = MissileType.SIMPLE
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
        switch(event.keyCode)
        {
            case cc.macro.KEY.p:
                this.selectedMissile = MissileType.SIMPLE
                cc.log("Missile type - Simple")
                cc.log(this.selectedMissile)
                break
            case cc.macro.KEY.l:
                this.selectedMissile = MissileType.HEAVY
                cc.log("Missile type - Heavy")
                cc.log(this.selectedMissile)
                break
            case cc.macro.KEY.m:
                this.selectedMissile = MissileType.ADVANCE
                cc.log("Missile type - Advance")
                cc.log(this.selectedMissile)
                break
        }

        if(event.keyCode == cc.macro.KEY.space && this.isFireKeyUp)
        {  
            // cc.log("Fire key pressed")
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
        var newMissile = this.missileManager.getMissile(this.selectedMissile)
        var newPosition = this.node.convertToWorldSpace(this.node.getPosition())
        newMissile.setPosition(newPosition)
    }
});
