export type Notification = {
  show: boolean;
  severity: "error" | "info" | "success" | "warning";
  message: string;
};
