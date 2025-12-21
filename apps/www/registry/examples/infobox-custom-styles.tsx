import { Infobox } from "@opengovsg/oui"

export default function InfoboxCustomStyles() {
  return (
    <Infobox
      variant="info"
      classNames={{
        base: "bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 rounded-lg",
        icon: "text-purple-600",
      }}
    >
      Customize the appearance using the classNames prop to match your design
      system.
    </Infobox>
  )
}
