document.getElementById("SHOWADDUSER").addEventListener("click",()=>{
  let O1 = document.getElementById("ADDUSERS");
  let O2 = document.getElementById("NEWCHARGE");
  let O4 = document.getElementById("TOTALINFO");
  let O3 = document.getElementById("NEWPAYMENT");
  let O5 = document.getElementById("PAYMENTS");

  if(O1.classList.contains("FORHIDE"))
  {
    O1.classList.remove("FORHIDE");
    O2.classList.add("FORHIDE");
    O3.classList.add("FORHIDE");
    O4.classList.add("FORHIDE");
    O5.classList.add("FORHIDE");
  }
});





document.getElementById("SHOWNEWCHARGE").addEventListener("click",()=>{
  let O1 = document.getElementById("ADDUSERS");
  let O2 = document.getElementById("NEWCHARGE");
  let O4 = document.getElementById("TOTALINFO");
  let O3 = document.getElementById("NEWPAYMENT");
  let O5 = document.getElementById("PAYMENTS");

  if(O2.classList.contains("FORHIDE"))
  {
    O2.classList.remove("FORHIDE");
    O1.classList.add("FORHIDE");
    O3.classList.add("FORHIDE");
    O4.classList.add("FORHIDE");
    O5.classList.add("FORHIDE");
  }
});





document.getElementById("SHOWNEWPAYMENT").addEventListener("click",()=>{
  let O1 = document.getElementById("ADDUSERS");
  let O2 = document.getElementById("NEWCHARGE");
  let O4 = document.getElementById("TOTALINFO");
  let O3 = document.getElementById("NEWPAYMENT");
  let O5 = document.getElementById("PAYMENTS");

  if(O3.classList.contains("FORHIDE"))
  {
    O3.classList.remove("FORHIDE");
    O2.classList.add("FORHIDE");
    O1.classList.add("FORHIDE");
    O4.classList.add("FORHIDE");
    O5.classList.add("FORHIDE");
  }
});





document.getElementById("SHOWTOTALINFO").addEventListener("click",()=>{
  let O1 = document.getElementById("ADDUSERS");
  let O2 = document.getElementById("NEWCHARGE");
  let O4 = document.getElementById("TOTALINFO");
  let O3 = document.getElementById("NEWPAYMENT");
  let O5 = document.getElementById("PAYMENTS");

  if(O4.classList.contains("FORHIDE"))
  {
    O4.classList.remove("FORHIDE");
    O2.classList.add("FORHIDE");
    O3.classList.add("FORHIDE");
    O1.classList.add("FORHIDE");
    O5.classList.add("FORHIDE");
  }
});





document.getElementById("SHOWPAYMENTS").addEventListener("click",()=>{
  let O1 = document.getElementById("ADDUSERS");
  let O2 = document.getElementById("NEWCHARGE");
  let O4 = document.getElementById("TOTALINFO");
  let O3 = document.getElementById("NEWPAYMENT");
  let O5 = document.getElementById("PAYMENTS");

  if(O5.classList.contains("FORHIDE"))
  {
    O5.classList.remove("FORHIDE");
    O2.classList.add("FORHIDE");
    O3.classList.add("FORHIDE");
    O4.classList.add("FORHIDE");
    O1.classList.add("FORHIDE");
  }
});