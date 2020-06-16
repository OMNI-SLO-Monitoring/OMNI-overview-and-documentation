import { LogType } from "./LogType";

export interface LogMessageFormat {
  type: LogType;
  time: number;
  source: String;
  target: String;
}
