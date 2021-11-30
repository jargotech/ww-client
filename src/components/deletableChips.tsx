import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import { PrimaryChips } from './GlobalElements';

interface ChipData {
    key: number;
    label: string;
}

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

export default function DeletableChips() {
    const [chipData, setChipData] = React.useState<readonly ChipData[]>([
        { key: 0, label: '2010 - 2015' },
        { key: 1, label: '0 - 5000' },
        { key: 2, label: ' Under 50 L' },
        { key: 3, label: 'HatchBack' },
    ]);

    const handleDelete = (chipToDelete: ChipData) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    return (
        <div
            className="filter-chips"
        >
            {chipData.map((data) => {
                let icon;
                return (
                    <ListItem key={data.key}>
                        <PrimaryChips
                            icon={icon}
                            label={data.label}
                            onDelete={handleDelete(data)}
                        />
                    </ListItem>
                );
            })}
        </div>
    );
}
