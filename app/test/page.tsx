"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { RatioIcon as AspectRatio, ImageIcon, X } from "lucide-react"

export default function ExportDialog({ isOpen, onClose, onExport }) {
  const [fileName, setFileName] = useState("chart_export")
  const [width, setWidth] = useState(800)
  const [height, setHeight] = useState(600)
  const [sizeUnit, setSizeUnit] = useState("px")
  const [aspectRatio, setAspectRatio] = useState("16:9")

  const handleExport = () => {
    onExport({ fileName, width, height, sizeUnit, aspectRatio })
    onClose()
  }

  const handleAspectRatioChange = (ratio) => {
    setAspectRatio(ratio)
    if (ratio === "16:9") setHeight(Math.round((width * 9) / 16))
    else if (ratio === "9:16") setHeight(Math.round((width * 16) / 9))
    else if (ratio === "4:3") setHeight(Math.round((width * 3) / 4))
    else if (ratio === "3:4") setHeight(Math.round((width * 4) / 3))
    else if (ratio === "A4") setHeight(Math.round(width * 1.414))
    else if (ratio === "A3") setHeight(Math.round(width * 1.414))
    else if (ratio === "Letter") setHeight(Math.round(width * 1.294))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Export Chart</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 bg-gray-200 p-4 rounded-lg">
            <div className="aspect-video relative">
              <Image src="/placeholder.svg" alt="Chart preview" layout="fill" objectFit="contain" />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="fileName">File Name</Label>
              <Input id="fileName" value={fileName} onChange={(e) => setFileName(e.target.value)} />
            </div>
            <div>
              <Label>Size</Label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-20"
                />
                <span>x</span>
                <Input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-20"
                />
                <RadioGroup value={sizeUnit} onValueChange={setSizeUnit} className="flex">
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="px" id="px" />
                    <Label htmlFor="px">px</Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="%" id="percent" />
                    <Label htmlFor="percent">%</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <div>
              <Label>Aspect Ratio</Label>
              <div className="grid grid-cols-4 gap-2">
                {["16:9", "9:16", "4:3", "3:4", "A4", "A3", "Letter"].map((ratio) => (
                  <Button
                    key={ratio}
                    variant={aspectRatio === ratio ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleAspectRatioChange(ratio)}
                  >
                    {ratio === "16:9" || ratio === "9:16" ? (
                      <AspectRatio className="w-4 h-4 mr-1" />
                    ) : ratio === "4:3" || ratio === "3:4" ? (
                      <ImageIcon className="w-4 h-4 mr-1" />
                    ) : (
                      <X className="w-4 h-4 mr-1" />
                    )}
                    {ratio}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleExport}>Export</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

