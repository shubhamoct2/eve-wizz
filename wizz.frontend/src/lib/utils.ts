import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { toast } from "@/components/ui/use-toast"


 export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
const isLoggedIn = () => {
    return loggedIn()
}


const capitalize = (str: string) => {
    return str[0].toUpperCase() + str.slice(1);
}


const showErrors = (errors) => {
			    if(errors){
	    Object.entries(errors).forEach(error => {
        const [errorTitle, errorDescription] = error
        toast({
            title: (typeof errorTitle === "string") ? capitalize(errorTitle) : errorTitle,
            description: errorDescription,
            variant: "destructive"
        })
    })
    }
}
export {
    showErrors,
    capitalize
}