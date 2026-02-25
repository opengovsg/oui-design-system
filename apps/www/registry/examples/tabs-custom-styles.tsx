"use client"

import { Tab, TabList, TabPanel, Tabs } from "@opengovsg/oui"
import { cn } from "@opengovsg/oui-theme"

export default function App() {
  return (
    <Tabs>
      <TabList
        aria-label="History of Ancient Rome"
        className="bg-brand-primary-900 gap-2 rounded-full p-1"
      >
        <Tab
          id="FoR"
          className={({ isSelected }) =>
            cn(
              "rounded-full border-0 p-2 text-sm transition-colors",
              isSelected
                ? "text-brand-primary-800 bg-white shadow-md"
                : "text-brand-primary-200 hover:bg-brand-primary-800 hover:text-white",
            )
          }
        >
          Founding of Rome
        </Tab>
        <Tab
          id="MaR"
          className={({ isSelected }) =>
            cn(
              "rounded-full border-0 p-2 text-sm transition-colors",
              isSelected
                ? "text-brand-primary-800 bg-white shadow-md"
                : "text-brand-primary-200 hover:bg-brand-primary-800 hover:text-white",
            )
          }
        >
          Monarchy and Republic
        </Tab>
        <Tab
          id="Emp"
          className={({ isSelected }) =>
            cn(
              "rounded-full border-0 p-2 text-sm transition-colors",
              isSelected
                ? "text-brand-primary-800 bg-white shadow-md"
                : "text-brand-primary-200 hover:bg-brand-primary-800 hover:text-white",
            )
          }
        >
          Empire
        </Tab>
      </TabList>
      <TabPanel
        id="FoR"
        className="border-base-divider-medium bg-base-canvas-brand-subtle text-base-content-default mt-2 rounded-lg border p-4"
      >
        Arma virumque cano, Troiae qui primus ab oris.
      </TabPanel>
      <TabPanel
        id="MaR"
        className="border-base-divider-medium bg-base-canvas-brand-subtle text-base-content-default mt-2 rounded-lg border p-4"
      >
        Senatus Populusque Romanus.
      </TabPanel>
      <TabPanel
        id="Emp"
        className="border-base-divider-medium bg-base-canvas-brand-subtle text-base-content-default mt-2 rounded-lg border p-4"
      >
        Alea jacta est.
      </TabPanel>
    </Tabs>
  )
}
