"use strict";
// OOP Sandbox: Object Oriented Programs are self contained blocks of code. It was developed with the goal of organizing code to make it more flexible and easier to maintian.

//Classes and instances (traditional oop): The class acts as a set of rules (or blueprint) to build things upon.
//all objectsccreated in the class is called an Instance. The instance is like a real house created from the abstract blueprint (class), and the beauty is you can create multiple objects from a class.
//Four fundimental principles in designing a class:
//1: Abstraciton; ignoring or hiding details that don't matter.
//2: Encapsulation; To keep some properties and methods private inside the class. So they are not accessible from outside the class, some methods can be exposed as a public interface(API).
//3: Inheritance; One class can inherrit from the other, meaning a Parent class extends to a child class, and the child class inheritits all the properties and methods of the parent class, child class can have it's own methods and properties as well as it's inherrited methods and properties.
//4: Polymorphism; A child class can overwrite a method it inherited from a parent class.

//==================================================================
//Prototypes:
//Objects are linked to a prototype object. The prototype object contains methods and properties that all objects linked to that prototype can use. Also known as prototypal inheritance. Behavior (methods) is delegated to the linked prototype object.
//Ways of implimenting prototypal inheritance in Javascript:
//1: constructor functions; a techniqe to create objects froma  function.
//2: ES6 classes: "Syntactics sugar" behind the scenes ES6 classes work exactly like constructor functions, they do NOT behave like classis in classical OOP.
//3: Object.create() The easiest and most straightforward way of linking an object to a prototype object.

//==================================================================
//Coding Sandbox, OOP into practice:
//====================================
//1: Constructor functions:
//Constructors functions ALWAYS start with a capital letter, arrow functions do NOT work in constructor functions:
const Person = function (firstName, birthYear) {
  //Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
  //Never create a method inside of a constructor function! Instead use prototypes and prototypal inheritance!
};

//Always call it with the "new"
const jeff = new Person("Jeffrey", 1983);
console.log(jeff);

//1. New {} is created
//2. function is called, this = {}
//3. {} linked to prorotype.
//4. function automatically return {}

const matilda = new Person("Matilda", 2017);
const jack = new Person("Jack", 1975);
console.log(matilda, jack);

//Check if Jeff is an instanceof the Person constructor function:
console.log(jeff instanceof Person);

//2: Prototypes, Prototypal inheritance in aciton:

console.log(Person.prototype);

//Introducing the clacAge method into the prototype:
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

//You can change the name below to Matilda or Jack because of prototypal inheritance.
jeff.calcAge();

//Check the proto on Jeff:
console.log(jeff.__proto__);

//Another example of setting properties on a prototype:
Person.prototype.species = "Homo Sapiens";

//Call it here:
console.log(matilda);

//Check for properties, will return a true/false value:
console.log(jeff.hasOwnProperty("firstName"));

//Prototype inheritance on built on Built-In objects:
//Add a new method to a prototype array, fun little practice, but NEVER do this:

const arr = [3, 6, 6, 5, 6, 9, 9, 9];
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

//PUT IT ALL TOGETHER! TEST AND EXAMPLE BELOW!!!
//==========================================================================================
//Test myself creating two car objects, that accelerate and brake by 10mph increments:

const NewCar = function (make, speed) {
  //Instance properties
  this.make = make;
  this.speed = speed;
  //Never create a method inside of a constructor function! Instead use prototypes and prototypal inheritance!
};
//First Car:
const viper = new NewCar("Dodge Viper", 55);
console.log(viper);

//Second car:
const bmw = new NewCar("BMW M2", 55);
console.log(bmw);

//impliment Accelerate method:
NewCar.prototype.accelerate = function () {
  this.speed += 10;

  //Use a template literal in the log to put it all together:
  console.log(`${this.make} is going at ${this.speed}`);
};
//impliment Brake method:
NewCar.prototype.brake = function () {
  this.speed -= 10;

  //Put it in the log:
  console.log(`${this.make} is going at ${this.speed}`);
};

//call the Accelerate and Brake functions as many times as you like for each car:
//Viper calls:
viper.accelerate();
viper.accelerate();
viper.accelerate();
viper.brake();
viper.accelerate();
//BMW calls:
bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
bmw.brake();

//=========================================================================
//Impliment person using a class:

//class expression:
// const PersonCl = class {};

//class declaration:
class PersonCL {
  //method of the class that NEEDS to be called constructor:
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  //Add methods:
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  //Adding a getter from next lesson as a demonstraiton:
  get age() {
    return 2037 - this.birthYear;
  }
}

//create new object:
const jessica = new PersonCL("Jessica", 1983);

//Call the object and method:
jessica.calcAge();
jessica.greet();

console.log(jessica);

// Classes are amazing, but Rememeber that classes are NOT HOISTED. Classes are first-class citizens, meaning they can be passed into functions and returned from functions. The body of the class is always executed in strict mode.
//Classes are awesome because they put it all into one very nice small package which makes it look nicer.

//===========================================

//Getters and Setters - they get and set values.

//simple object literal to demonstrate:
const account = {
  owner: "jeff",
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);

account.latest = 50;
console.log(account.movements);
//////////////////////////////////////////////////////
//=======================================================

