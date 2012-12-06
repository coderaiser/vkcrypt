var Aes, VKCrypt, _gaq;
(function(){
  "use strict";
    
    var GA_SRC = 'http://google-analytics.com/ga.js';
    
    if(!_gaq)
        loadScript(GA_SRC, ga);
        
    var KEY_NAME = 'vkcrypt-key';
    
    VKCrypt = {};
    
    function getKey(){
        var lKey = localStorage.getItem(KEY_NAME);
        
        return lKey;
    }
    
    function getMsgElement(){
        var lMsgElement = document.getElementsByClassName('im_editable')[0];
            
        if(!lMsgElement.textContent)
            lMsgElement = document.getElementsByClassName('im_editable')[1];
        
        return lMsgElement;
    }
      
    VKCrypt.encrypt         = function(){        
        var lSelected   = document.getElementsByClassName('im_sel_row');
            
        /* если выбраны сообщения собеседника */
        if(lSelected.length)
            cryptSelected(lSelected, true);
        else{
            var lMsgElement = getMsgElement(),
                lPass       = getKey(),
                lMsgCrypt,
                lMsg        = lMsg.textContent;
            
            lMsgCrypt               = Aes.Ctr.encrypt(lMsg, lPass, 256);                
            lMsgElement.textContent = lMsgCrypt;
        }
    };
    
    VKCrypt.decrypt        = function(){
        var lSelected   = document.getElementsByClassName('im_sel_row');
            
        if(lSelected.length)
            cryptSelected(lSelected, false);
        else{
            var lMsgElement = getMsgElement(),
                lPass       = getKey(),
                lMsg        = lMsgElement.textContent,
                lMsgCrypt   = Aes.Ctr.decrypt(lMsg, lPass, 256);
                
            lMsgElement.textContent = lMsgCrypt;
        }
    };
    
    VKCrypt.setKey     = function(){
        var lKey = getKey();
            lKey = prompt('Ключ: ', lKey || '');
        
        localStorage.setItem(KEY_NAME, lKey);
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
    
    function cryptSelected(pSelected, pEncrypt){
        var lAutor,
            lMsgElement,
            lPass       = getKey(),
            lMsgCrypt,
            lMsg;
            
            for(var i=0; i < pSelected.length; i++){
                lMsgElement = pSelected[i].getElementsByClassName('im_log_body')[0];
                lMsgElement = lMsgElement.firstChild;                
                lAutor      = lMsgElement.getElementsByClassName('im_log_author_chat_name')[0];
                if(lAutor)
                    lMsgElement.removeChild(lAutor);
                
                lMsg = lMsgElement.textContent;
                lMsgCrypt   = pEncrypt ? Aes.Ctr.encrypt(lMsg, lPass, 256) :
                                         Aes.Ctr.decrypt(lMsg, lPass, 256);
                
                lMsgElement.textContent = lMsgCrypt;
            }
    }
    
})();
