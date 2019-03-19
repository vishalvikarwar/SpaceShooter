var MisileType = require('MissileType')

cc.Class({
    extends: cc.Component,

    properties:
    {
        speed: 100,
        maxLifeTime: 15,
        _damage: 50,

        damage: 
        {
            get: function()
            {
                return this._damage
            },

            getOne: function()
            {
                cc.log(
                    "this is getone"
                )
            }
        },

        foo: function()
        {
            var abc = 30
            var getABC = function()
            {
                return abc
            }
            getABC()
        }
    },

    init: function(missileManager)
    {
        cc.log(this.damage)
        this.properties.foo()
        cc.log("init missile")
        this.missileManager = missileManager
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
        this.timer = 0
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

    // reuse: function(missilePool)
    // {
    //     cc.log("reuse callback")
    //     this.missilePool = missilePool
    // },
});