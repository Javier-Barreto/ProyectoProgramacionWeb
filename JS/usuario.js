 //<-------------------------------------------------------------->//
 //<-----------------CREACION DE BASE DE DATOS-------------------->//
 //<-------------------------------------------------------------->//
 let bd = JSON.parse(localStorage.getItem("PPBD"));
 let C1 = new charge("Javier Anastasio Barreto Martinez", 2500);
 if (!bd || bd == undefined) {
   bd = {
     login: "",
     users: {
       prop: [{
         Nombre: "Oskar Pablo Rolon Gonzalez",
         Telefono: 3123010101,
         Correo: "orolon@ucol.mx",
         Password: "ADMIN"
       }],
       user: [{
         Nombre: "Javier Anastasio Barreto Martinez",
         Telefono: 3121676990,
         Correo: "jbarreto2@ucol.mx",
         Password: "USER1"
       }]
     },
     charges: [],
     payments: []
   };
   bd.charges.push(C1);
   localStorage.setItem("PPBD", JSON.stringify(bd));
   console.log("Base de datos creada correctamente");
 }

 
 let userNom, i = 0;
 let userCharg = [];
 let userPaym = [];
 let userFecha = [];
 let userChargTot = 0;
 let userPaymTot = 0;
 let pagados = 0;


 //<----------------------------------------------------------------------->//
 //<------------VALIDACION SI SE ENCUENTRA LOGEADO O NO-------------------->//
 //<----------------------------------------------------------------------->//
 if (validpageloadlogin(bd.login) == true) {

 } else {
   location.replace("index.html");
 }

 function validpageloadlogin(info) {
   let valid1 = false;
   bd.users.user.forEach(element => {
     if (info == element.Telefono) {
       valid1 = true;
       userNom = element.Nombre;
     }
   });
   return valid1;
 }

 //<----------------------------------------------------------------------->//
 //<--------------------------CERRAR SESION-------------------------------->//
 //<----------------------------------------------------------------------->//
 document.getElementById("CloseSesion").addEventListener("click", () => {
   bd.login = "";
   localStorage.setItem("PPBD", JSON.stringify(bd));
 });

 //<----------------------------------------------------------------------->//
 //<--------------------------COSAS HTML-------------------------------->//
 //<----------------------------------------------------------------------->//

 bd.charges.forEach(element => {
   if (element.Nombre == userNom) {
     userCharg[i] = element.amount;
     i++;
   }
 });

 i = 0;

 bd.payments.forEach(element => {
   if (element.Nombre == userNom) {
     userPaym[i] = element.amount;
     userFecha[i] = element.date;
     i++;
   }
 });



 document.getElementById("root").innerHTML = `
    <h1>¡Bienvenido, ${userNom}!
    </h1>
    <h2>
      Pagos que has realizado
    </h2>
    <p id="pagos">
      ${Payment()}
    </p>
    <h2>
      Cobros a tu persona
    </h2>
    <p>
        ${Charge()}
    </p>
    <h2>
      Deuda faltante de pago
    </h2>
    <p>
      $${userChargTot-userPaymTot}
    </p>
`;

 function Charge() {
   for (let j = 0; j < userCharg.length; j++) {
     userChargTot += parseInt(userCharg[j]);
     if (userCharg[j] <= pagados) {
       userCharg[j] += "$ pagado <br>";
       pagados -= parseInt(userCharg[j]);
     }else {
       userCharg[j] += "$<br>"
     }
   }
   return userCharg.join("");
 }

 function Payment() {
   for (let j = 0; j < userPaym.length; j++) {
     userPaymTot += parseInt(userPaym[j]);
     userPaym[j]+="$" + " el día " +userFecha[j] + "<br>";
   }
   pagados = userPaymTot;
   return userPaym.join("");
 }
