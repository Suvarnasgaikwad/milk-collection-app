
import React, { useState, useEffect } from 'react';
import { fetchSettings, saveSettings } from '../utils/Settings';
import './Settings.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const Settings = () => {
    const [enableFatSnf, setEnableFatSnf] = useState(false);
    const [fixedRate, setFixedRate] = useState('');

    useEffect(() => {
        fetchSettings().then(settings => {
            setEnableFatSnf(settings.enableFatSnf);
            setFixedRate(settings.fixedRate);
           
        });
    }, []);

    const handleEnableFatSnfChange = (event) => {
        setEnableFatSnf(event.target.checked);
        console.log(enableFatSnf);
    };

    const handleFixedRateChange = (event) => {
        setFixedRate(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(enableFatSnf);
        try{
            await saveSettings({ enableFatSnf, fixedRate });
           MySwal.fire({
                title: 'Success!',
                text: 'Settings saved successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
           
        }
        catch (error) {
            console.error('Failed to save settings:', error);
            MySwal.fire({
                title: 'Error!',
                text: 'Failed to save settings.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
   
    
    };
    

    return (
        <div className="setting">
        <form onSubmit={handleSubmit} >
            <label>
                Enable FAT/SNF:
                <input
                    type="checkbox"
                    checked={enableFatSnf}
                    onChange={handleEnableFatSnfChange}
                />
            </label>
            <br />
            <label>
                Fixed Rate:
                <input
                    type="number"
                    value={fixedRate}
                    onChange={handleFixedRateChange}
                    disabled={!enableFatSnf}
                />
            </label>
            <br />
            <button type="submit">Save Settings</button>
        </form>
        </div>
    );
};

export default Settings;
