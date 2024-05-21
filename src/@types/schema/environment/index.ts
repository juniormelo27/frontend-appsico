import { z } from 'zod';

const SchemaEnvironment = z.object({
  auth: z.object({
    secret: z.string(),
  }),
});
export type Environment = z.infer<typeof SchemaEnvironment>;
export default SchemaEnvironment;
