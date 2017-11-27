const expext = require('chai').expect;

let ViewPage = function () {

  let list = element.all(by.repeater('item in menu'));
  let linkElement = element(by.id('pokemon-list')).$('.ng-binding.active');
  let pokemonList = element.all(by.repeater('pokemon in pokemons'));

  this.get = function () {
     return browser.get('http://localhost:8000/#/view1')
  };

  this.getFirstLinkText = function () {
    return list.first().getText();
  };

  this.getActiveLinkText = function () {
    return linkElement.getText();
  };

  this.pokemonListCount = function () {
    return pokemonList.count();
  }
};

let MyAccountPage = function () {

  let userForm = element(by.id('userForm'));
  let inputName = element(by.id('inputName'));
  let inputEmail = element(by.id('inputEmail'));
  let inputPhonenomber = element(by.model('user.phone'));

  this.get = function () {
    return browser.get('http://localhost:8000/#/myaccount')
  };

  this.userFormIsPresent = function () {
    return userForm.isPresent();
  };

  this.AttrIsRequired = function (input) {
    if (input === 'name') {
      return inputName.getAttribute('required');
    } else if (input === 'email') {
      return inputEmail.getAttribute('required');
    } else if (input === 'phoneNomber'){
      return inputPhonenomber.getAttribute('required');
    }
  };

};

describe('e2e тесты приложение myApp', function() {
  it('Первая ссылка имеет текст "-view1-" ', function() {

    let viewPage = new ViewPage();
    viewPage.get();

    expect(viewPage.getFirstLinkText()).toEqual('-view1-');

  });

  it('Активная ссылка "-view1-" имеет класс ".ng-binding.active" ', function() {

    let viewPage = new ViewPage();
    viewPage.get();


    expect(viewPage.getActiveLinkText()).toBe('-view1-');

  });

  it('По адрессу /myaccount открывается форма" ', function() {

    let myAccountPage = new MyAccountPage();
    myAccountPage.get();

    expect(myAccountPage.userFormIsPresent()).toBe(true);

  });

  it('Все Input по адрессу /myaccount имеют атрибут "required" ', function() {

    let myAccountPage = new MyAccountPage();
    myAccountPage.get();

    expect(myAccountPage.AttrIsRequired('name')).toBeTruthy();
    expect(myAccountPage.AttrIsRequired('email')).toBeTruthy();
    expect(myAccountPage.AttrIsRequired('phoneNomber')).toBeTruthy();

  });

  it('Показано 5 покемонов', function() {

    let viewPage = new ViewPage();
    viewPage.get();

    expect(viewPage.pokemonListCount()).toBe(5);

  });

  it('Показан 1 покемон', function() {

    let viewPage = new ViewPage();
    viewPage.get();

    element(by.model('myQuery')).sendKeys('Pik');
    expect(viewPage.pokemonListCount()).toBe(1);

  });

});



