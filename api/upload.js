export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { image } = JSON.parse(req.body);
    const apiKey = process.env.IMGBB_API_KEY;

    const formData = new URLSearchParams();
    formData.append('image', image);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData,
    });
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: '업로드 중 서버 오류 발생' });
  }
}