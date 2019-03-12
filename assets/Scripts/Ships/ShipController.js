cc.Class({
    extends: cc.Component,

    properties: 
    {
        acceleration: 100,
        damping: 50
    },

    onLoad: function () 
    {
        //Cache rigidbody
        this.rigidBody = this.node.getComponent(cc.RigidBody)
        
        //Initialise movement variables
        this.velocity = new cc.Vec2(0, 0)
        this.isUpKeyPressed = false
        this.isDownKeyPressed = false

        this.rigidBody.linearDamping = this.damping
    },

    onEnable: function()
    {
        //Register keyboard events
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onDisable: function()
    {
        //Unregister keyboard events
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
    },

    update: function(dt)
    {
        //Update velocity
        if(this.isDownKeyPressed)
        {
            this.velocity.y -= this.acceleration * dt
        }
        else if(this.isUpKeyPressed)
        {
            this.velocity.y += this.acceleration * dt
        }

        this.rigidBody.linearVelocity = this.velocity
    },

    onKeyDown: function(event)
    {
        switch(event.keyCode)
        {
            case cc.macro.KEY.w: this.isUpKeyPressed = true;
                // cc.log("W key pressed down")
                break;
            case cc.macro.KEY.s: this.isDownKeyPressed = true;
                // cc.log("S key pressed down")
                break;
        }
    },

    onKeyUp: function(event)
    {
        switch(event.keyCode)
        {
            case cc.macro.KEY.w: this.isUpKeyPressed = false;
                // cc.log("W key pressed up")
                break;
            case cc.macro.KEY.s: this.isDownKeyPressed = false;
                // cc.log("S key pressed up")
                break;
        }
    }
});
