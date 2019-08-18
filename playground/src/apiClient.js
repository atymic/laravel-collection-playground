import Axios from 'axios';

export default class ApiClient {
  static async load(playgroundId) {
    return Axios.get(`https://api.github.com/gists/${playgroundId}`).then((res) => {
      if (res.data.owner.login !== 'collection-playground') return null;

      return {
        id: res.data.id,
        description: res.data.description,
        public: res.data.public,
        input: res.data.files['input.json'].content,
        code: res.data.files['collection.php'].content,
        output: res.data.files['output.json'].content,
      };
    });
  }

  static async save(input, code, output) {
    // TODO url rewriting
    const endpoint = process.env.mode === 'production'
      ? '/.netlify/functions/save'
      : 'http://localhost:9000/.netlify/functions/save';

    return Axios.post(endpoint, { input, code, output }).then(res => res.data.id);
  }
}
