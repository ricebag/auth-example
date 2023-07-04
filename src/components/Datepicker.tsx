"use client"

import React, { type Dispatch, type SetStateAction } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import {
    Button,
    Calendar,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "."
import { default as cn } from "../utils/cn"

const Datepicker = ({ date, setDate }: { date: Date | undefined, setDate: Dispatch<SetStateAction<Date | undefined>> }) => (
    <div className="pt-2">
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    </div>
)

export default Datepicker
