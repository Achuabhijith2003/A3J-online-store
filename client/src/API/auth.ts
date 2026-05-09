export async function loginApi(email: string, password: string) {
  const response = await fetch('http://localhost:10000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  return response.json();
}