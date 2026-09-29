const verificationBody = 'naver-site-verification: naverf25a6a23decbc53256c83fd625d68e88.html';

export async function onRequest() {
  return new Response(verificationBody, {
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=300',
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
