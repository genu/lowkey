describe('Unit: Testing core service', function(){
  var Core;

  beforeEach(module('app'));

  beforeEach(inject(function(_Core_){
    Core = _Core_
  }));
})
