cc.Class({
    extends: cc.Component,

    properties:
    {
        speed: 100,
        damage: 50
    },

    onLoad: function()
    {
        this.anim = this.node.getComponentInChildren(cc.Animation)
        this.rigidBody = this.node.getComponent(cc.RigidBody)

        if(this.anim == null)
        {
            cc.log("Animation component not found in MissileController's children")
        }

        if(this.rigidBody == null)
        {
            cc.log("Rigidbody component not found on MissileController")
        }
    },

    onEnable:function()
    {
        this.rigidBody.linearVelocity = new cc.Vec2(this.speed, 0)
    },


    onBeginContact: function(contact, selfCollider, otherCollider)
    {
        if(otherCollider.node.name !== ("Spaceship"))
        {
            this.onMissileHit()
        }
    },

    onMissileHit: function()
    {
        this.rigidBody.linearVelocity = cc.Vec2.ZERO
    },

    reuse: function(missilePool)
    {
        this.missilePool = missilePool
    },
});