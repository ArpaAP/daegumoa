import { zfd } from 'zod-form-data';

export const uploadSchema = zfd.formData({
  image: zfd.file(),
});
