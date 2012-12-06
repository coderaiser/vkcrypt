var VKCrypt;

(function(){
    "use strict";
    
    var AES_SRC         = '//github.com/coderaiser/vkcrypt/raw/master/lib/aes.js',
        VKCRYPT_SRC     = '//github.com/coderaiser/vkcrypt/raw/master/lib/vkcrypt.js',
        D               = 68;
    
    
    document.addEventListener('keydown', keyListener, false);
    

    function keyListener(){
        if(event.keyCode === D && event.altKey)
            decrypt();
        
        event.preventDefault();//запрет на дальнейшее действие
    }
    
    function decrypt(){
        loadScript(AES_SRC, function(){
            loadScript(VKCRYPT_SRC, function(){
                try{
                    VKCrypt.decrypt();
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