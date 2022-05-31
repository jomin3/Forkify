const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const fetchpro = fetch(url);

    const res = await Promise.race([fetchpro, timeout(100)]);
    let data = await res.json();
    console.log(res);
    if (res.status !== 200) {
      throw new Error('We could not find that Recipe');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchpro = fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(uploadData),
    });

    const res = await Promise.race([fetchpro, timeout(100)]);
    let data = await res.json();
    if (res.status !== 201) {
      console.log(res);
      throw new Error('We could not find that Recipe');
    }
    return data;
  } catch (error) {
    throw error;
  }
};