//Object.Create:
//============================================
//Object.create method: Manually sets the prototype of an object to any object.

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  //Added for sarah below, 'init' can be any name. this is considered the better way to do it.)
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

//Creates an empty object linked to the PersonProto above.
const steven = Object.create(PersonProto);
console.log(steven);
//Now to add properties:
steven.name = "Steven";
steven.birthYear = 2002;
//call it to see it now populated:
steven.calcAge();

//Shows the proto of Steven in the console:
console.log(steven.__proto__);

//More refined way to do the above:
const sarah = Object.create(PersonProto);
sarah.init("Sarah", 1979);
sarah.calcAge();

///====================================================

///===================================================
// Prototype Chain:

//Parent Constructor function
const ParentCar = function (make, model, topSpeed) {
  this.make = make;
  this.model = model;
  this.topSpeed = topSpeed;
};

ParentCar.prototype.carAero = function () {
  console.log(`${this.topSpeed - 8} MPH instead of 150 due to aero drag`);
};

//Building a Child constructor function, should have the same functions as the above but have things added to it:
const ChildCar = function (make, model, topSpeed, yearMade) {
  //Use the "call method to obtain data from the ParentCar element for the child element:
  ParentCar.call(this, make, model, topSpeed);
  //Now we have everything from the ParentCar but we can add things to the child car below:
  this.yearMade = yearMade;
};

// Linking between the Parent and Child prototypes manually using Object.create, be sure to insert it here:
ChildCar.prototype = Object.create(ParentCar.prototype);

ChildCar.prototype.introduce = function () {
  console.log(
    `This is a ${this.make} ${this.model} that was made in ${this.yearMade} and has a top speed of ${this.topSpeed}`
  );
};

const camaro = new ChildCar("Chevy", "Camaro", 150, 2019);
console.log(camaro);

camaro.introduce();
//Now that there is a manual connection between the prototypes, the child can call ont he parent method of carAero:
camaro.carAero();

//==============================================
// Implimenting inherritance between ES6 classes instead:

//Parent Constructor function
const ParentCarCl = function (make, model, topSpeed) {
  this.make = make;
  this.model = model;
  this.topSpeed = topSpeed;
};

ParentCarCl.prototype.carAero = function () {
  console.log(`${this.topSpeed - 8} MPH instead of 145 due to aero drag`);
};

class ChildCarCl extends ParentCarCl {
  constructor(make, model, topSpeed, yearMade) {
    //   // Always needs to happen first!:
    super(make, model, topSpeed);
    this.yearMade = yearMade;
  }

  //Here is the introduce method again:
  introduce() {
    console.log(
      `This is a ${this.make} ${this.model} that was made in ${this.yearMade} and has a top speed of ${this.topSpeed}`
    );
  }

  //Overriding the carAero method, // this out to see the original message!:
  carAero() {
    console.log(
      `Added the aero package and the car's top speed changed: ${
        this.topSpeed - 5
      }`
    );
  }
}

//See how ChildCarCl inherited all of the properties of the parent class for the Mustang?
const mustang = new ChildCarCl("Ford", "Mustang", 145, 2016);
mustang.introduce();
//it can also still use the carAero method:
mustang.carAero();

///============================================================================
//Cleanest most perfect method for creating an Object, Inheritance between "classes" Object.create:

//Parent Constructor function for the object:
const ParentCarProto = {
  //Putting our carAero method in to show the inheritance:
  carAero() {
    console.log(
      `This Mazdaspeed Miata has a top speed of ${
        this.topSpeed - 3
      } MPH due to the autocross spoiler on the rear`
    );
  },
  init(make, model, topSpeed) {
    this.make = make;
    this.model = model;
    this.topSpeed = topSpeed;
  },
};

//Creating the child prototype:
const ChildCarProto = Object.create(ParentCarProto);
ChildCarProto.init = function (make, model, topSpeed, modelYear) {
  ParentCarProto.init.call(this, make, model, topSpeed);
  //New stuff for the child prototype:
  this.modelYear = modelYear;

  //Here is the introduce method again:
  ChildCarProto.introduce = function () {
    console.log(
      `This is a ${this.make} ${this.model} that was made in ${this.modelYear} and has a top speed of ${this.topSpeed}`
    );
  };
};

const miata = Object.create(ChildCarProto);
miata.init("Mazdaspeed", "Miata", 145, 2004);
miata.introduce();
miata.carAero();

// ES6 classes are the NORM for the real world, so study them and be prepared.

///===================================================================================
// Encapsulation: Protected Properties and Methods:
//Why encapsulate? First reason is to prevent code from outside of a class to manipulate our data inside a class.
//Another class example:

console.log("This is a bankist example below:");

class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    //adding new methods inside th constructor:
    this.movements = [];
    this.locale = navigator.language;

    console.log(`Thanks for opening an acocunt ${owner}!`);
  }

  //deposit method:
  deposit(val) {
    this.movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this.approveLoan(val)) {
      this.deposit(val);
      console.log(`loan approved`);
    }
  }
}

const account1 = new Account("Jeff", "USD", 1111);

account1.deposit(250);
account1.withdraw(140);
account1.requestLoan(1000);

console.log(account1);

//================================================================
// Chaining Methods:

// account1
//   .deposit(300)
//   .deposit(500)
//   .widthdraw(35)
//   .requestLoan(1000)
//   .withdraw(4000);
