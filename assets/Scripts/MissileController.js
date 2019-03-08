var MissileManager = require('MissileManager')

cc.Class({
    extends: cc.Component,

    properties: {

        speed: 5,

        missileManager:
        {
            default: null,
            type: MissileManager,
            visible: false
        }
    },

    onEnable: function()
    {
        this.missileManager.addMissile(this.node)
    },

    onDisable: function()
    {
        this.missileManager.removeMissile(this.node)
    },

    onLoad: function()
    {
        this.anim = this.node.getComponentInChildren(cc.Animation)
        this.rigidBody = this.node.getComponent(cc.RigidBody)
        this.missileManager = cc.find("Canvas/MissileManager").getComponent("MissileManager")
    },

    start:function()
    {
        this.rigidBody.linearVelocity = new cc.Vec2(this.speed, 0)
    },

    onBeginContact: function(contact, selfCollider, otherCollider)
    {
        if(otherCollider.node.name !== "Spaceship")
        {
            this.anim.play()
            this.rigidBody.linearVelocity = cc.Vec2.ZERO
            setTimeout(this.node.destroy(), this.anim.currentClip.duration)
        }
    },

});
