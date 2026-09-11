---
"@opengovsg/oui": patch
---

Fall back to English strings for unsupported locales instead of crashing, by adding an en-US alias to every translation dictionary.
Component translations previously threw (e.g. on the Dismiss button) when rendered under a locale outside en/zh/ms/ta-SG, such as de-DE.
