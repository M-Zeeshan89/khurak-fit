(function(){

const KF_CLOUD={apiKey:"AIzaSyDp0agMMJBevFX54jeGt6XXwAnVb0oUjDk",dbURL:"https://khurak-fit-default-rtdb.firebaseio.com"};
const $=s=>document.querySelector(s),out=$("#out");
if(!KF_CLOUD.apiKey){$("#web").innerHTML='<h3 style="margin-top:0">Or ask us</h3><p>Email <a href="mailto:support@khurakfit.com">support@khurakfit.com</a> from the address on your account and we will delete it within 30 days.</p>'}
function say(t,cls){out.hidden=false;out.className="msg "+(cls||"");out.textContent=t}
const ERR={INVALID_LOGIN_CREDENTIALS:"Wrong email or password.",EMAIL_NOT_FOUND:"Wrong email or password.",INVALID_PASSWORD:"Wrong email or password.",TOO_MANY_ATTEMPTS_TRY_LATER:"Too many tries. Wait a few minutes.",USER_DISABLED:"This account is turned off."};
async function auth(path,body){const r=await fetch("https://identitytoolkit.googleapis.com/v1/"+path+"?key="+encodeURIComponent(KF_CLOUD.apiKey),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});const j=await r.json().catch(()=>({}));if(!r.ok){const c=String(j.error&&j.error.message||"").split(" ")[0];throw new Error(ERR[c]||"Something went wrong. Try again.")}return j}
$("#go")&&$("#go").addEventListener("click",async()=>{
 const em=$("#em").value.trim(),pw=$("#pw").value;if(!em||!pw){say("Type your email and password.","err");return}
 if(!confirm("Delete your Khurak Fit account and backup for good?"))return;
 $("#go").disabled=true;say("Deleting…");
 try{const j=await auth("accounts:signInWithPassword",{email:em,password:pw,returnSecureToken:true});
  await fetch(KF_CLOUD.dbURL.replace(/\/+$/,"")+"/users/"+j.localId+".json?auth="+encodeURIComponent(j.idToken),{method:"DELETE"});
  await auth("accounts:delete",{idToken:j.idToken});
  say("Done. Your account and online backup are deleted.","ok");$("#pw").value=""}
 catch(e){say(e.message||"Something went wrong.","err");$("#go").disabled=false}
});

})();
