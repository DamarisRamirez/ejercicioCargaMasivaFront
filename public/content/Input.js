const objectsExcel = [];

class Input extends ZCustomController {
  onThis_init() {}

  async onExcelInput_change() {
    const contentExcel = await readXlsxFile(excelInput.files[0]);
    objectsExcel.push(contentExcel);
  }

  async onPostBtn_click() {
    if (!objectsExcel[0]) {
      Swal.fire({
        title: "Error!",
        text: "No se ha cargado correctamente el archivo",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }
    const formattedObjects = objectsExcel[0].slice(1).map((row) => {
      return {
        correo: row[0],
        nombre: row[1],
        genero: row[2],
        fecha_nacimiento: row[3] ? new Date(row[3]).toDateString() : null,
        cargo: row[4],
        fecha_ingreso: row[5] ? new Date(row[5]).toDateString() : null,
        area_id: parseInt(row[6]),
        subarea_id: parseInt(row[7]),
        criticidad: parseInt(row[8]),
        monitor: row[9],
        administrador: row[10],
        adminglobal: row[11],
      };
    });

    try {
      const post = await fetch("http://localhost:4000/inputUsers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedObjects),
      });

      if (post.ok) {
        Swal.fire({
          title: "Listo!",
          text: "Se han cargado los usuarios",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        return;
      } else {
        Swal.fire({
          title: "Error!",
          text: "Hubo un problema con los registros",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Hubo un error al procesar la solicitud",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  }
}
ZVC.export(Input);
