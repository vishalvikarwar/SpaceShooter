cc.Class({
    extends: cc.Component,

    properties:
    {
        meteorPrefab: cc.Prefab,
        spawnInterval: 3
    },

    onLoad: function()
    {
        this.meteorPool = new cc.NodePool()
        this.spawnPosition = this.node.convertToWorldSpace(this.node.getPosition())
        this.parentNode = cc.director.getScene()
    },

    start: function()
    {
        this.schedule(function(){
            this.spawn()
        }, this.spawnInterval)
    },

    spawn()
    {
        let meteor = null
        if(this.meteorPool.size() > 0)
        {
            meteor = this.meteorPool.get()
        }
        else
        {
            meteor = this.createMeteor()
        }

        meteor.parent = this.parentNode
        meteor.setPosition(this.spawnPosition)
    },

    createMeteor: function()
    {
        //cc.log("creating meteor")
        let meteor = cc.instantiate(this.meteorPrefab)
        meteor.getComponent('MeteorController').init(this)

        return meteor
    },

    release: function(meteor)
    {
        //cc.log("meteor released")
        this.meteorPool.put(meteor)
    }

});