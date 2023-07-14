"use client"
import React, { useEffect, useRef, useState } from 'react'
import styles from "../page.module.css"
import axiosInstance from '../utilities/axiosInterceptors';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import {MultiSelect} from "primereact/multiselect"
function Reports() {
    const cols = [
        { field: 'id', header: 'ID' },
        { field: 'kilometer', header: 'Kilometer' },
        { field: 'plate', header: 'Plate' },
        { field: 'image', header:'Image'}
    ];
  const [cars, setCars] = useState([])
  const [selectedCars, setSelectedCars] = useState([])
  const [selectedColumns, setSelectedColumns] = useState([])
  const [visibleColumns, setVisibleColumns] = useState(cols)
  const dt = useRef();
  useEffect(() =>{
    fetchCars();
  }, [])

  const fetchCars = () => {
    axiosInstance.get("Cars/getall").then(response => {
        setCars(response.data);
    })
  }



  const exportPdf = () => {
    import('jspdf').then((jsPDF) => {
        import('jspdf-autotable').then(() => {
            const doc = new jsPDF.default(0, 0);
            const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));
            doc.autoTable(exportColumns, cars,{margin:{top:25}});
            console.log(doc);
            var img = new Image()
            img.src = "logo.png";
            doc.addImage(img, 'png', 120, 0, 15, 15)
            doc.save('cars.pdf');
        });
    });
  }

  const exportToCsv = () => {
    dt.current.exportCSV({ selectionOnly:true });
  }


  const imageColumnTemplate = (row) => {
    return <img className='table-img' src={row.image}></img>
  }

  const headerTemplate = () => {
    return <div> 
        <MultiSelect value={visibleColumns} options={cols} optionLabel="header" onChange={onColumnToggle} className="w-full sm:w-20rem" display="chip" />
        <Button onClick={exportExcel} label='Export Excel' severity='info'></Button> 
        <Button onClick={exportPdf} label='Export PDF' severity='success' className='mx-2'></Button>
        <Button onClick={exportToCsv} label='Export CSV' severity='danger' className='mx-2'></Button>
        <Button onClick={() => { console.log(selectedColumns) }} label='Seçilileri Yazdır' severity='danger' className='mx-2'></Button>
        </div>
  }

  const onColumnToggle = (event) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = cols.filter((col) => selectedColumns.some((sCol) => sCol.field === col.field));

    setVisibleColumns(orderedSelectedColumns);
};



  const saveAsExcelFile = (buffer, fileName) => {
    import('file-saver').then((module) => {
        if (module && module.default) {
            let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            let EXCEL_EXTENSION = '.xlsx';
            const data = new Blob([buffer], {
                type: EXCEL_TYPE
            });
            module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
        }
    });
};

  const exportExcel = () => {
    import('xlsx').then((xlsx) => {
        // databaseden raporlanacak veriyi tekrar al.
        // kullanıcı bunu seçtimi?
        let dataToExport = cars.map(i=> { return {id:i.id, kilometer:i.kilometer, plate:i.plate, kurum:"TKI"}  })
        const worksheet = xlsx.utils.json_to_sheet(dataToExport);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
        // byte[]
        const excelBuffer = xlsx.write(workbook, {
            bookType: 'xlsx',
            type: 'array'
        });

        saveAsExcelFile(excelBuffer, 'cars');
    });
  }


  // npm install xlsx jspdf jspdf-autotable
  // Client Side Pagination
  return (
    <main className={styles.main}>
        <DataTable selectionMode='checkbox' selection={selectedCars} onSelectionChange={(e) => setSelectedCars(e.value)}  ref={dt} header={headerTemplate} value={cars} paginator rows={5} rowsPerPageOptions={[5,10,20,30]}>
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
            {visibleColumns.map(col=> 
            {
                return <Column field={col.field} key={col.field} header={col.header}></Column>
            })}
        </DataTable>

    <div>
        <div className='d-flex flex-direction-column'>
        <label className='mx-2'>ID</label>
        <input onChange={(e) => {
            if(e.target.checked == true){
                setSelectedColumns([...selectedColumns,"id"])
            }else{
                setSelectedColumns((oldColumns) => oldColumns.filter(i=>i != "id"))
            }}} className='form-check' type="checkbox"  />
        </div>
        <div className='d-flex flex-direction-column'>
        <label className='mx-2'>KM</label>
        <input
         onChange={(e) => {
            console.log(e);
            if(e.target.checked == true){
                setSelectedColumns([...selectedColumns,"kilometer"])
            }else{
                setSelectedColumns((oldColumns) => oldColumns.filter(i=>i != "kilometer"))
            }}}
             className='form-check' type="checkbox"  />
        </div>
        <div className='d-flex flex-direction-column'>
        <label className='mx-2'>Plate</label>
        <input className='form-check' type="checkbox"  />
        </div>
        <div className='d-flex flex-direction-column'>
        <label className='mx-2'>Image</label>
        <input className='form-check' type="checkbox"  />
        </div>
    </div>
    </main>
  )
}

export default Reports