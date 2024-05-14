const currentDate = new Date()
const dateShowOptions = { day: '2-digit', month: '2-digit', year: 'numeric' }

const defaultTicketValues={
    enabled: 1,
    data: [
        {
            selected: true,
            date: currentDate,
            title: '',
            is_qrcode: 1,
            deposit: {
                is_full_payment: 0,
                amount: undefined,
                due_date: undefined,
                is_show: false
            },
            count: 0,
            list: [
                {
                    title: '',
                    description: '',
                    total: 0,
                    price: 0
                }
            ]
        }
    ]
}

export default defaultTicketValues