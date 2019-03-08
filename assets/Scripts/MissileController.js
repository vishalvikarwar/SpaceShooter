cc.Class({
    extends: cc.Component,

    properties: 
    {
        speed: 5,
    },

    onLoad: function()
    {
        this.anim = this.node.getComponentInChildren(cc.Animation)
        this.rigidBody = this.node.getComponent(cc.RigidBody)

        cc.log(this.anim.defaultClip.duration)
    },

    start:function()
    {
        this.rigidBody.linearVelocity = new cc.Vec2(this.speed, 0)
    },

    onBeginContact: function(contact, selfCollider, otherCollider)
    {
        if(otherCollider.node.name !== ("Spaceship" && "Missile"))
        {
            this.onMissileHit()
        }
    },

    onMissileHit()
    {
        this.anim.play()
        this.rigidBody.linearVelocity = cc.Vec2.ZERO

        setTimeout(function(){
            this.missilePool.put(this.node)
        }.bind(this), this.anim.defaultClip.duration)
    },

    reuse(missilePool)
    {
        this.missilePool = missilePool
    },

});
