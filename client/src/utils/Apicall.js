const ApiCall = async ({
  url,
  method = "GET",
  body,
  header = {},
}) => {

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...header,
    },
    body: ['GET', 'DELETE'].includes(method) ? null : JSON.stringify(body),
  })

  if (res.ok && res.status === 200) {
    return await res.json();
  } else {
    return { success: false, msg: '' }
  }
};


export default ApiCall;
