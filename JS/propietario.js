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
  bd.users.prop.forEach(element => {
    if(info==element.Telefono)
    {
      valid1=true;
    }
  });
  return valid1;
}





//<----------------------------------------------------------------------->//
//<---------------------------FUNCION LOADINFO---------------------------->//
//<----------------------------------------------------------------------->//
let cont=0;
function loadinfo(){
  //---------------Para COBRO DE USUARIOS------------------//
  document.getElementById("CobroAUsuarios").innerHTML="";
  let i=0;
  cont=0;

  if(contarUsuarios()>1)//Si es mas de un usuario, que permita añadir la opcion de seleccionar a todos
  {
    document.getElementById("CobroAUsuarios").innerHTML=`
    <input type="checkbox" id="CALL" value="All" onchange="VALIDALL()">
    <label>Todos Los Usuarios</label><br>`;
  }

  let usuarios = JSON.parse(localStorage.getItem("PPBD"));
  usuarios.users.user.forEach(element=>{
    document.getElementById("CobroAUsuarios").innerHTML+=`
    <input type="checkbox" id="${"USER"+i}" value="${element.Nombre}">
    <label>${element.Nombre}</label><br>`;
    i++;
    cont++;
  });




  //-------------Para Un drop list-------------//
  document.getElementById("ListUsers").innerHTML=`
    <option value="Nobody">-------------------------------------------------</option>
  `;

  usuarios.users.user.forEach(element=>{
    document.getElementById("ListUsers").innerHTML+=`
    <option value="${element.Nombre}">${element.Nombre}</option>`;
  });

  MontoTotal();
  document.getElementById("PayInfo").innerHTML=``;

  document.getElementById("ListUsers2").innerHTML=`
    <option value="ALL">TODOS</option>
  `;
}

function contarUsuarios(){
  document.getElementById("CobroAUsuarios").innerHTML="";
  let usuarios = JSON.parse(localStorage.getItem("PPBD"));
  let x =usuarios.users.user.length;
  return x;
}


//<----------------------------------------------------------------------->//
//<--------------------------CERRAR SESION-------------------------------->//
//<----------------------------------------------------------------------->//
document.getElementById("CloseSesion").addEventListener("click",()=>{
  bd.login = "";
  localStorage.setItem("PPBD",JSON.stringify(bd));
});





//<----------------------------------------------------------------------->//
//<----------------------Ingresar a un nuevo usuario---------------------->//
//<----------------------------------------------------------------------->//
document.getElementById("NewUserBtn").addEventListener("click",()=>{
  let NameNew=document.getElementById("NombreNew").value;
  let TelNew=document.getElementById("TelefonoNew").value;
  let MailNew=document.getElementById("CorreoNew").value;
  let PwdNew=document.getElementById("PasswordNew").value;

  if(NameNew==""||TelNew==""||MailNew==""||PwdNew=="")
  {
    alert("Faltan Campos a Llenar para poder ingresar un nuevo usuario");
  }
  else
  {
    //let NewUser2 = {Nombre: NameNew, Telefono: TelNew, Correo: MailNew, Password: PwdNew};
    let NewUser = new user(NameNew,TelNew,MailNew,PwdNew);
    bd.users.user.push(NewUser);
    localStorage.setItem("PPBD",JSON.stringify(bd));
    loadinfo();

    alert("Nuevo usuario ingresado");

    //Limpiar los inputs
    document.getElementById("NombreNew").value="";
    document.getElementById("TelefonoNew").value="";
    document.getElementById("CorreoNew").value="";
    document.getElementById("PasswordNew").value="";
  }
});





//<----------------------------------------------------------------------->//
//<------------------------Generar cobro a usuarios----------------------->//
//<----------------------------------------------------------------------->//
let onevaliduser=false;
function onevalid()
{
  for(i=0;i<cont;i++)
  {
    if(document.getElementById("USER"+i).checked)
    {
      onevaliduser=true;
      break;
    }
  }
}


function VALIDALL(){
  document.getElementById("CobroAUsuarios").innerHTML="";

  document.getElementById("CobroAUsuarios").innerHTML+=`
  <input type="checkbox" id="CALL" value="All" onchange="loadinfo()" checked>
  <label>Todos Los Usuarios</label><br>`;
}

