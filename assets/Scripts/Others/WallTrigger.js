cc.Class({
    extends: cc.Component,

    onBeginContact: function(contact, selfCollider, otherCollider)
    {
        cc.log("Wall contact with " + otherCollider.node.name)
        otherCollider.node.active = false
    }
});
