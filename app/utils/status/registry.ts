import type { IconName } from "~/utils/icons";
import type { CanonicalStatus, StatusTone } from "./types";

export interface StatusDefinition {
  /** Always rendered as visible text — status is never colour alone. */
  label: string;
  icon?: IconName;
  tone: StatusTone;
}

export const STATUS_REGISTRY: Record<CanonicalStatus, StatusDefinition> = {
  confirmed: { label: "Confirmed", tone: "success" },
  completed: { label: "Completed", icon: "check", tone: "success" },
  pending: { label: "Pending", tone: "pending" },
  cancelled: { label: "Cancelled", tone: "danger" },
};
