import * as React from "react"

import { cn } from "@/utils/cn"
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

const SliderInput = React.forwardRef< HTMLInputElement, React.ComponentProps<"input"> & { min?: number; max?: number; step?: number }>(
    ({ className, value, onChange, min = 0, max = 100, step = 1, ...props }, ref) => {
    const numericValue = typeof value === "number" ? value : Number(value) || 0;
    // const [isDragging, setIsDragging] = React.useState(false);

    const updateValue = (newValue: number) => {
      if (newValue < min || newValue > max) return;
      onChange?.({ target: { value: String(newValue) } } as any);
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
      // setIsDragging(true);
      const startX = e.clientX;
      const startValue = numericValue;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const delta = Math.floor((moveEvent.clientX - startX) / 10) * step;
        updateValue(startValue + delta);
      };

      const handleMouseUp = () => {
        // setIsDragging(false);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    };

    return (
      <div className="space-y-2">
        <div className="relative inline-flex h-7 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border border-input text-sm shadow-sm shadow-black/5 transition-shadow data-[focus-within]:border-ring data-[disabled]:opacity-50 data-[focus-within]:outline-none data-[focus-within]:ring-[2px] data-[focus-within]:ring-ring/20">
          {/* Button - */}
          <Button
            onClick={() => updateValue(numericValue - step)}
            disabled={numericValue <= min}
            className="-ms-px flex aspect-square h-[inherit] items-center justify-center rounded-s-lg border border-input bg-background text-xs text-muted-foreground/80 transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Minus size={14} strokeWidth={2} aria-hidden="true" />
          </Button>

          {/* Input */}
          <input
            type="number"
            ref={ref}
            value={numericValue}
            onChange={(e) => updateValue(Number(e.target.value))}
            onMouseDown={handleMouseDown}
            className={cn(
              "w-full h-7 px-2 py-1 text-sm text-center border-0 focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
              className,
              "cursor-grab",
              "transition-colors duration-200 ease-in-out",
              "hover:bg-gray-100"
            )}
            {...props}
          />

          {/* Button + */}
          <Button
            onClick={() => updateValue(numericValue + step)}
            disabled={numericValue >= max}
            className="-me-px flex aspect-square h-[inherit] items-center justify-center rounded-e-lg border border-input bg-background text-xs text-muted-foreground/80 transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={14} strokeWidth={2} aria-hidden="true" />
          </Button>
        </div>
      </div>
    );
});

SliderInput.displayName = "SliderInput";

export { SliderInput };