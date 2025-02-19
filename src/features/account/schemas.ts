import { z } from 'zod';

import { zUser, zUserWithEmail } from '@/features/users/schemas';
import { zFieldUploadValue } from '@/lib/s3/schemas';

export type UserAccount = z.infer<ReturnType<typeof zUserAccount>>;
export const zUserAccount = () =>
  zUser().pick({
    id: true,
    name: true,
    email: true,
    image: true,
    imageMetadata: true,
    isEmailVerified: true,
    authorizations: true,
    language: true,
  });

export type UserAccountWithEmail = z.infer<
  ReturnType<typeof zUserAccountWithEmail>
>;
export const zUserAccountWithEmail = () =>
  zUserWithEmail().pick({
    id: true,
    name: true,
    email: true,
    authorizations: true,
    language: true,
  });

export type FormFieldsAccountEmail = z.infer<
  ReturnType<typeof zFormFieldsAccountEmail>
>;
export const zFormFieldsAccountEmail = () =>
  zUserAccountWithEmail().pick({ email: true });

export type FormFieldsAccountProfile = z.infer<
  ReturnType<typeof zFormFieldsAccountProfile>
>;

export const zFormFieldsAccountProfile = () =>
  zUser()
    .pick({
      name: true,
      language: true,
    })
    .extend({
      image: zFieldUploadValue(['image']).nullish(),
    });
