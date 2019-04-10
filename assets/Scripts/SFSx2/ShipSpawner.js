cc.Class({
    extends: cc.Component,

    onLoad:function()
    {
        this.player1SpawnPos = cc.v2(0, cc.view.getVisibleSize ().height / 2);
        this.player2SpawnPos = cc.v2(cc.v2.getVisibleSize().width(), cc.view.getVisibleSize().height / 2);
    }
});
