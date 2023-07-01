/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let currentUser = User.current();
    let accountSelect = "";
    let accountsList = [];

    if(currentUser) {
        Account.list(currentUser, (err, response) => {
          accountsList = response.data;  
          accountsList.forEach(i => {
              accountSelect += `
              <option value="${i.id}">${i.name}</option>
            `
            });

        this.element.querySelector(".accounts-select").innerHTML = accountSelect;
      });
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      this.element.reset();
      
      if (response && response.success) {
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();
        
        App.update();
      } else {
        alert(err);
      }
    });
  }
}