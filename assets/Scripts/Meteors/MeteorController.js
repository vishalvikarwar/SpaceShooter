cc.Class({
    extends: cc.Component,

    properties:
    {
        health: 50,
        minSpeed: -10,
        maxSpeed: 10
    },

    init: function(spawner)
    {
        this.spawner = spawner
    },

    onLoad: function()
    {
        this.rigidBody = this.node.getComponent(cc.RigidBody);
    },

    onBeginContact: function(contact, selfCollider, otherCollider)
    {
        if(otherCollider.node.group == "Missile")
        {
            cc.log(otherCollider.getComponent('MissileController').foo)
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
    },

    onDisable: function()
    {
        this.spawner.release(this.node)
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
