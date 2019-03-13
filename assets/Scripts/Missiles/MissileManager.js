var MissileType = require('MissileType')

cc.Class({
    extends: cc.Component,

    properties: 
    {
        //No. of missiles to initialize
        simpleMissileCount: 50,
        heavyMissileCount: 20,
        advanceMissileCount: 10
    },

    onLoad: function()
    {
        this.scene = cc.director.getScene()

        this.simpleMissilePool = new cc.NodePool('MissileController')
        this.heavyMissilePool = new cc.NodePool('MissileController')
        this.advanceMissilePool = new cc.NodePool('MissileController')

        this.missileFactory = this.node.getComponent('MissileFactory')
        this.initPool()
    },

    initPool: function()
    {
        for(let i = 0; i < this.simpleMissileCount; i++)
        {
            let missile = this.missileFactory.createMissile(MissileType.SIMPLE)
            this.simpleMissilePool.put(missile)
        }

        for(let i = 0; i < this.heavyMissileCount; i++)
        {
            let missile = this.missileFactory.createMissile(MissileType.HEAVY)
            this.heavyMissilePool.put(missile)
        }

        for(let i = 0; i < this.advanceMissileCount; i++)
        {
            let missile = this.missileFactory.createMissile(MissileType.ADVANCE)
            this.advanceMissilePool.put(missile)
        }
    },

    getMissile(missileType)
    {
        let missile = null
        switch(missileType)
        { 
            case MissileType.SIMPLE:
                missile = this.getSimpleMissle()
                break
            case MissileType.HEAVY:
                missile = this.getHeavyMissile()
                break
            case MissileType.ADVANCE:
                missile = this.getAdvanceMissile()
                break
        }
        
        missile.parent = this.scene
        return missile
    },

    putMissile: function(missile)
    {
        switch(missile)
        {
            case MissileType.SIMPLE:
                simpleMissilePool.put(missile)
                break
            case MissileType.HEAVY:
                heavyMissilePool.put(missile)
                break
            case MissileType.ADVANCE:
                advanceMissilePool.put(missile)
                break
        }
    },

    getSimpleMissle: function()
    {
        //cc.log("getSimpleMissile called")
        let missile = null
        if(this.simpleMissilePool.size() > 0)
        {
            missile = this.simpleMissilePool.get(this.simpleMissilePool)
        }
        else
        {
            missile = this.missileFactory.createMissile(MissileType.SIMPLE)
        }
        return missile
    },

    getHeavyMissile: function()
    {
        //cc.log("getHeavyMissile called")
        let missile = null
        if(this.heavyMissilePool.size() > 0)
        {
            missile = this.heavyMissilePool.get(this.heavyMissilePool)
        }
        else
        {
            missile = this.missileFactory.createMissile(MissileType.HEAVY)
        }
        return missile
    },

    getAdvanceMissile: function()
    {
        //cc.log("getAdvanceMissile called")
        let missile = null
        if(this.advanceMissilePool.size() > 0)
        {
            missile = this.advanceMissilePool.get(this.advanceMissilePool)
        }
        else
        {
            missile = this.missileFactory.createMissile(MissileType.ADVANCE)
        }
        return missile
    }
});