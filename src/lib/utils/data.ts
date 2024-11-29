export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const fetchData = async <T>(endpoint: string): Promise<FetchState<T>> => {
  const state: FetchState<T> = {
    data: null,
    loading: true,
    error: null,
  };

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`Network error: ${response.status} ${response.statusText}`);
    }

    const data: T = await response.json();
    return { ...state, data, loading: false };
  } catch (error) {
    return {
      ...state,
      error: error instanceof Error ? error.message : 'Неизвестная ошибка',
      loading: false,
    };
  }
};
