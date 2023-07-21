import React from "react";
import {
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

function SearchComponent({
  keyword,
  searchedText,
  keywordHandleSubmit,
  handleChange,
}) {
  return (
    <div>
      <form onSubmit={(event) => keywordHandleSubmit(event)}>
        <FormGroup className="float-right">
          <InputGroup>
            <Input
              type="text"
              value={keyword}
              placeholder="Type and Enter"
              name="keyword"
              className={`${keyword === searchedText ? "" : "text-danger"}`}
              onChange={(event) => handleChange(event)}
              autoComplete="off"
            />
            <InputGroupAddon
              addonType="append"
              onClick={(event) => keywordHandleSubmit(event)}
            >
              <InputGroupText
                className={`${
                  keyword === searchedText ? "bg-info" : "bg-danger"
                }  text-dark`}
              >
                <i className="nc-icon nc-zoom-split ml-2" />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>
      </form>
    </div>
  );
}

export default SearchComponent;
