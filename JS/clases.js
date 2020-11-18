class user{
  constructor(name,tel,mail,pwd)
  {
    this.Nombre = name;
    this.Telefono = tel;
    this.Correo = mail;
    this.Password = pwd;
  }
}

class charge{
  state=false;//Permite controlar sí el pago ya se termino de pagar completamente(true), en caso de que no, no se modificaria el valor de "no pagado"(falase)
  constructor(users,amount)
  {
    this.users = users;
    this.amount = amount;
  }
}

class pay{
  constructor(user, amount, date)
  {
    this.user = user;
    this.amount = amount;
    this.date = date;
  }
}