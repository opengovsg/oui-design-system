import { Tab, TabList, Tabs } from "@opengovsg/oui"

export default function App() {
  const variants = ["underlined", "bordered"] as const

  return (
    <div className="flex flex-wrap gap-4">
      {variants.map((variant) => (
        <Tabs key={variant} variant={variant}>
          <TabList aria-label="History of Ancient Rome">
            <Tab id="FoR">Founding of Rome</Tab>
            <Tab id="MaR">Monarchy and Republic</Tab>
            <Tab id="Emp">Empire</Tab>
          </TabList>
        </Tabs>
      ))}
    </div>
  )
}
