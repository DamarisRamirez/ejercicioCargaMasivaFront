class Table1 extends ZCustomController {
  async onThis_init() {
    this.users = await this.getUsers();
    console.log("Users ", this.users);
  }

  async getUsers() {
    const res = await fetch("http://localhost:4000/usersTable");
    const resJson = await res.json();
    console.log("resJson", resJson);
    return resJson;
  }

  onThis_activated() {
    this.usersList.refresh();
  }
  onTextSearch_change() {
    this.usersList.refresh();
  }

  onUsersList_getRows() {
    let filter = this.textSearch.value;
    return this.users
      .filter((user) => user.nombre.includes(filter))
      .map((row) => this.prepareRow(row));
  }

  prepareRow(row) {
    return row;
  }
}
ZVC.export(Table1);
