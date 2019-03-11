cc.Class({
    extends: cc.Component,

    properties: {

        health:50
    },

    takeDamage: function(amount)
    {
        this.health -= amount
        cc.log(this.health)
    }
});
