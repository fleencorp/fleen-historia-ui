export type CreateCategoryPayload = {
  title: string;
  description?: string;
  categoryExternalId: string;
}

export type UpdateCategoryPayload = {
  title: string;
  description: string;
}
