// getAllRows() {
    const rows = [];
    this.gridApi?.api.forEachNode((e,i) => rows[i] = e.data);
    return rows;
// }
// console.dir(getAllRows());
