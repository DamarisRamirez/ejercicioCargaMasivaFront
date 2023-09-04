class Load extends ZCustomController {
  async onExcelInput_change() {
    const contentExcel = await readXlsxFile(excelInput.files[0]);

    console.log(contentExcel);
  }
}
ZVC.export(Load);
