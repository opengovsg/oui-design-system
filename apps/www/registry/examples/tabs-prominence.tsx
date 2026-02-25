import { Tab, TabList, Tabs } from "@opengovsg/oui"

export default function App() {
  const prominences = ["strong", "normal"] as const

  return (
    <div className="flex flex-wrap gap-4">
      {prominences.map((prominence) => (
        <Tabs key={prominence} prominence={prominence}>
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
