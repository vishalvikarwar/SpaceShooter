var MeteorController = cc.Class({
    extends: cc.Component,

    properties:
    {
        health: 50,
        minSpeed: -10,
        maxSpeed: 10,

        meteorId:
        {
            default: 0,
            visible: false
        }
    },

    statics:
    {
        count: 0
    },

    init: function(spawner)
    {
        this.spawner = spawner
        this.meteorId = ++MeteorController.count

        cc.log("Meteor " + this.meteorId + " is initialised")
    },

    onLoad: function()
    {
        this.rigidBody = this.node.getComponent(cc.RigidBody);
    },

    onBeginContact: function(contact, selfCollider, otherCollider)
    {
        if(otherCollider.node.group == "Missile")
        {
            let damageAmount = otherCollider.getComponent('MissileController').damage
            this.takeDamage(damageAmount)
        }
    },

    onEnable: function()
    {
        let x = (Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed)
        let y = (Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed)

        let velocity = cc.v2(x, y)

        this.rigidBody.linearVelocity = velocity

        cc.log("Meteor " + this.meteorId + " is spawned")
    },

    onDisable: function()
    {
        this.spawner.release(this.node)
        cc.log("Meteor " + this.meteorId + " is released")
    },

    takeDamage: function(amount)
    {
        this.health -= amount

        if(this.health <= 0)
        {
            this.node.active = false
        }
    }
});
