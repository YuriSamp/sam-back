import z from "zod";

const schedulingSchema = z.object({
  corretor: z.string().min(3),
  cliente: z.string().min(3),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

export type shchedulingRequestDto = {
  corretor: string;
  cliente: string;
  date: Date;
  startTime: Date;
  endTime: Date;
};

export const schedulingDto = (schedulingData: unknown) => {
  const validaterScheduling = schedulingSchema.safeParse(schedulingData);

  if (!validaterScheduling.success) {
    throw new Error(`Invalid scheduling data: ${validaterScheduling.error} `);
  }

  const { cliente, corretor, date, endTime, startTime } =
    validaterScheduling.data;

  const data = {
    cliente,
    corretor,
    date: new Date(date),
    endTime: new Date(endTime),
    startTime: new Date(startTime),
  };

  return data;
};
