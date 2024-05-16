// ** Next Import
import {useRouter} from 'next/router'
import Link from 'next/link'

// ** Footer
import AuthFooter from 'src/@core/layouts/components/shared-components/footer/AuthFooter'

// ** React Imports
import {Fragment, useState, useRef, useEffect} from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import MenuItem from '@mui/material/MenuItem'
import StepLabel from '@mui/material/StepLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import {styled, useTheme} from '@mui/material/styles'
import Input from '@mui/material/Input'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import InputBase from '@mui/material/InputBase'
import MuiFormControl from '@mui/material/FormControl'
import Checkbox from '@mui/material/Checkbox'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import MuiTabList from '@mui/lab/TabList'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

// ** CleaveJS Imports
import Cleave from 'cleave.js/react'
import 'cleave.js/dist/addons/cleave-phone.us'
import CleaveWrapper from 'src/@core/styles/libs/react-cleave'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

// ** Styled Component
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Layout Import
import OnboardingLayout from 'src/@core/layouts/OnboardingLayout'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import {useForm, Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {useDropzone} from 'react-dropzone'
import DatePicker from 'react-datepicker'
import {AutocompleteService} from '@react-google-maps/api'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import StepperCustomDot from './component/StepperCustomDot'
import PlaceAutoComplete from './component/PlaceAutoComplete'

// ** Hooks
import {useSettings} from 'src/@core/hooks/useSettings'

// **  API Service
import {
    RegisterVenueService,
    GetDraftVenueInfoService,
    BackRequestService,
    SkipStepRequestService
} from 'src/services/onboardingService'

// ** Styled Components
import StepperWrapper from 'src/@core/styles/mui/stepper'
import CustomInput from './component/PickersCustomInput'

const NumberTextField = styled(TextField)(({theme}) => ({
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
        display: 'none'
    },
    '& input[type=number]': {
        MozAppearance: 'textfield'
    }
}))

const CustomFormControl = styled(MuiFormControl)(({theme}) => ({
    '& .MuiFormLabel-root.Mui-focused': {
        display: 'none'
    },
    '& .MuiInputLabel-shrink': {
        display: 'none'
    }
}))

const MainWrapper = styled(Box)(({theme}) => ({
    width: '100%',
    [theme.breakpoints.up('md')]: {
        maxWidth: 800
    },
    [theme.breakpoints.up('lg')]: {
        maxWidth: 1100
    }
}))

const BoxWrapper = styled(Box)(({theme}) => ({
    width: '100%'
}))

const MainCard = styled(Box)(({theme}) => ({
    border: 'none',
    boxShadow: 'none',
    padding: 4,
    [theme.breakpoints.up('md')]: {
        padding: 1
    },
    [theme.breakpoints.up('lg')]: {
        padding: 4
    }
}))

const Img = styled('img')(({theme}) => ({
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(3)
}))

const HeadingTypography = styled(Typography)(({theme}) => ({
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(4)
    }
}))

const LinkStyled = styled(Link)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    marginRight: theme.spacing(8)
}))

const TabList = styled(MuiTabList)(({theme}) => ({
    '& .MuiTabs-indicator': {
        display: 'none'
    },
    '& .Mui-selected': {
        backgroundColor: theme.palette.primary.main,
        color: `${theme.palette.common.white} !important`
    },
    '& .MuiTab-root': {
        minHeight: 38,
        minWidth: 110,
        borderRadius: 8,
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    }
}))

const steps = [
    {
        title: 'Venue Information',
        subtitle: 'OK Tell us About Your Business'
    },
    {
        title: 'Venue Information',
        subtitle: 'OK Tell us About Your Business'
    },
    {
        title: 'Event Information',
        subtitle: "OK! Let's Help You Create Your First Event"
    },
    {
        title: 'Event Information',
        subtitle: 'Now Tell Us About Your Event'
    },
    {
        title: 'Event Information',
        subtitle: 'Is This A Ticketed Or A Seated Event?'
    },
    {
        title: 'Event Information',
        subtitle: 'Now Tell Us About Your Event Package'
    },
    {
        title: 'Event Information',
        subtitle: 'Now Tell Us About Your Catering Options'
    },
    {
        title: 'Menu Information',
        subtitle: 'Great! Now Tell Us About Your Menu Options'
    },
    {
        title: 'Extra Information',
        subtitle: 'And Is There Any Other Information You Want To Add To Your Landing Page!'
    },
    {
        title: 'End of Information',
        subtitle: "Is There Anything Else Your'd Like To Tell Your Customer?"
    },
    {
        title: 'FAQ Information',
        subtitle: 'Do You Want To Add Any FAQs?'
    },
    {
        title: 'Reminder Emails',
        subtitle: 'Do You Want To Add Reminder Emails?'
    },
    {
        title: 'How Would You Like To Accept Payment?',
        subtitle: 'Do You Want To Add Payment Setting?'
    },
    {
        title: 'Do You Want To Add Another Location?',
        subtitle: 'Do You Want To Add Another Location?'
    }
]

const venueMainValues = {
    name: '',
    phone: '',
    email: '',
    address: {
        title: '',
        latLng: ''
    }
}

const venueExtraValues = {
    domain: '',
    description: '',
    logo: undefined,
    landing: undefined
}

const eventMainValues = {
    event_category: '',
    title: '',
    sub_title: '',
    banner_heading: '',
    description: '',
    banner: undefined,
    gallery: []
}

const eventTypeValues = {
    event_type: ''
}

const currentDate = new Date()
const dateShowOptions = {day: '2-digit', month: '2-digit', year: 'numeric'}

