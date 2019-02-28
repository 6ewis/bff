export const getHSEmbeddedUrl = (jwt, templateId) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
      "cache-control": "no-cache"
    },
    data: JSON.stringify({ templateId }),
    url: `http://localhost:8081/api/hs-embedded-url`
  };

  return axios(options);
};
