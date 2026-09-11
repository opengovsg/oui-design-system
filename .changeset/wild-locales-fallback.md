---
"@opengovsg/oui": patch
---

Fall back to English (en-SG) strings for unsupported locales instead of crashing.
Component translations previously threw (e.g. on the Dismiss button) when rendered under a locale outside en/zh/ms/ta-SG, such as de-DE.
