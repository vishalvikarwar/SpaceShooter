var MissileController = require('MissileController')

cc.Class({
    extends: MissileController,

    onEnable: function()
    {
        this._super()
        this.anim.play('Heavy_Missile_Flying')
    },

    onMissileHit: function()
    {
        this._super()
        this.anim.play('Heavy_Missile_Explosion')

        setTimeout(function()
        {
            this.anim.stop()
            this.missilePool.put(this.node)
        }.bind(this), this.anim.currentClip.duration * 1000)
    },

});
