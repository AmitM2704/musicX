// // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
// const token = 'BQDY5xgSJSrlCs0WOvTCPbyJ-a7-_37Ku_Ia39rSBSzp-v-E2zf-yaS9wxeAchICUMcZ9FqT-DDfq1H_ZvXpPp4hcDTpkqoryN9ca05MOI2-tGw3NiKvfRZ-tgziLMnzKb8bJGEhQCHIKJy4480tbeOaBzDvWgUVutVXDTNBy0ttw8Eqwr7FxKlEaPBX5k_pcGZRE8jVsT9_hkfOrIx2rgmAg0zWxca0C2A_HuBIbXdhZRdu95uOHJq50qYOLih2Zl4E2IEXNqsTIEEsYGjnkIEMAYp4S8NSbS6bjItXfXMeh6KPi_iQzZkMTjq9LPm-GKya';
// async function fetchWebApi(endpoint, method, body) {
//   const res = await fetch(`https://api.spotify.com/${endpoint}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     method,
//     body:JSON.stringify(body)
//   });
//   return await res.json();
// }

// async function getTopTracks(){
//   // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
//   return (await fetchWebApi(
//     'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
//   )).items;
// }

// const topTracks = await getTopTracks();
// console.log(
//   topTracks?.map(
//     ({name, artists}) =>
//       `${name} by ${artists.map(artist => artist.name).join(', ')}`
//   )
// );

// export default getTopTracks