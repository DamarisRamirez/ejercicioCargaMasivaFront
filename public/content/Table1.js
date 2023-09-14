const selectToDelete = [];

class Table1 extends ZCustomController {
  async onThis_init() {
    this.users = await this.getUsers();
  }

  async getUsers() {
    const res = await fetch("http://localhost:4000/usersTable");
    const resJson = await res.json();
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
    if (row.active) {
      row._rowClass = "table-danger";
      row.iconActive = "<i class='far fa-check-square'></i>";
    } else {
      delete row._rowClass;
      row.iconActive = "<i class='far fa-square'></i>";
    }
    return row;
  }

  onUsersList_cellClick(row, rowIndex, field) {
    if (field == "iconActive") {
      row.active = !row.active;
      const exists = selectToDelete.findIndex(
        (item) => item.correo === row.correo
      );
      if (row.active && exists === -1) {
        selectToDelete.push({ correo: row.correo });
      } else if (!row.active && exists !== -1) {
        selectToDelete.splice(exists, 1);
      }
      console.log(selectToDelete);
      this.usersList.updateRow(rowIndex, this.prepareRow(row));
    }
  }

  onDeleteBtn_click() {
    if (!selectToDelete[0]) {
      Swal.fire("Vacío", "No hay registros por eliminar", "info");
    } else {
      Swal.fire({
        title: "¿Está seguro?",
        text: "Eliminará de manera permanente estos usuarios",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#716add",
        confirmButtonText: "Si, eliminar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const dlt = await fetch("http://localhost:4000/deleteUsers", {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(selectToDelete),
            });
            if (dlt.ok) {
              Swal.fire("¡Listo!", "Se han borrado los registros.", "success");
            } else {
              Swal.fire(
                "Error",
                "No se han podido eliminar los registros",
                "error"
              );
            }
          } catch {
            console.error("Error al eliminar usuarios:", error);
            Swal.fire("Error", "Ha ocurrido un error interno.", "error");
          }
        }
      });
    }
  }
}
ZVC.export(Table1);
