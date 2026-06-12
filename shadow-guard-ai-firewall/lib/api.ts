/**
 * Shadow Guard — Central API Configuration
 * All backend fetch calls should import BACKEND_URL from here.
 */
export const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://shadowguard-ai-firewall.onrender.com"

export type GuardResponse =
  | {
      status: "PASS"
      gate: string
      entropy: number
      response: string
    }
  | {
      status: "BLOCKED"
      gate: "GATE_1" | "GATE_2"
      reason?: string
      entropy?: number
      threshold?: number
      message?: string
      timestamp?: string
    }

export type LogEntry = {
  id: string
  time: string
  query: string
  result: "PASS" | "BLOCKED"
  gate?: "GATE_1" | "GATE_2"
  entropy?: number
}

export type LogsResponse = {
  logs: LogEntry[]
}
