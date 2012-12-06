var VKCrypt;

(function(){
    "use ctrict";
    
    const   AES_SRC         = '//github.com/coderaiser/vk-crypt/raw/master/lib/aes.js',
            VKCRYPT_SRC     = '//github.com/coderaiser/vk-crypt/raw/master/lib/vkcrypt.js';
    
    
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