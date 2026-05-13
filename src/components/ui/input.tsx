import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { inputClassNames } from "@/design-system/shadcn/input.variants"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        inputClassNames.input,
        className
      )}
      {...props}
    />
  )
}

export { Input }
