/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import { PrimaryChips } from './GlobalElements';
import { log } from 'console';

interface ChipData {
    key: number;
    label: string;
}

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

export default function DeletableChips({ rawData }: any) {
    // States
    const [chipData, setChipData] = useState<readonly ChipData[]>([
        { key: 0, label: '2010 - 2015' },
        { key: 1, label: '0 - 5000' },
        { key: 2, label: ' Under 50 L' },
        { key: 3, label: 'HatchBack' },
    ]);
    const [filterRawDataFLS, setFilterRawDataFLS] = useState<any>([]);
    const [secondTimeInitilized, setSecondTimeInitilized] = useState<any>(false);
    const [filterDataObject, setFilterDataObject] = useState<any>();

    // Variable
    // let filterChipRawData = localStorage.getItem("filterRawData");

    // Functions

    const convertArrayToObject = (array: any, key: any) => {
        const initialValue = {};
        return array.reduce((obj: any, item: any) => {
            return {
                ...obj,
                [item[key]]: item,
            };
        }, initialValue);
    };

    const handleDelete = (chipToDelete: any) => () => {
        console.log(chipToDelete);
        setFilterRawDataFLS((filterRawDataFLS: any) => filterRawDataFLS.filter((cp: any) => cp.key !== chipToDelete.key));
        setSecondTimeInitilized(!secondTimeInitilized);


    };

    // Effects
    useEffect(() => {
        if (rawData) {
            let keyMap = Object.keys(rawData).map((k, index) => {
                let obj;
                if (typeof rawData[k] == 'string' && rawData[k].includes(`{\"`)) {
                    // JSON Entry
                    rawData[k] = JSON.parse(rawData[k]);
                }
                if (rawData[k]) {
                    obj = {
                        // key: index,
                        key: k,
                        // label: rawData[k],
                        label: rawData[k]?.label || rawData[k],
                        dbValue: rawData[k]?.dbValue || rawData[k],
                        // name: k
                    }
                }
                return obj;
            })

            // Remove Empty Records
            keyMap = keyMap.filter((a: any) => a)
            // console.log(keyMap);


            let selectedBrands: any[] = [];
            keyMap.forEach((item: any, idx: number) => {
                if (Array.isArray(item?.label) && item?.label.length > 0) {
                    selectedBrands = item?.label?.map((x: any, index: number) => {
                        console.log(keyMap.length);
                        return {

                            key: `${item?.key}__${index}`,
                            label: x
                        }
                    });
                    keyMap.splice(idx, 1);
                }
            });
            // console.log(selectedBrands);
            keyMap = keyMap.concat(selectedBrands);


            setFilterRawDataFLS(keyMap)




        }
    }, [rawData]);

    useEffect(() => {
        setFilterDataObject(convertArrayToObject(filterRawDataFLS, 'key'))
        console.log(filterDataObject);
        console.log(filterRawDataFLS);
    }, [secondTimeInitilized]);

    return (
        <div
            className="filter-chips"
        >
            {/* {JSON.stringify(filterRawDataFLS)} */}
            {
                filterRawDataFLS &&
                // chipData.map((data: any) =>
                // (
                //     <ListItem key={data.key}>
                //         <PrimaryChips
                //             label={data.label}
                //             onDelete={handleDelete(data)}
                //         />
                //     </ListItem>
                // )
                // );
                filterRawDataFLS.map((data: any) => (
                    <ListItem key={data.key}>
                        <PrimaryChips
                            label={data.label}
                            onDelete={handleDelete(data)}
                        />
                    </ListItem>
                ))
            }
        </div>
    );
}
