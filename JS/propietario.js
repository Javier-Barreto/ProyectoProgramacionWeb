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
    <input type="checkbox" class="checkboxes" id="CALL" value="All" onchange="VALIDALL()">
    <label class="checkboxtext">Todos los usuarios</label><br>`;
  }

  let usuarios = JSON.parse(localStorage.getItem("PPBD"));
  usuarios.users.user.forEach(element=>{
    document.getElementById("CobroAUsuarios").innerHTML+=`
    <input type="checkbox" class="checkboxes" id="${"USER"+i}" value="${element.Nombre}">
    <label class="checkboxtext">${element.Nombre}</label><br>`;
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

  usuarios.users.user.forEach(element=>{
    document.getElementById("ListUsers2").innerHTML+=`
    <option value="${element.Nombre}">${element.Nombre}</option>`;
  });
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
  let validTel=false;
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
    bd.users.user.forEach(element=>{
      if(element.Telefono==TelNew)
      {
        validTel=true;
      }
    });

    if(validTel==true)
    {
      alert("Ya existe el número de telefono que usted ingreso");
    }
    else
    {
      //let NewUser2 = {Nombre: NameNew, Telefono: TelNew, Correo: MailNew, Password: PwdNew};
      let NewUser = new user(NameNew,TelNew,MailNew,PwdNew);
      bd.users.user.push(NewUser);
      localStorage.setItem("PPBD",JSON.stringify(bd));
      loadinfo();

      alert("Nuevo usuario ingresado");
    }

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
  <input type="checkbox" class="checkboxes" id="CALL" value="All" onchange="loadinfo()" checked>
  <label class="checkboxtext">Todos Los Usuarios</label><br>`;
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
            let x = new charge(element.Nombre,parseInt(cantidad));
            bd.charges.push(x);
          });
        
          localStorage.setItem("PPBD",JSON.stringify(bd));
        
          alert("Se han cargado los nuevos cobros a todos los usuarios");
          //Limpiar campos:
          document.getElementById("CCantidad").value="";
          loadinfo();
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
                let z = new charge(document.getElementById("USER"+i).value,parseInt(cantidad));
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
      else
      {
        onevalid();
        if(onevaliduser==true)
        {
          for(i=0;i<cont;i++)
          {
            if(document.getElementById("USER"+i).checked)
            {
              let z = new charge(document.getElementById("USER"+i).value,parseInt(cantidad));
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
  let restar = 0;

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

      document.getElementById("PayInfo").innerHTML=`
      <p>Usuario: ${usuarioseleccionado2}</p>
      <label>Cantidad de dinero pagado por el usuario:</label>
      <input type="number" id="PCantidad" placeholder="0">
      <br>
      `;
      usuarioseleccionado1=usuarioseleccionado2;
    }
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
      if(PCantidad==0)
      {
        alert("No puede ingresar un pago de 0");
      }
      else
      {
        if(VALIDPCANTIDAD()-(VALIDPCANTIDAD2()+parseFloat(PCantidad))==0||VALIDPCANTIDAD()-(VALIDPCANTIDAD2()+parseFloat(PCantidad))>0)
        {
          let NewPay = new pay(usuarioseleccionado1,PCantidad,datepayment);
          bd.payments.push(NewPay);
          localStorage.setItem("PPBD",JSON.stringify(bd));
          document.getElementById("NewPayBtn").disabled=true;
          alert("Pago realizado correctamente");
        }
        else
        {
          alert("Ingrese un pago que pague el total de la deuda");
        }
      }
    }
    loadinfo();
  });


function VALIDPCANTIDAD()
{
  let montodeuda=0;
  bd.users.user.forEach(element=>{
    bd.charges.forEach(element3=>{
      if(element.Nombre==element3.Nombre&&usuarioseleccionado1==element3.Nombre)
      {
        montodeuda += parseFloat(element3.amount);
      }
    });
  });
  return parseFloat(montodeuda);
}

function VALIDPCANTIDAD2()
{
  let montopagado=0;
  bd.users.user.forEach(element=>{
    bd.payments.forEach(element3=>{
      if(element.Nombre==element3.Nombre&&usuarioseleccionado1==element3.Nombre)
      {
        montopagado += parseFloat(element3.amount);
      }
    });
  });
  return parseFloat(montopagado);
}






//<--------------------------------------------------------------------->//
//<--------------------Monto recibido y en deudas----------------------->//
//<--------------------------------------------------------------------->//
function MontoTotal(){
  document.getElementById("Montoinfo").innerHTML ="";
  let montodeuda=0;
  let montopagado=0;

  bd.users.user.forEach(element=>{
    bd.payments.forEach(element2=>{
      if(element.Nombre==element2.Nombre)
      {
        montopagado += parseFloat(element2.amount);
      }
    });

    bd.charges.forEach(element3=>{
      if(element.Nombre==element3.Nombre)
      {
        montodeuda += parseFloat(element3.amount);
      }
    });
    document.getElementById("Montoinfo").innerHTML += `
    <div class="CARDMI">
      <p>Usuario: <br>${element.Nombre}</p>
      <p>Total en deudas: <br>$${montodeuda-montopagado}</p>
      <p>Total pagado: <br>$${montopagado}</p>
    </div>
    `;
    montodeuda=0;
    montopagado=0;
  });
}





//<------------------------------------------------------------------------------>//
//<--------------------Consultar pagos por fecha o usuario----------------------->//
//<------------------------------------------------------------------------------>//
document.getElementById("BtnConsultar").addEventListener("click",()=>
{
  if(document.getElementById("ListUsers2").value=="ALL")
  {
    if(bd.payments.length==0)
    {
      document.getElementById("FechaPagoInfo").innerHTML=`
      <div class="DivPagoCard">
        <p>NO HAY PAGOS REGISTRADOS</p>
      </div>`;
    }
    else
    {
      if(document.getElementById("ObtPagosDate").value=="")
      {
        alert("Ingrese una fecha");
      }
      else
      {
        document.getElementById("FechaPagoInfo").innerHTML="";
        bd.payments.forEach(element=>{
          if(element.date==document.getElementById("ObtPagosDate").value)
          {
            document.getElementById("FechaPagoInfo").innerHTML+=`
            <div class="CARDMI">
              <p>Fecha: ${element.date}</p>
              <p>Usuario: <br>${element.Nombre}</p>
              <p>Cantidad pagada: <br>$${element.amount};
            </div>
            `;
          }
        });
      }
    }
  }
  else
  {
    if(bd.payments.length==0)
    {
      document.getElementById("FechaPagoInfo").innerHTML=`
      <div class="CARDMI">
        <p>NO HAY PAGOS REGISTRADOS</p>
      </div>`;
    }
    else
    {
      if(document.getElementById("ObtPagosDate").value=="")
      {
        alert("Ingrese una fecha");
      }
      else
      {
        document.getElementById("FechaPagoInfo").innerHTML="";
        bd.payments.forEach(element=>{
          if(element.date==document.getElementById("ObtPagosDate").value&&element.Nombre==document.getElementById("ListUsers2").value)
          {
            document.getElementById("FechaPagoInfo").innerHTML+=`
            <div class="CARDMI">
              <p>Fecha: ${element.date}</p>
              <p>Usuario: <br>${element.Nombre}</p>
              <p>Cantidad Pagada: <br>${element.amount}</p>
            </div>
            `;
          }
        });
      }
    }
  }
});