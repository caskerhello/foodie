import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({
    startDate,
    setStartDate,
    calendarModalOpen }) => {
    return (
        <div>
            {calendarModalOpen && (
                <div className='calendar-modal'>
                    {/* DatePicker 컴포넌트를 열고 시간 선택 옵션 활성화 */}
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        dateFormat="yyyy/MM/dd h:mm"
                        inline // 바로 캘린더가 나타나도록 설정
                    />
                </div>
            )}
        </div>
    );
};

export default CustomDatePicker;