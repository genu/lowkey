'use strict';

angular.module('module.composition').factory('Sequence', function (Hash) {
    function Sequence(name) {
        this.$id = Hash.random();
        this.name = name;
        this.order = 0;
        this.layers = [];
        this.active = true;
    }

    Sequence.prototype.initSource = function (element) {
    };


    return Sequence;
});
