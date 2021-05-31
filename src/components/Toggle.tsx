import React, {FC, useState} from 'react';
import {Stack, Checkbox} from '@shopify/polaris';

interface ToggleProps {
    city: string;
}

const Toggle: FC<ToggleProps> = ({city}) => {
    const [checked, setChecked] = useState<boolean>(false);
    const saveCity = (saveCity: string) => {
        if(localStorage.getItem("city") === null ){
            localStorage.setItem("city", saveCity );
        } else {
            localStorage.setItem("city", saveCity + "," + localStorage.getItem("city"));
        }
    }
    return (
        <Stack vertical>
            <Checkbox
                label="in the favorites"
                checked={checked}
                onChange={() => {setChecked(!checked); saveCity(city)}}
            />
        </Stack>
    );
};
export default Toggle;