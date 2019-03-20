var MissileType = require('MissileType')

cc.Class({
    extends: cc.Component,

    properties:
    {
        //Prefabs of each missile type
        simpleMissilePrefab: cc.Prefab,
        heavyMissilePrefab: cc.Prefab,
        advanceMissilePrefab: cc.Prefab,
    },
    
    createMissile: function(missileType)
    {
        let missile = null
        switch(missileType)
        {
            case MissileType.SIMPLE:
                missile = cc.instantiate(this.simpleMissilePrefab)
                //cc.log("simple missile created")
                break
            case MissileType.HEAVY:
                missile = cc.instantiate(this.heavyMissilePrefab)
                //cc.log("heavy missile created")
                break
            case MissileType.ADVANCE:
                missile = cc.instantiate(this.advanceMissilePrefab)
                //cc.log("advance missile created")
                break
        }
        return missile
    }
});
