'use strict';

angular.module('module.core').controller('ResourcesCtrl', function ($rootScope, $scope, $state, Effects, $timeout) {
    var vm, omitted_effects, seriously, source;
    var target = null, effect = null;
    vm = this;

    // There is a problem when having too many contexts, so only show some of the effects
    this.samples = [];
    omitted_effects = ['directionblur', 'whitebalance'];

    this.effects = Effects.getAvailable();
    this.active_layer = false;
    //$timeout(function () {
    //    _.forEach(vm.effects, function (_effect, i) {
    //        if (!_.find(omitted_effects, function (eff) {
    //                return eff == _effect[0]
    //            })) {
    //            seriously = new Seriously();
    //
    //            source = seriously.source('#effect-source');
    //            target = seriously.target('#effect-sample');
    //            effect = seriously.effect(_effect[0]);
    //
    //            // connect nodes
    //            effect.source = source;
    //            target.source = effect;
    //            seriously.render();
    //
    //            vm.samples.push({name: _effect[0], img: target.original.toDataURL("image/png"), title: _effect[1].title});
    //            seriously.destroy();
    //            seriously = null;
    //
    //
    //        }
    //    });
    //}, 500);

});