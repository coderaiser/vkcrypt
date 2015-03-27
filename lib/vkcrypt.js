var Aes, VKCrypt, _gaq;

(function() {
    "use strict";
    
    var GA_SRC      = 'http://google-analytics.com/ga.js',
        KEY_NAME    = 'vkcrypt-key';
    
    VKCrypt         = {};
    
    if (!_gaq)
        loadScript(GA_SRC, ga);
        

    document.addEventListener('keydown', keyListener, false);
    
    function keyListener() {
        var D           = 68,
            E           = 69,
            S           = 83;    
        
        if (event.altKey)
            switch(event.keyCode) {
            case D:
                VKCrypt.decrypt();
                event.preventDefault();
                break;
            case E:
                VKCrypt.encrypt();
                event.preventDefault();
                break;                    
            case S:
                VKCrypt.setKey();
                event.preventDefault();
                break;
            }
    }
    
    function getKey() {
        var key = localStorage.getItem(KEY_NAME);
        
        return key;
    }
    
    function getMsgElement() {
        var msgEl;
        
        [   '.im_editable',
            '.im_editable:nth-child(2)',
            '#mail_box_text'
        ].some(function(result) {
            msgEl = document.querySelector(result);
            return msgEl;
        });
        
        return msgEl;
    }
    
    function setMsgText(msgEl, msgText) {
        var text   = msgEl.textContent,
            value  = msgEl.value;
        
        if (text)
            msgEl.textContent   = msgText;
        else if (value)
            msgEl.value         = msgText;
    }
      
    VKCrypt.encrypt         = function() {        
        var msgEl, key, msg, msgCrypt,
            selected = getByClass('im_sel_row');
            
        /* если выбраны сообщения собеседника */
        if (selected.length) {
            cryptSelected(selected, true);
        } else {
            msgEl       = getMsgElement(),
            key         = getKey() || VKCrypt.setKey(),
            msg         = msgEl.textContent || msgEl.value,            
            msgCrypt    = Aes.Ctr.encrypt(msg, key, 256);                
            
            setMsgText(msgEl, msgCrypt);            
        }
    };
    
    VKCrypt.decrypt        = function() {
        var msgEl, key, msg, msgCrypt,
            selected       = getByClass('im_sel_row');
        
        if (selected.length) {
            cryptSelected(selected, false);
        } else {
            msgEl       = getMsgElement(),
            key         = getKey() || VKCrypt.setKey(),
            msg         = msgEl.textContent || msgEl.value,
            msgCrypt    = Aes.Ctr.decrypt(msg, key, 256);
                
            setMsgText(msgEl, msgCrypt);
        }
    };
    
    VKCrypt.setKey     = function() {
        var keyWas = getKey() || '',
            key    = prompt('Ключ: ', keyWas) || keyWas;
        
        localStorage.setItem(KEY_NAME, key);
        
        return key;
    };
    
    
    function ga() {
          _gaq = [['_setAccount', 'UA-26518084-2'], ['_trackPageview']];
        
        window.addEventListener('error', function(msg, url, line) {
            _gaq.push([
                '_trackEvent',
                'JS Error',
                msg,
                navigator.userAgent + ' -> ' + url + " : " + line
            ]);
        });
    }
    
    function loadScript(src, fn) {
        var script,
            el  = getById(src);
        
        if (!el) {
            script      = document.createElement('script');
            script.id   =
            script.src  = src;
            script.addEventListener('load', fn);
            
            document.body.appendChild(script);
        }
    }
    
    function cryptSelected(selected, encrypt) {
        var author,
            msgEl,
            msgCrypt,
            msg,            
            key = getKey() || VKCrypt.setKey();
            
        selected.forEach(function(current) {
            msgEl   = current.getElementsByClassName('im_log_body')[0];
            msgEl   = msgEl.firstChild;                
            author  = msgEl.getElementsByClassName('im_log_author_chat_name')[0];
            
            if (author)
                msgEl.removeChild(author);
            
            msg         = msgEl.textContent;
            
            if (encrypt)
                msgCrypt = Aes.Ctr.encrypt(msg, key, 256);
            else
                Aes.Ctr.decrypt(msg, key, 256);
            
            msgEl.textContent = msgCrypt;
        })
    }
    
    function getById(id, el) {
        return (el || document).getElementById(id);
    }
    
    function getByClass(className, el) {
        return (el || document).getElementsByClassName(className);
    }
    
})();
