cc.Class({
    extends: cc.Component,

    properties: 
    {
        speed: 5,
        damage: 10
    },

    onLoad: function()
    {
        this.anim = this.node.getComponentInChildren(cc.Animation)
        this.rigidBody = this.node.getComponent(cc.RigidBody)
    },

    onEnable:function()
    {
        this.rigidBody.linearVelocity = new cc.Vec2(this.speed, 0)
        this.anim.play('Simple_Missile_Flying')
    },

    onBeginContact: function(contact, selfCollider, otherCollider)
    {
        if(otherCollider.node.name !== ("Spaceship"))
        {
            this.onMissileHit()
        }
    },

    onMissileHit()
    {
        this.anim.play('Simple_Missile_Explosion')
        this.rigidBody.linearVelocity = cc.Vec2.ZERO

        setTimeout(function(){
            this.anim.stop()
            this.missileManager.missilePool.put(this.node)
        }.bind(this), this.anim.currentClip.duration * 1000)
    },

    reuse: function(missileManager)
    {
        this.missileManager = missileManager
    },

});
