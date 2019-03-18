cc.Class({
    extends: cc.Component,

    properties:
    {
        speed: 5,
        repeatLength: 1920,
        currentNode: cc.Node,
        nextNode: cc.Node
    },

    update: function(dt)
    {

        if(this.currentNode.x < -this.repeatLength)
        {
            this.currentNode.x = this.repeatLength
        }

        if(this.nextNode.x < -this.repeatLength)
        {
            this.nextNode.x = this.repeatLength
        }

        this.currentNode.x -= this.speed * dt
        this.nextNode.x -= this.speed * dt
    }
});
