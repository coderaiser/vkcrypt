var VKCrypt;

(function(){
    "use strict";
    
    var AES_SRC         = '//github.com/coderaiser/vkcrypt/raw/master/lib/aes.js',
        VKCRYPT_SRC     = '//github.com/coderaiser/vkcrypt/raw/master/lib/vkcrypt.js',
        E               = 69;
        
    document.addEventListener('keydown', keyListener, false);
    
    function keyListener(){
        if(event.keyCode === E && event.altKey)
            encrypt();
        
        event.preventDefault();//запрет на дальнейшее действие
    }
    
    function encrypt(){
        loadScript(AES_SRC, function(){
            loadScript(VKCRYPT_SRC, function(){
                try{
                    VKCrypt.encrypt();
                }
                catch(pError){
                    alert(pError);
                }
            });
        });
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
        else
            pFunc();
    }
    
})();