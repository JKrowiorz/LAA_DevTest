import React, { useState } from 'react';
import './App.css';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const App = () => {
  //display splits in this order
  var mlb_item_order = ['Overall','AL','NL','C','1B','2B','3B','SS','LF','CF','RF','DH'];
  var aaa_item_order = ['Overall','INT','PCL','C','1B','2B','3B','SS','LF','CF','RF','DH'];

  //create a Leagues array to iterate over
  var lgArray = {'MLB' : mlb_item_order, 'AAA': aaa_item_order}

  //pin the leagues rows to the top of the grid
  var rowsToPin = ['Overall','AL','NL','INT','PCL']
  
  //ingest json
  let leagueAverages = require('../src/LeagueAvg.json')
    
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  let content = [];

  for (var key in lgArray) {
    content.push(
      <p><div className="ag-theme-alpine" style={{ height: 625, width: 1600 }}>
      <AgGridReact
        rowData = { 
          mapOrder(leagueAverages
            .filter(leagueAverages => leagueAverages.league == key)
            .filter(leagueAverages => !rowsToPin.includes(leagueAverages.split)), lgArray[key], 'split')} 
        pinnedTopRowData = { 
          mapOrder(leagueAverages
            .filter(leagueAverages => leagueAverages.league == key)
            .filter(leagueAverages => rowsToPin.includes(leagueAverages.split)), lgArray[key], 'split')}>
        <AgGridColumn headerName={key}>
          <AgGridColumn valueGetter={splitTitle} headerName="" cellStyle={{ 'background-color': '#aaa9a9', 'font-weight': 'bold', 'text-align': 'center', 'font-size': 'x-small', 'cell-padding': '0' }} width="100"></AgGridColumn>
          <AgGridColumn field="age" headerName="Age" valueFormatter={oneDecimal} sortable='true' cellStyle={{ 'text-align': 'center', 'font-size': 'x-small', 'font-weight': 'bold' }} width="100"></AgGridColumn>
          <AgGridColumn field="prospect_age" headerName="Prospect Age" valueFormatter={oneDecimal} sortable='true' wrapText='true' cellStyle={{ 'text-align': 'center', 'font-size': 'x-small', 'font-weight': 'bold' }} width="100"></AgGridColumn>
          <AgGridColumn field="avg" headerName="AVG" valueFormatter={threeDecimals} sortable='true' cellStyle={{ 'text-align': 'center', 'font-size': 'x-small', 'font-weight': 'bold' }} width="100"></AgGridColumn>
          <AgGridColumn field="obp" headerName="OBP" valueFormatter={threeDecimals} sortable='true' cellStyle={{ 'text-align': 'center', 'font-size': 'x-small', 'font-weight': 'bold' }} width="100"></AgGridColumn>
          <AgGridColumn field="slg" headerName="SLG" valueFormatter={threeDecimals} sortable='true' cellStyle={{ 'text-align': 'center', 'font-size': 'x-small', 'font-weight': 'bold' }} width="100"></AgGridColumn>
          <AgGridColumn field="ops" headerName="OPS" valueFormatter={threeDecimals} sortable='true' cellStyle={{ 'text-align': 'center', 'font-size': 'x-small', 'font-weight': 'bold' }} width="100"></AgGridColumn>
          <AgGridColumn field="tm_ops" headerName="TM OPS" valueFormatter={threeDecimals} sortable='true' cellStyle={{ 'text-align': 'center', 'font-size': 'x-small', 'font-weight': 'bold' }} width="100"></AgGridColumn>
          <AgGridColumn field="woba" headerName="wOBA" valueFormatter={threeDecimals} sortable='true' cellStyle={{ 'text-align': 'center', 'font-size': 'x-small', 'font-weight': 'bold' }} width="100"></AgGridColumn>
          <AgGridColumn field="babip" headerName="BABIP" valueFormatter={threeDecimals} sortable='true' cellStyle={{ 'text-align': 'center', 'font-size': 'x-small', 'font-weight': 'bold' }} width="100"></AgGridColumn>
          <AgGridColumn field="avg_exit_velo" headerName="Exit Velo" valueFormatter={oneDecimal} sortable='true' cellStyle={{ 'text-align': 'center', 'font-size': 'x-small', 'font-weight': 'bold' }} width="100"></AgGridColumn>
          <AgGridColumn field="exit_velo_90_plus" headerName="% > 90 mph" valueFormatter={rateStat} sortable='true' wrapText='true' cellStyle={{ 'text-align': 'center', 'font-size': 'x-small', 'font-weight': 'bold' }} width="100"></AgGridColumn>
          <AgGridColumn field="exit_velo_100_plus" headerName="% > 100 mph" valueFormatter={rateStat} sortable='true' wrapText='true' cellStyle={{ 'text-align': 'center', 'font-size': 'x-small', 'font-weight': 'bold' }} width="100"></AgGridColumn>
          <AgGridColumn field="swing_per" headerName="Sw" valueFormatter={rateStat} sortable='true' cellStyle={{ 'text-align': 'center', 'font-size': 'x-small', 'font-weight': 'bold' }} width="100"></AgGridColumn>
          <AgGridColumn field="swing_per_kzone" headerName="Sw In Zone" valueFormatter={rateStat} sortable='true' wrapText='true' cellStyle={{ 'text-align': 'center', 'font-size': 'x-small', 'font-weight': 'bold' }} width="100"></AgGridColumn>
          <AgGridColumn field="chase_per" headerName="Ch" valueFormatter={rateStat} sortable='true' cellStyle={{ 'text-align': 'center', 'font-size': 'x-small', 'font-weight': 'bold' }} width="100"></AgGridColumn>
          <AgGridColumn field="chase_per_2k" headerName="Ch 2K" valueFormatter={rateStat} sortable='true' cellStyle={{ 'text-align': 'center', 'font-size': 'x-small', 'font-weight': 'bold' }} width="100"></AgGridColumn>
          <AgGridColumn field="miss_per" headerName="Ms" valueFormatter={rateStat} sortable='true' cellStyle={{ 'text-align': 'center', 'font-size': 'x-small', 'font-weight': 'bold' }} width="100"></AgGridColumn>
          <AgGridColumn field="miss_chase_per" headerName="Ms Ch" valueFormatter={rateStat} sortable='true' cellStyle={{ 'text-align': 'center', 'font-size': 'x-small', 'font-weight': 'bold' }} width="100"></AgGridColumn>
          <AgGridColumn field="gb_per_fb" headerName="G/F" valueFormatter={oneDecimal} sortable='true' cellStyle={{ 'text-align': 'center', 'font-size': 'x-small', 'font-weight': 'bold' }} width="100"></AgGridColumn>
          <AgGridColumn field="ab_per_hr" headerName="AB/HR" valueFormatter={oneDecimal} sortable='true' cellStyle={{ 'text-align': 'center', 'font-size': 'x-small', 'font-weight': 'bold' }} width="100"></AgGridColumn>
          <AgGridColumn field="ab_per_ubb" headerName="AB/UBB" valueFormatter={oneDecimal} sortable='true' cellStyle={{ 'text-align': 'center', 'font-size': 'x-small', 'font-weight': 'bold' }} width="100"></AgGridColumn>
          <AgGridColumn field="ab_per_so" headerName="AB/SO" valueFormatter={oneDecimal} sortable='true' cellStyle={{ 'text-align': 'center', 'font-size': 'x-small', 'font-weight': 'bold' }} width="100"></AgGridColumn>
          <AgGridColumn field="gb_per" headerName="GB%" valueFormatter={rateStat} sortable='true' cellStyle={{ 'text-align': 'center', 'font-size': 'x-small', 'font-weight': 'bold' }} width="100"></AgGridColumn>
          <AgGridColumn field="ubb_per" headerName="UBB%" valueFormatter={rateStat} sortable='true' cellStyle={{ 'text-align': 'center', 'font-size': 'x-small', 'font-weight': 'bold' }} width="100"></AgGridColumn>
          <AgGridColumn field="so_per" headerName="K%" valueFormatter={rateStat} sortable='true' cellStyle={{ 'text-align': 'center', 'font-size': 'x-small', 'font-weight': 'bold' }} width="100"></AgGridColumn>
        </AgGridColumn>
      </AgGridReact>
      </div></p>
    );
  }

  return (
    <div>
      {content}
    </div>
  );

  function splitTitle(params) {
    //edit title for 'Overall' split; show 'MLB Overall' and 'AAA Overall'
    var split = params.data.split;
    if (split == 'Overall') {
      return `${params.data.league} ${split}`;
    }
    else {
      return split;
    }
  }

  function oneDecimal(params) {
    return params.value.toFixed(1);
  }

  function threeDecimals(params) {
    return params.value.toFixed(3).replace(/^0+/, '');
  }

  function rateStat(params) {
    return toInt(params.value).toString() + '%';
  }

  function toInt(number) {
    return Math.round(100 * number);
  }
}

function mapOrder (array, order, key) {
  //returns array in sequence specified by 'order' array param
  array.sort( function (a, b) {
    var A = a[key], B = b[key];
    
    if (order.indexOf(A) > order.indexOf(B)) {
      return 1;
    } else {
      return -1;
    }
    
  });
  
  return array;
};

export default App;