document.getElementById("CrearCobroBtn").addEventListener("click",()=>{
  let cantidad=document.getElementById("CCantidad").value;
  let CALLV=false;

  if(document.getElementById("CALL")==undefined)
  {
    
  }
  else
  {
    CALLV=true;
  }


  //Validacion y carga de cobros
  if(cantidad==""||cantidad==0||cantidad=="0")
  {
    alert("Ingrese una cantidad");
  }
  else
  {
      if(CALLV==true)
      {
        if(document.getElementById("CALL").checked)
        {
          bd.users.user.forEach(element=>{
            let x = new charge(element.Nombre,cantidad);
            bd.charges.push(x);
          });
        
          localStorage.setItem("PPBD",JSON.stringify(bd));
        
          alert("Se han cargado los nuevos cobros a todos los usuarios");
          //Limpiar campos:
          document.getElementById("CCantidad").value="";
          loadinfo();
        }
      }
      else
      {
        onevalid();
        if(onevaliduser==true)
        {
          for(i=0;i<cont;i++)
          {
            if(document.getElementById("USER"+i).checked)
            {
              let z = new charge(document.getElementById("USER"+i).value,cantidad);
              bd.charges.push(z);
            }
          }
          alert("Se han cargado los nuevos cobros a todos los usuarios seleccionados");
          localStorage.setItem("PPBD",JSON.stringify(bd));
          document.getElementById("CCantidad").value="";
          loadinfo();
        }
        else
        {
          alert("Seleccione al menos a un ususario")
        }
      }
  }
  document.getElementById("CCantidad").value="";
  onevaliduser=false;
});





//<--------------------------------------------------------------------->//
//<----------------------Registrar Pago a Usuario----------------------->//
//<--------------------------------------------------------------------->//
  loadinfo();//Load info carga la información de la lista para seleccionar usuarios

  let usuarioseleccionado1;
  let sumatotaldeuda=0;


  document.getElementById("ListUsers").addEventListener("change",()=>{
    if(document.getElementById("ListUsers").value=="Nobody")
    {
      document.getElementById("PayInfo").innerHTML=``;
    }
    else
    {
      document.getElementById("NewPayBtn").disabled=false;
      let i=0;
      let usuarioseleccionado2 = document.getElementById("ListUsers").value;
      
      bd.users.user.forEach(element=>{
        if(usuarioseleccionado2==element.Nombre)
        {
          sumatotaldeuda+=parseInt(bd.charges[i].amount);
        }
        i++;
      });

      document.getElementById("PayInfo").innerHTML=`
      <p>Usuario: ${usuarioseleccionado2}</p>
      <p>Deuda total: ${sumatotaldeuda}</p>
      <label>Cantidad de dinero pagado por el usuario:</label>
      <input type="text" id="PCantidad" placeholder="2500">
      <br>
      `;
      usuarioseleccionado1=usuarioseleccionado2;
    }
    sumatotaldeuda=0;
  });

  document.getElementById("NewPayBtn").addEventListener("click",()=>{
    let PCantidad = document.getElementById("PCantidad").value;
    let date = new Date();
    let datepayment = date.getFullYear()+"-"+(1+date.getMonth())+"-"+date.getDate();
    if(document.getElementById("PCantidad").value=="")
    {
      alert("Ingrese la cantidad del pago");
      document.getElementById("NewPayBtn").disabled=true;
    }
    else
    {
      let NewPay = new pay(usuarioseleccionado1,PCantidad,datepayment);
      bd.payments.push(NewPay);
      localStorage.setItem("PPBD",JSON.stringify(bd));
      document.getElementById("NewPayBtn").disabled=true;
      alert("Pago realizado correctamente");
    }
    loadinfo();
  });





//<--------------------------------------------------------------------->//
//<--------------------Monto recibido y en deudas----------------------->//
//<--------------------------------------------------------------------->//
function MontoTotal(){
  let montodeuda=0;
  let montopagado=0;

  bd.charges.forEach(element =>{
    montodeuda += parseFloat(element.amount);
  });

  bd.payments.forEach(element =>{
    montopagado += parseFloat(element.amount);
  });

  document.getElementById("Montoinfo").innerHTML = `
  <div>
    <p>Total en deudas: $${montodeuda}</p>
    <p>Total pagado: $${montopagado}</p>
    <p>----------------------------------</p>
    <p>Total:$${montopagado+montodeuda}</p>
  </div>
  `;
}





//<------------------------------------------------------------------------------>//
//<--------------------Consultar pagos por fecha o usuario----------------------->//
//<------------------------------------------------------------------------------>//
document.getElementById("BtnConsultar").addEventListener("click",()=>
{
  if(document.getElementById("ListUsers2").value=="ALL")
  {
    if(document.getElementById("ObtPagosDate").value=="")
    {
      alert("Ingrese una fecha");
    }
    else
    {
      console.log(document.getElementById("ObtPagosDate").value);
      bd.payments.forEach(element=>{
        if(element.date==document.getElementById("ObtPagosDate").value)
        {
          console.log("Hola");
        }
      });
    }
  }
});