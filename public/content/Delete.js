const usersExcel = [];
class Delete extends ZCustomController {
  onThis_init() {}

  async onExcelInput_change() {
    const contentExcel = await readXlsxFile(excelInput.files[0]);
    usersExcel.push(contentExcel);
  }

  async onDeleteBtn_click() {
    const formatedUsers = usersExcel[0].slice(1).map((row) => {
      return {
        correo: row[0],
      };
    });

    console.log(formatedUsers);

    if (!usersExcel[0]) {
      Swal.fire({
        title: "Error!",
        text: "No se ha cargado correctamente el archivo",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
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
              body: JSON.stringify(formatedUsers),
            });

            Swal.fire("¡Listo!", "Se han borrado los registros.", "success");
          } catch {
            console.error("Error al eliminar usuarios:", error);
            Swal.fire(
              "Error",
              "Ha ocurrido un error al eliminar los registros.",
              "error"
            );
          }
        }
      });
    }
  }
}

ZVC.export(Delete);
