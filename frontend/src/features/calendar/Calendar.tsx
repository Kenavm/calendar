import { useEffect, useState } from 'react';
import fetchCalendarData from '../../api/fetchCalendarData'

function Calendar() {

    const [calendar, setCalendar] = useState();

    useEffect(() => {
        async function loadCalendarData() {
            setCalendar(await fetchCalendarData());
        }
        loadCalendarData();
    }, [])

    console.log(calendar)
    return(<div>
        
    </div>)
}

export default Calendar;