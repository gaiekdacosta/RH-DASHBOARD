"use client"

import * as React from "react"
import { cn } from "@/src/lib/utils"

interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value: number 
    color: string;
    size?: number
}

const CircularProgress = React.forwardRef<HTMLDivElement, CircularProgressProps>(
    ({ className, value, size = 80, color, ...props }, ref) => {
        
        const strokeWidth = 9
        const radius = (size - strokeWidth) / 2
        const circumference = 2 * Math.PI * radius
        const offset = circumference - (value / 100) * circumference

        return (
            <div
                ref={ref}
                className={cn("relative inline-block", className)}
                style={{ width: size, height: size }}
                {...props}
            >
                <svg className="transform -rotate-90" width={size} height={size}>
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="#363A3B"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                    />
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke={color}
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        className="transition-all duration-300 ease-out text-primary"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
                    {Math.round(value)}%
                </div>
            </div>
        )
    }
)
CircularProgress.displayName = "CircularProgress"

export { CircularProgress }
