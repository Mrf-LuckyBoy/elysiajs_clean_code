export const ok = (data: unknown) => ({
  status: 'success',
  data,
});

export const fail = (error: unknown) => ({
  status: 'fail',
  error: typeof error === 'string' ? { message: error } : error,
});
