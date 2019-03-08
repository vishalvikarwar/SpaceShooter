cc.Class({
    extends: cc.Component,

    onLoad: function()
    {
        //Enable physics
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;

        //Enable collision
        var manager = cc.director.getCollisionManager();
        manager.enabled = true
    }
});
