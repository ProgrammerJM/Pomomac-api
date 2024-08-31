import { TaskStatus } from "@prisma/client";
import { SessionStatus } from "@prisma/client";
import { IntervalType } from "@prisma/client";

export interface Task {
  userId: string;
  name: string;
  description: string;
  status: TaskStatus;
}

export interface Session {
  id: string;
  userId: string;
  startTime: Date;
  status: SessionStatus;
}

export interface Interval {
  sessionId: string;
  taskId: string;
  startTime: Date;
  type: IntervalType;
}
