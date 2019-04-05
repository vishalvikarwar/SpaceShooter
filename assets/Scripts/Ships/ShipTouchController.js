cc.Class({
    extends: cc.Component,

    onLoad: function()
    {
        cc.log("Ship loaded")
    },

    onEnable: function()
    {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStartCallback, this)
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoveCallback, this)
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEndCallback, this)
    },

    onDisable: function()
    {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStartCallback, this)
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoveCallback, this)
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEndCallback, this)
    },

     onTouchMoveCallback: function(event)
     {
        this.movePosition = event.touch.getLocation()
        this.node.setPosition(( this.node.parent.convertToNodeSpaceAR(this.movePosition)))
    },
});
