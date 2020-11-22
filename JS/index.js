//<-------------------------------------------------------------->//
//<-----------------CREACION DE BASE DE DATOS-------------------->//
//<-------------------------------------------------------------->//
let bd = JSON.parse(localStorage.getItem("PPBD"));
let C1= new charge("Javier Anastasio Barreto Martinez",2500);
if(!bd || bd==undefined)
{
  bd={
    login:"",
    users:{
      prop:[{Nombre: "Humberto Ramirez Gonzales",Telefono: 3121234567,Correo:"raghum76@ucol.mx",Password:"ADMIN"}],
      user:[{Nombre: "Javier Anastasio Barreto Martinez",Telefono: 3121676990, Correo:"jbarreto2@ucol.mx",Password:"USER1"}]
    },
    charges:[],
    payments:[]
  };
  bd.charges.push(C1);
  localStorage.setItem("PPBD",JSON.stringify(bd));
  console.log("Base de datos creada correctamente");
}



//<-------------------------------------------------------->//
//<-----------------VALIDACION DE LOGIN-------------------->//
//<-------------------------------------------------------->//
document.getElementById("IniSesion").addEventListener("click",()=>{
  if(login())
  {
    bd.login=document.getElementById("Telefono").value;
    localStorage.setItem("PPBD",JSON.stringify(bd));
    location.replace("propietario.html");
  }
  else
  {
    if(login2())
    {
      bd.login=document.getElementById("Telefono").value;
      localStorage.setItem("PPBD",JSON.stringify(bd));
      location.replace("usuario.html");
    }
    else
    {
      alert("El telefono o contraseña esta mal.");
    }
  }
});


function login(){
  let valid1=false;
  bd.users.prop.forEach(element => {
    if(element.Telefono==document.getElementById("Telefono").value&&element.Password==document.getElementById("Password").value)
    {
      valid1 = true;
    }
    else
    {
      valid1 = false;
    }
  });
  return valid1;
}

function login2(){
  let valid2=false;
  bd.users.user.forEach(element => {
    if(element.Telefono==document.getElementById("Telefono").value&&element.Password==document.getElementById("Password").value)
    {
      console.log(element);
      valid2 = true;
    }
  });
  return valid2;
}


document.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
     event.preventDefault();
     document.getElementById("IniSesion").click();
  }
});