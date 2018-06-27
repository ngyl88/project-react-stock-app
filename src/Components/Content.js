import React from "react";
import HistoryClosing100Days from "./HistoryClosing100Days";
import "../App.css";

const Content = props => (
  <div className="main-content">
    <HistoryClosing100Days
      symbols={props.symbols}
      chartDataNotEmpty={props.closingChartDataNotEmpty}
      validationFormInput={props.validationFormInput}
      handleSubmitOnSearchForm={props.handleSubmitOnSearchForm}
    />
  </div>
);

export default Content;
