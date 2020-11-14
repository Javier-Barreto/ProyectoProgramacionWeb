class user{
  constructor(nombre, telefono, correo, password)
  {
    this.nombre = nombre;
    this.telefono = telefono;
    this.correo = correo;
    this.password = password;
  }
}

class charge{
  state=false;//Permite controlar sí el pago ya se termino de pagar completamente(true), en caso de que no, no se modificaria el valor de "no pagado"(falase)
  constructor(users,amount)
  {
    this.users = users;
    this.amount = amount;
    this.paymentstate = this.state;
  }
}

class payment{
  constructor(user, amount)
  {
    this.user = user;
    this.amount = amount;
  }
}