cc.Class({
    extends: cc.Component,

    properties: 
    {        
        missileCount: 20,     
        simpleMissilePrefab: cc.Prefab
    },

    onLoad: function()
    {
        this.scene = cc.director.getScene()
        this.missilePool = new cc.NodePool('MissileController')
        this.initPool()
    },

    initPool: function()
    {
        for(let i = 0; i < this.missileCount; i++)
        {
            let missile = cc.instantiate(this.simpleMissilePrefab)
            this.missilePool.put(missile)
        }
    },

    getMissile()
    {
        let missile = null
        if(this.missilePool.size() > 0)
        {
            missile = this.missilePool.get(this)
        }
        else
        {
            missile = cc.instantiate(this.simpleMissilePrefab)
        }

        missile.parent = this.scene
        return missile
    }
});
