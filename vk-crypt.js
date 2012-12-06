var VKCrypt;
function(){
  "use strict";

  var password;
      plaintext = lMsg.textContent;
      ciphertext = Aes.Ctr.encrypt(plaintext, password, 256);
      origtext = Aes.Ctr.decrypt(ciphertext, password, 256);
}();
