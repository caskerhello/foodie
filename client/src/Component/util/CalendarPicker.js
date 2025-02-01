import React, { useState } from "react";
import { Calendar } from "react-date-range";  // Calendar 컴포넌트 import
import { enUS, ko } from 'react-date-range/dist/locale';  // 로케일 설정

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const CalendarPicker = ({ closeCalendar, date, setDate }) => {
    //const [date, setDate] = useState(new Date());

    const handleDateChange = (date) => {
        setDate(date);
        closeCalendar();  // 날짜를 선택한 후 창 닫기
    };

    return (
        <div>
            <h2>날짜 선택</h2>
            <Calendar
                date={date}
                onChange={handleDateChange} // 단일 날짜 선택
                minDate={new Date()} // 선택 가능한 최소 날짜
                locale={ko} // 여기에서 로케일을 설정
            />
            <p>📅 선택한 날짜: {date.toLocaleDateString()}</p>
        </div>
    );
};

export default CalendarPicker;