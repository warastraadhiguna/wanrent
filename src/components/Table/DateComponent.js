import moment from "moment";
import React from "react";
import {
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
} from "reactstrap";

export const DateComponent = ({
  startDate,
  endDate,
  isDateFilterChanged,
  setIsDateFilterChanged,
  handleChange,
  filterHandleSubmit,
  startDateFromFirstDate,
}) => {
  return (
    <FormGroup>
      <InputGroup>
        <Input
          type="text"
          name="startDate"
          placeholder={moment(
            startDateFromFirstDate
              ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)
              : new Date()
          ).format("DD/MM/YYYY")}
          onFocus={(event) => (event.currentTarget.type = "date")}
          onBlur={(event) => {
            event.currentTarget.type = "text";
            event.currentTarget.placeholder = "Start Date";
            event.currentTarget.value = startDateFromFirstDate
              ? moment(
                  new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)
                ).format("DD/MM/YYYY")
              : startDate
              ? moment(startDate).format("DD/MM/YYYY")
              : moment(new Date()).format("DD/MM/YYYY");
          }}
          onChange={(event) => {
            setIsDateFilterChanged(true);
            handleChange(event);
          }}
          className={`${isDateFilterChanged ? "text-danger" : ""}`}
        />
        <Input
          type="text"
          name="endDate"
          placeholder={moment(new Date()).format("DD/MM/YYYY")}
          onFocus={(event) => (event.currentTarget.type = "date")}
          onBlur={(event) => {
            event.currentTarget.type = "text";
            event.currentTarget.placeholder = "End Date";
            event.currentTarget.value = endDate
              ? moment(endDate).format("DD/MM/YYYY")
              : moment(new Date()).format("DD/MM/YYYY");
          }}
          onChange={(event) => {
            setIsDateFilterChanged(true);
            handleChange(event);
          }}
          className={`${isDateFilterChanged ? "text-danger" : ""}`}
        />
        <InputGroupAddon
          title="Filter"
          addonType="append"
          onClick={(event) => filterHandleSubmit(event)}
        >
          <InputGroupText
            className={`${
              isDateFilterChanged ? "bg-danger" : "bg-info"
            }  text-dark`}
          >
            <Label className="text-dark font-weight-bold ml-2">Filter</Label>
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </FormGroup>
  );
};
