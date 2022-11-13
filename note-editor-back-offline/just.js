//user registration
fetch('http://localhost:3500/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
    },
    body: JSON.stringify({
        "username": "note-editor-back",
        "password": "password"
    })
})
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(e => console.log('e', e))

//user login
fetch('http://localhost:3500/auth', {
    method: 'POST',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
    },
    body: JSON.stringify({
        "username": "note-editor-back",
        "password": "password"
    })
})
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(e => console.log('e', e))

//notes get
fetch('http://localhost:3500/notes', {
    method: 'GET',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
    }
})
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(e => console.log('e', e))

//notes post
fetch('http://localhost:3500/notes', {
    method: 'POST',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
    },
    body: JSON.stringify({
        "id": "string",
        "username": "note-editor-back",
        "title": "string",
        "description": "string",
        "createdDate": new Date().getTime(),
        "modifiedDate": new Date().getTime()
    })
})
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(e => console.log('e', e))

//notes patch
fetch('http://localhost:3500/notes', {
    method: 'PATCH',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
    },
    body: JSON.stringify({
        "id": "string",
        "title": "new title"
    })
})
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(e => console.log('e', e))

//notes delete
fetch('http://localhost:3500/notes', {
    method: 'DELETE',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
    },
    body: JSON.stringify({
        "id": "string",
    })
})
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(e => console.log('e', e))