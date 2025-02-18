import { Button } from "@opengovsg/oui"

const colorPalettes = [
  "sub",
  "main",
  "neutral",
  "critical",
  "warning",
  "success",
  "inverse",
] as const

export default function ButtonWithColor() {
  return (
    <div className="flex flex-col items-center gap-4">
      {colorPalettes.map((colorPalette) => (
        <div className="flex flex-row items-center gap-4" key={colorPalette}>
          <div className="min-w-[8ch]">{colorPalette}</div>
          <Button color={colorPalette}>Button</Button>
          <Button color={colorPalette} variant="outline">
            Button
          </Button>
          <Button color={colorPalette} variant="reverse">
            Button
          </Button>
          <Button color={colorPalette} variant="clear">
            Button
          </Button>
        </div>
      ))}
    </div>
  )
}
