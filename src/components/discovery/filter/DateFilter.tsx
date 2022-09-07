import React, { useState, useRef, useContext } from "react";
import Form from "react-bootstrap/Form";
import { FilterContext } from "../../../contexts/FilterContext";
import useClickOutside from "../../../helpers/clickOutside";

const DateFilter = () => {
  const [datesWindowOpened, setDatesWindowOpened] = useState(false);
  const [startDate, setStartDate] = useState(1900);
  const [endDate, setEndDate] = useState(2022);
  const { filterState, setFilterState } = useContext(FilterContext);
  const datesWindowRef = useRef<HTMLDivElement>(null);
  useClickOutside(datesWindowRef);

  const openDatesWindow = () => {
    setDatesWindowOpened(true);
    datesWindowRef.current?.classList.remove("hide");
  };

  const handleStartDate = (e: React.ChangeEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    const valueInt = parseInt(value);
    setStartDate(valueInt);
    if (value.length === 4 && 1900 <= valueInt && valueInt <= 2022) {
      setFilterState({
        ...filterState,
        release_date_start: valueInt,
      });
    }
  };

  const handleEndDate = (e: React.ChangeEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    const valueInt = parseInt(value);
    setEndDate(valueInt);
    if (value.length === 4 && 1900 <= valueInt && valueInt <= 2022) {
      setFilterState({
        ...filterState,
        release_date_end: valueInt,
      });
    }
  };

  return (
    <div className="position-relative">
      <div onClick={openDatesWindow}>
        <p
          className={`me-4 fs-6 cursor-pointer ${
            filterState.release_date_start != 1900 ||
            filterState.release_date_end != 2022
              ? "text-white fw-bold"
              : "text-secondary"
          }`}
        >
          Release date
        </p>
      </div>
      {datesWindowOpened && (
        <div
          ref={datesWindowRef}
          className="filter-window position-absolute bg-primary p-3 rounded"
        >
          <p className="fs-5 text-white">Release date</p>
          <div className="flex flex-wrap justify-content-between">
            <Form.Label htmlFor="rangeStart" className="text-secondary">
              Start year:
            </Form.Label>
            <Form.Control
              type="number"
              id="rangeStart"
              min={1900}
              max={2022}
              placeholder="min 1900"
              value={startDate}
              onChange={handleStartDate}
              className="bg-secondary border-secondary"
            ></Form.Control>
            <Form.Label htmlFor="rangeEnd" className="text-secondary">
              End year:
            </Form.Label>
            <Form.Control
              type="number"
              id="rangeEnd"
              min={1900}
              max={2022}
              placeholder="max 2022"
              value={endDate}
              onChange={handleEndDate}
              className="bg-secondary border-secondary"
            ></Form.Control>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateFilter;
