const memory = localStorage.getItem("vistaPrevia");
const objectsExcel = [];

class Input extends ZCustomController {
  async onExcelInput_change() {
    const contentExcel = await readXlsxFile(excelInput.files[0]);
    console.log(contentExcel);

    const customKeys = [
      "correo",
      "nombre",
      "genero",
      "fechaNacimiento",
      "cargo",
      "fechaIngreso",
      "area",
      "subarea",
      "criticidad",
      "monitor",
      "administrador",
      "adminGlobal",
    ];

    for (let i = 1; i < contentExcel.length; i++) {
      const row = contentExcel[i];
      const obj = {};
      for (let j = 0; j < customKeys.length; j++) {
        obj[customKeys[j]] = row[j];
      }
      objectsExcel.push(obj);
      localStorage.setItem("vistaPrevia", JSON.stringify(objectsExcel));
    }

    console.log(objectsExcel);
  }
}
ZVC.export(Input);
