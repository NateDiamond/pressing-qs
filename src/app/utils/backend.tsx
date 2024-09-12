export async function backendApiCall(endpoint: string, method: string = 'GET', params?: string) {
  const paramString = params ? `?${params}` : '';
  const response = await fetch(`api/${endpoint}${paramString}`, {method});
  return await response.json();
}