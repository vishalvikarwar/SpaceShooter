var MissileType = require('MissileType')

cc.Class({
    extends: cc.Component,

    properties: {

        simpleMissilePrefab:
        {
            default: null,
            type: cc.Prefab
        },

        currentLoadedMissile:
        {
            default: MissileType.SIMPLE,
            type: MissileType,
            serializable: false,
            visible: false
        },
    },

    onLoad: function()
    {
        this.scene = cc.director.getScene()
        this.timer = 0
        this.nextFireTime = 0
        this.canFire = true
    },

    update: function(dt)
    {
        this.timer += dt
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
        if(event.keyCode == cc.macro.KEY.space && this.canFire)
        {  
            this.launchMissile(this.currentLoadedMissile)
            this.nextFireTime = this.timer + this.fireRate

            this.canFire = false
        }
    },

    onKeyUp: function(event)
    {
        if(event.keyCode == cc.macro.KEY.space)
        {
            this.canFire = true
        }
    },

    launchMissile(missileType)
    {

        switch(missileType)
        {
            case MissileType.SIMPLE: 
                var newMissile = cc.instantiate(this.simpleMissilePrefab)
                break;
        }
        
        newMissile.parent = this.scene
        var newPosition = this.node.convertToWorldSpace(this.node.getPosition())
        newMissile.setPosition(newPosition)
    }
});
