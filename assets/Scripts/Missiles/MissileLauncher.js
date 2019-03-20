var MissileType = require('MissileType')

cc.Class({
    extends: cc.Component,

    properties:
    {
        fireRate: 1,

        selectedMissile:
        {
            default: MissileType.SIMPLE,
            type: MissileType
        }
    },

    onLoad: function()
    {
        this.isFireKeyUp = true
        this.missileManager = cc.find("Canvas/MissileManager").getComponent("MissileManager")

        this.timer = 0
        this.canFire = true
    },

    update: function(dt)
    {
        this.timer += dt
        if(this.timer > this.fireRate && !this.canFire)
        {
            this.canFire = true
            this.timer = 0
        }
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
                //cc.log("Missile type - Simple")
                break
            case cc.macro.KEY.l:
                this.selectedMissile = MissileType.HEAVY
                //cc.log("Missile type - Heavy")
                break
            case cc.macro.KEY.m:
                this.selectedMissile = MissileType.ADVANCE
                //cc.log("Missile type - Advance")
                break
        }

        if(event.keyCode == cc.macro.KEY.space && this.isFireKeyUp && this.canFire)
        {  
            // cc.log("Fire key pressed")
            this.launchMissile()
            this.isFireKeyUp = false
            this.canFire = false
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
        var missile = this.missileManager.getMissile(this.selectedMissile)
        var position = this.node.convertToWorldSpace(this.node.getPosition())
        missile.setPosition(position)
    }
});
