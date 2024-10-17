import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getAPI } from '../../service/api';

const YourComponent = () => {
    
    const [selectedId, setSelectedId] = useState('');
    const [allDate, setAllDate] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllHallId = async (id) => {
        setLoading(true);
        try {
            const resp = await getAPI("hall/" + id);
            const sample = resp.data;
            const datesArray = sample.bookedDate.map(entry => new Date(entry.date));
            setAllDate(datesArray);
            setLoading(false);
            console.log(datesArray, "-----------");
        } catch (err) {
            setAllDate([]);
            setLoading(false);
            console.log(err, "------err");
        }
    };

    useEffect(() => {
        if (selectedId) {
            getAllHallId(selectedId);
        }
    }, [selectedId]);

    const handleSelectChange = (event) => {
        setSelectedId(event.target.value);
    };

    return (
        <div>
            <select
                id="hallID"
                name="hallID"
                className="w-full border rounded py-2 px-3 text-sm"
                onChange={handleSelectChange}
            >
                <option value="">Select an option</option>
                {allDate && allDate.length > 0 &&
                    allDate.map((date, i) => (
                        <option key={i} value={date}>{date.toDateString()}</option>
                    ))}
            </select>
            {loading ? <p>Loading...</p> :
                <DatePicker
                    selected={null} // Set to null initially, set to a date once a date is selected
                    onChange={(date) => console.log(date)}
                    dateFormat="yyyy-MM-dd"
                    excludeDates={allDate}
                    disabledKeyboardNavigation
                    shouldCloseOnSelect={false}
                    inline
                />
            }
        </div>
    );
};

export default YourComponent;
