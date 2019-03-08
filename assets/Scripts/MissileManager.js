cc.Class({
    extends: cc.Component,

    properties: 
    {
        missileArray:{
            default:[],
            type: [cc.Node],
            visible: false
        },    
    },

    addMissile(missile)
    {
        this.missileArray.push(missile)
        //this.node.addChild(missile)
    },

    removeMissile(missile)
    {
        this.missileArray.filter(function(value, index, arr){
            if(value == missile)
            {
                this.missileArray.splice(index, 1)
            }
        })
    }
});
