'use strict';

angular.module('module.core').controller('PropertiesCtrl', function ($rootScope, VisDataSet, Effect, Animation, Keyframe) {
    var vm;

    vm = this;

    this.timeline = null;
    this.data = {
        items: new VisDataSet(),
        groups: new VisDataSet()
    };

    this.active_segment = null;

    this.options = {
        start: 0,
        end: _.isNull(this.active_segment) ? 0 : this.active_segment.out,
        orientation: {
            axis: 'top'
        },
        showCurrentTime: false,
        zoomable: true,
        showMajorLabels: false,
        groupTemplate: function (group) {
            return group.content.param.title;
        }
    };

    this.events = {
        onload: function (timeline) {
            vm.timeline = timeline;

            timeline.addCustomTime(0, 'animating-cursor');
            timeline.setWindow(0, _.isNull(vm.active_segment) ? 0 : vm.active_segment.out);
        }
    };

    this.addKeyframe = function (effect, param, value) {
        var keyframe;

        keyframe = new Keyframe(param.title, value);

        effect.getAnimationByParam(param).keyframes.push(keyframe);
        this.data.items.add({
            id: 'blah',
            start: 2,
            type: 'point'
        })
    };

    this.toggleAnimation = function (effect, param) {
        var animation;

        animation = new Animation(param);

        if (!effect.hasAnimation(animation)) {
            effect.animations.push(animation);
            this.data.groups.add({id: animation.param.$$hashKey, content: animation});

            effect.isAnimating = true;
            param.isAnimating = true;
        } else {
            effect.removeAnimation(animation);
            this.data.groups.remove(animation.param.$$hashKey);

            param.isAnimating = false;
        }
    };

    this.removeEffect = function (effect) {
        this.active_segment.removeEffect(effect);
        $rootScope.$broadcast('Timeline:RequestToRender');
    };

    this.refreshContext = function () {
        $rootScope.$broadcast('Timeline:RequestToRender');
    };

    this.onDrop = function (event, ui) {
        var effect_name;

        effect_name = ui.draggable.data('model').name;

        vm.active_segment.effects.push(new Effect(effect_name));

        $rootScope.$broadcast('Timeline:RequestToRender');
        $rootScope.$apply();
    };

    $rootScope.$on('Timeline:LayerSelected', function (event, segment) {
        vm.active_segment = segment;
        $rootScope.$apply();
    });

    $rootScope.$on('Timeline:LayerDeselected', function (event, segment) {
        vm.active_segment = null;
        $rootScope.$apply();
    })
});
