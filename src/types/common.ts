export type ApiResponse<T> = Promise<{ status: true; data: T } | { status: false; error: any; message: any }>;
