cc.Class({
    extends: cc.Component,

    properties: 
    {
        speed: 100
    },

    onLoad: function () 
    {
        //Cache rigidbody & sprite component
        this.rigidBody = this.node.getComponent(cc.RigidBody)
        this.spriteNode = this.node.getComponentInChildren(cc.Sprite).node

        //Initialise max attainable positions for the ship
        this.maxLeft = (cc.view.getFrameSize().width)  - (this.spriteNode.width / 2)
        this.maxUp = (cc.view.getFrameSize().height) - (this.spriteNode.height / 2)
    },

    start: function()
    {
        this.velocity = cc.v2(0 ,0)
    },

    update: function(dt)
    {
        this.restrictShipMovement()
    },

    onEnable: function()
    {
        //Register keyboard events
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
    },

    onDisable: function()
    {
        //Unregister keyboard events
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
    },

    onKeyDown: function(event)
    {
        switch(event.keyCode)
        {
            case cc.macro.KEY.w: this.velocity.y = this.speed
                this.moveShip()
                break
            case cc.macro.KEY.s: this.velocity.y = -this.speed
                this.moveShip()
                break
            case cc.macro.KEY.a: this.velocity.x = -this.speed
                this.moveShip()
                break
            case cc.macro.KEY.d: this.velocity.x = this.speed
                this.moveShip()
                break
        }
    },

    onKeyUp: function(event)
    {
        switch(event.keyCode)
        {
            case cc.macro.KEY.w: this.velocity.y = 0
                this.moveShip()
                break
            case cc.macro.KEY.s: this.velocity.y = 0
                this.moveShip()
                break
            case cc.macro.KEY.a: this.velocity.x = 0
                this.moveShip()
                break
            case cc.macro.KEY.d: this.velocity.x  = 0
                this.moveShip()
                break
        }
    },

    moveShip()
    {
        this.rigidBody.linearVelocity = this.velocity
    },

    restrictShipMovement()
    {
        if(this.node.x < -this.maxLeft)
        {
            this.node.x = -this.maxLeft
        }
        if(this.node.x > this.maxLeft)
        {
            this.node.x = this.maxLeft
        }
        if(this.node.y < -this.maxUp)
        {
            this.node.y = -this.maxUp
        }
        if(this.node.y > this.maxUp)
        {
            this.node.y = this.maxUp
        }
    }
});
