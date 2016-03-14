(function(module){
    /**
    target = null
    activate = [true]
    format = [%D, %H:%i:%s]
    */
    var draw = function(){
        var result = document.createElement('div');
        result.className = 'ggp-clock';
        return result;
    };
    var clock = function(params){
       this.container = draw();
       if(params['target'] instanceof HTMLElement){
           params['target'].appendChild(this.container);
       }
       if(params['activate'] !== false){
    	   this.start();
        }
        this.update();
    };
    clock.prototype = {
    	updateIntervalPeriod: 1,
      format: '%D, %H:%i:%s',
    	active: false,
    	start: function(){
    	    if(this.active){
        		console.log('widget.clock: allready started');
        		return;
    	    }
    	    this.active = true;
    	},
    	stop: function(){
    	    if(!this.active){
        		console.log('widget.clock: is not runned');
        		return;
    	    }
    	    this.active = false;
    	},
      update: function(){
        var self = this;
        setTimeout(function(){
          try{
            if(self.active === true){
              self.container.innerHTML = date_formatted(self.format);
            }
          }catch(e){
            self.container.innerHTML = 'unable to update';
          }
          self.update();
        },this.updateIntervalPeriod);
      }
    };
    module.clock = clock;
})(window);