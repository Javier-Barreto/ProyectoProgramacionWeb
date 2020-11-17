//<-------------------------------------------------------------->//
//<-----------------CREACION DE BASE DE DATOS-------------------->//
//<-------------------------------------------------------------->//
let bd = JSON.parse(localStorage.getItem("PPBD"));
let C1= new charge("Javier Anastaiso Barreto Martinez",2500);
if(!bd || bd==undefined)
{
  bd={
    login:"",
    users:{
      prop:[{Nombre: "Oskar Pablo Rolon Gonzalez",Telefono: 3123010101,Correo:"orolon@ucol.mx",Password:"ADMIN"}],
      user:[{Nombre: "Javier Anastaiso Barreto Martinez",Telefono: 3121676990, Correo:"jbarreto2@ucol.mx",Password:"USER1"}]
    },
    charges:[],
    payments:[]
  };
  bd.charges.push(C1);
  localStorage.setItem("PPBD",JSON.stringify(bd));
  console.log("Base de datos creada correctamente");
}

//<----------------------------------------------------------------------->//
//<------------VALIDACION SI SE ENCUENTRA LOGEADO O NO-------------------->//
//<----------------------------------------------------------------------->//
if(validpageloadlogin(bd.login)==true)
{

}
else
{
  location.replace("index.html");
}

function validpageloadlogin(info){
  let valid1=false;
  bd.users.user.forEach(element => {
    if(info==element.Telefono)
    {
      valid1=true;
    }
    else
    {
      valid1=false;
    }
  });
  return valid1;
}