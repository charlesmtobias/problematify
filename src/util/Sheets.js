const sheetId = '1Bpf4j4iBAe6crGuaL7Oafh4OPTVPJb2r7kK4rdlRT24';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName = 'Approved';
const query = encodeURIComponent('Select *');
const url = `${base}&sheet=${sheetName}&tq=${query}`;

const Sheets = {
    async getArtists() {
        return await fetch(url)
        .then(response => {
          return response.text();
        })
        .then(textResponse => JSON.parse(textResponse.substr(47).slice(0, -2)))
        .then(jsonResponse => {
          if(!jsonResponse.table) {
            return [];
          }
          return jsonResponse.table.rows.map(artist => ({
            name: artist.c[0].v,
            uri: artist.c[1].v,
            ...(artist.c[2] ? {reason: artist.c[2].v}: {reason: ''}),
            link: artist.c[3].v
          }))
        })
      }
}

export default Sheets;