import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';

const UseMemoHook = () => {

    const [value, setValue] = useState('');

    const expensiveComputation = useMemo(() => {
        console.log('Running expensive computation...');
        let result = 0;
        for (let i = 0; i < 100000000; i++) {
            result += i;
        }
        return result;
    }, [value]);

    useEffect(() => {
        console.log('Component updated!');
    },[]);

    return (
        <div>
            <Link to="/">Back to Home</Link>
            <h1>useEffect vs useMemo Example</h1>
            <label>
                Value:
                <input
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                />
            </label>
            <p>Expensive computation result: {expensiveComputation}--{value}</p>
        </div>
    )
}

export default UseMemoHook