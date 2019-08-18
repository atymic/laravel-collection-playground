import Axios from 'axios';

export function handler(event, context, callback) {
    const {GITHUB_TOKEN} = process.env

    const respondJSON = (body, code = 200) => {
        callback(null, {
            statusCode: code,
            body: JSON.stringify(body),
            headers: {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        })
    }

    if (event.httpMethod === 'OPTIONS') {
        callback(null, {
            statusCode: 200,
            body: '{}',
            headers: {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
            }
        })
        return;
    }

    if (event.httpMethod !== 'POST') {
        respondJSON({error: 'Invalid Request'}, 400);
    }

    const data = JSON.parse(event.body);

    const req = {
        description: data.description || 'Collection Playground',
        public: !!data.public || false,
        files: {
            'input.json': {
                content: data.input,
            },
            'collection.php': {
                content: data.code,
            },
            'output.json': {
                content: data.output || '{}',
            },
        }
    }

    Axios.post('https://api.github.com/gists', req, {
        headers: {
            'Authorization': `token ${GITHUB_TOKEN}`
        }
    }).then((res) => {
            console.log(`Gist created with id ${res.data.id}`)
        respondJSON(res.data)
        }
    ).catch(err => respondJSON(err))
}
