var Aes, VKCrypt, _gaq;
(function(){
  "use strict";
    
     if(!_gaq)
        loadScript('http://google-analytics.com/ga.js', ga);
        
    const PASSWORD_NAME = 'vkcrypt-pass';
    
    VKCrypt = {};
    
    function getPassword(){
        var lPass = localStorage.getItem(PASSWORD_NAME);
        
        if(!lPass)
            VKCrypt.setPassword();
        
        return lPass;
    }
      
    VKCrypt.encrypt         = function(){
        var lMsgElement = document.getElementsByClassName('im_editable')[0],
            lMsg        = lMsgElement.textContent,
            lPass       = getPassword(),
            lMsgCrypt   = Aes.Ctr.encrypt(lMsg, lPass, 256);
            
            lMsgElement.textContent = lMsgCrypt;
    };
    
     VKCrypt.decrypt        = function(){
        var lMsgElement = document.getElementsByClassName('im_editable')[0],
            lMsg        = lMsgElement.textContent,
            lPass       = getPassword(),
            lMsgCrypt   = Aes.Ctr.decrypt(lMsg, lPass, 256);
            
            lMsgElement.textContent = lMsgCrypt;
    };
    
    VKCrypt.setPassword     = function(){
        var lPass = prompt('Password: ');
        
        localStorage.setItem(PASSWORD_NAME, lPass);
    };
    
    
    function ga(){
          _gaq = [['_setAccount', 'UA-26518084-2'], ['_trackPageview']];
        
        var lOnError_f = window.onerror;
        window.onerror = function(msg, url, line) {
            var preventErrorAlert = true;
            _gaq.push(['_trackEvent',
                'JS Error',
                msg,
                navigator.userAgent + ' -> ' + url + " : " + line]);
                
            if(typeof lOnError_f === 'function')
                lOnError_f();
            
            return preventErrorAlert;
        };
    }
    
    function loadScript(pSrc, pFunc){
        var lElement = document.getElementById(pSrc);
        if(!lElement){
            var lScript     = document.createElement('script');
            
            lScript.id      =
            lScript.src     = pSrc;
            lScript.onload  = pFunc;
            
            document.body.appendChild(lScript);
        }
    }
    
})();
