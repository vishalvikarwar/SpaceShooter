cc.Class({
    extends: cc.Component,

    properties:
    {
        speed: 5,
        currentNode: cc.Node,
        nextNode: cc.Node
    },

    onLoad: function()
    {
        this.horizontalLength = this.currentNode.width
        cc.log(this.horizontalLength)
    },

    update: function(dt)
    {

        if(this.currentNode.x < -this.horizontalLength)
        {
            this.currentNode.x = this.horizontalLength
        }

        if(this.nextNode.x < -this.horizontalLength)
        {
            this.nextNode.x = this.horizontalLength
        }
        this.currentNode.x -= this.speed * dt
        this.nextNode.x -= this.speed * dt
    }
});
