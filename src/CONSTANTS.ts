// #1. Registration Year Options
export const registrationYearList = [
    {
        label: '2000 - 2010',
        dbValue: {
            minYear: '2000',
            maxYear: '2010'
        },
        value: '2000-2010'
    },
    {
        label: '2010 - 2015',
        dbValue: {
            minYear: '2010',
            maxYear: '2015'
        },
        value: '2010-2015'
    },
    {
        label: '2015 - 2020',
        dbValue: {
            minYear: '2015',
            maxYear: '2020'
        },
        value: '2015-2020'
    },
    {
        label: 'All',
        dbValue: {
            minYear: '',
            maxYear: ''
        },
        value: 'all'
    },
]


export const kmsDrivenList = [
    {
        label: '0 - 5000',
        value: '0-5000',
        dbValue: {
            minKm: 0,
            maxKm: 5000
        },
    },
    {
        label: '5000 - 10000',
        value: '5000-10000',
        dbValue: {
            minKm: 5000,
            maxKm: 10000
        },
    },
    {
        label: '10000 - 15000',
        value: '10000-15000',
        dbValue: {
            minKm: 10000,
            maxKm: 15000
        },
    },
    {
        label: '20000 Above',
        value: '20000 above',
        dbValue: {
            minKm: 200000,
            maxKm: 1000000
        },
    },
]

export const budgetList = [
    {
        label: 'under - 50L',
        value: 'under-50L',
        dbValue: {
            minBudget: null,
            maxBudget: 5000000
        },
    },
    {
        label: '50L - 1Cr',
        value: '50L-1Cr',
        dbValue: {
            minBudget: 5000000,
            maxBudget: 10000000
        },
    },
    {
        label: '1Cr - 2Cr',
        value: '1Cr-2Cr',
        dbValue: {
            minBudget: 10000000,
            maxBudget: 20000000
        },
    },
]

export const bodyList = [
    {
        label: 'SUV',
        value: 'SUV',
    },
    {
        label: 'Sedan',
        value: 'Sedan',
    },
    {
        label: 'HatchBack',
        value: 'HatchBack',
    },
    {
        label: 'Convertable',
        value: 'Convertable',
    },

]
