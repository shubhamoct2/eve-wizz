const currentDate = new Date()
const dateShowOptions = { day: '2-digit', month: '2-digit', year: 'numeric' }

const defaultTableValues={
    enabled: 1,
    data: [
        {
            selected: true,
            date: currentDate,
            title: '',
            deposit: {
                is_full_payment: 0,
                amount: null,
                due_date: null,
                is_show: false
            },
            count: 0,
            list: [
                {
                    min: 0,
                    max: 0,
                    total: 0,
                    price: 0
                }
            ]
        }
    ]
};

export default defaultTableValues