const eventDetailValues = {
    tables: {
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
    },
    tickets: {
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
}

const eventCateringValues = {
    food_choice: 1
}

const eventPackageValues = {
    event_main_heading: '',
    event_sub_heading: '',
    event_package_info: [''],
    event_package_flyer: undefined
}

const eventMenuValues = {
    menu_title: '',
    menu_description: '',
    menu_list: [
        {
            name: '',
            count: 0,
            list: []
        }
    ]
}

const extraLandingValues = {
    section_title: '',
    section_description: '',
    package_deal_list: [
        {
            heading: '',
            description: '',
            price: 0
        }
    ]
}

const faqInfoValues = {
    faq_list: [
        {
            heading: '',
            description: ''
        }
    ]
}

const extraInfoValues = {
    extra_info: [
        {
            heading: '',
            sub_heading: '',
            description: '',
            phone: '',
            link: ''
        }
    ],
    background: undefined,
    brochure: undefined
}

const reminderEmailValues = {
    is_configure_reminder_email: 1,
    days_before_event_reminder_email: ''
}

const paymentSettingValues = {
    payment_option: 2,
    bank_info: {
        bank_name: '',
        account_number: '',
        sort_code: '',
        reference_name: ''
    },
    card_info: {
        card_type: 0,
        is_live: 1,
        secret_key: '',
        publish_key: ''
    }
}

const anotherLocationValues = {
    event_category: '',
    address: {
        title: '',
        latLng: {}
    },
    is_duplicate: 1
}

const phone_number_regex = /^[0-9\- ]{8,14}$/

const venueMainSchema = yup.object().shape({
    name: yup
        .string()
        .required('Venue Name field is required')
        .min(3, 'Minimum length is 3')
        .max(50, 'Maximum length is 50'),
    email: yup.string().email('Email address is not valid').required('Email address is required'),
    phone: yup.string().required('Phone number is required').matches(phone_number_regex, {
        message: 'Phone number is not valid'
    }),
    address: yup.object().shape({
        title: yup.string().required('Address is required'),
        latLng: yup.object().shape({
            lat: yup.number().required('Address is required'),
            lng: yup.number().required('Address is required')
        })
    })
})

const domain_regex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+$/

const supportedFormats = ['png', 'jpg', 'jpeg', 'gif', 'svg']

const venueExtraSchema = yup.object().shape({
    domain: yup
        .string()
        .matches(domain_regex, {
            message: 'Domain is not valid'
        })
        .required('Domain is required')
        .min(3, 'Minimum length is 3')
        .max(50, 'Maximum length is 50'),
    summary: yup
        .string()
        .required('Summary is required')
        .min(20, 'Minimum length is 20')
        .max(300, 'Maximum length is 300'),
    logo: yup.lazy(value => {
        switch (typeof value) {
            case 'string':
                return yup.string().required('Logo image file is required')
            default:
                return yup
                    .mixed()
                    .required('Logo file is required')
                    .test('fileFormat', 'Only image files are allowed', value => {
                        if (value) {
                            return supportedFormats.includes(value.name.split('.').pop())
                        }

                        return true
                    })
                    .test('fileSize', 'File size must not be more than 3MB', value => {
                        if (value) {
                            return value.size <= 3145728
                        }

                        return true
                    })
        }
    }),
    landing: yup.lazy(value => {
        switch (typeof value) {
            case 'string':
                return yup.string().required('Landing page image file is required')
            default:
                return yup
                    .mixed()
                    .required('Landing file is required')
                    .test('fileFormat', 'Only image files are allowed', value => {
                        if (value) {
                            return supportedFormats.includes(value.name.split('.').pop())
                        }

                        return true
                    })
                    .test('fileSize', 'File size must not be more than 3MB', value => {
                        if (value) {
                            return value.size <= 3145728
                        }

                        return true
                    })
        }
    })
})

const eventMainSchema = yup.object().shape({
    event_category: yup.string().required('Event Category is required'),
    title: yup.string().required('Title is required').min(3, 'Minimum length is 3').max(50, 'Maximum length is 50'),
    sub_title: yup
        .string()
        .required('Sub Title is required')
        .min(5, 'Minimum length is 5')
        .max(50, 'Maximum length is 50'),
    banner_heading: yup
        .string()
        .required('Banner Heading is required')
        .min(5, 'Minimum length is 5')
        .max(100, 'Maximum length is 100'),
    description: yup
        .string()
        .required('Description is required')
        .min(20, 'Minimum length is 20')
        .max(300, 'Maximum length is 300'),
    banner: yup.lazy(value => {
        switch (typeof value) {
            case 'string':
                return yup.string().required('Banner file is required')
            default:
                return yup
                    .mixed()
                    .required('Banner file is required')
                    .test('fileFormat', 'Only image files are allowed', value => {
                        return supportedFormats.includes(value.name.split('.').pop())
                    })
                    .test('fileSize', 'File size must not be more than 3MB', value => {
                        return value.size <= 3145728
                    })
        }
    }),
    gallery: yup.lazy(value => {
        let isStringArray = false
        if (value && value?.length > 0) {
            for (let i = 0; i < value.length; i++) {
                if (typeof value[i] === 'string') {
                    isStringArray = true
                }
            }
        }

        if (isStringArray) {
            return yup.array().of(yup.string().required()).required('Gallery files are required')
        } else {
            return yup
                .mixed()
                .required('Gallery files are required')
                .test('fileSize', 'File Size is too large (max file size is 5MB)', value => {
                    if (value && value?.length > 0) {
                        for (let i = 0; i < value.length; i++) {
                            if (value[i].size > 5242880) {
                                return false
                            }
                        }
                    }

                    return true
                })
                .test('fileType', 'Unsupported File Format', value => {
                    if (value && value.length > 0) {
                        for (let i = 0; i < value.length; i++) {
                            if (!supportedFormats.includes(value[i].name.split('.').pop())) {
                                return false
                            }

                            return true
                        }
                    }

                    return true
                })
        }
    })
})

const eventTypeSchema = yup.object().shape({
    event_type: yup.string().required('Event Type is required')
})

const positiveIntegerRegex = /^[1-9]\d*$/
const priceValueRegex = /^(\d{1,3}(,\d{3})*(\.\d{1,2})?|\d+(\.\d{1,2})?)$/

const eventDetailSchema = yup.object().shape({
    tables: yup.object().shape({
        enabled: yup.number().required('Enabled is required'),
        data: yup.array().when('enabled', (enabled, schema) => {
            return parseInt(enabled) === 1
                ? schema.of(
                    yup.object().shape({
                        title: yup
                            .string()
                            .required('Title is required')
                            .min(3, 'Minimum length is 3')
                            .max(50, 'Maximum length is 50'),
                        date: yup.date().typeError('This field must be a date').required('Date is required'),
                        count: yup
                            .number()
                            .typeError('Count must be a number')
                            .required('Count is required')
                            .positive('Count cannot be negative or zero'),
                        deposit: yup.object().shape({
                            is_full_payment: yup.number(),
                            due_date: yup.date().when('is_full_payment', (is_full_payment, schema) => {
                                return parseInt(is_full_payment) === 0
                                    ? schema.typeError('This field must be a date').required('Date is required')
                                    : schema.nullable()
                            }),
                            amount: yup.number().when('is_full_payment', (is_full_payment, schema) => {
                                return parseInt(is_full_payment) === 0
                                    ? schema.typeError('This field must be a number').required('Amount is required')
                                    : schema.nullable()
                            })
                        }),
                        list: yup.array().of(
                            yup.object().shape({
                                min: yup
                                    .number()
                                    .typeError('Minimum must be a number')
                                    .required('Minimum is required')
                                    .positive('Minimum cannot be negative or zero'),
                                max: yup
                                    .number()
                                    .typeError('Maximum must be a number')
                                    .required('Maximum is required')
                                    .positive('Maximum cannot be negative or zero'),
                                total: yup
                                    .number()
                                    .typeError('Total must be a number')
                                    .required('Total is required')
                                    .positive('Total cannot be negative or zero'),
                                price: yup
                                    .number()
                                    .typeError('Price must be a number')
                                    .required('Price is required')
                                    .positive('Price cannot be negative or zero')
                            })
                        )
                    })
                )
                : schema.nullable()
        })
    }),
    tickets: yup.object().shape({
        enabled: yup.number().required('Enabled is required'),
        data: yup.array().when('enabled', (enabled, schema) => {
            return parseInt(enabled) === 1
                ? schema.of(
                    yup.object().shape({
                        title: yup
                            .string()
                            .required('Title is required')
                            .min(3, 'Minimum length is 3')
                            .max(50, 'Maximum length is 50'),
                        date: yup.date().typeError('This field must be a date').required('Date is required'),
                        count: yup
                            .number()
                            .typeError('Count must be a number')
                            .required('Count is required')
                            .positive('Count cannot be negative or zero'),
                        deposit: yup.object().shape({
                            is_full_payment: yup.number(),
                            due_date: yup.date().when('is_full_payment', (is_full_payment, schema) => {
                                return parseInt(is_full_payment) === 0
                                    ? schema.typeError('This field must be a date').required('Date is required')
                                    : schema.nullable()
                            }),
                            amount: yup.number().when('is_full_payment', (is_full_payment, schema) => {
                                return parseInt(is_full_payment) === 0
                                    ? schema.typeError('This field must be a number').required('Amount is required')
                                    : schema.nullable()
                            })
                        }),
                        list: yup.array().of(
                            yup.object().shape({
                                title: yup.string().required('Title is required'),
                                description: yup.string().required('Description is required'),
                                total: yup
                                    .number()
                                    .typeError('Total must be a number')
                                    .required('Total is required')
                                    .positive('Total cannot be negative or zero'),
                                price: yup
                                    .number()
                                    .typeError('Price must be a number')
                                    .required('Price is required')
                                    .positive('Price cannot be negative or zero')
                            })
                        )
                    })
                )
                : schema.nullable()
        })
    })
})

const eventPackageSchema = yup.object().shape({
    event_main_heading: yup
        .string()
        .required('Main heading is required')
        .min(3, 'Minimum length is 3')
        .max(50, 'Maximum length is 50'),
    event_sub_heading: yup
        .string()
        .required('Sub heading is required')
        .min(3, 'Minimum length is 3')
        .max(50, 'Maximum length is 50'),
    event_package_info: yup.array().of(yup.string().required('Package information cannot be empty')),
    event_package_flyer: yup.lazy(value => {
        switch (typeof value) {
            case 'string':
                return yup.string().required('Flyer file is required')
            default:
                return yup
                    .mixed()
                    .required('Flyer file is required')
                    .test('fileFormat', 'Only image files are allowed', value => {
                        if (value) {
                            const supportedFormats = ['png', 'jpg', 'jpeg', 'gif', 'svg']

                            return supportedFormats.includes(value.name.split('.').pop())
                        }

                        return true
                    })
                    .test('fileSize', 'File size must not be more than 3MB', value => {
                        if (value) {
                            return value.size <= 3145728
                        }

                        return true
                    })
        }
    })
})

const booleanRadioRegex = /^[01]$/

const eventCateringSchema = yup.object().shape({
    food_choice: yup.number().required('Food choice is required')
})

const eventMenuSchema = yup.object().shape({
    menu_title: yup
        .string()
        .required('Menu title is required')
        .min(3, 'Minimum length is 3')
        .max(50, 'Maximum length is 50'),
    menu_description: yup
        .string()
        .required('Menu description is required')
        .min(20, 'Minimum length is 20')
        .max(200, 'Maximum length is 200'),
    menu_list: yup.array().of(
        yup.object().shape({
            name: yup.string().required('Name is required').min(3, 'Minimum length is 3').max(50, 'Maximum length is 50'),
            count: yup
                .number()
                .typeError('This field must be a number')
                .required('Number is required')
                .positive('Number cannot be negative or zero'),
            list: yup.array().of(yup.string().required('Menu item cannot be empty'))
        })
    )
})

const extraLandingSchema = yup.object().shape({
    section_title: yup
        .string()
        .required('Package heading is required')
        .min(3, 'Minimum length is 3')
        .max(50, 'Maximum length is 50'),
    section_description: yup
        .string()
        .required('Package description is required')
        .min(20, 'Minimum length is 20')
        .max(200, 'Maximum length is 200'),
    package_deal_list: yup.array().of(
        yup.object().shape({
            heading: yup
                .string()
                .required('Heading is required')
                .min(3, 'Minimum length is 3')
                .max(50, 'Maximum length is 50'),
            description: yup
                .string()
                .required('Description is required')
                .min(20, 'Minimum length is 20')
                .max(300, 'Maximum length is 300'),
            price: yup
                .number()
                .typeError('This field must be a number')
                .required('Price is required')
                .positive('Price cannot be negative or zero')
        })
    )
})

const faqInfoSchema = yup.object().shape({
    faq_list: yup.array().of(
        yup.object().shape({
            heading: yup.string().required('Heading is required'),
            description: yup.string().required('Description is required')
        })
    )
})

const extraInfoSchema = yup.object().shape({
    extra_info: yup.array().of(
        yup
            .object()
            .shape({
                heading: yup.string().required('Heading is required'),
                sub_heading: yup.string(),
                description: yup.string(),
                phone: yup.string().matches(phone_number_regex, {
                    message: 'Phone number is not valid'
                }),
                link: yup.string()
            })
            .test('at-least-phone-or-link', 'At least phone or link is required', value => {
                return value.phone !== '' || value.link !== ''
            })
    ),
    background: yup.lazy(value => {
        switch (typeof value) {
            case 'string':
                return yup.string().required('Background file is required')
            default:
                return yup
                    .mixed()
                    .required('Background file is required')
                    .test('fileFormat', 'Only image files are allowed', value => {
                        if (value) {
                            const supportedFormats = ['png', 'jpg', 'jpeg', 'gif', 'svg']

                            return supportedFormats.includes(value.name.split('.').pop())
                        }

                        return true
                    })
                    .test('fileSize', 'File size must not be more than 3MB', value => {
                        if (value) {
                            return value.size <= 3145728
                        }

                        return true
                    })
        }
    }),
    brochure: yup.lazy(value => {
        switch (typeof value) {
            case 'string':
                return yup.string()
            default:
                return yup
                    .mixed()
                    .test('fileFormat', 'Only image files are allowed', value => {
                        if (value) {
                            const supportedFormats = ['png', 'jpg', 'jpeg', 'gif', 'svg']

                            return supportedFormats.includes(value.name.split('.').pop())
                        }

                        return true
                    })
                    .test('fileSize', 'File size must not be more than 3MB', value => {
                        if (value) {
                            return value.size <= 3145728
                        }

                        return true
                    })
        }
    })
})

const reminderEmailSchema = yup.object().shape({
    is_configure_reminder_email: yup.number().required('Reminder setting is required'),
    days_before_event_reminder_email: yup
        .number()
        .typeError('Days setting must be a number')
        .required('Days setting is required')
        .positive('Days setting cannot be negative or zero')
})

const paymentSettingSchema = yup.object().shape({
    payment_option: yup.number().required('Payment option is required'),
    bank_info: yup.object().when('payment_option', (payment_option, schema) => {
        return [0, 2].includes(parseInt(payment_option))
            ? schema.shape({
                bank_name: yup.string().required('Bank Name is required'),
                account_number: yup.string().required('Account Number is required'),
                sort_code: yup.string().required('Sort Code is required'),
                reference_name: yup.string().required('Reference Name is required')
            })
            : schema.shape({})
    }),
    card_info: yup.object().when('payment_option', (payment_option, schema) => {
        return [1, 2].includes(parseInt(payment_option))
            ? schema.shape({
                secret_key: yup.string().required('Sort Code is required'),
                publish_key: yup.string().required('Publish Key is required')
            })
            : schema.shape({})
    })
})

const anotherLocationSchema = yup.object().shape({
    event_category: yup.string().required('Category is required'),
    address: yup.object().shape({
        title: yup.string().required('Location is required'),
        latLng: yup.object().shape({
            lat: yup.number().typeError('Location is not valid').required('Location is required'),
            lng: yup.number().typeError('Location is not valid').required('Location is required')
        })
    })
})

const VenueOnboarding = () => {
    // ** States
    const [activeStep, setActiveStep] = useState(0)
    const [venueInfo, setVenueInfo] = useState(null)

    const [eventCategories, setEventCategories] = useState([])
    const [eventTypes, setEventTypes] = useState([])

    const [eventTypeSelected, setEventTypeSelected] = useState(null)
    const [paymentOption, setPaymentOption] = useState(2)

    const [loading, setLoading] = useState(false)

    // const initialSelected = ticketTypeData.filter(item => item.isSelected).map(item => item.value)

    // ** Ref
    const isInit = useRef(false)
    const logoRef = useRef()
    const landingRef = useRef()
    const bannerRef = useRef()
    const galleryRef = useRef()
    const packageFlyerRef = useRef()
    const backgroundRef = useRef()
    const brochureRef = useRef()

    // ** Router
    const router = useRouter()

    // ** State
    const [galleryFiles, setGalleryFiles] = useState([])

    // ** Hooks
    const {getRootProps, getInputProps} = useDropzone({
        onDrop: acceptedFiles => {
            setGalleryFiles(acceptedFiles.map(file => Object.assign(file)))
            eventMainSet('gallery', acceptedFiles)
        }
    })

    const handleRemoveAllFiles = () => {
        setGalleryFiles([])
        eventMainSet('gallery', undefined)
    }

    const handleEventTypeSelected = (event, newValue) => {
        setEventTypeSelected(newValue)
    }

    const handleRemoveFile = file => {
        const uploadedFiles = galleryFiles

        let filtered = null
        if (typeof file === 'string' || file instanceof String) {
            filtered = uploadedFiles.filter(i => i !== file)
        } else {
            filtered = uploadedFiles.filter(i => i.name !== file.name)
        }
        setGalleryFiles([...filtered])
        eventMainSet('gallery', [...filtered])
    }

    const renderFilePreview = file => {
        if (typeof file === 'string' || file instanceof String) {
            return <img width={38} height={38} alt={''} src={file}/>
        } else {
            if (file.type.startsWith('image')) {
                return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)}/>
            } else {
                return <Icon icon='mdi:file-document-outline'/>
            }
        }
    }

    const fileList = galleryFiles.map((file, index) => (
        <Box key={index}>
            {typeof file === 'string' || file instanceof String ? (
                <ListItem key={index}>
                    <div className='file-details'>
                        <div className='file-preview'>{renderFilePreview(file)}</div>
                        <div>
                            <Typography className='file-name'>{index + 1}</Typography>
                        </div>
                    </div>
                    <IconButton onClick={() => handleRemoveFile(file)}>
                        <Icon icon='mdi:close' fontSize={20}/>
                    </IconButton>
                </ListItem>
            ) : (
                <ListItem key={index}>
                    <div className='file-details'>
                        <div className='file-preview'>{renderFilePreview(file)}</div>
                        <div>
                            <Typography className='file-name'>{file.name}</Typography>
                            <Typography className='file-size' variant='body2'>
                                {Math.round(file.size / 100) / 10 > 1000
                                    ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
                                    : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
                            </Typography>
                        </div>
                    </div>
                    <IconButton onClick={() => handleRemoveFile(file)}>
                        <Icon icon='mdi:close' fontSize={20}/>
                    </IconButton>
                </ListItem>
            )}
        </Box>
    ))

    const uploadImg = (file, type) => (
        <>
            {typeof file === 'string' || file instanceof String ? (
                <img key={file} alt={type} className={type === 'logo' ? 'logo-file-image' : 'single-file-image'}
                     src={file}/>
            ) : (
                <img
                    key={file.name}
                    alt={file.name}
                    className={type === 'logo' ? 'logo-file-image' : 'single-file-image'}
                    src={URL.createObjectURL(file)}
                />
            )}
        </>
    )

    const clickLogoFile = event => {
        logoRef.current.click()
    }

    const clickLandingFile = event => {
        landingRef.current.click()
    }

    const clickBannerFile = event => {
        bannerRef.current.click()
    }

    const clickGalleryFile = event => {
        galleryRef.current.click()
    }

    const clickPackageFlyerFile = event => {
        packageFlyerRef.current.click()
    }

    const clickBackgroundFile = event => {
        backgroundRef.current.click()
    }

    const clickBrochureFile = event => {
        brochureRef.current.click()
    }

    const [autocompleteService, setAutocompleteService] = useState(null)

    const loadScript = () => {
        setAutocompleteService(new window.google.maps.places.AutocompleteService())
    }

    useEffect(() => {
        const getVenueInfo = async () => {
            if (isInit.current !== false) return
            isInit.current = true
            setLoading(true)

            let current_step = 0

            // get venue information from api
            const response = await GetDraftVenueInfoService()
            if (response.success) {
                resetStatus(response)
                current_step = response.venue.data && response.venue.data.step ? parseInt(response.venue.data.step) : 0
            }

            if (current_step === 0 || current_step === 13) {
                loadScript()
            }

            setLoading(false)
        }
        getVenueInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [state, setState] = useState({
        password: '',
        password2: '',
        showPassword: false,
        showPassword2: false
    })

    // ** Hooks
    const {
        reset: venueMainReset,
        control: venueMainControl,
        handleSubmit: venueMainSubmit,
        formState: {errors: venueMainErrors}
    } = useForm({
        defaultValues: venueMainValues,
        resolver: yupResolver(venueMainSchema)
    })

    const {
        reset: venueExtraReset,
        control: venueExtraControl,
        handleSubmit: venueExtraSubmit,
        formState: {errors: venueExtraErrors},
        setValue: venueExtraSet
    } = useForm({
        defaultValues: venueExtraValues,
        resolver: yupResolver(venueExtraSchema)
    })

    const {
        reset: eventMainReset,
        control: eventMainControl,
        handleSubmit: eventMainSubmit,
        formState: {errors: eventMainErrors},
        setValue: eventMainSet
    } = useForm({
        defaultValues: eventMainValues,
        resolver: yupResolver(eventMainSchema)
    })

    const {
        reset: eventTypeReset,
        control: eventTypeControl,
        handleSubmit: eventTypeSubmit,
        formState: {errors: eventTypeErrors},
        setValue: eventTypeSet
    } = useForm({
        defaultValues: eventTypeValues,
        resolver: yupResolver(eventTypeSchema)
    })

    const {
        reset: eventDetailReset,
        control: eventDetailControl,
        handleSubmit: eventDetailSubmit,
        formState: {errors: eventDetailErrors},
        setValue: eventDetailSet,
        getValues: eventDetailGet
    } = useForm({
        defaultValues: eventDetailValues,
        resolver: yupResolver(eventDetailSchema)
    })

    const {
        reset: eventPackageReset,
        control: eventPackageControl,
        handleSubmit: eventPackageSubmit,
        formState: {errors: eventPackageErrors},
        setValue: eventPackageSet,
        getValues: eventPackageGet
    } = useForm({
        defaultValues: eventPackageValues,
        resolver: yupResolver(eventPackageSchema)
    })

    const {
        reset: eventCateringReset,
        control: eventCateringControl,
        handleSubmit: eventCateringSubmit,
        formState: {errors: eventCateringErrors},
        setValue: eventCateringSet,
        getValues: eventCateringGet
    } = useForm({
        defaultValues: eventCateringValues,
        resolver: yupResolver(eventCateringSchema)
    })

    const {
        reset: eventMenuReset,
        control: eventMenuControl,
        handleSubmit: eventMenuSubmit,
        formState: {errors: eventMenuErrors},
        setValue: eventMenuSet,
        getValues: eventMenuGet
    } = useForm({
        defaultValues: eventMenuValues,
        resolver: yupResolver(eventMenuSchema)
    })

    const {
        reset: extraLandingReset,
        control: extraLandingControl,
        handleSubmit: extraLandingSubmit,
        formState: {errors: extraLandingErrors},
        setValue: extraLandingSet,
        getValues: extraLandingGet
    } = useForm({
        defaultValues: extraLandingValues,
        resolver: yupResolver(extraLandingSchema)
    })

    const {
        reset: extraInfoReset,
        control: extraInfoControl,
        handleSubmit: extraInfoSubmit,
        formState: {errors: extraInfoErrors},
        setValue: extraInfoSet,
        getValues: extraInfoGet
    } = useForm({
        defaultValues: extraInfoValues,
        resolver: yupResolver(extraInfoSchema)
    })

    const {
        reset: faqInfoReset,
        control: faqInfoControl,
        handleSubmit: faqInfoSubmit,
        formState: {errors: faqInfoErrors},
        setValue: faqInfoSet,
        getValues: faqInfoGet
    } = useForm({
        defaultValues: faqInfoValues,
        resolver: yupResolver(faqInfoSchema)
    })

    const {
        reset: reminderEmailReset,
        control: reminderEmailControl,
        handleSubmit: reminderEmailSubmit,
        formState: {errors: reminderEmailErrors},
        setValue: reminderEmailSet,
        getValues: reminderEmailGet
    } = useForm({
        defaultValues: reminderEmailValues,
        resolver: yupResolver(reminderEmailSchema)
    })

    const {
        reset: paymentSettingReset,
        control: paymentSettingControl,
        handleSubmit: paymentSettingSubmit,
        formState: {errors: paymentSettingErrors},
        setValue: paymentSettingSet,
        getValues: paymentSettingGet
    } = useForm({
        defaultValues: paymentSettingValues,
        resolver: yupResolver(paymentSettingSchema)
    })

    const {
        reset: anotherLocationReset,
        control: anotherLocationControl,
        handleSubmit: anotherLocationSubmit,
        formState: {errors: anotherLocationErrors},
        setValue: anotherLocationSet,
        getValues: anotherLocationGet
    } = useForm({
        defaultValues: anotherLocationValues,
        resolver: yupResolver(anotherLocationSchema)
    })

    const resetStatus = response => {
        // save information to state
        const venueInfo = response.venue.data ?? []

        setVenueInfo({
            ...venueInfo,
            event_category:
                venueInfo && venueInfo.event_main_info && venueInfo.event_main_info.event_category
                    ? parseInt(venueInfo.event_main_info.event_category)
                    : null,
            event_type:
                venueInfo && venueInfo.event_main_info && venueInfo.event_main_info.event_type
                    ? parseInt(venueInfo.event_main_info.event_type)
                    : null
        })

        // reset step value
        setActiveStep(response.venue.data && response.venue.data.step ? parseInt(response.venue.data.step) : 0)
        const currentStep = response.venue.data && response.venue.data.step ? parseInt(response.venue.data.step) : 0

        if (currentStep === 2 || currentStep === 13) {
            setEventCategories(response.event_categories ?? [])
        } else if (currentStep === 3) {
            setEventTypes(response.event_types ?? [])
        }

        // reset form elements
        if (currentStep == 0) {
            loadScript()

            const venue_main_info = venueInfo && venueInfo.venue_main_info ? venueInfo.venue_main_info : venueMainValues
            venueMainReset({
                name: response.venue.name ?? '',
                phone: venue_main_info.phone,
                email: venue_main_info.email,
                address: venue_main_info.address
            })
        } else if (currentStep == 1) {
            const venue_extra_info = response.venue.data.venue_extra_info ?? venueExtraValues

            venueExtraReset({
                domain: response.venue.domain ?? '',
                summary: venue_extra_info.summary,
                logo: venue_extra_info.logo,
                landing: venue_extra_info.landing
            })
        } else if (currentStep == 2) {
            const event_main_info = response.venue.data.event_main_info ?? eventMainValues

            eventMainReset({
                event_category: event_main_info.event_category,
                title: event_main_info.title,
                sub_title: event_main_info.sub_title,
                banner_heading: event_main_info.banner_heading,
                description: event_main_info.description,
                banner: event_main_info.banner,
                gallery: event_main_info.gallery
            })

            setGalleryFiles(event_main_info.gallery)
        } else if (currentStep == 3) {
            const event_main_info = response.venue.data.event_main_info ?? eventTypeValues

            eventTypeReset({
                event_type: event_main_info.event_type ?? ''
            })
        } else if (currentStep == 4) {
            eventDetailReset({
                tables:
                    response.venue.data.booking_info && response.venue.data.booking_info.tables
                        ? JSON.parse(response.venue.data.booking_info.tables)
                        : eventDetailValues.tables,
                tickets:
                    response.venue.data.booking_info && response.venue.data.booking_info.tickets
                        ? JSON.parse(response.venue.data.booking_info.tickets)
                        : eventDetailValues.tickets
            })

            const event_type_value = parseInt(response.venue.data.event_main_info.event_type)

            if (event_type_value === 1) {
                setEventTypeSelected('1')
                eventDetailSet('tickets', {
                    enabled: 0,
                    data: null
                })
            } else if (event_type_value === 2) {
                setEventTypeSelected('2')
                eventDetailSet('tables', {
                    enabled: 0,
                    data: null
                })
            } else if (event_type_value === 3) {
                setEventTypeSelected('1')
            }

            let tables = eventDetailGet('tables')
            let tickets = eventDetailGet('tickets')

            if (response.venue.data.booking_info && response.venue.data.booking_info.tables) {
                let server_tables = JSON.parse(response.venue.data.booking_info.tables)
                if (server_tables.data && server_tables.data.length && tables.data && tables.data.length) {
                    const new_tables_data = tables.data.map((item, index) => {
                        return {
                            ...item,
                            date: new Date(item.date),
                            deposit: item.deposit.is_full_payment
                                ? item.deposit
                                : {
                                    ...item.deposit,
                                    due_date: new Date(item.deposit.due_date)
                                }
                        }
                    })

                    eventDetailSet('tables', {
                        ...tables,
                        data: new_tables_data
                    })
                }
            }

            if (response.venue.data.booking_info && response.venue.data.booking_info.tickets) {
                let server_tickets = JSON.parse(response.venue.data.booking_info.tickets)
                if (server_tickets.data && server_tickets.data.length && tickets.data && tickets.data.length) {
                    const new_tickets_data = tickets.data.map((item, index) => {
                        return {
                            ...item,
                            date: new Date(item.date),
                            deposit: item.deposit.is_full_payment
                                ? item.deposit
                                : {
                                    ...item.deposit,
                                    due_date: new Date(item.deposit.due_date)
                                }
                        }
                    })

                    eventDetailSet('tickets', {
                        ...tickets,
                        data: new_tickets_data
                    })
                }
            }
        } else if (currentStep == 5) {
            const event_package_info = response.venue.data.event_package_info ?? eventPackageValues

            eventPackageReset({
                event_main_heading: event_package_info.event_main_heading,
                event_sub_heading: event_package_info.event_sub_heading,
                event_package_flyer: event_package_info.event_package_flyer,
                event_package_info: event_package_info.event_package_info
            })
        } else if (currentStep == 6) {
            const event_catering_info = response.venue.data.event_catering_info ?? eventCateringValues

            eventCateringReset({
                food_choice: event_catering_info.food_choice
            })
        } else if (currentStep == 7) {
            const event_menu_info = response.venue.data.event_menu_info ?? eventMenuValues

            eventMenuReset({
                menu_title: event_menu_info.menu_title,
                menu_description: event_menu_info.menu_description,
                menu_list:
                    response.venue.data.event_menu_info && response.venue.data.event_menu_info.menu_list
                        ? JSON.parse(response.venue.data.event_menu_info.menu_list)
                        : eventMenuValues.menu_list
            })
        } else if (currentStep == 8) {
            const event_landing_info = response.venue.data.event_landing_info ?? extraLandingValues

            extraLandingReset({
                section_title: event_landing_info.section_title,
                section_description: event_landing_info.section_description,
                package_deal_list:
                    response.venue.data.event_landing_info && response.venue.data.event_landing_info.package_deal_list
                        ? JSON.parse(response.venue.data.event_landing_info.package_deal_list)
                        : extraLandingValues.package_deal_list
            })
        } else if (currentStep == 9) {
            extraInfoReset({
                extra_info:
                    response.venue.data.site_extra_info && response.venue.data.site_extra_info.extra_info
                        ? JSON.parse(response.venue.data.site_extra_info.extra_info)
                        : extraInfoValues.extra_info,
                background: response.venue.data.site_extra_info.background ?? undefined,
                brochure: response.venue.data.site_extra_info.brochure ?? undefined
            })
        } else if (currentStep == 10) {
            faqInfoReset({
                faq_list:
                    response.venue.data.site_faq_info && response.venue.data.site_faq_info.faq_list
                        ? JSON.parse(response.venue.data.site_faq_info.faq_list)
                        : faqInfoValues.faq_list
            })
        } else if (currentStep == 11) {
            const reminder_email_info = response.venue.data.reminder_email_info ?? reminderEmailValues

            reminderEmailReset({
                is_configure_reminder_email: reminder_email_info.is_configure_reminder_email,
                days_before_event_reminder_email: reminder_email_info.days_before_event_reminder_email
            })
        } else if (currentStep == 12) {
            paymentSettingReset({
                payment_option: response.venue.data.payment_info.payment_option ?? reminderEmailValues.payment_option,
                bank_info:
                    response.venue.data.payment_info && response.venue.data.payment_info.bank_info
                        ? JSON.parse(response.venue.data.payment_info.bank_info)
                        : paymentSettingValues.bank_info,
                card_info:
                    response.venue.data.payment_info && response.venue.data.payment_info.card_info
                        ? JSON.parse(response.venue.data.payment_info.card_info)
                        : paymentSettingValues.card_info
            })

            setPaymentOption(
                parseInt(
                    response.venue.data.payment_info && response.venue.data.payment_info.payment_option
                        ? response.venue.data.payment_info.payment_option
                        : reminderEmailValues.payment_option
                )
            )
        } else if (currentStep == 13) {
            const another_venue_info = response.venue.data.another_venue_info
                ? JSON.parse(response.venue.data.another_venue_info)
                : anotherLocationValues
            anotherLocationReset({
                event_category: another_venue_info.event_category,
                address: another_venue_info.address,
                is_duplicate: another_venue_info.is_duplicate
            })
        }
    }

    // Handle Remove event date
    const removeEventDateItem = id => {
        const current_event_date = [...getFifthValues('event_date')]

        setFifthValue(
            'event_date',
            current_event_date.filter((item, index) => index != id)
        )

        return
    }

    // Handle Add more event date
    const addMoreEventDateItem = () => {
        setFifthValue('event_date', [
            ...getFifthValues('event_date'),
            {
                date: undefined,
                price: ''
            }
        ])

        return
    }

    const addMoreEventDateTable = index => {
        const current_table_info = eventDetailGet('tables')
        current_table_info.data[index].list = [
            ...current_table_info.data[index].list,
            {
                min: 0,
                max: 0,
                total: 0,
                price: 0
            }
        ]
        eventDetailSet('tables', current_table_info)

        return
    }

    const addMoreTicketsEventType = index => {
        const current_table_info = eventDetailGet('tickets')
        current_table_info.data[index].list = [
            ...current_table_info.data[index].list,
            {
                title: '',
                description: '',
                total: 0,
                price: 0
            }
        ]
        eventDetailSet('tickets', current_table_info)

        return
    }

    const removeTablesEventDateTable = (index, table_index) => {
        const current_table_info = eventDetailGet('tables')

        current_table_info.data[index].list = current_table_info.data[index].list.filter(
            (item, sub_index) => sub_index != table_index
        )
        eventDetailSet('tables', current_table_info)

        return
    }

    const removeTicketsEventType = (index, table_index) => {
        const current_table_info = eventDetailGet('tickets')

        current_table_info.data[index].list = current_table_info.data[index].list.filter(
            (item, sub_index) => sub_index != table_index
        )
        eventDetailSet('tickets', current_table_info)

        return
    }

    const removeTableEventDateListItem = key => {
        const current_table_info = eventDetailGet('tables')

        current_table_info.data = current_table_info.data.filter((item, index) => index != key)
        eventDetailSet('tables', current_table_info)

        return
    }

    const removeTicketEventDateListItem = key => {
        const current_table_info = eventDetailGet('tickets')

        current_table_info.data = current_table_info.data.filter((item, index) => index != key)
        eventDetailSet('tickets', current_table_info)

        return
    }

    const addMoreDateToEvent = index => {
        const current_table_info = eventDetailGet('tables')

        const updated_data = current_table_info.data.map((item, index) => {
            return {
                ...item,
                selected: false
            }
        })

        let new_date = new Date(updated_data[updated_data.length - 1].date)
        new_date.setDate(new_date.getDate() + 1)

        current_table_info.data = [
            ...updated_data,
            {
                ...updated_data[updated_data.length - 1],
                selected: true,
                date: new_date
            }
        ]

        eventDetailSet('tables', current_table_info)

        return
    }

    const addMoreTicketsEventDate = index => {
        const current_table_info = eventDetailGet('tickets')

        const updated_data = current_table_info.data.map((item, index) => {
            return {
                ...item,
                selected: false
            }
        })

        let new_date = new Date(updated_data[updated_data.length - 1].date)
        new_date.setDate(new_date.getDate() + 1)

        current_table_info.data = [
            ...updated_data,
            {
                ...updated_data[updated_data.length - 1],
                selected: true,
                date: new_date
            }
        ]

        eventDetailSet('tickets', current_table_info)

        return
    }

    // Handle Remove event package info
    const removeEventPackageInfoItem = id => {
        const current_event_package_info = [...eventPackageGet('event_package_info')]

        eventPackageSet(
            'event_package_info',
            current_event_package_info.filter((item, index) => index != id)
        )

        return
    }

    // Handle Add more event package info
    const addMoreEventPackageInfo = () => {
        eventPackageSet('event_package_info', [...eventPackageGet('event_package_info'), ''])

        return
    }

    const resetMenuItems = index => {
        let current_menu_list = eventMenuGet('menu_list')
        current_menu_list[index].list = Array.from({length: current_menu_list[index].count}, () => '')
        eventMenuSet('menu_list', current_menu_list)

        return
    }

    const removeMenuList = id => {
        const current_menu_list = [...eventMenuGet('menu_list')]

        eventMenuSet(
            'menu_list',
            current_menu_list.filter((item, index) => index != id)
        )

        return
    }

    const addMoreMenu = () => {
        eventMenuSet('menu_list', [
            ...eventMenuGet('menu_list'),
            {
                name: '',
                count: 0,
                list: []
            }
        ])

        return
    }

    const addMorePackageDealList = () => {
        extraLandingSet('package_deal_list', [
            ...extraLandingGet('package_deal_list'),
            {
                heading: '',
                description: '',
                price: 0
            }
        ])

        return
    }

    const removePackageDealList = id => {
        const current_package_deal_list = [...extraLandingGet('package_deal_list')]

        extraLandingSet(
            'package_deal_list',
            current_package_deal_list.filter((item, index) => index != id)
        )

        return
    }

    const addMoreFaqList = () => {
        faqInfoSet('faq_list', [
            ...faqInfoGet('faq_list'),
            {
                heading: '',
                description: ''
            }
        ])

        return
    }

    const removeFaqList = id => {
        const current_faq_list = [...faqInfoGet('faq_list')]

        faqInfoSet(
            'faq_list',
            current_faq_list.filter((item, index) => index != id)
        )

        return
    }

    const addMoreExtraInfoList = () => {
        extraInfoSet('extra_info', [
            ...extraInfoGet('extra_info'),
            {
                heading: '',
                sub_heading: '',
                description: '',
                phone: '',
                link: ''
            }
        ])

        return
    }

    const removeExtraInfoList = id => {
        const current_extra_info_list = [...extraInfoGet('extra_info')]

        extraInfoSet(
            'extra_info',
            current_extra_info_list.filter((item, index) => index != id)
        )

        return
    }

    const removeLogoImg = () => {
        venueExtraSet('logo', '')

        return
    }

    const removeLandingImg = () => {
        venueExtraSet('landing', '')

        return
    }

    const removeHeadBannerImg = () => {
        eventMainSet('banner', '')

        return
    }

    const removeFlyerImg = () => {
        eventPackageSet('event_package_flyer', '')

        return
    }

    const removeExtraInfoBackground = () => {
        extraInfoSet('background', '')

        return
    }

    const removeExtraInfoBrochure = () => {
        extraInfoSet('brochure', '')

        return
    }

    const handleTableDateChange = key => (event, isExpanded) => {
        const current_table_info = eventDetailGet('tables')

        const updated_data = current_table_info.data.map((item, index) => {
            if (index === key) {
                return {
                    ...item,
                    selected: isExpanded
                }
            } else {
                return item
            }
        })

        current_table_info.data = updated_data
        eventDetailSet('tables', current_table_info)

        return
    }

    const handleTicketsDateChange = key => (event, isExpanded) => {
        const current_table_info = eventDetailGet('tickets')

        const updated_data = current_table_info.data.map((item, index) => {
            if (index === key) {
                return {
                    ...item,
                    selected: isExpanded
                }
            } else {
                return item
            }
        })

        current_table_info.data = updated_data
        eventDetailSet('tickets', current_table_info)

        return
    }

    // Handle Back
    const handleBack = async () => {
        setLoading(true)

        // send back request to api
        const response = await BackRequestService()
        if (response.success) {
            resetStatus(response)
        } else {
            toast.error(
                response.error ? (typeof response.error === 'string' ? response.error : 'Invalid input') : response.message
            )

            if (response.error === 'Unauthorized') {
                if (router.asPath !== '/') {
                    router.replace({
                        pathname: '/login',
                        query: {returnUrl: router.asPath}
                    })
                } else {
                    router.replace('/login')
                }
            }
        }

        setLoading(false)
    }

    // Handle skip
    const handleSkip = async () => {
        setLoading(true)

        // send back request to api
        const response = await SkipStepRequestService()
        if (response.success) {
            resetStatus(response)
        } else {
            toast.error(
                response.error ? (typeof response.error === 'string' ? response.error : 'Invalid input') : response.message
            )

            if (response.error === 'Unauthorized') {
                if (router.asPath !== '/') {
                    router.replace({
                        pathname: '/login',
                        query: {returnUrl: router.asPath}
                    })
                } else {
                    router.replace('/login')
                }
            }
        }

        setLoading(false)
    }

    const handleReset = () => {
        setActiveStep(0)
    }

    const handlePublish = async () => {
        setLoading(true)

        const payload = {step: activeStep, publish: 'true'}

        let formData = new FormData()
        for (var key in payload) {
            formData.append(key, payload[key])
        }

        try {
            const response = await RegisterVenueService(formData)
            if (response.success) {
                router.replace('/')
            } else {
                toast.error(
                    response.error ? (typeof response.error === 'string' ? response.error : 'Invalid input') : response.message
                )
            }
        } catch (error) {
            console.error(error.message)
        }
        setLoading(false)
    }

    const onSubmit = () => {
        setActiveStep(activeStep + 1)
        if (activeStep === steps.length - 1) {
            toast.success('Form Submitted')
        }
    }

    const registerVenueSubmit = async formData => {
        setLoading(true)

        try {
            const response = await RegisterVenueService(formData)
            if (response.success) {
                resetStatus(response)
            } else {
                toast.error(
                    response.error ? (typeof response.error === 'string' ? response.error : 'Invalid input') : response.message
                )

                if (response.error === 'Unauthorized') {
                    if (router.asPath !== '/') {
                        router.replace({
                            pathname: '/login',
                            query: {returnUrl: router.asPath}
                        })
                    } else {
                        router.replace('/login')
                    }
                }
            }
        } catch (error) {
            console.error(error.message)
        }

        setLoading(false)
    }

    const onVenueMainSubmit = async data => {
        const payload = {step: activeStep, name: data.name, phone: data.phone, email: data.email}

        let formData = new FormData()
        for (var key in payload) {
            formData.append(key, payload[key])
        }

        formData.append('address', JSON.stringify(data.address))

        registerVenueSubmit(formData)
    }

    const onVenueExtraSubmit = async data => {
        var payload = {step: activeStep, domain: data.domain, summary: data.summary}

        let formData = new FormData()
        for (var key in payload) {
            formData.append(key, payload[key])
        }
        formData.append('logo', data.logo)
        formData.append('landing', data.landing)

        registerVenueSubmit(formData)
    }

    const onEventMainSubmit = async data => {
        var payload = {
            step: activeStep,
            event_category: data.event_category,
            title: data.title,
            sub_title: data.sub_title,
            banner_heading: data.banner_heading,
            description: data.description
        }

        let formData = new FormData()
        for (var key in payload) {
            formData.append(key, payload[key])
        }
        formData.append('banner', data.banner)
        data.gallery.forEach(file => {
            formData.append('gallery[]', file)
        })

        registerVenueSubmit(formData)
    }

    const onEventTypeSubmit = async data => {
        var payload = {
            step: activeStep,
            event_type: data.event_type
        }

        let formData = new FormData()
        for (var key in payload) {
            formData.append(key, payload[key])
        }

        registerVenueSubmit(formData)
    }

    const onEventDetailSubmit = async data => {
        var payload = {
            step: activeStep
        }

        let formData = new FormData()
        for (var key in payload) {
            formData.append(key, payload[key])
        }

        formData.append('tables', JSON.stringify(data.tables))
        formData.append('tickets', JSON.stringify(data.tickets))

        registerVenueSubmit(formData)
    }

    const onEventPackageSubmit = async data => {
        var payload = {
            step: activeStep,
            event_main_heading: data.event_main_heading,
            event_sub_heading: data.event_sub_heading,
            event_package_flyer: data.event_package_flyer
        }

        let formData = new FormData()
        for (var key in payload) {
            formData.append(key, payload[key])
        }

        data.event_package_info.forEach((value, index) => {
            formData.append(`event_package_info[${index}]`, value)
        })

        registerVenueSubmit(formData)
    }

    const onEventCateringSubmit = async data => {
        var payload = {
            step: activeStep,
            food_choice: data.food_choice
        }

        let formData = new FormData()
        for (var key in payload) {
            formData.append(key, payload[key])
        }

        registerVenueSubmit(formData)
    }

    const onEventMenuSubmit = async data => {
        var payload = {
            step: activeStep,
            menu_title: data.menu_title,
            menu_description: data.menu_description
        }

        let formData = new FormData()
        for (var key in payload) {
            formData.append(key, payload[key])
        }

        formData.append('menu_list', JSON.stringify(data.menu_list))

        registerVenueSubmit(formData)
    }

    const onExtraLandingSubmit = async data => {
        var payload = {
            step: activeStep,
            section_title: data.section_title,
            section_description: data.section_description
        }

        let formData = new FormData()
        for (var key in payload) {
            formData.append(key, payload[key])
        }

        formData.append('package_deal_list', JSON.stringify(data.package_deal_list))

        registerVenueSubmit(formData)
    }

    const onFaqInfoSubmit = async data => {
        var payload = {
            step: activeStep
        }

        let formData = new FormData()
        for (var key in payload) {
            formData.append(key, payload[key])
        }

        formData.append('faq_list', JSON.stringify(data.faq_list))

        registerVenueSubmit(formData)
    }

    const onExtraInfoSubmit = async data => {
        var payload = {
            step: activeStep,
            background: data.background,
            brochure: data.brochure
        }

        let formData = new FormData()
        for (var key in payload) {
            formData.append(key, payload[key])
        }

        formData.append('extra_info', JSON.stringify(data.extra_info))

        registerVenueSubmit(formData)
    }

    const onReminderEmailSubmit = async data => {
        var payload = {
            step: activeStep,
            is_configure_reminder_email: data.is_configure_reminder_email,
            days_before_event_reminder_email: data.days_before_event_reminder_email
        }

        let formData = new FormData()
        for (var key in payload) {
            formData.append(key, payload[key])
        }

        registerVenueSubmit(formData)
    }

    const onPaymentSettingSubmit = async data => {
        var payload = {
            step: activeStep,
            payment_option: data.payment_option
        }

        let formData = new FormData()
        for (var key in payload) {
            formData.append(key, payload[key])
        }

        formData.append('bank_info', JSON.stringify(data.bank_info))
        formData.append('card_info', JSON.stringify(data.card_info))

        registerVenueSubmit(formData)
    }

    const onAnotherLocationSubmit = async data => {
        var payload = {
            step: activeStep
        }

        let formData = new FormData()
        for (var key in payload) {
            formData.append(key, payload[key])
        }

        if (data.event_category !== '' && data.address.title !== '') {
            formData.append('another_venue', JSON.stringify(data))
        }

        registerVenueSubmit(formData)
    }

    const getStepContent = step => {
        switch (step) {
            case 0:
                return (
                    <form key={0} onSubmit={venueMainSubmit(onVenueMainSubmit)}>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <Typography variant='h4'
                                            sx={{textAlign: 'center', fontWeight: 600, color: 'common.black'}}>
                                    {steps[0].subtitle}
                                </Typography>
                                <Box sx={{
                                    paddingLeft: 2,
                                    borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                }}>
                                    <Typography variant='h5'
                                                sx={{mt: 8, textAlign: 'left', fontWeight: 600, color: 'common.black'}}>
                                        {steps[0].title}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='name'
                                        control={venueMainControl}
                                        rules={{required: true}}
                                        render={({field: {value, onChange}}) => (
                                            <TextField
                                                value={value}
                                                label='Venue Name'
                                                onChange={onChange}
                                                placeholder='e.g. Stock Brook'
                                                error={Boolean(venueMainErrors.name)}
                                                aria-describedby='venue-base-info-name'
                                            />
                                        )}
                                    />
                                    {venueMainErrors.name && (
                                        <FormHelperText sx={{color: 'error.main'}} id='error-venue-base-info-name'>
                                            {venueMainErrors.name.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='phone'
                                        control={venueMainControl}
                                        rules={{required: true}}
                                        render={({field: {value, onChange}}) => (
                                            <TextField
                                                type='phone'
                                                value={value}
                                                label='Venue Contact Number'
                                                onChange={onChange}
                                                error={Boolean(venueMainErrors.phone)}
                                                placeholder='123 456 7890'
                                                aria-describedby='venue-base-info-phone'
                                            />
                                        )}
                                    />
                                    {venueMainErrors.phone && (
                                        <FormHelperText sx={{color: 'error.main'}} id='error-venue-base-info-phone'>
                                            {venueMainErrors.phone.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='email'
                                        control={venueMainControl}
                                        rules={{required: true}}
                                        render={({field: {value, onChange}}) => (
                                            <TextField
                                                type='email'
                                                value={value}
                                                label='Venue Email'
                                                onChange={onChange}
                                                error={Boolean(venueMainErrors.email)}
                                                placeholder='xyz@gmail.com'
                                                aria-describedby='venue-base-info-email'
                                            />
                                        )}
                                    />
                                    {venueMainErrors.email && (
                                        <FormHelperText sx={{color: 'error.main'}} id='error-venue-base-info-email'>
                                            {venueMainErrors.email.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='address'
                                        control={venueMainControl}
                                        rules={{required: true}}
                                        render={({field: {value, onChange}}) => (
                                            <>
                                                {autocompleteService ? (
                                                    <PlaceAutoComplete
                                                        autocompleteService={autocompleteService}
                                                        onChange={onChange}
                                                        initValue={value}
                                                    />
                                                ) : (
                                                    <TextField
                                                        type='text'
                                                        value={value.title}
                                                        label='Venue Address'
                                                        onChange={onChange}
                                                        error={Boolean(venueMainErrors.address)}
                                                        placeholder='e.g. Stock Brook Country Club ...'
                                                        aria-describedby='venue-base-info-address'
                                                    />
                                                )}
                                            </>
                                        )}
                                    />
                                    {venueMainErrors.address && (
                                        <FormHelperText sx={{color: 'error.main'}} id='error-venue-base-info-address'>
                                            {venueMainErrors.address.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={12}
                                sx={{mt: 18, display: 'flex', justifyContent: 'center', position: 'relative'}}
                            >
                                <Button size='large' variant='outlined' color='secondary' onClick={handleBack}
                                        sx={{mr: 24}} disabled>
                                    Back
                                </Button>
                                <Button size='large' type='submit' variant='contained'>
                                    Next
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )
            case 1:
                return (
                    <form key={1} onSubmit={venueExtraSubmit(onVenueExtraSubmit)}>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <Typography variant='h4'
                                            sx={{textAlign: 'center', fontWeight: 600, color: 'common.black'}}>
                                    {steps[1].subtitle}
                                </Typography>
                                <Box sx={{
                                    paddingLeft: 2,
                                    borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                }}>
                                    <Typography variant='h5'
                                                sx={{mt: 8, textAlign: 'left', fontWeight: 600, color: 'common.black'}}>
                                        {steps[1].title}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='domain'
                                        control={venueExtraControl}
                                        rules={{required: true, maxLength: 16, minLength: 5}}
                                        render={({field: {value, onChange}}) => (
                                            <TextField
                                                value={value.toLowerCase()}
                                                InputProps={{
                                                    endAdornment: <InputAdornment
                                                        position='end'>{'.eventwizz.org'}</InputAdornment>
                                                }}
                                                label='Domain'
                                                onChange={onChange}
                                                placeholder='e.g.stock-brook'
                                                error={Boolean(venueExtraErrors.domain)}
                                                aria-describedby='stepper-linear-second-domain'
                                            />
                                        )}
                                    />
                                    {venueExtraErrors.domain && (
                                        <FormHelperText sx={{color: 'error.main'}} id='stepper-linear-second-domain'>
                                            {venueExtraErrors.domain.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='summary'
                                        control={venueExtraControl}
                                        rules={{required: true, maxLength: 200, minLength: 20}}
                                        render={({field: {value, onChange}}) => (
                                            <TextField
                                                multiline
                                                rows={4}
                                                value={value}
                                                label='Summary'
                                                onChange={onChange}
                                                placeholder='e.g. Checkout the stock brook event ...'
                                                error={Boolean(venueExtraErrors.summary)}
                                                aria-describedby='stepper-linear-second-summary'
                                            />
                                        )}
                                    />
                                    {venueExtraErrors.summary && (
                                        <FormHelperText sx={{color: 'error.main'}} id='stepper-linear-second-summary'>
                                            {venueExtraErrors.summary.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Box sx={{
                                    mb: 4,
                                    paddingLeft: 2,
                                    borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                }}>
                                    <Typography variant='h5'
                                                sx={{mt: 8, textAlign: 'left', fontWeight: 600, color: 'common.black'}}>
                                        Add Logo
                                    </Typography>
                                </Box>
                                <FormControl fullWidth>
                                    <Controller
                                        name='logo'
                                        control={venueExtraControl}
                                        render={({field: {value, onChange, ...field}}) => (
                                            <>
                                                <DropzoneWrapper onClick={e => clickLogoFile()}>
                                                    <Box className='dropzone'>
                                                        <Input
                                                            inputRef={logoRef}
                                                            {...field}
                                                            value={value?.fileName}
                                                            onChange={event => {
                                                                onChange(event.target.files[0])
                                                            }}
                                                            type='file'
                                                            aria-describedby='stepper-linear-second-logo'
                                                            sx={{display: 'none'}}
                                                        />
                                                        {value !== undefined && value !== '' ? (
                                                            uploadImg(value, 'logo')
                                                        ) : (
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    flexDirection: ['column', 'column', 'row'],
                                                                    alignItems: 'center'
                                                                }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        display: 'flex',
                                                                        flexDirection: 'column',
                                                                        textAlign: ['center', 'center', 'inherit']
                                                                    }}
                                                                >
                                                                    <HeadingTypography variant='h5'>Click here to
                                                                        upload.</HeadingTypography>
                                                                </Box>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                </DropzoneWrapper>
                                                {value ? (
                                                    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                                        <Button
                                                            sx={{my: 4}}
                                                            size='medium'
                                                            variant='contained'
                                                            color='secondary'
                                                            startIcon={<Icon icon='mdi:delete-outline'/>}
                                                            onClick={removeLogoImg}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </Box>
                                                ) : (
                                                    <></>
                                                )}
                                            </>
                                        )}
                                    />
                                    {venueExtraErrors.logo && (
                                        <FormHelperText sx={{color: 'error.main'}} id='stepper-linear-second-logo'>
                                            {venueExtraErrors.logo.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Box sx={{
                                    mb: 4,
                                    paddingLeft: 2,
                                    borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                }}>
                                    <Typography variant='h5'
                                                sx={{mt: 8, textAlign: 'left', fontWeight: 600, color: 'common.black'}}>
                                        Add Landing Page Image
                                    </Typography>
                                </Box>
                                <FormControl fullWidth>
                                    <Controller
                                        name='landing'
                                        control={venueExtraControl}
                                        render={({field: {value, onChange, ...field}}) => (
                                            <>
                                                <DropzoneWrapper onClick={e => clickLandingFile()}>
                                                    <Box className='dropzone'>
                                                        <Input
                                                            inputRef={landingRef}
                                                            {...field}
                                                            value={value?.fileName}
                                                            onChange={event => {
                                                                onChange(event.target.files[0])
                                                            }}
                                                            type='file'
                                                            aria-describedby='stepper-linear-second-landing'
                                                            sx={{display: 'none'}}
                                                        />
                                                        {value ? (
                                                            uploadImg(value, 'landing-image')
                                                        ) : (
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    flexDirection: ['column', 'column', 'row'],
                                                                    alignItems: 'center'
                                                                }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        display: 'flex',
                                                                        flexDirection: 'column',
                                                                        textAlign: ['center', 'center', 'inherit']
                                                                    }}
                                                                >
                                                                    <HeadingTypography variant='h5'>Click here to
                                                                        upload.</HeadingTypography>
                                                                </Box>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                </DropzoneWrapper>
                                                {value ? (
                                                    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                                        <Button
                                                            sx={{my: 4}}
                                                            size='medium'
                                                            variant='contained'
                                                            color='secondary'
                                                            startIcon={<Icon icon='mdi:delete-outline'/>}
                                                            onClick={removeLandingImg}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </Box>
                                                ) : (
                                                    <></>
                                                )}
                                            </>
                                        )}
                                    />
                                    {venueExtraErrors.landing && (
                                        <FormHelperText sx={{color: 'error.main'}} id='stepper-linear-second-landing'>
                                            {venueExtraErrors.landing.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={12}
                                sx={{mt: 18, display: 'flex', justifyContent: 'center', position: 'relative'}}
                            >
                                <Button size='large' variant='outlined' color='secondary' onClick={handleBack}
                                        sx={{mr: 24}}>
                                    Back
                                </Button>
                                <Button size='large' type='submit' variant='contained'>
                                    Next
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )
            case 2:
                return (
                    <form key={2} onSubmit={eventMainSubmit(onEventMainSubmit)}>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <Typography variant='h4'
                                            sx={{textAlign: 'center', fontWeight: 600, color: 'common.black'}}>
                                    {steps[2].subtitle}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Box sx={{
                                    mb: 4,
                                    paddingLeft: 2,
                                    borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                }}>
                                    <Typography variant='h5'
                                                sx={{mt: 8, textAlign: 'left', fontWeight: 600, color: 'common.black'}}>
                                        Event Category
                                    </Typography>
                                </Box>
                                <CustomFormControl fullWidth>
                                    <Controller
                                        name='event_category'
                                        control={eventMainControl}
                                        render={({field: {value, onChange}}) => (
                                            <>
                                                <InputLabel
                                                    id='venue-event-category-select-label'>{'Choose a category...'}</InputLabel>
                                                <Select
                                                    value={value}
                                                    label=''
                                                    id='venue-event-category-select'
                                                    onChange={onChange}
                                                    labelId='venue-event-category-select-label'
                                                >
                                                    {eventCategories.map((category, index) => (
                                                        <MenuItem key={index} value={category.id}>
                                                            {category.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </>
                                        )}
                                    />
                                    {eventMainErrors.event_category && (
                                        <FormHelperText sx={{color: 'error.main'}}
                                                        id='stepper-linear-third-event-category'>
                                            {eventMainErrors.event_category.message}
                                        </FormHelperText>
                                    )}
                                </CustomFormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Box sx={{
                                    mb: 4,
                                    paddingLeft: 2,
                                    borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                }}>
                                    <Typography variant='h5'
                                                sx={{mt: 8, textAlign: 'left', fontWeight: 600, color: 'common.black'}}>
                                        Header Banner Image
                                    </Typography>
                                </Box>
                                <FormControl fullWidth>
                                    <Controller
                                        name='banner'
                                        control={eventMainControl}
                                        render={({field: {value, onChange, ...field}}) => (
                                            <>
                                                <DropzoneWrapper onClick={e => clickBannerFile()}>
                                                    <Box className='dropzone'>
                                                        <Input
                                                            inputRef={bannerRef}
                                                            {...field}
                                                            value={value?.fileName}
                                                            onChange={event => {
                                                                onChange(event.target.files[0])
                                                            }}
                                                            type='file'
                                                            aria-describedby='stepper-linear-third-banner'
                                                            sx={{display: 'none'}}
                                                        />
                                                        {value ? (
                                                            uploadImg(value, 'banner')
                                                        ) : (
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    flexDirection: ['column', 'column', 'row'],
                                                                    alignItems: 'center'
                                                                }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        display: 'flex',
                                                                        flexDirection: 'column',
                                                                        textAlign: ['center', 'center', 'inherit']
                                                                    }}
                                                                >
                                                                    <HeadingTypography sx={{textAlign: 'center'}}
                                                                                       variant='h5'>
                                                                        Click here to upload.
                                                                    </HeadingTypography>
                                                                    <Typography
                                                                        color='textSecondary'
                                                                        sx={{
                                                                            textAlign: 'center',
                                                                            maxWidth: '400px',
                                                                            '& a': {
                                                                                color: 'primary.main',
                                                                                textDecoration: 'none'
                                                                            }
                                                                        }}
                                                                    >
                                                                        {
                                                                            'Images can be up to 1MB, Accepted Format(s): .jpg, .png, .gif and Size(s): 1600px by 900px'
                                                                        }
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                </DropzoneWrapper>
                                                {value ? (
                                                    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                                        <Button
                                                            sx={{my: 4}}
                                                            size='medium'
                                                            variant='contained'
                                                            color='secondary'
                                                            startIcon={<Icon icon='mdi:delete-outline'/>}
                                                            onClick={removeHeadBannerImg}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </Box>
                                                ) : (
                                                    <></>
                                                )}
                                            </>
                                        )}
                                    />
                                    {eventMainErrors.banner && (
                                        <FormHelperText sx={{color: 'error.main'}} id='stepper-linear-third-banner'>
                                            {eventMainErrors.banner.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Box sx={{
                                    mb: 4,
                                    paddingLeft: 2,
                                    borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                }}>
                                    <Typography variant='h5'
                                                sx={{mt: 8, textAlign: 'left', fontWeight: 600, color: 'common.black'}}>
                                        Add Banner Heading
                                    </Typography>
                                </Box>
                                <FormControl fullWidth>
                                    <Controller
                                        name='banner_heading'
                                        control={eventMainControl}
                                        render={({field: {value, onChange}}) => (
                                            <TextField
                                                value={value}
                                                label=''
                                                onChange={onChange}
                                                placeholder='e.g. Christmas Party'
                                                error={Boolean(eventMainErrors.banner_heading)}
                                                aria-describedby='stepper-linear-third-banner-heading'
                                            />
                                        )}
                                    />
                                    {eventMainErrors.banner_heading && (
                                        <FormHelperText sx={{color: 'error.main'}}
                                                        id='stepper-linear-third-banner-heading'>
                                            {eventMainErrors.banner_heading.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Box sx={{
                                    mb: 4,
                                    paddingLeft: 2,
                                    borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                }}>
                                    <Typography variant='h5'
                                                sx={{mt: 8, textAlign: 'left', fontWeight: 600, color: 'common.black'}}>
                                        Title
                                    </Typography>
                                </Box>
                                <FormControl fullWidth>
                                    <Controller
                                        name='title'
                                        control={eventMainControl}
                                        render={({field: {value, onChange}}) => (
                                            <TextField
                                                value={value}
                                                label=''
                                                onChange={onChange}
                                                placeholder='e.g. Christmas Party'
                                                error={Boolean(eventMainErrors.title)}
                                                aria-describedby='stepper-linear-third-title'
                                            />
                                        )}
                                    />
                                    {eventMainErrors.title && (
                                        <FormHelperText sx={{color: 'error.main'}} id='stepper-linear-third-title'>
                                            {eventMainErrors.title.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Box sx={{
                                    mb: 4,
                                    paddingLeft: 2,
                                    borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                }}>
                                    <Typography variant='h5'
                                                sx={{mt: 8, textAlign: 'left', fontWeight: 600, color: 'common.black'}}>
                                        Sub Title
                                    </Typography>
                                </Box>
                                <FormControl fullWidth>
                                    <Controller
                                        name='sub_title'
                                        control={eventMainControl}
                                        render={({field: {value, onChange}}) => (
                                            <TextField
                                                value={value}
                                                label=''
                                                onChange={onChange}
                                                placeholder='e.g. Christmas Party'
                                                error={Boolean(eventMainErrors.sub_title)}
                                                aria-describedby='stepper-linear-third-sub-title'
                                            />
                                        )}
                                    />
                                    {eventMainErrors.sub_title && (
                                        <FormHelperText sx={{color: 'error.main'}} id='stepper-linear-third-sub-title'>
                                            {eventMainErrors.sub_title.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Box sx={{
                                    mb: 4,
                                    paddingLeft: 2,
                                    borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                }}>
                                    <Typography variant='h5'
                                                sx={{mt: 8, textAlign: 'left', fontWeight: 600, color: 'common.black'}}>
                                        Description
                                    </Typography>
                                </Box>
                                <FormControl fullWidth>
                                    <Controller
                                        name='description'
                                        control={eventMainControl}
                                        render={({field: {value, onChange}}) => (
                                            <TextField
                                                multiline
                                                rows={8}
                                                value={value}
                                                label=''
                                                onChange={onChange}
                                                placeholder="e.g. Be immersed in Stock Brook's magical Christmas party..."
                                                error={Boolean(eventMainErrors.description)}
                                                aria-describedby='stepper-linear-third-description'
                                            />
                                        )}
                                    />
                                    {eventMainErrors.description && (
                                        <FormHelperText sx={{color: 'error.main'}}
                                                        id='stepper-linear-third-description'>
                                            {eventMainErrors.description.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Box sx={{
                                    mb: 4,
                                    paddingLeft: 2,
                                    borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                }}>
                                    <Typography variant='h5'
                                                sx={{mt: 8, textAlign: 'left', fontWeight: 600, color: 'common.black'}}>
                                        Add Gallery Images
                                    </Typography>
                                </Box>
                                <FormControl fullWidth>
                                    <Controller
                                        name='gallery'
                                        control={eventMainControl}
                                        render={({field: {value, onChange}}) => (
                                            <DropzoneWrapper>
                                                <Fragment>
                                                    <div {...getRootProps({className: 'dropzone'})}>
                                                        <input {...getInputProps()} />
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: ['column', 'column', 'row'],
                                                                alignItems: 'center'
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    textAlign: ['center', 'center', 'inherit']
                                                                }}
                                                            >
                                                                <HeadingTypography sx={{textAlign: 'center'}}
                                                                                   variant='h5'>
                                                                    Drop files here or click to upload.
                                                                </HeadingTypography>
                                                                <Typography
                                                                    color='textSecondary'
                                                                    sx={{
                                                                        textAlign: 'center',
                                                                        maxWidth: '400px',
                                                                        '& a': {
                                                                            color: 'primary.main',
                                                                            textDecoration: 'none'
                                                                        }
                                                                    }}
                                                                >
                                                                    Drop files here or click{' '}
                                                                    <Link href='/' onClick={e => e.preventDefault()}>
                                                                        browse
                                                                    </Link>{' '}
                                                                    thorough your machine
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </div>
                                                    {galleryFiles.length ? (
                                                        <Fragment>
                                                            <List>{fileList}</List>
                                                            <div className='buttons'>
                                                                <Button color='error' variant='outlined'
                                                                        onClick={handleRemoveAllFiles}>
                                                                    Remove All
                                                                </Button>
                                                            </div>
                                                        </Fragment>
                                                    ) : null}
                                                </Fragment>
                                            </DropzoneWrapper>
                                        )}
                                    />
                                    {eventMainErrors.gallery && (
                                        <FormHelperText sx={{color: 'error.main'}} id='stepper-linear-third-gallery'>
                                            {eventMainErrors.gallery.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={12}
                                sx={{mt: 18, display: 'flex', justifyContent: 'center', position: 'relative'}}
                            >
                                <Button size='large' variant='outlined' color='secondary' onClick={handleBack}
                                        sx={{mr: 24}}>
                                    Back
                                </Button>
                                <Button size='large' type='submit' variant='contained'>
                                    Next
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )
            case 3:
                return (
                    <form key={3} onSubmit={eventTypeSubmit(onEventTypeSubmit)}>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <Typography variant='h4'
                                            sx={{textAlign: 'center', fontWeight: 600, color: 'common.black'}}>
                                    {steps[3].subtitle}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Box sx={{
                                    mb: 4,
                                    paddingLeft: 2,
                                    borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                }}>
                                    <Typography variant='h5'
                                                sx={{mt: 8, textAlign: 'left', fontWeight: 600, color: 'common.black'}}>
                                        Is It A Ticketed Or Seated Event?
                                    </Typography>
                                </Box>
                                <CustomFormControl fullWidth>
                                    <Controller
                                        name='event_type'
                                        control={eventTypeControl}
                                        render={({field: {value, onChange}}) => (
                                            <>
                                                <InputLabel
                                                    id='venue-event-type-select-label'>{'Choose a event type...'}</InputLabel>
                                                <Select
                                                    value={value}
                                                    label=''
                                                    id='venue-event-type-select'
                                                    onChange={onChange}
                                                    labelId='venue-event-type-select-label'
                                                >
                                                    {eventTypes.map((type, index) => (
                                                        <MenuItem key={index} value={type.id.toString()}>
                                                            {type.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </>
                                        )}
                                    />
                                    {eventTypeErrors.event_type && (
                                        <FormHelperText sx={{color: 'error.main'}} id='error-event-type-select'>
                                            {eventTypeErrors.event_type.message}
                                        </FormHelperText>
                                    )}
                                </CustomFormControl>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={12}
                                sx={{mt: 18, display: 'flex', justifyContent: 'center', position: 'relative'}}
                            >
                                <Button size='large' variant='outlined' color='secondary' onClick={handleBack}
                                        sx={{mr: 24}}>
                                    Back
                                </Button>
                                <Button size='large' type='submit' variant='contained'>
                                    Next
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )
            case 4:
                return (
                    <form key={4} onSubmit={eventDetailSubmit(onEventDetailSubmit)}>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <Typography variant='h4'
                                            sx={{mb: 8, textAlign: 'center', fontWeight: 600, color: 'common.black'}}>
                                    {venueInfo.event_type === 3
                                        ? 'Booking Type Both'
                                        : venueInfo.event_type === 1
                                            ? 'Tell Us About Your Tables'
                                            : 'Tell Us About Your Tickets'}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TabContext value={eventTypeSelected}>
                                    <TabList onChange={handleEventTypeSelected} aria-label='customized tabs example'>
                                        {venueInfo.event_type === 2 ? null : <Tab value='1' label='Tables'/>}
                                        {venueInfo.event_type === 1 ? null : <Tab value='2' label='Tickets'/>}
                                    </TabList>
                                    <TabPanel value='1'>
                                        <FormControl fullWidth>
                                            <Controller
                                                name='tables'
                                                control={eventDetailControl}
                                                rules={{required: true}}
                                                render={({field: {value, onChange}}) => (
                                                    <>
                                                        {value.data.map((item, index) => (
                                                            <Accordion
                                                                key={index}
                                                                expanded={item.selected === true}
                                                                onChange={handleTableDateChange(index)}
                                                            >
                                                                <AccordionSummary
                                                                    id={'event-type-tables-header-' + index}
                                                                    aria-controls={'event-type-tables-content-' + index}
                                                                    expandIcon={<Icon icon='mdi:chevron-down'/>}
                                                                    sx={{
                                                                        backgroundColor: theme =>
                                                                            item.selected ? `${theme.palette.grey.A400} !important` : 'none'
                                                                    }}
                                                                >
                                                                    <Typography sx={{
                                                                        fontSize: '1.25rem',
                                                                        fontWeight: 'bold',
                                                                        color: 'common.black'
                                                                    }}>
                                                                        Date: {item.date ? item.date.toLocaleDateString('en-GB', dateShowOptions) : ''}
                                                                    </Typography>
                                                                </AccordionSummary>
                                                                <AccordionDetails>
                                                                    <Grid container spacing={2}>
                                                                        <Grid item sm={12} xs={12}>
                                                                            {index !== 0 ? (
                                                                                <Box sx={{
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    justifyContent: 'flex-end'
                                                                                }}>
                                                                                    <Typography
                                                                                        variant='h6'
                                                                                        sx={{
                                                                                            textAlign: 'left',
                                                                                            fontWeight: 600,
                                                                                            color: 'common.black'
                                                                                        }}
                                                                                    >
                                                                                        {'Remove'}
                                                                                    </Typography>

                                                                                    <IconButton
                                                                                        sx={{float: 'right'}}
                                                                                        aria-label='remove table date item'
                                                                                        color='primary'
                                                                                        onClick={() => removeTableEventDateListItem(index)}
                                                                                    >
                                                                                        <Icon fontSize={32}
                                                                                              icon='mdi:close-circle-outline'/>
                                                                                    </IconButton>
                                                                                </Box>
                                                                            ) : null}
                                                                        </Grid>
                                                                        <Grid item sm={6} xs={12}>
                                                                            <Typography variant='subtitle1'
                                                                                        sx={{mb: 1}}>
                                                                                Event Title
                                                                            </Typography>
                                                                            <TextField
                                                                                sx={{width: '100%'}}
                                                                                id={'event-detail-table-item-title-' + index}
                                                                                value={item.title}
                                                                                label=''
                                                                                onChange={e => {
                                                                                    const updated_value = value
                                                                                    updated_value.data[index].title = e.target.value
                                                                                    onChange(updated_value)
                                                                                }}
                                                                                placeholder={'e.g. ' + venueInfo.event_title ? venueInfo.event_title : ''}
                                                                                error={Boolean(
                                                                                    eventDetailErrors.tables &&
                                                                                    eventDetailErrors.tables.data[index] &&
                                                                                    eventDetailErrors.tables.data[index].title
                                                                                )}
                                                                            />
                                                                            {eventDetailErrors.tables &&
                                                                                eventDetailErrors.tables.data[index] &&
                                                                                eventDetailErrors.tables.data[index].title && (
                                                                                    <FormHelperText
                                                                                        sx={{
                                                                                            my: 2,
                                                                                            color: 'error.main'
                                                                                        }}
                                                                                        id={'error-event-detail-tables-data-list-item-title' + index}
                                                                                    >
                                                                                        {eventDetailErrors.tables.data[index].title.message}
                                                                                    </FormHelperText>
                                                                                )}
                                                                        </Grid>
                                                                        <Grid item sm={6} xs={12}>
                                                                            <Typography variant='subtitle1'
                                                                                        sx={{mb: 1}}>
                                                                                Date Of Event
                                                                            </Typography>
                                                                            <DatePickerWrapper>
                                                                                <DatePicker
                                                                                    selected={item.date}
                                                                                    id={'event-detail-tables-item-date-' + index}
                                                                                    popperPlacement={'bottom-start'}
                                                                                    onChange={date => {
                                                                                        const updated_value = value
                                                                                        updated_value.data[index].date = date
                                                                                        onChange(updated_value)
                                                                                    }}
                                                                                    placeholderText={
                                                                                        'e.g. ' + currentDate.toLocaleDateString('en-GB', dateShowOptions)
                                                                                    }
                                                                                    customInput={<CustomInput
                                                                                        label=''/>}
                                                                                    error={Boolean(
                                                                                        eventDetailErrors.tables &&
                                                                                        eventDetailErrors.tables.data[index] &&
                                                                                        eventDetailErrors.tables.data[index].date
                                                                                    )}
                                                                                />
                                                                                {eventDetailErrors.tables &&
                                                                                    eventDetailErrors.tables.data[index] &&
                                                                                    eventDetailErrors.tables.data[index].date && (
                                                                                        <FormHelperText
                                                                                            sx={{
                                                                                                my: 2,
                                                                                                color: 'error.main'
                                                                                            }}
                                                                                            id={'error-event-detail-tables-data-list-item-date' + index}
                                                                                        >
                                                                                            {eventDetailErrors.tables.data[index].date.message}
                                                                                        </FormHelperText>
                                                                                    )}
                                                                            </DatePickerWrapper>
                                                                        </Grid>
                                                                        <Grid item sm={6} xs={12}>
                                                                            <Typography variant='subtitle1'
                                                                                        sx={{mb: 1}}>
                                                                                How Many Tables Are There?
                                                                            </Typography>
                                                                            <NumberTextField
                                                                                type='number'
                                                                                sx={{width: '100%'}}
                                                                                id={'event-detail-tables-item-count-' + index}
                                                                                value={item.count}
                                                                                label=''
                                                                                onChange={e => {
                                                                                    const updated_value = value
                                                                                    updated_value.data[index].count = e.target.value
                                                                                    onChange(updated_value)
                                                                                }}
                                                                                placeholder='e.g. 2'
                                                                                error={Boolean(
                                                                                    eventDetailErrors.tables &&
                                                                                    eventDetailErrors.tables.data[index] &&
                                                                                    eventDetailErrors.tables.data[index].count
                                                                                )}
                                                                            />
                                                                            {eventDetailErrors.tables &&
                                                                                eventDetailErrors.tables.data[index] &&
                                                                                eventDetailErrors.tables.data[index].count && (
                                                                                    <FormHelperText
                                                                                        sx={{
                                                                                            my: 2,
                                                                                            color: 'error.main'
                                                                                        }}
                                                                                        id={'error-event-detail-tables-item-count' + index}
                                                                                    >
                                                                                        {eventDetailErrors.tables.data[index].count.message}
                                                                                    </FormHelperText>
                                                                                )}
                                                                        </Grid>
                                                                        <Grid item sm={12} xs={12}>
                                                                            <Box
                                                                                sx={{
                                                                                    mb: 4,
                                                                                    paddingLeft: 2,
                                                                                    borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                                                                }}
                                                                            >
                                                                                <Typography
                                                                                    variant='h5'
                                                                                    sx={{
                                                                                        mt: 8,
                                                                                        textAlign: 'left',
                                                                                        fontWeight: 600,
                                                                                        color: 'common.black'
                                                                                    }}
                                                                                >
                                                                                    How Many People Are Permitted On
                                                                                    Each Table?
                                                                                </Typography>
                                                                            </Box>
                                                                        </Grid>
                                                                        <Grid item sm={12} xs={12}>
                                                                            {item.list.map((table_item, table_index) => (
                                                                                <Grid key={table_index} container
                                                                                      spacing={2}>
                                                                                    <Grid item sm={12} xs={12}>
                                                                                        <Box sx={{
                                                                                            mt: 6,
                                                                                            display: 'flex',
                                                                                            alignItems: 'center'
                                                                                        }}>
                                                                                            <Typography
                                                                                                variant='h6'
                                                                                                sx={{
                                                                                                    textAlign: 'left',
                                                                                                    mr: 8,
                                                                                                    fontWeight: 600,
                                                                                                    color: 'common.black'
                                                                                                }}
                                                                                            >
                                                                                                {'Table ' + (table_index + 1)}
                                                                                            </Typography>
                                                                                            {table_index !== 0 ? (
                                                                                                <IconButton
                                                                                                    aria-label='capture screenshot'
                                                                                                    color='primary'
                                                                                                    onClick={() => removeTablesEventDateTable(index, table_index)}
                                                                                                >
                                                                                                    <Icon fontSize={32}
                                                                                                          icon='mdi:close-circle-outline'/>
                                                                                                </IconButton>
                                                                                            ) : null}
                                                                                        </Box>
                                                                                    </Grid>
                                                                                    <Grid item sm={3} xs={12}>
                                                                                        <Typography variant='subtitle1'
                                                                                                    sx={{mb: 1}}>
                                                                                            Minimum Number Of People
                                                                                        </Typography>
                                                                                        <NumberTextField
                                                                                            type='number'
                                                                                            sx={{width: '100%'}}
                                                                                            id={'event-detail-table-item-min-' + table_index}
                                                                                            value={table_item.min}
                                                                                            label=''
                                                                                            onChange={e => {
                                                                                                const updated_value = value
                                                                                                updated_value.data[index].list[table_index].min = e.target.value
                                                                                                onChange(updated_value)
                                                                                            }}
                                                                                            placeholder='e.g. 8'
                                                                                            error={Boolean(
                                                                                                eventDetailErrors.tables &&
                                                                                                eventDetailErrors.tables.data[index] &&
                                                                                                eventDetailErrors.tables.data[index].list &&
                                                                                                eventDetailErrors.tables.data[index].list[table_index] &&
                                                                                                eventDetailErrors.tables.data[index].list[table_index].min
                                                                                            )}
                                                                                        />
                                                                                        {eventDetailErrors.tables &&
                                                                                            eventDetailErrors.tables.data[index] &&
                                                                                            eventDetailErrors.tables.data[index].list &&
                                                                                            eventDetailErrors.tables.data[index].list[table_index] &&
                                                                                            eventDetailErrors.tables.data[index].list[table_index].min && (
                                                                                                <FormHelperText
                                                                                                    sx={{
                                                                                                        my: 2,
                                                                                                        color: 'error.main'
                                                                                                    }}
                                                                                                    id={
                                                                                                        'error-event-detail-tables-data-list-item' +
                                                                                                        index +
                                                                                                        '-min-' +
                                                                                                        table_index
                                                                                                    }
                                                                                                >
                                                                                                    {eventDetailErrors.tables.data[index].list[table_index].min.message}
                                                                                                </FormHelperText>
                                                                                            )}
                                                                                    </Grid>
                                                                                    <Grid item sm={3} xs={12}>
                                                                                        <Typography variant='subtitle1'
                                                                                                    sx={{mb: 1}}>
                                                                                            Maximum Number Of People
                                                                                        </Typography>
                                                                                        <NumberTextField
                                                                                            type='number'
                                                                                            sx={{width: '100%'}}
                                                                                            id={'event-detail-table-item-max-' + table_index}
                                                                                            value={table_item.max}
                                                                                            label=''
                                                                                            onChange={e => {
                                                                                                const updated_value = value
                                                                                                updated_value.data[index].list[table_index].max = e.target.value
                                                                                                onChange(updated_value)
                                                                                            }}
                                                                                            placeholder='e.g. 10'
                                                                                            error={Boolean(
                                                                                                eventDetailErrors.tables &&
                                                                                                eventDetailErrors.tables.data[index] &&
                                                                                                eventDetailErrors.tables.data[index].list &&
                                                                                                eventDetailErrors.tables.data[index].list[table_index] &&
                                                                                                eventDetailErrors.tables.data[index].list[table_index].max
                                                                                            )}
                                                                                        />
                                                                                        {eventDetailErrors.tables &&
                                                                                            eventDetailErrors.tables.data[index] &&
                                                                                            eventDetailErrors.tables.data[index].list &&
                                                                                            eventDetailErrors.tables.data[index].list[table_index] &&
                                                                                            eventDetailErrors.tables.data[index].list[table_index].max && (
                                                                                                <FormHelperText
                                                                                                    sx={{
                                                                                                        my: 2,
                                                                                                        color: 'error.main'
                                                                                                    }}
                                                                                                    id={
                                                                                                        'error-event-detail-tables-data-list-item' +
                                                                                                        index +
                                                                                                        '-max-' +
                                                                                                        table_index
                                                                                                    }
                                                                                                >
                                                                                                    {eventDetailErrors.tables.data[index].list[table_index].max.message}
                                                                                                </FormHelperText>
                                                                                            )}
                                                                                    </Grid>
                                                                                    <Grid item sm={3} xs={12}>
                                                                                        <Typography variant='subtitle1'
                                                                                                    sx={{mb: 1}}>
                                                                                            Total Table
                                                                                        </Typography>
                                                                                        <NumberTextField
                                                                                            type='number'
                                                                                            sx={{width: '100%'}}
                                                                                            id={'event-detail-table-item-total-' + table_index}
                                                                                            value={table_item.total}
                                                                                            label=''
                                                                                            onChange={e => {
                                                                                                const updated_value = value
                                                                                                updated_value.data[index].list[table_index].total = e.target.value
                                                                                                onChange(updated_value)
                                                                                            }}
                                                                                            placeholder='e.g. 6'
                                                                                            error={Boolean(
                                                                                                eventDetailErrors.tables &&
                                                                                                eventDetailErrors.tables.data[index] &&
                                                                                                eventDetailErrors.tables.data[index].list &&
                                                                                                eventDetailErrors.tables.data[index].list[table_index] &&
                                                                                                eventDetailErrors.tables.data[index].list[table_index].total
                                                                                            )}
                                                                                        />
                                                                                        {eventDetailErrors.tables &&
                                                                                            eventDetailErrors.tables.data[index] &&
                                                                                            eventDetailErrors.tables.data[index].list &&
                                                                                            eventDetailErrors.tables.data[index].list[table_index] &&
                                                                                            eventDetailErrors.tables.data[index].list[table_index].total && (
                                                                                                <FormHelperText
                                                                                                    sx={{
                                                                                                        my: 2,
                                                                                                        color: 'error.main'
                                                                                                    }}
                                                                                                    id={
                                                                                                        'error-event-detail-tables-data-list-item' +
                                                                                                        index +
                                                                                                        '-total-' +
                                                                                                        table_index
                                                                                                    }
                                                                                                >
                                                                                                    {eventDetailErrors.tables.data[index].list[table_index].total.message}
                                                                                                </FormHelperText>
                                                                                            )}
                                                                                    </Grid>
                                                                                    <Grid item sm={3} xs={12}>
                                                                                        <Typography variant='subtitle1'
                                                                                                    sx={{mb: 1}}>
                                                                                            Price
                                                                                        </Typography>
                                                                                        <NumberTextField
                                                                                            type='number'
                                                                                            sx={{width: '100%'}}
                                                                                            id={'event-detail-table-item-price-' + table_index}
                                                                                            value={table_item.price}
                                                                                            label=''
                                                                                            onChange={e => {
                                                                                                const updated_value = value
                                                                                                updated_value.data[index].list[table_index].price = e.target.value
                                                                                                onChange(updated_value)
                                                                                            }}
                                                                                            placeholder='e.g. 55'
                                                                                            InputProps={{
                                                                                                maxLength: 6,
                                                                                                startAdornment:
                                                                                                    <InputAdornment
                                                                                                        position='start'>£ </InputAdornment>
                                                                                            }}
                                                                                            error={Boolean(
                                                                                                eventDetailErrors.tables &&
                                                                                                eventDetailErrors.tables.data[index] &&
                                                                                                eventDetailErrors.tables.data[index].list &&
                                                                                                eventDetailErrors.tables.data[index].list[table_index] &&
                                                                                                eventDetailErrors.tables.data[index].list[table_index].price
                                                                                            )}
                                                                                        />
                                                                                        {eventDetailErrors.tables &&
                                                                                            eventDetailErrors.tables.data[index] &&
                                                                                            eventDetailErrors.tables.data[index].list &&
                                                                                            eventDetailErrors.tables.data[index].list[table_index] &&
                                                                                            eventDetailErrors.tables.data[index].list[table_index].price && (
                                                                                                <FormHelperText
                                                                                                    sx={{
                                                                                                        my: 2,
                                                                                                        color: 'error.main'
                                                                                                    }}
                                                                                                    id={
                                                                                                        'error-event-detail-tables-data-list-item' +
                                                                                                        index +
                                                                                                        '-price-' +
                                                                                                        table_index
                                                                                                    }
                                                                                                >
                                                                                                    {eventDetailErrors.tables.data[index].list[table_index].price.message}
                                                                                                </FormHelperText>
                                                                                            )}
                                                                                    </Grid>
                                                                                </Grid>
                                                                            ))}
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={12}>
                                                                            <Box sx={{
                                                                                my: 4,
                                                                                display: 'flex',
                                                                                justifyContent: 'center'
                                                                            }}>
                                                                                <Button
                                                                                    size='medium'
                                                                                    variant='contained'
                                                                                    color='secondary'
                                                                                    onClick={() => addMoreEventDateTable(index)}
                                                                                >
                                                                                    Add More Table
                                                                                </Button>
                                                                            </Box>
                                                                        </Grid>
                                                                        <Grid item sm={12} xs={12}>
                                                                            <Box
                                                                                sx={{
                                                                                    mb: 4,
                                                                                    paddingLeft: 2,
                                                                                    borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                                                                }}
                                                                            >
                                                                                <Typography
                                                                                    variant='h5'
                                                                                    sx={{
                                                                                        mt: 8,
                                                                                        textAlign: 'left',
                                                                                        fontWeight: 600,
                                                                                        color: 'common.black'
                                                                                    }}
                                                                                >
                                                                                    Are They Paying A Deposit Or Full
                                                                                    Amount?
                                                                                </Typography>
                                                                            </Box>
                                                                        </Grid>
                                                                        <Grid item sm={12} xs={12}>
                                                                            <RadioGroup
                                                                                row
                                                                                value={item.deposit.is_full_payment}
                                                                                name='event-detail-deposit-type'
                                                                                onChange={e => {
                                                                                    const updated_value = value
                                                                                    updated_value.data[index].deposit.is_full_payment = parseInt(e.target.value)
                                                                                    onChange(updated_value)
                                                                                }}
                                                                                aria-label={'event-detail-deposit-type-item-' + index}
                                                                                sx={{mb: 2}}
                                                                            >
                                                                                <FormControlLabel value={1}
                                                                                                  control={<Radio/>}
                                                                                                  label='Full'/>
                                                                                <FormControlLabel value={0}
                                                                                                  control={<Radio/>}
                                                                                                  label='Deposit'/>
                                                                            </RadioGroup>
                                                                        </Grid>
                                                                        {!item.deposit.is_full_payment ? (
                                                                            <>
                                                                                <Grid item sm={6} xs={12}>
                                                                                    <Typography variant='subtitle1'
                                                                                                sx={{mb: 1}}>
                                                                                        Deposit Amount
                                                                                    </Typography>
                                                                                    <NumberTextField
                                                                                        type='number'
                                                                                        id={'event-detail-deposit-type-item-amount-' + index}
                                                                                        value={item.deposit.amount}
                                                                                        label=''
                                                                                        onChange={e => {
                                                                                            const updated_value = value
                                                                                            updated_value.data[index].deposit.amount = e.target.value
                                                                                            onChange(updated_value)
                                                                                        }}
                                                                                        placeholder='e.g. 100'
                                                                                        InputProps={{
                                                                                            maxLength: 6,
                                                                                            startAdornment:
                                                                                                <InputAdornment
                                                                                                    position='start'>£ </InputAdornment>
                                                                                        }}
                                                                                        error={Boolean(
                                                                                            eventDetailErrors.tables &&
                                                                                            eventDetailErrors.tables.data[index] &&
                                                                                            eventDetailErrors.tables.data[index].deposit &&
                                                                                            eventDetailErrors.tables.data[index].deposit.amount
                                                                                        )}
                                                                                    />
                                                                                    {eventDetailErrors.tables &&
                                                                                        eventDetailErrors.tables.data[index] &&
                                                                                        eventDetailErrors.tables.data[index].deposit &&
                                                                                        eventDetailErrors.tables.data[index].deposit.amount && (
                                                                                            <FormHelperText
                                                                                                sx={{
                                                                                                    my: 2,
                                                                                                    color: 'error.main'
                                                                                                }}
                                                                                                id={'error-event-detail-tables-data-list-item-deposit-amount' + index}
                                                                                            >
                                                                                                {eventDetailErrors.tables.data[index].deposit.amount.message}
                                                                                            </FormHelperText>
                                                                                        )}
                                                                                </Grid>
                                                                                <Grid item sm={6} xs={12}>
                                                                                    <Typography variant='subtitle1'
                                                                                                sx={{mb: 1}}>
                                                                                        Deposit Due Date
                                                                                    </Typography>
                                                                                    <DatePickerWrapper>
                                                                                        <DatePicker
                                                                                            selected={item.deposit.due_date}
                                                                                            id={'event-detail-deposit-type-item-date-' + index}
                                                                                            popperPlacement={'bottom-start'}
                                                                                            onChange={date => {
                                                                                                const updated_value = value
                                                                                                updated_value.data[index].deposit.due_date = date
                                                                                                onChange(updated_value)
                                                                                            }}
                                                                                            placeholderText={
                                                                                                'e.g. ' + currentDate.toLocaleDateString('en-GB', dateShowOptions)
                                                                                            }
                                                                                            customInput={<CustomInput
                                                                                                label=''/>}
                                                                                        />
                                                                                        {eventDetailErrors.tables &&
                                                                                            eventDetailErrors.tables.data[index] &&
                                                                                            eventDetailErrors.tables.data[index].deposit &&
                                                                                            eventDetailErrors.tables.data[index].deposit.due_date && (
                                                                                                <FormHelperText
                                                                                                    sx={{
                                                                                                        my: 2,
                                                                                                        color: 'error.main'
                                                                                                    }}
                                                                                                    id={
                                                                                                        'error-event-detail-tables-data-list-item-deposit-due-date' + index
                                                                                                    }
                                                                                                >
                                                                                                    {eventDetailErrors.tables.data[index].deposit.due_date.message}
                                                                                                </FormHelperText>
                                                                                            )}
                                                                                    </DatePickerWrapper>
                                                                                </Grid>
                                                                                <Grid item sm={12} xs={12}>
                                                                                    <FormControlLabel
                                                                                        label='Shall We Display It On Front End?'
                                                                                        control={
                                                                                            <Checkbox
                                                                                                checked={item.deposit.is_show}
                                                                                                name='event-detail-deposit-type-show'
                                                                                                onChange={e => {
                                                                                                    const updated_value = value
                                                                                                    updated_value.data[index].deposit.is_show = e.target.checked
                                                                                                    onChange(updated_value)
                                                                                                }}
                                                                                            />
                                                                                        }
                                                                                    />
                                                                                </Grid>
                                                                            </>
                                                                        ) : null}
                                                                    </Grid>
                                                                </AccordionDetails>
                                                            </Accordion>
                                                        ))}
                                                        <Grid item xs={12} sm={12}>
                                                            <Box
                                                                sx={{my: 4, display: 'flex', justifyContent: 'center'}}>
                                                                <Button
                                                                    size='medium'
                                                                    variant='contained'
                                                                    color='secondary'
                                                                    onClick={() => addMoreDateToEvent()}
                                                                >
                                                                    Add More Event Dates
                                                                </Button>
                                                            </Box>
                                                        </Grid>
                                                    </>
                                                )}
                                            />
                                        </FormControl>
                                    </TabPanel>
                                    <TabPanel value='2'>
                                        <FormControl fullWidth>
                                            <Controller
                                                name='tickets'
                                                control={eventDetailControl}
                                                rules={{required: true}}
                                                render={({field: {value, onChange}}) => (
                                                    <>
                                                        {value.data.map((item, index) => (
                                                            <Accordion
                                                                key={index}
                                                                expanded={item.selected === true}
                                                                onChange={handleTicketsDateChange(index)}
                                                            >
                                                                <AccordionSummary
                                                                    id={'event-type-tickets-header-' + index}
                                                                    aria-controls={'event-type-tickets-content-' + index}
                                                                    expandIcon={<Icon icon='mdi:chevron-down'/>}
                                                                    sx={{
                                                                        backgroundColor: theme =>
                                                                            item.selected ? `${theme.palette.grey.A400} !important` : 'none'
                                                                    }}
                                                                >
                                                                    <Typography sx={{
                                                                        fontSize: '1.25rem',
                                                                        fontWeight: 'bold',
                                                                        color: 'common.black'
                                                                    }}>
                                                                        Date: {item.date ? item.date.toLocaleDateString('en-GB', dateShowOptions) : ''}
                                                                    </Typography>
                                                                </AccordionSummary>
                                                                <AccordionDetails>
                                                                    <Grid container spacing={2}>
                                                                        <Grid item sm={12} xs={12}>
                                                                            {index !== 0 ? (
                                                                                <Box sx={{
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    justifyContent: 'flex-end'
                                                                                }}>
                                                                                    <Typography
                                                                                        variant='h6'
                                                                                        sx={{
                                                                                            textAlign: 'left',
                                                                                            fontWeight: 600,
                                                                                            color: 'common.black'
                                                                                        }}
                                                                                    >
                                                                                        {'Remove'}
                                                                                    </Typography>

                                                                                    <IconButton
                                                                                        sx={{float: 'right'}}
                                                                                        aria-label='capture screenshot'
                                                                                        color='primary'
                                                                                        onClick={() => removeTicketEventDateListItem(index)}
                                                                                    >
                                                                                        <Icon fontSize={32}
                                                                                              icon='mdi:close-circle-outline'/>
                                                                                    </IconButton>
                                                                                </Box>
                                                                            ) : null}
                                                                        </Grid>
                                                                        <Grid item sm={6} xs={12}>
                                                                            <Typography variant='subtitle1'
                                                                                        sx={{mb: 1}}>
                                                                                Event Title
                                                                            </Typography>
                                                                            <TextField
                                                                                sx={{width: '100%'}}
                                                                                id={'event-tickets-detail-item-title-' + index}
                                                                                value={item.title}
                                                                                label=''
                                                                                onChange={e => {
                                                                                    const updated_value = value
                                                                                    updated_value.data[index].title = e.target.value
                                                                                    onChange(updated_value)
                                                                                }}
                                                                                placeholder={'e.g. ' + venueInfo.event_title ? venueInfo.event_title : ''}
                                                                                error={Boolean(
                                                                                    eventDetailErrors.tickets &&
                                                                                    eventDetailErrors.tickets.data[index] &&
                                                                                    eventDetailErrors.tickets.data[index].title
                                                                                )}
                                                                            />
                                                                            {eventDetailErrors.tickets &&
                                                                                eventDetailErrors.tickets.data[index] &&
                                                                                eventDetailErrors.tickets.data[index].title && (
                                                                                    <FormHelperText
                                                                                        sx={{
                                                                                            my: 2,
                                                                                            color: 'error.main'
                                                                                        }}
                                                                                        id={'error-event-detail-ticket-item-title' + index}
                                                                                    >
                                                                                        {eventDetailErrors.tickets.data[index].title.message}
                                                                                    </FormHelperText>
                                                                                )}
                                                                        </Grid>
                                                                        <Grid item sm={6} xs={12}>
                                                                            <Typography variant='subtitle1'
                                                                                        sx={{mb: 1}}>
                                                                                Date Of Event
                                                                            </Typography>
                                                                            <DatePickerWrapper>
                                                                                <DatePicker
                                                                                    selected={item.date}
                                                                                    id={'event-tickets-detail-item-date-' + index}
                                                                                    popperPlacement={'bottom-start'}
                                                                                    onChange={date => {
                                                                                        const updated_value = value
                                                                                        updated_value.data[index].date = date
                                                                                        onChange(updated_value)
                                                                                    }}
                                                                                    placeholderText={
                                                                                        'e.g. ' + currentDate.toLocaleDateString('en-GB', dateShowOptions)
                                                                                    }
                                                                                    customInput={<CustomInput
                                                                                        label=''/>}
                                                                                    error={Boolean(
                                                                                        eventDetailErrors.tickets &&
                                                                                        eventDetailErrors.tickets.data[index] &&
                                                                                        eventDetailErrors.tickets.data[index].date
                                                                                    )}
                                                                                />
                                                                                {eventDetailErrors.tickets &&
                                                                                    eventDetailErrors.tickets.data[index] &&
                                                                                    eventDetailErrors.tickets.data[index].date && (
                                                                                        <FormHelperText
                                                                                            sx={{
                                                                                                my: 2,
                                                                                                color: 'error.main'
                                                                                            }}
                                                                                            id={'error-event-detail-ticket-item-date' + index}
                                                                                        >
                                                                                            {eventDetailErrors.tickets.data[index].date.message}
                                                                                        </FormHelperText>
                                                                                    )}
                                                                            </DatePickerWrapper>
                                                                        </Grid>
                                                                        <Grid item sm={6} xs={12}>
                                                                            <Typography variant='subtitle1'
                                                                                        sx={{mb: 1}}>
                                                                                How Many Tickets Are There?
                                                                            </Typography>
                                                                            <NumberTextField
                                                                                type='number'
                                                                                sx={{width: '100%'}}
                                                                                id={'event-tickets-detail-item-count-' + index}
                                                                                value={item.count}
                                                                                label=''
                                                                                onChange={e => {
                                                                                    const updated_value = value
                                                                                    updated_value.data[index].count = e.target.value
                                                                                    onChange(updated_value)
                                                                                }}
                                                                                placeholder='e.g. 2'
                                                                                error={Boolean(
                                                                                    eventDetailErrors.tickets &&
                                                                                    eventDetailErrors.tickets.data[index] &&
                                                                                    eventDetailErrors.tickets.data[index].count
                                                                                )}
                                                                            />
                                                                            {eventDetailErrors.tickets &&
                                                                                eventDetailErrors.tickets.data[index] &&
                                                                                eventDetailErrors.tickets.data[index].count && (
                                                                                    <FormHelperText
                                                                                        sx={{
                                                                                            my: 2,
                                                                                            color: 'error.main'
                                                                                        }}
                                                                                        id={'error-event-detail-ticket-item-count' + index}
                                                                                    >
                                                                                        {eventDetailErrors.tickets.data[index].count.message}
                                                                                    </FormHelperText>
                                                                                )}
                                                                        </Grid>
                                                                        <Grid item sm={12} xs={12}>
                                                                            <Box
                                                                                sx={{
                                                                                    mb: 4,
                                                                                    paddingLeft: 2,
                                                                                    borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                                                                }}
                                                                            >
                                                                                <Typography
                                                                                    variant='h5'
                                                                                    sx={{
                                                                                        mt: 8,
                                                                                        textAlign: 'left',
                                                                                        fontWeight: 600,
                                                                                        color: 'common.black'
                                                                                    }}
                                                                                >
                                                                                    How Many People Are Permitted On
                                                                                    Each Tickets?
                                                                                </Typography>
                                                                            </Box>
                                                                        </Grid>
                                                                        <Grid item sm={12} xs={12}>
                                                                            {item.list.map((table_item, table_index) => (
                                                                                <Grid key={table_index} container
                                                                                      spacing={2}>
                                                                                    <Grid item sm={12} xs={12}>
                                                                                        <Box sx={{
                                                                                            mt: 6,
                                                                                            display: 'flex',
                                                                                            alignItems: 'center'
                                                                                        }}>
                                                                                            <Typography
                                                                                                variant='h6'
                                                                                                sx={{
                                                                                                    textAlign: 'left',
                                                                                                    mr: 8,
                                                                                                    fontWeight: 600,
                                                                                                    color: 'common.black'
                                                                                                }}
                                                                                            >
                                                                                                {'Tickets Type ' + (table_index + 1)}
                                                                                            </Typography>
                                                                                            {table_index !== 0 ? (
                                                                                                <IconButton
                                                                                                    aria-label='remove ticket type'
                                                                                                    color='primary'
                                                                                                    onClick={() => removeTicketsEventType(index, table_index)}
                                                                                                >
                                                                                                    <Icon fontSize={32}
                                                                                                          icon='mdi:close-circle-outline'/>
                                                                                                </IconButton>
                                                                                            ) : null}
                                                                                        </Box>
                                                                                    </Grid>
                                                                                    <Grid item sm={3} xs={12}>
                                                                                        <Typography variant='subtitle1'
                                                                                                    sx={{mb: 1}}>
                                                                                            Ticket Title
                                                                                        </Typography>
                                                                                        <TextField
                                                                                            sx={{width: '100%'}}
                                                                                            id={'event-tickets-detail-item-title-' + table_index}
                                                                                            value={table_item.title}
                                                                                            label=''
                                                                                            onChange={e => {
                                                                                                const updated_value = value
                                                                                                updated_value.data[index].list[table_index].title = e.target.value
                                                                                                onChange(updated_value)
                                                                                            }}
                                                                                            placeholder='e.g. Adult Ticket'
                                                                                            error={Boolean(
                                                                                                eventDetailErrors.tickets &&
                                                                                                eventDetailErrors.tickets.data[index] &&
                                                                                                eventDetailErrors.tickets.data[index].list &&
                                                                                                eventDetailErrors.tickets.data[index].list[table_index] &&
                                                                                                eventDetailErrors.tickets.data[index].list[table_index].title
                                                                                            )}
                                                                                        />
                                                                                        {eventDetailErrors.tickets &&
                                                                                            eventDetailErrors.tickets.data[index] &&
                                                                                            eventDetailErrors.tickets.data[index].list &&
                                                                                            eventDetailErrors.tickets.data[index].list[table_index] &&
                                                                                            eventDetailErrors.tickets.data[index].list[table_index].title && (
                                                                                                <FormHelperText
                                                                                                    sx={{
                                                                                                        my: 2,
                                                                                                        color: 'error.main'
                                                                                                    }}
                                                                                                    id={
                                                                                                        'error-event-detail-ticket-data-list-item' +
                                                                                                        index +
                                                                                                        '-title-' +
                                                                                                        table_index
                                                                                                    }
                                                                                                >
                                                                                                    {
                                                                                                        eventDetailErrors.tickets.data[index].list[table_index].title
                                                                                                            .message
                                                                                                    }
                                                                                                </FormHelperText>
                                                                                            )}
                                                                                    </Grid>
                                                                                    <Grid item sm={3} xs={12}>
                                                                                        <Typography variant='subtitle1'
                                                                                                    sx={{mb: 1}}>
                                                                                            Ticket Description
                                                                                        </Typography>
                                                                                        <TextField
                                                                                            sx={{width: '100%'}}
                                                                                            id={'event-tickets-detail-item-description-' + table_index}
                                                                                            value={table_item.description}
                                                                                            label=''
                                                                                            onChange={e => {
                                                                                                const updated_value = value
                                                                                                updated_value.data[index].list[table_index].description = e.target.value
                                                                                                onChange(updated_value)
                                                                                            }}
                                                                                            placeholder='e.g. Drinks, food'
                                                                                            error={Boolean(
                                                                                                eventDetailErrors.tickets &&
                                                                                                eventDetailErrors.tickets.data[index] &&
                                                                                                eventDetailErrors.tickets.data[index].list &&
                                                                                                eventDetailErrors.tickets.data[index].list[table_index] &&
                                                                                                eventDetailErrors.tickets.data[index].list[table_index].description
                                                                                            )}
                                                                                        />
                                                                                        {eventDetailErrors.tickets &&
                                                                                            eventDetailErrors.tickets.data[index] &&
                                                                                            eventDetailErrors.tickets.data[index].list &&
                                                                                            eventDetailErrors.tickets.data[index].list[table_index] &&
                                                                                            eventDetailErrors.tickets.data[index].list[table_index].description && (
                                                                                                <FormHelperText
                                                                                                    sx={{
                                                                                                        my: 2,
                                                                                                        color: 'error.main'
                                                                                                    }}
                                                                                                    id={
                                                                                                        'error-event-detail-ticket-data-list-item' +
                                                                                                        index +
                                                                                                        '-description-' +
                                                                                                        table_index
                                                                                                    }
                                                                                                >
                                                                                                    {
                                                                                                        eventDetailErrors.tickets.data[index].list[table_index].description
                                                                                                            .message
                                                                                                    }
                                                                                                </FormHelperText>
                                                                                            )}
                                                                                    </Grid>
                                                                                    <Grid item sm={3} xs={12}>
                                                                                        <Typography variant='subtitle1'
                                                                                                    sx={{mb: 1}}>
                                                                                            Total Capacity
                                                                                        </Typography>
                                                                                        <NumberTextField
                                                                                            type='number'
                                                                                            sx={{width: '100%'}}
                                                                                            id={'event-tickets-detail-item-total-' + table_index}
                                                                                            value={table_item.total}
                                                                                            label=''
                                                                                            onChange={e => {
                                                                                                const updated_value = value
                                                                                                updated_value.data[index].list[table_index].total = e.target.value
                                                                                                onChange(updated_value)
                                                                                            }}
                                                                                            placeholder='e.g. 6'
                                                                                            error={Boolean(
                                                                                                eventDetailErrors.tickets &&
                                                                                                eventDetailErrors.tickets.data[index] &&
                                                                                                eventDetailErrors.tickets.data[index].list &&
                                                                                                eventDetailErrors.tickets.data[index].list[table_index] &&
                                                                                                eventDetailErrors.tickets.data[index].list[table_index].total
                                                                                            )}
                                                                                        />
                                                                                        {eventDetailErrors.tickets &&
                                                                                            eventDetailErrors.tickets.data[index] &&
                                                                                            eventDetailErrors.tickets.data[index].list &&
                                                                                            eventDetailErrors.tickets.data[index].list[table_index] &&
                                                                                            eventDetailErrors.tickets.data[index].list[table_index].total && (
                                                                                                <FormHelperText
                                                                                                    sx={{
                                                                                                        my: 2,
                                                                                                        color: 'error.main'
                                                                                                    }}
                                                                                                    id={
                                                                                                        'error-event-detail-ticket-data-list-item' +
                                                                                                        index +
                                                                                                        '-total-' +
                                                                                                        table_index
                                                                                                    }
                                                                                                >
                                                                                                    {
                                                                                                        eventDetailErrors.tickets.data[index].list[table_index].total
                                                                                                            .message
                                                                                                    }
                                                                                                </FormHelperText>
                                                                                            )}
                                                                                    </Grid>
                                                                                    <Grid item sm={3} xs={12}>
                                                                                        <Typography variant='subtitle1'
                                                                                                    sx={{mb: 1}}>
                                                                                            Price
                                                                                        </Typography>
                                                                                        <NumberTextField
                                                                                            type='number'
                                                                                            sx={{width: '100%'}}
                                                                                            id={'event-detail-table-item-price-' + table_index}
                                                                                            value={table_item.price}
                                                                                            label=''
                                                                                            onChange={e => {
                                                                                                const updated_value = value
                                                                                                updated_value.data[index].list[table_index].price = e.target.value
                                                                                                onChange(updated_value)
                                                                                            }}
                                                                                            placeholder='e.g. 55'
                                                                                            InputProps={{
                                                                                                maxLength: 6,
                                                                                                startAdornment:
                                                                                                    <InputAdornment
                                                                                                        position='start'>£ </InputAdornment>
                                                                                            }}
                                                                                            error={Boolean(
                                                                                                eventDetailErrors.tickets &&
                                                                                                eventDetailErrors.tickets.data[index] &&
                                                                                                eventDetailErrors.tickets.data[index].list &&
                                                                                                eventDetailErrors.tickets.data[index].list[table_index] &&
                                                                                                eventDetailErrors.tickets.data[index].list[table_index].price
                                                                                            )}
                                                                                        />
                                                                                        {eventDetailErrors.tickets &&
                                                                                            eventDetailErrors.tickets.data[index] &&
                                                                                            eventDetailErrors.tickets.data[index].list &&
                                                                                            eventDetailErrors.tickets.data[index].list[table_index] &&
                                                                                            eventDetailErrors.tickets.data[index].list[table_index].price && (
                                                                                                <FormHelperText
                                                                                                    sx={{
                                                                                                        my: 2,
                                                                                                        color: 'error.main'
                                                                                                    }}
                                                                                                    id={
                                                                                                        'error-event-detail-ticket-data-list-item' +
                                                                                                        index +
                                                                                                        '-price-' +
                                                                                                        table_index
                                                                                                    }
                                                                                                >
                                                                                                    {
                                                                                                        eventDetailErrors.tickets.data[index].list[table_index].price
                                                                                                            .message
                                                                                                    }
                                                                                                </FormHelperText>
                                                                                            )}
                                                                                    </Grid>
                                                                                </Grid>
                                                                            ))}
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={12}>
                                                                            <Box sx={{
                                                                                my: 4,
                                                                                display: 'flex',
                                                                                justifyContent: 'center'
                                                                            }}>
                                                                                <Button
                                                                                    size='medium'
                                                                                    variant='contained'
                                                                                    color='secondary'
                                                                                    onClick={() => addMoreTicketsEventType(index)}
                                                                                >
                                                                                    Add More Ticket
                                                                                </Button>
                                                                            </Box>
                                                                        </Grid>
                                                                        <Grid item sm={12} xs={12}>
                                                                            <Box
                                                                                sx={{
                                                                                    mb: 4,
                                                                                    paddingLeft: 2,
                                                                                    borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                                                                }}
                                                                            >
                                                                                <Typography
                                                                                    variant='h5'
                                                                                    sx={{
                                                                                        mt: 8,
                                                                                        textAlign: 'left',
                                                                                        fontWeight: 600,
                                                                                        color: 'common.black'
                                                                                    }}
                                                                                >
                                                                                    Are They Paying A Deposit Or Full
                                                                                    Amount?
                                                                                </Typography>
                                                                            </Box>
                                                                        </Grid>
                                                                        <Grid item sm={12} xs={12}>
                                                                            <RadioGroup
                                                                                row
                                                                                value={item.deposit.is_full_payment}
                                                                                name='event-tickets-detail-deposit-type'
                                                                                onChange={e => {
                                                                                    const updated_value = value
                                                                                    updated_value.data[index].deposit.is_full_payment = parseInt(e.target.value)
                                                                                    onChange(updated_value)
                                                                                }}
                                                                                aria-label={'event-tickets-detail-deposit-type-item-' + index}
                                                                                sx={{mb: 2}}
                                                                            >
                                                                                <FormControlLabel value={1}
                                                                                                  control={<Radio/>}
                                                                                                  label='Full'/>
                                                                                <FormControlLabel value={0}
                                                                                                  control={<Radio/>}
                                                                                                  label='Deposit'/>
                                                                            </RadioGroup>
                                                                        </Grid>
                                                                        {!item.deposit.is_full_payment ? (
                                                                            <>
                                                                                <Grid item sm={6} xs={12}>
                                                                                    <Typography variant='subtitle1'
                                                                                                sx={{mb: 1}}>
                                                                                        Deposit Amount
                                                                                    </Typography>
                                                                                    <NumberTextField
                                                                                        type='number'
                                                                                        id={'event-detail-deposit-type-item-amount-' + index}
                                                                                        value={item.deposit.amount}
                                                                                        label=''
                                                                                        onChange={e => {
                                                                                            const updated_value = value
                                                                                            updated_value.data[index].deposit.amount = e.target.value
                                                                                            onChange(updated_value)
                                                                                        }}
                                                                                        placeholder='e.g. 100'
                                                                                        InputProps={{
                                                                                            maxLength: 6,
                                                                                            startAdornment:
                                                                                                <InputAdornment
                                                                                                    position='start'>£ </InputAdornment>
                                                                                        }}
                                                                                        error={Boolean(
                                                                                            eventDetailErrors.tickets &&
                                                                                            eventDetailErrors.tickets.data[index] &&
                                                                                            eventDetailErrors.tickets.data[index].deposit &&
                                                                                            eventDetailErrors.tickets.data[index].deposit.amount
                                                                                        )}
                                                                                    />
                                                                                    {eventDetailErrors.tickets &&
                                                                                        eventDetailErrors.tickets.data[index] &&
                                                                                        eventDetailErrors.tickets.data[index].deposit &&
                                                                                        eventDetailErrors.tickets.data[index].deposit.amount && (
                                                                                            <FormHelperText
                                                                                                sx={{
                                                                                                    my: 2,
                                                                                                    color: 'error.main'
                                                                                                }}
                                                                                                id={'error-event-detail-ticket-data-list-item-deposit-amount' + index}
                                                                                            >
                                                                                                {eventDetailErrors.tickets.data[index].deposit.amount.message}
                                                                                            </FormHelperText>
                                                                                        )}
                                                                                </Grid>
                                                                                <Grid item sm={6} xs={12}>
                                                                                    <Typography variant='subtitle1'
                                                                                                sx={{mb: 1}}>
                                                                                        Deposit Due Date
                                                                                    </Typography>
                                                                                    <DatePickerWrapper>
                                                                                        <DatePicker
                                                                                            selected={item.deposit.due_date}
                                                                                            id={'event-tickets-detail-deposit-type-item-date-' + index}
                                                                                            popperPlacement={'bottom-start'}
                                                                                            onChange={date => {
                                                                                                const updated_value = value
                                                                                                updated_value.data[index].deposit.due_date = date
                                                                                                onChange(updated_value)
                                                                                            }}
                                                                                            placeholderText={
                                                                                                'e.g. ' + currentDate.toLocaleDateString('en-GB', dateShowOptions)
                                                                                            }
                                                                                            customInput={<CustomInput
                                                                                                label=''/>}
                                                                                        />
                                                                                        {eventDetailErrors.tickets &&
                                                                                            eventDetailErrors.tickets.data[index] &&
                                                                                            eventDetailErrors.tickets.data[index].deposit &&
                                                                                            eventDetailErrors.tickets.data[index].deposit.due_date && (
                                                                                                <FormHelperText
                                                                                                    sx={{
                                                                                                        my: 2,
                                                                                                        color: 'error.main'
                                                                                                    }}
                                                                                                    id={
                                                                                                        'error-event-detail-ticket-data-list-item-deposit-due-date' + index
                                                                                                    }
                                                                                                >
                                                                                                    {eventDetailErrors.tickets.data[index].deposit.due_date.message}
                                                                                                </FormHelperText>
                                                                                            )}
                                                                                    </DatePickerWrapper>
                                                                                </Grid>
                                                                                <Grid item sm={12} xs={12}>
                                                                                    <FormControlLabel
                                                                                        label='Shall We Display It On Front End?'
                                                                                        control={
                                                                                            <Checkbox
                                                                                                checked={item.deposit.is_show}
                                                                                                name='event-tickets-detail-deposit-type-show'
                                                                                                onChange={e => {
                                                                                                    const updated_value = value
                                                                                                    updated_value.data[index].deposit.is_show = e.target.checked
                                                                                                    onChange(updated_value)
                                                                                                }}
                                                                                            />
                                                                                        }
                                                                                    />
                                                                                </Grid>
                                                                            </>
                                                                        ) : null}
                                                                        <Grid item sm={12} xs={12}>
                                                                            <Box
                                                                                sx={{
                                                                                    mb: 4,
                                                                                    paddingLeft: 2,
                                                                                    borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                                                                }}
                                                                            >
                                                                                <Typography
                                                                                    variant='h5'
                                                                                    sx={{
                                                                                        mt: 8,
                                                                                        textAlign: 'left',
                                                                                        fontWeight: 600,
                                                                                        color: 'common.black'
                                                                                    }}
                                                                                >
                                                                                    Generate QR Code
                                                                                </Typography>
                                                                            </Box>
                                                                        </Grid>
                                                                        <Grid item sm={12} xs={12}>
                                                                            <RadioGroup
                                                                                row
                                                                                value={item.is_qrcode}
                                                                                name='event-tickets-detail-qr-code'
                                                                                onChange={e => {
                                                                                    const updated_value = value
                                                                                    updated_value.data[index].is_qrcode = parseInt(e.target.value)
                                                                                    onChange(updated_value)
                                                                                }}
                                                                                aria-label={'event-tickets-detail-qr-code-' + index}
                                                                                sx={{mb: 2}}
                                                                            >
                                                                                <FormControlLabel value={1}
                                                                                                  control={<Radio/>}
                                                                                                  label='Yes'/>
                                                                                <FormControlLabel value={0}
                                                                                                  control={<Radio/>}
                                                                                                  label='No'/>
                                                                            </RadioGroup>
                                                                        </Grid>
                                                                    </Grid>
                                                                </AccordionDetails>
                                                            </Accordion>
                                                        ))}
                                                        <Grid item xs={12} sm={12}>
                                                            <Box
                                                                sx={{my: 4, display: 'flex', justifyContent: 'center'}}>
                                                                <Button
                                                                    size='medium'
                                                                    variant='contained'
                                                                    color='secondary'
                                                                    onClick={() => addMoreTicketsEventDate()}
                                                                >
                                                                    Add More Event Dates
                                                                </Button>
                                                            </Box>
                                                        </Grid>
                                                    </>
                                                )}
                                            />
                                        </FormControl>
                                    </TabPanel>
                                </TabContext>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={12}
                                sx={{mt: 18, display: 'flex', justifyContent: 'center', position: 'relative'}}
                            >
                                <Button size='large' variant='outlined' color='secondary' onClick={handleBack}
                                        sx={{mr: 24}}>
                                    Back
                                </Button>
                                <Button size='large' type='submit' variant='contained'>
                                    Next
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )
            case 5:
                return (
                    <form key={5} onSubmit={eventPackageSubmit(onEventPackageSubmit)}>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <Typography variant='h4'
                                            sx={{textAlign: 'center', fontWeight: 600, color: 'common.black'}}>
                                    {steps[5].subtitle}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Box sx={{
                                    mb: 0,
                                    paddingLeft: 2,
                                    borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                }}>
                                    <Typography variant='h5'
                                                sx={{mt: 8, textAlign: 'left', fontWeight: 600, color: 'common.black'}}>
                                        Event Package
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='event_main_heading'
                                        control={eventPackageControl}
                                        rules={{required: true}}
                                        render={({field: {value, onChange}}) => (
                                            <TextField
                                                value={value}
                                                label='Event Main Heading'
                                                onChange={onChange}
                                                placeholder='e.g. The Package'
                                                error={Boolean(eventPackageErrors.event_main_heading)}
                                                aria-describedby='venue-event-package-main-heading'
                                            />
                                        )}
                                    />
                                    {eventPackageErrors.event_main_heading && (
                                        <FormHelperText sx={{color: 'error.main'}}
                                                        id='error-venue-event-package-main-heading'>
                                            {eventPackageErrors.event_main_heading.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='event_sub_heading'
                                        control={eventPackageControl}
                                        rules={{required: true}}
                                        render={({field: {value, onChange}}) => (
                                            <TextField
                                                value={value}
                                                label='Sub Heading'
                                                onChange={onChange}
                                                placeholder='e.g. Prices From £65 Plus Vat Include'
                                                error={Boolean(eventPackageErrors.event_sub_heading)}
                                                aria-describedby='venue-event-package-sub-heading'
                                            />
                                        )}
                                    />
                                    {eventPackageErrors.event_sub_heading && (
                                        <FormHelperText sx={{color: 'error.main'}}
                                                        id='error-venue-event-package-sub-heading'>
                                            {eventPackageErrors.event_sub_heading.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Box>
                                    <Typography variant='h6'
                                                sx={{textAlign: 'left', fontWeight: 600, color: 'common.black'}}>
                                        {'Package Info'}
                                    </Typography>
                                </Box>
                                <FormControl fullWidth>
                                    <Controller
                                        name='event_package_info'
                                        control={eventPackageControl}
                                        rules={{required: true}}
                                        render={({field: {value, onChange}}) => (
                                            <>
                                                {value.map((item, index) => (
                                                    <Grid item key={index} xs={12} sm={12} sx={{mb: 4}}>
                                                        <Grid key={index} container spacing={5}
                                                              sx={{alignItems: 'center'}}>
                                                            <Grid item xs={8} sm={8}>
                                                                <TextField
                                                                    id={'event-package-info-' + index}
                                                                    value={item}
                                                                    label=''
                                                                    placeholder='e.g. VIP entrance with photo opportunities'
                                                                    onChange={e => {
                                                                        const updated_event_package_info = [...value]
                                                                        updated_event_package_info[index] = e.target.value
                                                                        onChange(updated_event_package_info)
                                                                    }}
                                                                    sx={{width: '100%'}}
                                                                    error={Boolean(
                                                                        eventPackageErrors.event_package_info &&
                                                                        eventPackageErrors.event_package_info[index]
                                                                    )}
                                                                />
                                                                {eventPackageErrors.event_package_info &&
                                                                    eventPackageErrors.event_package_info[index] && (
                                                                        <FormHelperText
                                                                            sx={{my: 2, color: 'error.main'}}
                                                                            id={'error-event-package-info-item-' + index}
                                                                        >
                                                                            {eventPackageErrors.event_package_info[index].message}
                                                                        </FormHelperText>
                                                                    )}
                                                            </Grid>
                                                            <Grid item xs={4} sm={4}>
                                                                {index !== 0 ? (
                                                                    <Button
                                                                        size='medium'
                                                                        variant='contained'
                                                                        color='secondary'
                                                                        startIcon={<Icon icon='mdi:delete-outline'/>}
                                                                        onClick={() => removeEventPackageInfoItem(index)}
                                                                    >
                                                                        Remove
                                                                    </Button>
                                                                ) : null}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                ))}
                                                <Box sx={{my: 0}}>
                                                    <Button
                                                        size='medium'
                                                        variant='contained'
                                                        color='secondary'
                                                        onClick={() => addMoreEventPackageInfo()}
                                                    >
                                                        Add More
                                                    </Button>
                                                </Box>
                                            </>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Box sx={{
                                    mb: 4,
                                    paddingLeft: 2,
                                    borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                }}>
                                    <Typography variant='h5'
                                                sx={{mt: 8, textAlign: 'left', fontWeight: 600, color: 'common.black'}}>
                                        Event Package Flyer
                                    </Typography>
                                </Box>
                                <FormControl fullWidth>
                                    <Controller
                                        name='event_package_flyer'
                                        control={eventPackageControl}
                                        render={({field: {value, onChange, ...field}}) => (
                                            <>
                                                <DropzoneWrapper onClick={e => clickPackageFlyerFile()}>
                                                    <Box className='dropzone'>
                                                        <Input
                                                            inputRef={packageFlyerRef}
                                                            {...field}
                                                            value={value?.fileName}
                                                            onChange={event => {
                                                                onChange(event.target.files[0])
                                                            }}
                                                            type='file'
                                                            aria-describedby='venue-event-package-flyer'
                                                            sx={{display: 'none'}}
                                                        />
                                                        {value ? (
                                                            uploadImg(value, 'flyer')
                                                        ) : (
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    flexDirection: ['column', 'column', 'row'],
                                                                    alignItems: 'center'
                                                                }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        display: 'flex',
                                                                        flexDirection: 'column',
                                                                        textAlign: ['center', 'center', 'inherit']
                                                                    }}
                                                                >
                                                                    <HeadingTypography variant='h5'>Click here to
                                                                        upload.</HeadingTypography>
                                                                </Box>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                </DropzoneWrapper>
                                                {value ? (
                                                    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                                        <Button
                                                            sx={{my: 4}}
                                                            size='medium'
                                                            variant='contained'
                                                            color='secondary'
                                                            startIcon={<Icon icon='mdi:delete-outline'/>}
                                                            onClick={removeFlyerImg}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </Box>
                                                ) : (
                                                    <></>
                                                )}
                                            </>
                                        )}
                                    />
                                    {eventPackageErrors.event_package_flyer && (
                                        <FormHelperText sx={{color: 'error.main'}} id='error-venue-event-package-flyer'>
                                            {eventPackageErrors.event_package_flyer.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={12}
                                sx={{mt: 18, display: 'flex', justifyContent: 'center', position: 'relative'}}
                            >
                                <Button size='large' variant='outlined' color='secondary' onClick={handleBack}
                                        sx={{mr: 24}}>
                                    Back
                                </Button>
                                <Button size='large' type='submit' variant='contained'>
                                    Next
                                </Button>
                                <Button size='medium' variant='no-outlined' color='secondary'
                                        sx={{position: 'absolute', right: 0}}>
                                    Skip
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )
            case 6:
                return (
                    <form key={6} onSubmit={eventCateringSubmit(onEventCateringSubmit)}>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <Typography variant='h4'
                                            sx={{textAlign: 'center', fontWeight: 600, color: 'common.black'}}>
                                    {steps[6].subtitle}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Box sx={{
                                    mb: 0,
                                    paddingLeft: 2,
                                    borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                }}>
                                    <Typography variant='h5'
                                                sx={{mt: 8, textAlign: 'left', fontWeight: 600, color: 'common.black'}}>
                                        Are There Food Choices We Need To Add?
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='food_choice'
                                        control={eventCateringControl}
                                        rules={{required: true}}
                                        render={({field: {value, onChange}}) => (
                                            <RadioGroup
                                                row
                                                value={value}
                                                name='event-catering-option'
                                                onChange={e => {
                                                    onChange(parseInt(e.target.value))
                                                }}
                                                aria-label='event-catering-option'
                                                sx={{mb: 2}}
                                            >
                                                <FormControlLabel value={1} control={<Radio/>} label='Yes'/>
                                                <FormControlLabel value={0} control={<Radio/>} label='No'/>
                                            </RadioGroup>
                                        )}
                                    />
                                    {eventCateringErrors.food_choice && (
                                        <FormHelperText sx={{color: 'error.main'}} id='error-event-catering-option'>
                                            {eventCateringErrors.food_choice.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={12}
                                sx={{mt: 18, display: 'flex', justifyContent: 'center', position: 'relative'}}
                            >
                                <Button size='large' variant='outlined' color='secondary' onClick={handleBack}
                                        sx={{mr: 24}}>
                                    Back
                                </Button>
                                <Button size='large' type='submit' variant='contained'>
                                    Next
                                </Button>
                                <Button size='medium' variant='no-outlined' color='secondary'
                                        sx={{position: 'absolute', right: 0}}>
                                    Skip
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )
            case 7:
                return (
                    <form key={7} onSubmit={eventMenuSubmit(onEventMenuSubmit)}>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <Typography variant='h4'
                                            sx={{textAlign: 'center', fontWeight: 600, color: 'common.black'}}>
                                    {steps[7].subtitle}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Box sx={{
                                    mb: 2,
                                    paddingLeft: 2,
                                    borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                }}>
                                    <Typography variant='h5'
                                                sx={{mt: 8, textAlign: 'left', fontWeight: 600, color: 'common.black'}}>
                                        Menu Title
                                    </Typography>
                                </Box>
                                <FormControl fullWidth>
                                    <Controller
                                        name='menu_title'
                                        control={eventMenuControl}
                                        rules={{required: true}}
                                        render={({field: {value, onChange}}) => (
                                            <TextField
                                                value={value}
                                                label=''
                                                onChange={onChange}
                                                placeholder='e.g. Menu'
                                                error={Boolean(eventMenuErrors.menu_title)}
                                                aria-describedby='venue-event-menu-title'
                                            />
                                        )}
                                    />
                                    {eventMenuErrors.menu_title && (
                                        <FormHelperText sx={{color: 'error.main'}} id='error-venue-event-menu-title'>
                                            {eventMenuErrors.menu_title.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Box sx={{
                                    mb: 2,
                                    paddingLeft: 2,
                                    borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                }}>
                                    <Typography variant='h5'
                                                sx={{mt: 8, textAlign: 'left', fontWeight: 600, color: 'common.black'}}>
                                        Menu Description
                                    </Typography>
                                </Box>
                                <FormControl fullWidth>
                                    <Controller
                                        name='menu_description'
                                        control={eventMenuControl}
                                        rules={{required: true}}
                                        render={({field: {value, onChange}}) => (
                                            <TextField
                                                value={value}
                                                label=''
                                                multiline
                                                rows={8}
                                                onChange={onChange}
                                                placeholder="e.g. Be immersed in Stock Brook's magical Christmas party"
                                                error={Boolean(eventMenuErrors.menu_description)}
                                                aria-describedby='venue-event-menu-description'
                                            />
                                        )}
                                    />
                                    {eventMenuErrors.menu_description && (
                                        <FormHelperText sx={{color: 'error.main'}}
                                                        id='error-venue-event-menu-description'>
                                            {eventMenuErrors.menu_description.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='menu_list'
                                        control={eventMenuControl}
                                        rules={{required: true}}
                                        render={({field: {value, onChange}}) => (
                                            <>
                                                {value.map((item, index) => (
                                                    <Box key={index}>
                                                        <Grid container spacing={3} sx={{alignItems: 'center'}}>
                                                            <Grid item xs={12} sm={12}>
                                                                <Box
                                                                    sx={{
                                                                        mb: 0,
                                                                        paddingLeft: 2,
                                                                        borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant='h5'
                                                                        sx={{
                                                                            mt: 8,
                                                                            textAlign: 'left',
                                                                            fontWeight: 600,
                                                                            color: 'common.black'
                                                                        }}
                                                                    >
                                                                        Add Menu Items
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item xs={12} sm={12}>
                                                                <TextField
                                                                    sx={{width: '100%'}}
                                                                    id={'event-menu-list-item-title-' + index}
                                                                    value={item.name}
                                                                    label=''
                                                                    onChange={e => {
                                                                        const updated_event_menu_list = [...value]
                                                                        updated_event_menu_list[index].name = e.target.value
                                                                        onChange(updated_event_menu_list)
                                                                    }}
                                                                    placeholder='e.g. Starters'
                                                                    error={Boolean(
                                                                        eventMenuErrors.menu_list &&
                                                                        eventMenuErrors.menu_list[index] &&
                                                                        eventMenuErrors.menu_list[index].name
                                                                    )}
                                                                />
                                                                {eventMenuErrors.menu_list &&
                                                                    eventMenuErrors.menu_list[index] &&
                                                                    eventMenuErrors.menu_list[index].name && (
                                                                        <FormHelperText
                                                                            sx={{my: 2, color: 'error.main'}}
                                                                            id={'error-menu-list-item-name' + index}
                                                                        >
                                                                            {eventMenuErrors.menu_list[index].name.message}
                                                                        </FormHelperText>
                                                                    )}
                                                            </Grid>
                                                            <Grid item xs={12} sm={12}>
                                                                <Box
                                                                    sx={{
                                                                        mb: 0,
                                                                        paddingLeft: 2,
                                                                        borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant='h5'
                                                                        sx={{
                                                                            mt: 8,
                                                                            textAlign: 'left',
                                                                            fontWeight: 600,
                                                                            color: 'common.black'
                                                                        }}
                                                                    >
                                                                        Number of Items
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item xs={6} sm={6}>
                                                                <NumberTextField
                                                                    type='number'
                                                                    sx={{width: '100%'}}
                                                                    id={'event-menu-list-item-number-' + index}
                                                                    value={item.count}
                                                                    label=''
                                                                    onChange={e => {
                                                                        const updated_event_menu_list = [...value]
                                                                        updated_event_menu_list[index].count = e.target.value
                                                                        onChange(updated_event_menu_list)
                                                                    }}
                                                                    placeholder='e.g. 4'
                                                                    error={Boolean(
                                                                        eventMenuErrors.menu_list &&
                                                                        eventMenuErrors.menu_list[index] &&
                                                                        eventMenuErrors.menu_list[index].count
                                                                    )}
                                                                />
                                                                {eventMenuErrors.menu_list &&
                                                                    eventMenuErrors.menu_list[index] &&
                                                                    eventMenuErrors.menu_list[index].count && (
                                                                        <FormHelperText
                                                                            sx={{my: 2, color: 'error.main'}}
                                                                            id={'error-menu-list-item-count' + index}
                                                                        >
                                                                            {eventMenuErrors.menu_list[index].count.message}
                                                                        </FormHelperText>
                                                                    )}
                                                            </Grid>
                                                            <Grid item xs={6} sm={6}>
                                                                <Button
                                                                    size='medium'
                                                                    variant='contained'
                                                                    color='secondary'
                                                                    onClick={() => resetMenuItems(index)}
                                                                >
                                                                    Add Items
                                                                </Button>
                                                            </Grid>
                                                            {item.list.map((menu_item, menu_index) => (
                                                                <Grid item key={menu_index} xs={6} sm={6}>
                                                                    <TextField
                                                                        sx={{width: '100%'}}
                                                                        value={menu_item}
                                                                        label=''
                                                                        onChange={e => {
                                                                            const updated_event_menu_list = [...value]
                                                                            updated_event_menu_list[index].list[menu_index] = e.target.value
                                                                            onChange(updated_event_menu_list)
                                                                        }}
                                                                        placeholder='e.g. Chicken, Ham Hock...'
                                                                        error={Boolean(
                                                                            eventMenuErrors.menu_list &&
                                                                            eventMenuErrors.menu_list[index] &&
                                                                            eventMenuErrors.menu_list[index].list &&
                                                                            eventMenuErrors.menu_list[index].list[menu_index]
                                                                        )}
                                                                    />
                                                                    {eventMenuErrors.menu_list &&
                                                                        eventMenuErrors.menu_list[index] &&
                                                                        eventMenuErrors.menu_list[index].list &&
                                                                        eventMenuErrors.menu_list[index].list[menu_index] && (
                                                                            <FormHelperText
                                                                                sx={{my: 2, color: 'error.main'}}
                                                                                id={'error-menu-list-item-' + index + '-list-' + menu_index}
                                                                            >
                                                                                {eventMenuErrors.menu_list[index].list[menu_index].message}
                                                                            </FormHelperText>
                                                                        )}
                                                                </Grid>
                                                            ))}
                                                        </Grid>
                                                        <Grid container spacing={3} sx={{alignItems: 'center'}}>
                                                            <Grid item xs={12} sm={12}>
                                                                {index !== 0 ? (
                                                                    <Box sx={{
                                                                        display: 'flex',
                                                                        justifyContent: 'flex-end'
                                                                    }}>
                                                                        <Button
                                                                            sx={{my: 4}}
                                                                            size='medium'
                                                                            variant='contained'
                                                                            color='secondary'
                                                                            startIcon={<Icon
                                                                                icon='mdi:delete-outline'/>}
                                                                            onClick={() => removeMenuList(index)}
                                                                        >
                                                                            Remove
                                                                        </Button>
                                                                    </Box>
                                                                ) : null}
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                ))}
                                            </>
                                        )}
                                    />
                                    {eventMenuErrors.menu_list && (
                                        <FormHelperText sx={{my: 4, color: 'error.main'}}
                                                        id='error-venue-event-menu-list'>
                                            {eventMenuErrors.menu_list.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Box sx={{my: 0, display: 'flex', justifyContent: 'center'}}>
                                    <Button size='medium' variant='contained' color='secondary'
                                            onClick={() => addMoreMenu()}>
                                        Add More Menu
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={12}
                                sx={{mt: 18, display: 'flex', justifyContent: 'center', position: 'relative'}}
                            >
                                <Button size='large' variant='outlined' color='secondary' onClick={handleBack}
                                        sx={{mr: 24}}>
                                    Back
                                </Button>
                                <Button size='large' type='submit' variant='contained'>
                                    Next
                                </Button>
                                <Button size='medium' variant='no-outlined' color='secondary'
                                        sx={{position: 'absolute', right: 0}}>
                                    Skip
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )
            case 8:
                return (
                    <form key={5} onSubmit={extraLandingSubmit(onExtraLandingSubmit)}>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <Typography variant='h4'
                                            sx={{textAlign: 'center', fontWeight: 600, color: 'common.black'}}>
                                    {steps[8].subtitle}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Box sx={{
                                    mb: 2,
                                    paddingLeft: 2,
                                    borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                }}>
                                    <Typography variant='h5'
                                                sx={{mt: 8, textAlign: 'left', fontWeight: 600, color: 'common.black'}}>
                                        Any Drinks Or Other Info?
                                    </Typography>
                                </Box>
                                <FormControl fullWidth>
                                    <Controller
                                        name='section_title'
                                        control={extraLandingControl}
                                        rules={{required: true}}
                                        render={({field: {value, onChange}}) => (
                                            <TextField
                                                value={value}
                                                label=''
                                                onChange={onChange}
                                                placeholder='e.g. Drinks'
                                                error={Boolean(extraLandingErrors.section_title)}
                                            />
                                        )}
                                    />
                                    {extraLandingErrors.section_title && (
                                        <FormHelperText sx={{color: 'error.main'}} id='error-venue-event-section-title'>
                                            {extraLandingErrors.section_title.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Box sx={{
                                    mb: 2,
                                    paddingLeft: 2,
                                    borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                }}>
                                    <Typography variant='h5'
                                                sx={{mt: 8, textAlign: 'left', fontWeight: 600, color: 'common.black'}}>
                                        Description
                                    </Typography>
                                </Box>
                                <FormControl fullWidth>
                                    <Controller
                                        name='section_description'
                                        control={extraLandingControl}
                                        rules={{required: true}}
                                        render={({field: {value, onChange}}) => (
                                            <TextField
                                                value={value}
                                                label=''
                                                multiline
                                                rows={8}
                                                onChange={onChange}
                                                placeholder='e.g.Please note if considering our Drinks Wristbands or any of the Drinks...'
                                                error={Boolean(extraLandingErrors.section_description)}
                                                aria-describedby='venue-event-section-description'
                                            />
                                        )}
                                    />
                                    {extraLandingErrors.section_description && (
                                        <FormHelperText sx={{color: 'error.main'}}
                                                        id='error-venue-event-section-description'>
                                            {extraLandingErrors.section_description.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='package_deal_list'
                                        control={extraLandingControl}
                                        rules={{required: true}}
                                        render={({field: {value, onChange}}) => (
                                            <>
                                                {value.map((item, index) => (
                                                    <Grid key={index} container spacing={3} sx={{alignItems: 'center'}}>
                                                        <Grid item xs={12} sm={12}>
                                                            <Box
                                                                sx={{
                                                                    mb: 2,
                                                                    paddingLeft: 2,
                                                                    borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                                                }}
                                                            >
                                                                <Typography
                                                                    variant='h5'
                                                                    sx={{
                                                                        mt: 8,
                                                                        textAlign: 'left',
                                                                        fontWeight: 600,
                                                                        color: 'common.black'
                                                                    }}
                                                                >
                                                                    Package Deals
                                                                </Typography>
                                                            </Box>
                                                        </Grid>
                                                        <Grid item xs={12} sm={12}>
                                                            <TextField
                                                                sx={{width: '100%'}}
                                                                id={'event-section-package-list-title-' + index}
                                                                value={item.heading}
                                                                label='Package Heading'
                                                                onChange={e => {
                                                                    const updated_event_package_list = [...value]
                                                                    updated_event_package_list[index].heading = e.target.value
                                                                    onChange(updated_event_package_list)
                                                                }}
                                                                placeholder='e.g. Drink Package A'
                                                                error={Boolean(
                                                                    extraLandingErrors.package_deal_list &&
                                                                    extraLandingErrors.package_deal_list[index] &&
                                                                    extraLandingErrors.package_deal_list[index].heading
                                                                )}
                                                            />
                                                            {extraLandingErrors.package_deal_list &&
                                                                extraLandingErrors.package_deal_list[index] &&
                                                                extraLandingErrors.package_deal_list[index].heading && (
                                                                    <FormHelperText
                                                                        sx={{my: 2, color: 'error.main'}}
                                                                        id={'error-extra-landing-item-heading' + index}
                                                                    >
                                                                        {extraLandingErrors.package_deal_list[index].heading.message}
                                                                    </FormHelperText>
                                                                )}
                                                        </Grid>
                                                        <Grid item xs={12} sm={12}>
                                                            <TextField
                                                                multiline
                                                                rows={4}
                                                                sx={{width: '100%'}}
                                                                id={'event-section-package-list-description-' + index}
                                                                value={item.description}
                                                                label='Package Description'
                                                                onChange={e => {
                                                                    const updated_event_package_list = [...value]
                                                                    updated_event_package_list[index].description = e.target.value
                                                                    onChange(updated_event_package_list)
                                                                }}
                                                                placeholder='e.g. Half a bottle of house wine, half a bootle of water and 4 drink tokens per person...'
                                                                error={Boolean(
                                                                    extraLandingErrors.package_deal_list &&
                                                                    extraLandingErrors.package_deal_list[index] &&
                                                                    extraLandingErrors.package_deal_list[index].description
                                                                )}
                                                            />
                                                            {extraLandingErrors.package_deal_list &&
                                                                extraLandingErrors.package_deal_list[index] &&
                                                                extraLandingErrors.package_deal_list[index].description && (
                                                                    <FormHelperText
                                                                        sx={{my: 2, color: 'error.main'}}
                                                                        id={'error-extra-landing-item-description' + index}
                                                                    >
                                                                        {extraLandingErrors.package_deal_list[index].description.message}
                                                                    </FormHelperText>
                                                                )}
                                                        </Grid>
                                                        <Grid item xs={12} sm={12}>
                                                            <NumberTextField
                                                                id={'event-section-package-list-price-' + index}
                                                                type='number'
                                                                sx={{width: '100%'}}
                                                                label='Package Price'
                                                                value={item.price}
                                                                onChange={e => {
                                                                    const updated_event_package_list = [...value]
                                                                    updated_event_package_list[index].price = e.target.value
                                                                    onChange(updated_event_package_list)
                                                                }}
                                                                InputProps={{
                                                                    maxLength: 6,
                                                                    startAdornment: <InputAdornment
                                                                        position='start'>£ </InputAdornment>
                                                                }}
                                                                error={Boolean(
                                                                    extraLandingErrors.package_deal_list &&
                                                                    extraLandingErrors.package_deal_list[index] &&
                                                                    extraLandingErrors.package_deal_list[index].price
                                                                )}
                                                            />
                                                            {extraLandingErrors.package_deal_list &&
                                                                extraLandingErrors.package_deal_list[index] &&
                                                                extraLandingErrors.package_deal_list[index].price && (
                                                                    <FormHelperText
                                                                        sx={{my: 2, color: 'error.main'}}
                                                                        id={'error-extra-landing-item-price' + index}
                                                                    >
                                                                        {extraLandingErrors.package_deal_list[index].price.message}
                                                                    </FormHelperText>
                                                                )}
                                                        </Grid>
                                                        <Grid item xs={12} sm={12}>
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    justifyContent: 'flex-end'
                                                                }}
                                                            >
                                                                {index !== 0 ? (
                                                                    <Button
                                                                        size='medium'
                                                                        variant='contained'
                                                                        color='secondary'
                                                                        startIcon={<Icon icon='mdi:delete-outline'/>}
                                                                        onClick={() => removePackageDealList(index)}
                                                                    >
                                                                        Remove
                                                                    </Button>
                                                                ) : null}
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                ))}
                                            </>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Box sx={{my: 4, display: 'flex', justifyContent: 'center'}}>
                                    <Button size='medium' variant='contained' color='secondary'
                                            onClick={() => addMorePackageDealList()}>
                                        Add More Package
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={12}
                                sx={{mt: 18, display: 'flex', justifyContent: 'center', position: 'relative'}}
                            >
                                <Button size='large' variant='outlined' color='secondary' onClick={handleBack}
                                        sx={{mr: 24}}>
                                    Back
                                </Button>
                                <Button size='large' type='submit' variant='contained'>
                                    Next
                                </Button>
                                <Button size='medium' variant='no-outlined' color='secondary'
                                        sx={{position: 'absolute', right: 0}}>
                                    Skip
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )
            case 9:
                return (
                    <form key={9} onSubmit={extraInfoSubmit(onExtraInfoSubmit)}>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <Typography variant='h4'
                                            sx={{textAlign: 'center', fontWeight: 600, color: 'common.black'}}>
                                    {steps[9].subtitle}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Box sx={{
                                    mb: 0,
                                    paddingLeft: 2,
                                    borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                }}>
                                    <Typography variant='h5'
                                                sx={{mt: 8, textAlign: 'left', fontWeight: 600, color: 'common.black'}}>
                                        Add More Information To Your Website
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Box sx={{mb: 0, paddingLeft: 2}}>
                                    <Typography variant='h6'
                                                sx={{mt: 2, textAlign: 'left', fontWeight: 600, color: 'common.black'}}>
                                        Background Image
                                    </Typography>
                                </Box>
                                <FormControl fullWidth>
                                    <Controller
                                        name='background'
                                        control={extraInfoControl}
                                        render={({field: {value, onChange, ...field}}) => (
                                            <>
                                                <DropzoneWrapper onClick={e => clickBackgroundFile()}>
                                                    <Box className='dropzone'>
                                                        <Input
                                                            inputRef={backgroundRef}
                                                            {...field}
                                                            value={value?.fileName}
                                                            onChange={event => {
                                                                onChange(event.target.files[0])
                                                            }}
                                                            type='file'
                                                            aria-describedby='extra-info-background'
                                                            sx={{display: 'none'}}
                                                        />
                                                        {value ? (
                                                            uploadImg(value, 'background')
                                                        ) : (
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    flexDirection: ['column', 'column', 'row'],
                                                                    alignItems: 'center'
                                                                }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        display: 'flex',
                                                                        flexDirection: 'column',
                                                                        textAlign: ['center', 'center', 'inherit']
                                                                    }}
                                                                >
                                                                    <HeadingTypography variant='h5'>Click here to
                                                                        upload.</HeadingTypography>
                                                                </Box>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                </DropzoneWrapper>
                                                {value ? (
                                                    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                                        <Button
                                                            sx={{my: 4}}
                                                            size='medium'
                                                            variant='contained'
                                                            color='secondary'
                                                            startIcon={<Icon icon='mdi:delete-outline'/>}
                                                            onClick={removeExtraInfoBackground}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </Box>
                                                ) : (
                                                    <></>
                                                )}
                                            </>
                                        )}
                                    />
                                    {extraInfoErrors.background && (
                                        <FormHelperText sx={{my: 2, color: 'error.main'}}
                                                        id='error-extra-info-background'>
                                            {extraInfoErrors.background.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='extra_info'
                                        control={extraInfoControl}
                                        rules={{required: true}}
                                        render={({field: {value, onChange}}) => (
                                            <>
                                                {value.map((item, index) => (
                                                    <Grid key={index} container spacing={3} sx={{alignItems: 'center'}}>
                                                        <Grid item xs={12} sm={12}>
                                                            <Box
                                                                sx={{
                                                                    mb: 2,
                                                                    paddingLeft: 2,
                                                                    borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                                                }}
                                                            >
                                                                <Typography
                                                                    variant='h5'
                                                                    sx={{
                                                                        mt: 8,
                                                                        textAlign: 'left',
                                                                        fontWeight: 600,
                                                                        color: 'common.black'
                                                                    }}
                                                                >
                                                                    {'More Information ' + (index + 1)}
                                                                </Typography>
                                                            </Box>
                                                        </Grid>
                                                        <Grid item xs={12} sm={12}>
                                                            <TextField
                                                                sx={{width: '100%'}}
                                                                id={'extra-info-list-heading-' + index}
                                                                value={item.heading}
                                                                label='Heading'
                                                                onChange={e => {
                                                                    const updated_event_faq_list = [...value]
                                                                    updated_event_faq_list[index].heading = e.target.value
                                                                    onChange(updated_event_faq_list)
                                                                }}
                                                                placeholder='e.g. Hire This Venue Exclusively'
                                                                error={Boolean(
                                                                    extraInfoErrors.extra_info &&
                                                                    extraInfoErrors.extra_info[index] &&
                                                                    extraInfoErrors.extra_info[index].heading
                                                                )}
                                                            />
                                                            {extraInfoErrors.extra_info &&
                                                                extraInfoErrors.extra_info[index] &&
                                                                extraInfoErrors.extra_info[index].heading && (
                                                                    <FormHelperText
                                                                        sx={{my: 2, color: 'error.main'}}
                                                                        id={'error-extra-info-item-heading' + index}
                                                                    >
                                                                        {extraInfoErrors.extra_info[index].heading.message}
                                                                    </FormHelperText>
                                                                )}
                                                        </Grid>
                                                        <Grid item xs={12} sm={12}>
                                                            <TextField
                                                                sx={{width: '100%'}}
                                                                id={'extra-info-list-sub-heading-' + index}
                                                                value={item.sub_heading}
                                                                label='Sub Heading'
                                                                onChange={e => {
                                                                    const updated_extra_info_list = [...value]
                                                                    updated_extra_info_list[index].sub_heading = e.target.value
                                                                    onChange(updated_extra_info_list)
                                                                }}
                                                                placeholder='e.g. Book any of our venues for your private...'
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={12}>
                                                            <TextField
                                                                multiline
                                                                rows={2}
                                                                sx={{width: '100%'}}
                                                                id={'extra-info-list-description-' + index}
                                                                value={item.description}
                                                                label='Small Description'
                                                                onChange={e => {
                                                                    const updated_extra_info_list = [...value]
                                                                    updated_extra_info_list[index].description = e.target.value
                                                                    onChange(updated_extra_info_list)
                                                                }}
                                                                placeholder='e.g. Book any of our venues for your private...'
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={12}>
                                                            <TextField
                                                                sx={{width: '100%'}}
                                                                id={'extra-info-list-phone-' + index}
                                                                value={item.phone}
                                                                label='Phone Number'
                                                                type='tel'
                                                                onChange={e => {
                                                                    const updated_extra_info_list = [...value]
                                                                    updated_extra_info_list[index].phone = e.target.value
                                                                    onChange(updated_extra_info_list)
                                                                }}
                                                                placeholder='e.g. 3214567890'
                                                                error={Boolean(
                                                                    extraInfoErrors.extra_info &&
                                                                    extraInfoErrors.extra_info[index] &&
                                                                    extraInfoErrors.extra_info[index].phone
                                                                )}
                                                            />
                                                            {extraInfoErrors.extra_info &&
                                                                extraInfoErrors.extra_info[index] &&
                                                                extraInfoErrors.extra_info[index].phone && (
                                                                    <FormHelperText
                                                                        sx={{my: 2, color: 'error.main'}}
                                                                        id={'error-extra-info-item-phone' + index}
                                                                    >
                                                                        {extraInfoErrors.extra_info[index].phone.message}
                                                                    </FormHelperText>
                                                                )}
                                                        </Grid>
                                                        <Grid item xs={12} sm={12}>
                                                            <TextField
                                                                sx={{width: '100%'}}
                                                                id={'extra-info-list-link-' + index}
                                                                value={item.link}
                                                                label='3rd Party Link'
                                                                onChange={e => {
                                                                    const updated_extra_info_list = [...value]
                                                                    updated_extra_info_list[index].link = e.target.value
                                                                    onChange(updated_extra_info_list)
                                                                }}
                                                                placeholder='e.g. booking.com, airbnb'
                                                            />
                                                        </Grid>
                                                        {extraInfoErrors.extra_info && extraInfoErrors.extra_info[index] && (
                                                            <FormHelperText sx={{my: 4, color: 'error.main'}}
                                                                            id='error-extra-info-item-summary'>
                                                                {extraInfoErrors.extra_info[index].message}
                                                            </FormHelperText>
                                                        )}
                                                        <Grid item xs={12} sm={12}>
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    justifyContent: 'flex-end'
                                                                }}
                                                            >
                                                                {index !== 0 ? (
                                                                    <Button
                                                                        size='medium'
                                                                        variant='contained'
                                                                        color='secondary'
                                                                        startIcon={<Icon icon='mdi:delete-outline'/>}
                                                                        onClick={() => removeExtraInfoList(index)}
                                                                    >
                                                                        Remove
                                                                    </Button>
                                                                ) : null}
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                ))}
                                            </>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Box sx={{my: 4, display: 'flex', justifyContent: 'center'}}>
                                    <Button size='medium' variant='contained' color='secondary'
                                            onClick={() => addMoreExtraInfoList()}>
                                        Add More Row
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Box sx={{
                                    mb: 0,
                                    paddingLeft: 2,
                                    borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                }}>
                                    <Typography variant='h5'
                                                sx={{mt: 8, textAlign: 'left', fontWeight: 600, color: 'common.black'}}>
                                        Add Brochure Or Flyer For Event?
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='brochure'
                                        control={extraInfoControl}
                                        render={({field: {value, onChange, ...field}}) => (
                                            <>
                                                <DropzoneWrapper onClick={e => clickBrochureFile()}>
                                                    <Box className='dropzone'>
                                                        <Input
                                                            inputRef={brochureRef}
                                                            {...field}
                                                            value={value?.fileName}
                                                            onChange={event => {
                                                                onChange(event.target.files[0])
                                                            }}
                                                            type='file'
                                                            aria-describedby='extra-info-brochure'
                                                            sx={{display: 'none'}}
                                                        />
                                                        {value ? (
                                                            uploadImg(value, 'brochure')
                                                        ) : (
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    flexDirection: ['column', 'column', 'row'],
                                                                    alignItems: 'center'
                                                                }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        display: 'flex',
                                                                        flexDirection: 'column',
                                                                        textAlign: ['center', 'center', 'inherit']
                                                                    }}
                                                                >
                                                                    <HeadingTypography variant='h5'>Click here to
                                                                        upload.</HeadingTypography>
                                                                </Box>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                </DropzoneWrapper>
                                                {value ? (
                                                    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                                        <Button
                                                            sx={{my: 4}}
                                                            size='medium'
                                                            variant='contained'
                                                            color='secondary'
                                                            startIcon={<Icon icon='mdi:delete-outline'/>}
                                                            onClick={removeExtraInfoBrochure}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </Box>
                                                ) : (
                                                    <></>
                                                )}
                                            </>
                                        )}
                                    />
                                    {extraInfoErrors.brochure && (
                                        <FormHelperText sx={{color: 'error.main'}} id='error-extra-info-brochure'>
                                            {extraInfoErrors.brochure.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={12}
                                sx={{mt: 18, display: 'flex', justifyContent: 'center', position: 'relative'}}
                            >
                                <Button size='large' variant='outlined' color='secondary' onClick={handleBack}
                                        sx={{mr: 24}}>
                                    Back
                                </Button>
                                <Button size='large' type='submit' variant='contained'>
                                    Next
                                </Button>
                                <Button size='medium' variant='no-outlined' color='secondary'
                                        sx={{position: 'absolute', right: 0}}>
                                    Skip
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )
            case 10:
                return (
                    <form key={10} onSubmit={faqInfoSubmit(onFaqInfoSubmit)}>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <Typography variant='h4'
                                            sx={{textAlign: 'center', fontWeight: 600, color: 'common.black'}}>
                                    {steps[10].subtitle}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='faq_list'
                                        control={faqInfoControl}
                                        rules={{required: true}}
                                        render={({field: {value, onChange}}) => (
                                            <>
                                                {value.map((item, index) => (
                                                    <Grid key={index} container spacing={3} sx={{alignItems: 'center'}}>
                                                        <Grid item xs={12} sm={12}>
                                                            <Box
                                                                sx={{
                                                                    mb: 2,
                                                                    paddingLeft: 2,
                                                                    borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                                                }}
                                                            >
                                                                <Typography
                                                                    variant='h5'
                                                                    sx={{
                                                                        mt: 8,
                                                                        textAlign: 'left',
                                                                        fontWeight: 600,
                                                                        color: 'common.black'
                                                                    }}
                                                                >
                                                                    {'Row ' + (index + 1)}
                                                                </Typography>
                                                            </Box>
                                                        </Grid>
                                                        <Grid item xs={12} sm={12}>
                                                            <TextField
                                                                sx={{width: '100%'}}
                                                                id={'event-faq-list-item-heading-' + index}
                                                                value={item.heading}
                                                                label='Heading'
                                                                onChange={e => {
                                                                    const updated_event_faq_list = [...value]
                                                                    updated_event_faq_list[index].heading = e.target.value
                                                                    onChange(updated_event_faq_list)
                                                                }}
                                                                placeholder='e.g. Is the venue heated?'
                                                                error={Boolean(
                                                                    faqInfoErrors.faq_list &&
                                                                    faqInfoErrors.faq_list[index] &&
                                                                    faqInfoErrors.faq_list[index].heading
                                                                )}
                                                            />
                                                            {faqInfoErrors.faq_list &&
                                                                faqInfoErrors.faq_list[index] &&
                                                                faqInfoErrors.faq_list[index].heading && (
                                                                    <FormHelperText
                                                                        sx={{my: 2, color: 'error.main'}}
                                                                        id={'error-faq-list-item-heading' + index}
                                                                    >
                                                                        {faqInfoErrors.faq_list[index].heading.message}
                                                                    </FormHelperText>
                                                                )}
                                                        </Grid>
                                                        <Grid item xs={12} sm={12}>
                                                            <TextField
                                                                multiline
                                                                rows={4}
                                                                sx={{width: '100%'}}
                                                                id={'event-faq-list-item-description-' + index}
                                                                value={item.description}
                                                                label='Description'
                                                                onChange={e => {
                                                                    const updated_event_faq_list = [...value]
                                                                    updated_event_faq_list[index].description = e.target.value
                                                                    onChange(updated_event_faq_list)
                                                                }}
                                                                placeholder='e.g. Yes, we have multi-thermostastic heaters throughout all of our marquee venues. ...'
                                                                error={Boolean(
                                                                    faqInfoErrors.faq_list &&
                                                                    faqInfoErrors.faq_list[index] &&
                                                                    faqInfoErrors.faq_list[index].description
                                                                )}
                                                            />
                                                            {faqInfoErrors.faq_list &&
                                                                faqInfoErrors.faq_list[index] &&
                                                                faqInfoErrors.faq_list[index].description && (
                                                                    <FormHelperText
                                                                        sx={{my: 2, color: 'error.main'}}
                                                                        id={'error-faq-list-item-description' + index}
                                                                    >
                                                                        {faqInfoErrors.faq_list[index].description.message}
                                                                    </FormHelperText>
                                                                )}
                                                        </Grid>
                                                        <Grid item xs={12} sm={12}>
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    justifyContent: 'flex-end'
                                                                }}
                                                            >
                                                                {index !== 0 ? (
                                                                    <Button
                                                                        size='medium'
                                                                        variant='contained'
                                                                        color='secondary'
                                                                        startIcon={<Icon icon='mdi:delete-outline'/>}
                                                                        onClick={() => removeFaqList(index)}
                                                                    >
                                                                        Remove
                                                                    </Button>
                                                                ) : null}
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                ))}
                                            </>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Box sx={{my: 4, display: 'flex', justifyContent: 'center'}}>
                                    <Button size='medium' variant='contained' color='secondary'
                                            onClick={() => addMoreFaqList()}>
                                        Add More Row
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={12}
                                sx={{mt: 18, display: 'flex', justifyContent: 'center', position: 'relative'}}
                            >
                                <Button size='large' variant='outlined' color='secondary' onClick={handleBack}
                                        sx={{mr: 24}}>
                                    Back
                                </Button>
                                <Button size='large' type='submit' variant='contained'>
                                    Next
                                </Button>
                                <Button size='medium' variant='no-outlined' color='secondary'
                                        sx={{position: 'absolute', right: 0}}>
                                    Skip
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )
            case 11:
                return (
                    <form key={11} onSubmit={reminderEmailSubmit(onReminderEmailSubmit)}>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <Typography variant='h4'
                                            sx={{textAlign: 'center', fontWeight: 600, color: 'common.black'}}>
                                    {steps[11].title}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Box sx={{
                                    mb: 1,
                                    paddingLeft: 2,
                                    borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                }}>
                                    <Typography variant='h5'
                                                sx={{mt: 8, textAlign: 'left', fontWeight: 600, color: 'common.black'}}>
                                        Would You Like To Configure Your Reminder Emails
                                    </Typography>
                                </Box>
                                <FormControl fullWidth>
                                    <Controller
                                        name='is_configure_reminder_email'
                                        control={reminderEmailControl}
                                        rules={{required: true}}
                                        render={({field: {value, onChange}}) => (
                                            <RadioGroup
                                                row
                                                value={value}
                                                name='event-reminder-email-option'
                                                onChange={e => {
                                                    onChange(parseInt(e.target.value))
                                                }}
                                                aria-label='event-reminder-email-option-label'
                                                sx={{mb: 2}}
                                            >
                                                <FormControlLabel value={1} control={<Radio/>} label='Now'/>
                                                <FormControlLabel value={0} control={<Radio/>} label='Later'/>
                                            </RadioGroup>
                                        )}
                                    />
                                    {reminderEmailErrors.is_configure_reminder_email && (
                                        <FormHelperText sx={{my: 4, color: 'error.main'}}
                                                        id='error-reminder-email-option'>
                                            {reminderEmailErrors.is_configure_reminder_email.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Box sx={{
                                    mb: 1,
                                    paddingLeft: 2,
                                    borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                }}>
                                    <Typography variant='h5'
                                                sx={{mt: 8, textAlign: 'left', fontWeight: 600, color: 'common.black'}}>
                                        How Many Days Before The Event Do You Want To Remind Customers To Pay Their
                                        Balance?
                                    </Typography>
                                </Box>
                                <FormControl>
                                    <Controller
                                        name='days_before_event_reminder_email'
                                        control={reminderEmailControl}
                                        rules={{required: true}}
                                        render={({field: {value, onChange}}) => (
                                            <NumberTextField
                                                type='number'
                                                value={value}
                                                label=''
                                                onChange={onChange}
                                                placeholder='e.g. Days'
                                                error={Boolean(reminderEmailErrors.days_before_event_reminder_email)}
                                                aria-describedby='event-reminder-email-days'
                                            />
                                        )}
                                    />
                                    {reminderEmailErrors.days_before_event_reminder_email && (
                                        <FormHelperText sx={{color: 'error.main'}} id='error-event-reminder-email-days'>
                                            {reminderEmailErrors.days_before_event_reminder_email.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={12}
                                sx={{mt: 18, display: 'flex', justifyContent: 'center', position: 'relative'}}
                            >
                                <Button size='large' variant='outlined' color='secondary' onClick={handleBack}
                                        sx={{mr: 24}}>
                                    Back
                                </Button>
                                <Button size='large' type='submit' variant='contained'>
                                    Next
                                </Button>
                                <Button size='medium' variant='no-outlined' color='secondary'
                                        sx={{position: 'absolute', right: 0}}>
                                    Skip
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )
            case 12:
                return (
                    <form key={12} onSubmit={paymentSettingSubmit(onPaymentSettingSubmit)}>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <Typography variant='h4'
                                            sx={{textAlign: 'center', fontWeight: 600, color: 'common.black'}}>
                                    {steps[12].title}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='payment_option'
                                        control={paymentSettingControl}
                                        rules={{required: true}}
                                        render={({field: {value, onChange}}) => (
                                            <RadioGroup
                                                row
                                                value={value}
                                                name='event-payment-setting-option'
                                                onChange={e => {
                                                    setPaymentOption(parseInt(e.target.value))
                                                    onChange(parseInt(e.target.value))
                                                }}
                                                aria-label='event-payment-setting-option-label'
                                                sx={{mb: 2}}
                                            >
                                                <FormControlLabel value={0} control={<Radio/>} label='Bank Transfer'/>
                                                <FormControlLabel value={1} control={<Radio/>} label='Credit Card'/>
                                                <FormControlLabel value={2} control={<Radio/>} label='Both'/>
                                            </RadioGroup>
                                        )}
                                    />
                                    {paymentSettingErrors.payment_option && (
                                        <FormHelperText sx={{my: 4, color: 'error.main'}}
                                                        id='error-event-payment-setting-option'>
                                            {paymentSettingErrors.payment_option.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            {paymentOption !== 1 ? (
                                <Grid item xs={12} sm={12}>
                                    <Box sx={{
                                        mb: 4,
                                        paddingLeft: 2,
                                        borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                    }}>
                                        <Typography variant='h5' sx={{
                                            mt: 8,
                                            textAlign: 'left',
                                            fontWeight: 600,
                                            color: 'common.black'
                                        }}>
                                            Bank Details
                                        </Typography>
                                    </Box>
                                    <FormControl fullWidth>
                                        <Controller
                                            name='bank_info'
                                            control={paymentSettingControl}
                                            rules={{required: true}}
                                            render={({field: {value, onChange}}) => (
                                                <Grid container spacing={5}>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            sx={{width: '100%'}}
                                                            value={value.bank_name}
                                                            label='Bank Name'
                                                            onChange={e => {
                                                                const updated_bank_info = value
                                                                updated_bank_info.bank_name = e.target.value
                                                                onChange(updated_bank_info)
                                                            }}
                                                            placeholder=''
                                                            aria-describedby='event-payment-setting-bank-name'
                                                            error={Boolean(
                                                                paymentSettingErrors.bank_info && paymentSettingErrors.bank_info.bank_name
                                                            )}
                                                        />
                                                        {paymentSettingErrors.bank_info && paymentSettingErrors.bank_info.bank_name && (
                                                            <FormHelperText
                                                                sx={{color: 'error.main'}}
                                                                id='error-event-payment-setting-bank-info-bank-name'
                                                            >
                                                                {paymentSettingErrors.bank_info.bank_name.message}
                                                            </FormHelperText>
                                                        )}
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            sx={{width: '100%'}}
                                                            value={value.account_number}
                                                            label='Account Number'
                                                            onChange={e => {
                                                                const updated_bank_info = value
                                                                updated_bank_info.account_number = e.target.value
                                                                onChange(updated_bank_info)
                                                            }}
                                                            placeholder=''
                                                            aria-describedby='event-payment-setting-account-number'
                                                            error={Boolean(
                                                                paymentSettingErrors.bank_info && paymentSettingErrors.bank_info.account_number
                                                            )}
                                                        />
                                                        {paymentSettingErrors.bank_info && paymentSettingErrors.bank_info.account_number && (
                                                            <FormHelperText
                                                                sx={{color: 'error.main'}}
                                                                id='error-event-payment-setting-bank-info-account-number'
                                                            >
                                                                {paymentSettingErrors.bank_info.account_number.message}
                                                            </FormHelperText>
                                                        )}
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            sx={{width: '100%'}}
                                                            value={value.sort_code}
                                                            label='Sort Code'
                                                            onChange={e => {
                                                                const updated_bank_info = value
                                                                updated_bank_info.sort_code = e.target.value
                                                                onChange(updated_bank_info)
                                                            }}
                                                            placeholder=''
                                                            aria-describedby='event-payment-setting-sort-code'
                                                            error={Boolean(
                                                                paymentSettingErrors.bank_info && paymentSettingErrors.bank_info.sort_code
                                                            )}
                                                        />
                                                        {paymentSettingErrors.bank_info && paymentSettingErrors.bank_info.sort_code && (
                                                            <FormHelperText
                                                                sx={{color: 'error.main'}}
                                                                id='error-event-payment-setting-bank-info-sort-code'
                                                            >
                                                                {paymentSettingErrors.bank_info.sort_code.message}
                                                            </FormHelperText>
                                                        )}
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            sx={{width: '100%'}}
                                                            value={value.reference_name}
                                                            label='Reference Name'
                                                            onChange={e => {
                                                                const updated_bank_info = value
                                                                updated_bank_info.reference_name = e.target.value
                                                                onChange(updated_bank_info)
                                                            }}
                                                            placeholder=''
                                                            aria-describedby='event-payment-setting-reference-name'
                                                            error={Boolean(
                                                                paymentSettingErrors.bank_info && paymentSettingErrors.bank_info.reference_name
                                                            )}
                                                        />
                                                        {paymentSettingErrors.bank_info && paymentSettingErrors.bank_info.reference_name && (
                                                            <FormHelperText
                                                                sx={{color: 'error.main'}}
                                                                id='error-event-payment-setting-bank-info-reference-name'
                                                            >
                                                                {paymentSettingErrors.bank_info.reference_name.message}
                                                            </FormHelperText>
                                                        )}
                                                    </Grid>
                                                </Grid>
                                            )}
                                        />
                                    </FormControl>
                                </Grid>
                            ) : null}
                            {paymentOption !== 0 ? (
                                <Grid item xs={12} sm={12}>
                                    <Box sx={{
                                        mb: 4,
                                        paddingLeft: 2,
                                        borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                    }}>
                                        <Typography variant='h5' sx={{
                                            mt: 8,
                                            textAlign: 'left',
                                            fontWeight: 600,
                                            color: 'common.black'
                                        }}>
                                            Credit Card Details
                                        </Typography>
                                    </Box>
                                    <FormControl fullWidth>
                                        <Controller
                                            name='card_info'
                                            control={paymentSettingControl}
                                            rules={{required: true}}
                                            render={({field: {value, onChange}}) => (
                                                <Grid container spacing={5}>
                                                    <Grid item xs={6} sm={3}>
                                                        <FormControlLabel
                                                            label='Stripe'
                                                            control={
                                                                <Checkbox
                                                                    checked={value.card_type === 0}
                                                                    name='event-payment-setting-card-type-stripe'
                                                                    onChange={e => {
                                                                        const updated_value = value
                                                                        updated_value.card_type = 0
                                                                        onChange(updated_value)
                                                                    }}
                                                                />
                                                            }
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <FormControlLabel
                                                            label='Paypal'
                                                            control={
                                                                <Checkbox
                                                                    checked={value.card_type === 1}
                                                                    name='event-payment-setting-card-type-paypal'
                                                                    onChange={e => {
                                                                        const updated_value = value
                                                                        updated_value.card_type = 1
                                                                        onChange(updated_value)
                                                                    }}
                                                                />
                                                            }
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <FormControlLabel
                                                            label='WorldPay'
                                                            control={
                                                                <Checkbox
                                                                    checked={value.card_type === 2}
                                                                    name='event-payment-setting-card-type-worldpay'
                                                                    onChange={e => {
                                                                        const updated_value = value
                                                                        updated_value.card_type = 2
                                                                        onChange(updated_value)
                                                                    }}
                                                                />
                                                            }
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <FormControlLabel
                                                            label='Klarna'
                                                            control={
                                                                <Checkbox
                                                                    checked={value.card_type === 3}
                                                                    name='event-payment-setting-card-type-klarna'
                                                                    onChange={e => {
                                                                        const updated_value = value
                                                                        updated_value.card_type = 3
                                                                        onChange(updated_value)
                                                                    }}
                                                                />
                                                            }
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={12}>
                                                        <RadioGroup
                                                            row
                                                            value={value.is_live}
                                                            name='event-payment-card-live-option'
                                                            onChange={e => {
                                                                const updated_card_info = value
                                                                updated_card_info.is_live = parseInt(e.target.value)
                                                                onChange(updated_card_info)
                                                            }}
                                                            aria-label='event-payment-card-live-option'
                                                            sx={{mb: 2}}
                                                        >
                                                            <FormControlLabel value={1} control={<Radio/>}
                                                                              label='Live Key'/>
                                                            <FormControlLabel value={0} control={<Radio/>}
                                                                              label='Test Key'/>
                                                        </RadioGroup>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            sx={{width: '100%'}}
                                                            value={value.secret_key}
                                                            label='Secret Key'
                                                            onChange={e => {
                                                                const updated_card_info = value
                                                                updated_card_info.secret_key = e.target.value
                                                                onChange(updated_card_info)
                                                            }}
                                                            placeholder=''
                                                            aria-describedby='event-payment-setting-card-secret-key'
                                                            error={Boolean(
                                                                paymentSettingErrors.card_info && paymentSettingErrors.card_info.secret_key
                                                            )}
                                                        />
                                                        {paymentSettingErrors.card_info && paymentSettingErrors.card_info.secret_key && (
                                                            <FormHelperText
                                                                sx={{color: 'error.main'}}
                                                                id='error-event-payment-setting-bank-info-secret-key'
                                                            >
                                                                {paymentSettingErrors.card_info.secret_key.message}
                                                            </FormHelperText>
                                                        )}
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            sx={{width: '100%'}}
                                                            value={value.publish_key}
                                                            label='Publish Key'
                                                            onChange={e => {
                                                                const updated_card_info = value
                                                                updated_card_info.publish_key = e.target.value
                                                                onChange(updated_card_info)
                                                            }}
                                                            placeholder=''
                                                            aria-describedby='event-payment-setting-card-publish-key'
                                                            error={Boolean(
                                                                paymentSettingErrors.card_info && paymentSettingErrors.card_info.publish_key
                                                            )}
                                                        />
                                                        {paymentSettingErrors.card_info && paymentSettingErrors.card_info.publish_key && (
                                                            <FormHelperText
                                                                sx={{color: 'error.main'}}
                                                                id='error-event-payment-setting-bank-info-publish-key'
                                                            >
                                                                {paymentSettingErrors.card_info.publish_key.message}
                                                            </FormHelperText>
                                                        )}
                                                    </Grid>
                                                </Grid>
                                            )}
                                        />
                                    </FormControl>
                                </Grid>
                            ) : null}
                            <Grid
                                item
                                xs={12}
                                md={12}
                                sx={{mt: 18, display: 'flex', justifyContent: 'center', position: 'relative'}}
                            >
                                <Button size='large' variant='outlined' color='secondary' onClick={handleBack}
                                        sx={{mr: 24}}>
                                    Back
                                </Button>
                                <Button size='large' type='submit' variant='contained'>
                                    Next
                                </Button>
                                <Button size='medium' variant='no-outlined' color='secondary'
                                        sx={{position: 'absolute', right: 0}}>
                                    Skip
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )
            case 13:
                return (
                    <form key={13} onSubmit={anotherLocationSubmit(onAnotherLocationSubmit)}>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <Typography variant='h4'
                                            sx={{textAlign: 'center', fontWeight: 600, color: 'common.black'}}>
                                    {steps[13].title}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{
                                    mb: 4,
                                    paddingLeft: 2,
                                    borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                }}>
                                    <Typography variant='h5'
                                                sx={{mt: 8, textAlign: 'left', fontWeight: 600, color: 'common.black'}}>
                                        Event Category
                                    </Typography>
                                </Box>
                                <CustomFormControl fullWidth>
                                    <Controller
                                        name='event_category'
                                        control={anotherLocationControl}
                                        render={({field: {value, onChange}}) => (
                                            <>
                                                <InputLabel
                                                    id='venue-event-another-category-select-label'>{'Choose a category...'}</InputLabel>
                                                <Select
                                                    value={value}
                                                    label=''
                                                    id='venue-event-another-category-select'
                                                    onChange={onChange}
                                                    labelId='venue-event-another-category-select-label'
                                                >
                                                    {eventCategories.map((category, index) => (
                                                        <MenuItem key={index} value={category.id}>
                                                            {category.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                {anotherLocationErrors.event_category && (
                                                    <FormHelperText sx={{color: 'error.main'}}
                                                                    id='error-venue-another-event-category'>
                                                        {anotherLocationErrors.event_category.message}
                                                    </FormHelperText>
                                                )}
                                            </>
                                        )}
                                    />
                                </CustomFormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='address'
                                        control={anotherLocationControl}
                                        rules={{required: true}}
                                        render={({field: {value, onChange}}) => (
                                            <>
                                                {autocompleteService ? (
                                                    <PlaceAutoComplete
                                                        autocompleteService={autocompleteService}
                                                        onChange={onChange}
                                                        initValue={value}
                                                    />
                                                ) : (
                                                    <TextField
                                                        type='text'
                                                        value={value.title}
                                                        label=''
                                                        onChange={onChange}
                                                        error={Boolean(anotherLocationErrors.address)}
                                                        placeholder='e.g. Stock Brook Country Club ...'
                                                        aria-describedby='venue-another-address'
                                                    />
                                                )}
                                            </>
                                        )}
                                    />
                                    {anotherLocationErrors.address && anotherLocationErrors.address.title && (
                                        <FormHelperText sx={{color: 'error.main'}} id='error-venue-another-address'>
                                            {anotherLocationErrors.address.title.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{
                                    mb: 4,
                                    paddingLeft: 2,
                                    borderLeft: theme => `3px solid ${theme.palette.common.black}`
                                }}>
                                    <Typography variant='h5'
                                                sx={{mt: 8, textAlign: 'left', fontWeight: 600, color: 'common.black'}}>
                                        Would You Like To Duplicate The Event You Just Created And Add It To Another
                                        Location? Don't Worry
                                        It Can Be Edited In The Next Step.
                                    </Typography>
                                </Box>
                                <CustomFormControl fullWidth>
                                    <Controller
                                        name='is_duplicate'
                                        control={anotherLocationControl}
                                        render={({field: {value, onChange}}) => (
                                            <>
                                                <RadioGroup
                                                    row
                                                    value={value}
                                                    name='venue-another-location-ready-option'
                                                    onChange={e => {
                                                        onChange(parseInt(e.target.value))
                                                    }}
                                                    aria-label='venue-another-location-ready-option-label'
                                                    sx={{mb: 2}}
                                                >
                                                    <FormControlLabel value={1} control={<Radio/>}
                                                                      label='Yes, Duplicate It'/>
                                                    <FormControlLabel value={0} control={<Radio/>}
                                                                      label="No, I'm Ready To Publish It"/>
                                                </RadioGroup>
                                            </>
                                        )}
                                    />
                                </CustomFormControl>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={12}
                                sx={{mt: 18, display: 'flex', justifyContent: 'center', position: 'relative'}}
                            >
                                <Button size='large' variant='outlined' color='secondary' onClick={handleBack}
                                        sx={{mr: 24}}>
                                    Back
                                </Button>
                                <Button size='large' type='submit' variant='contained'>
                                    Next
                                </Button>
                                <Button
                                    size='medium'
                                    variant='no-outlined'
                                    color='secondary'
                                    sx={{position: 'absolute', right: 0}}
                                    onClick={handleSkip}
                                >
                                    Skip
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )
            default:
                return null
        }
    }

    const renderContent = () => {
        if (activeStep === steps.length) {
            return (
                <Fragment>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={12}>
                            <Typography variant='h5'
                                        sx={{mt: 8, textAlign: 'center', fontWeight: 600, color: 'common.black'}}>
                                All Steps For Venue Registration Are Completed!
                            </Typography>
                            <Typography variant='h6'
                                        sx={{mt: 4, textAlign: 'center', fontWeight: 600, color: 'primary.secondary'}}>
                                You Can Publish The Venue Information Now.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12}
                              sx={{mt: 18, display: 'flex', justifyContent: 'center', position: 'relative'}}>
                            <Button size='large' variant='outlined' color='secondary' onClick={handleBack}
                                    sx={{mr: 24}}>
                                Back
                            </Button>
                            <Button size='large' type='submit' variant='contained' onClick={handlePublish}>
                                Publish
                            </Button>
                        </Grid>
                    </Grid>
                </Fragment>
            )
        } else {
            return getStepContent(activeStep)
        }
    }

    const {settings} = useSettings()

    // ** Vars
    const {skin} = settings

    return (
        <>
            {loading ? (
                <Spinner/>
            ) : (
                <>
                    <Box className='content-center' sx={{minHeight: 'unset'}}>
                        <MainWrapper
                            sx={skin === 'bordered' && !hidden ? {borderLeft: `1px solid ${theme.palette.divider}`} : {}}
                        >
                            <Box
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'background.paper',
                                    borderRadius: '20px',
                                    border: theme => `2px solid ${theme.palette.border}`
                                }}
                            >
                                <BoxWrapper>
                                    <MainCard>
                                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                                            {activeStep < steps.length ? (
                                                <>
                                                    <Typography
                                                        variant='body1'
                                                        sx={{
                                                            textAlign: 'center',
                                                            fontWeight: 600,
                                                            color: 'primary.main'
                                                        }}
                                                    >
                                                        Step&nbsp;&nbsp;{activeStep + 1}
                                                    </Typography>
                                                    <Typography
                                                        variant='body1'
                                                        sx={{
                                                            textAlign: 'center',
                                                            fontWeight: 600,
                                                            color: 'text.primary'
                                                        }}
                                                    >
                                                        &nbsp;&nbsp;/&nbsp;&nbsp;{steps.length}
                                                    </Typography>
                                                </>
                                            ) : null}
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mb: 6
                                            }}
                                        >
                                            <LinkStyled href='/'>
                                                {settings.mode === 'light' ? (
                                                    <Img alt='logo' src='/images/icons/logo.png'/>
                                                ) : (
                                                    <Img alt='logo' src='/images/icons/logo_dark.png'/>
                                                )}
                                            </LinkStyled>
                                        </Box>

                                        <Divider sx={{m: '0 !important'}}/>

                                        <CardContent>{renderContent()}</CardContent>
                                    </MainCard>
                                </BoxWrapper>
                            </Box>
                        </MainWrapper>
                    </Box>
                    <AuthFooter/>
                </>
            )}
        </>
    )
}

VenueOnboarding.getLayout = page => <OnboardingLayout>{page}</OnboardingLayout>
VenueOnboarding.authGuard = 'user'

export default VenueOnboarding
