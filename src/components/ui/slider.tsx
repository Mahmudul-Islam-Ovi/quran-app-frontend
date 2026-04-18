import { Slider as SliderPrimitive } from "@base-ui/react/slider"

import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: SliderPrimitive.Root.Props) {
  const _values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min, max]

  return (
    <SliderPrimitive.Root
      className={cn("data-horizontal:w-full data-vertical:h-full", className)}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      {...props}
    >
      <SliderPrimitive.Control className="relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col">
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative grow overflow-hidden rounded-full bg-zinc-800/80 select-none data-horizontal:h-1.5 data-horizontal:w-full data-vertical:h-full data-vertical:w-1.5"
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="bg-emerald-500 select-none data-horizontal:h-full data-vertical:w-full shadow-[0_0_10px_rgba(16,185,129,0.3)]"
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            className="relative block size-4 shrink-0 rounded-full border-2 border-emerald-400 bg-zinc-950 shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all select-none hover:scale-110 hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] hover:border-emerald-300 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 cursor-grab active:cursor-grabbing"
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }
