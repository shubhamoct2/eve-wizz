import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface DropDownOptions {
    options?: [] | {} | null
    selected?: null
    defaultValue?: string
    label?: string
    className?: string
    field: any
}

export default function EventCategoryDropDown({
                                                  options,
                                                  selected,
                                                  defaultValue,
                                                  label,
                                                  className,
                                                  field
                                              }: DropDownOptions) {

    const selectOptionValue = (val) => {
        console.log(val, ' CHANGED')
    }
    return (
        <Select onValueChange={field.onChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder={label || "Select Category"}/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{defaultValue || "Select Categories"}</SelectLabel>
                    {options?.map((option) => {
                        return (
                            <SelectItem key={option.id} value={option?.id?.toString()}>{option?.value}</SelectItem>
                        )
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
