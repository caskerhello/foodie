import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({
    startDate,
    setStartDate,
    setSelectedDateTime,
    calendarModalOpen
}) => {
    const handleDateChange = (date) => {
        setStartDate(date); // 선택된 날짜로 startDate 업데이트
        setSelectedDateTime(date);
    };

    return (
        <div>
            {calendarModalOpen && (
                <div className='calendar-modal'>
                    <DatePicker
                        selected={startDate}
                        onChange={handleDateChange}
                        showTimeSelect
                        dateFormat="yyyy/MM/dd h:mm aa"
                        inline
                    />
                </div>
            )}
        </div>
    );
};

export default CustomDatePicker;