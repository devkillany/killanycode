// Simple proxy to piston API (https://github.com/engineer-man/piston)
export const executeCode = async (language: string, code: string, version: string = '*') => {
  try {
    const response = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language,
        version,
        files: [
          {
            content: code,
          },
        ],
      }),
    });

    const data: any = await response.json();
    return data;
  } catch (error) {
    console.error('Compiler service err:', error);
    throw new Error('Failed to execute code');
  }
};
