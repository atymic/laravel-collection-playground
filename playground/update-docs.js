const axios = require('axios');
const fs = require('fs').promises;


const update = async () => {
  const response = await axios.get('https://raw.githubusercontent.com/laravel/docs/5.8/collections.md')
  const md = response.data


  const methods = [...md.matchAll(/\[(\w+)\]\(#(method-\w+)\)/gm)].map((matches) => {
    return {
      method: matches[1],
      id: matches[2],
    }
  })

  let methodDocs =  md.substring(
    md.lastIndexOf(`<a name="${methods[0]['id']}"></a>`),
    md.lastIndexOf(`<a name="higher-order-messages"></a>`)
  );

  methodDocs = methodDocs.replace(/(#### `\S+`) \{.*?\}/gm, "$1")
  methodDocs = methodDocs.replace(/<a name="(\S+)"><\/a>/gm, "<a id='$1'></a>")

  await fs.writeFile('./src/docs/methods.md', methodDocs, 'utf8');
  await fs.writeFile('./src/docs/methods.json', JSON.stringify(methods, null, 2), 'utf8');
}

update().then(() => {
  console.info('Docs Updated')
});
