import logo from "./logo.svg";
import "./App.css";
import readXlsxFile from "read-excel-file";
import Leftside from "./Leftside";
import { Button } from "react-bootstrap";
import Rightside from "./Rightside";
import SearchField from "react-search-field";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import React, { useCallback, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { Table } from "antd";
import "antd/dist/antd.css";
export function App() {
  const [ dataHandler, setDataHandler ] = useState([]);
  const [dataSearch,setdataSearch] = useState([])
  let preparedData = [];


 
  const fileHandler = (event) => {
   
    event.preventDefault();

    let fileObj = event.target.files[0];
    console.log(fileObj);
    const filereader = new FileReader();

    filereader.onload = function (event) {
      var data = event.target.result;
      let readedData = XLSX.read(data, { type: "binary" });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      /* Convert array to json*/
      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log(dataParse);
      dataParse.forEach((data, index) => {
        preparedData.push({
          key: index,
          shloka: data[0],
          book: data[1],
          god: data[2],
          avatar: data[3],
          link: data[4],
        });
      });

      console.log(preparedData)
      // setFileUploaded(dataParse);
    };

    filereader.readAsBinaryString(fileObj);
    //just pass the fileObj as parameter
    // ExcelRenderer(fileObj, (err, resp) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     this.setState({
    //       cols: resp.cols,
    //       rows: resp.rows,
    //     });
    //   }
    // });
  };
  const setTabledata = ()=>{
    console.log(preparedData)
    setDataHandler(preparedData)
  }
const search = useMemo(()=>{
 
  if(!dataSearch){
   
    return dataHandler
  }
  else{
    
 
    return dataHandler.filter((row,index)=>{
      return(
        row.god.toLowerCase().includes(dataSearch)
        
      )
      //  return row[key] == data[key] ? row :null
    })
  
   
  }
 
  
 
},[dataSearch,dataHandler])

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Shloka",
      dataIndex: "shloka",
      key: "shloka",
    },
    {
      title: "Book",
      dataIndex: "book",
      key: "book",
    },
    {
      title: "God",
      dataIndex: "god",
      key: "god",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
    },
  ];
  return (
    <div className="App">
      <div className="App-left">
        <Leftside />
      </div>
      <h1>Rv college of engineering</h1>
      <marquee className="marquee"><b>GO CHANGE THE WORLD !!!!!!</b></marquee>
      <div className="App-left-search">
        <input
          type="file"
          onChange={(e)=>fileHandler(e)}
          style={{ padding: "10px" }}
        />
              <button  onClick={setTabledata}>Upload file</button>
              <br></br>
              <br></br>
              <br></br>
              <label className="search_label">search</label>
      <input onChange={(e)=>setdataSearch(e.target.value)} />
      </div>
      <div className="display">
      <Table dataSource={search} columns={columns} />;
      </div>
      {/* <div className="App-left-button">
          <Button style={{ height: "50px", width: "100px" }}>
            <h4>browse</h4>
          </Button>
        </div> */}
      {/* <div className="Right">
          <Rightside />

        </div> */}
      {/* <OutTable
          // data={this.state.rows}
          // columns={this.state.cols}
          tableClassName="ExcelTable2007"
          tableHeaderRowClass="heading"
        /> */}
    </div>
  );
}

export default App;
