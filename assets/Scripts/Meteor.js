var BaseDamagable = require('BaseDamagable')

cc.Class({
    extends: BaseDamagable,

    onBeginContact(contact, selfCollider, otherCollider)
    {
        this.takeDamage(10)
    },

    takeDamage: function(amount)
    {
        this._super(amount)
    }

});
