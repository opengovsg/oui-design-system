import { createContext } from "../system/react-utils"
import { UseCalendarReturn } from "./use-calendar"

export const [CalendarProvider, useCalendarContext] = createContext<
  UseCalendarReturn["context"]
>({
  name: "CalendarContext",
  strict: true,
  errorMessage:
    "useContext: `context` is undefined. Seems you forgot to wrap component within the CalendarProvider",
})
