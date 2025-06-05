export async function submitFormMock(data: Record<string, any>): Promise<{ success: boolean }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Form submitted to mock API:', data);
        resolve({ success: true });
      }, 1500); // simulate network delay
    });
  }
  