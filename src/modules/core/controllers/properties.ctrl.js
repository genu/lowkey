'use strict';

angular.module('module.core').controller('PropertiesCtrl', function ($rootScope, VisDataSet, Effect, Animation, Keyframe) {
    var vm;

    vm = this;

    this.current_time = 0;
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
            return group.content.input.title;
        }
    };

    this.events = {
        onload: function (timeline) {
            vm.timeline = timeline;

            timeline.addCustomTime(0, 'animating-cursor');
            timeline.setWindow(0, _.isNull(vm.active_segment) ? 0 : vm.active_segment.out);
        }
    };

    this.addKeyframe = function (param, value) {
        var keyframe;

        keyframe = new Keyframe(0, value);

        if (param.animation.addKeframe(keyframe)) {
            this.data.items.add({
                id: 'blah',
                start: 2,
                type: 'point'
            })
        }
    };

    this.toggleAnimation = function (param) {
        var animation;

        animation = param.toggleAnimation();


        if (_.isNull(this.data.groups.get(animation.$id))) {
            this.data.groups.add({id: animation.$id, content: param});
        } else {
            this.data.groups.remove(animation.$id);
        }

        param.isAnimating = !param.isAnimating;
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
        vm.timeline.destroy();

        $rootScope.$apply();
    });

    $rootScope.$on('Timeline:LayerDeselected', function (event, segment) {
        vm.active_segment = null;
        $rootScope.$apply();
    })
});
