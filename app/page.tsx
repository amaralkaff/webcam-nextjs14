"use client"
import { ModeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FlipHorizontal } from "lucide-react"
import React, { useRef, useState } from "react"
import Webcam from "react-webcam"

type Props = {}

const page = (props: Props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const webcamref = useRef<Webcam>(null)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [mirrored, setMirrored] = useState(false)
  return (
    <div className="flex h-screen">
      {/* create Navbar component */}
      <div className="relative">
        <div className="relative h-screen w-full">
          <Webcam ref={webcamref} mirrored={mirrored} className="h-full w-full object-contain" />
          <canvas ref={canvasRef} className="absolute top-0 left-0 h-full w-full object-contain"></canvas>
        </div>
      </div>
      <div className="flex flex-row flex-1">
        <div className="border-primary/5 border-2 max-w-xs flex flex-col gap-2 justify-between shadow-md p-4 rounded-md">
          {/* Top Section */}
          <div className="flex flex-col gap-2">
            <Separator /> 
            <ModeToggle />
            <Button variant={"outline"} onClick={() => {
              const canvas = canvasRef.current
              if (canvas) {
                const ctx = canvas.getContext('2d')
                if (ctx) {
                  if (webcamref.current?.video) {
                    ctx.drawImage(webcamref.current.video, 0, 0, canvas.width, canvas.height);
                  }
                }
              }
            }
            }>
              <FlipHorizontal className="h-6 w-6" />
              <span className="sr-only">Flip</span>
            </Button>
            <Separator />
          </div>
          {/* Middle Section */}
          <div className="flex flex-col gap-2">
            <Separator />
            </div>
          {/* Bottom Section */}
            <Separator />
          <div className="flex flex-row gap-2">
            <button onClick={() => setMirrored(!mirrored)} className="border-primary/5 border-2 rounded-md p-2">Mirror</button>
          </div>
          </div>
      </div>
    </div>
  )
}

export default page